from fastapi import APIRouter, Query, HTTPException
import httpx
from typing import Optional, Dict, Any, List
import os
import logging
from pathlib import Path
from dotenv import load_dotenv
import spacy
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
from geopy.geocoders import Nominatim
from geopy.exc import GeocoderTimedOut
import asyncio
from functools import lru_cache
from cachetools import TTLCache, cached
import time

# Configure logging
logger = logging.getLogger(__name__)

# Load environment variables
env_path = Path(__file__).resolve().parent.parent.parent / ".env"
load_dotenv(env_path)

# Initialize NLP and geocoding tools
nlp = spacy.load("en_core_web_sm")
geolocator = Nominatim(user_agent="disaster_monitor")

router = APIRouter()

NEWS_API_KEY = os.environ.get("NEWS_API_KEY")
NEWS_API_BASE_URL = "https://newsapi.org/v2/everything"

# Constants
DISASTER_CONTEXTS = {
    'earthquake': ['magnitude', 'richter', 'seismic', 'tremor', 'quake'],
    'flood': ['flooding', 'submerged', 'water level', 'evacuation', 'heavy rain'],
    'tsunami': ['wave', 'coastal', 'warning', 'evacuation'],
    'hurricane': ['storm', 'wind', 'category', 'mph', 'evacuation'],
    'wildfire': ['fire', 'acres burned', 'evacuation', 'firefighters', 'containment'],
    'forestfire': ['fire', 'acres burned', 'evacuation', 'firefighters', 'containment'],
    'tornado': ['warning', 'touchdown', 'damage', 'wind', 'funnel'],
    'cyclone': ['storm', 'wind', 'category', 'warning', 'evacuation'],
    'volcano': ['eruption', 'lava', 'ash', 'evacuation', 'volcanic'],
    'drought': ['water shortage', 'dry spell', 'rainfall deficit', 'water restrictions'],
    'landslide': ['mudslide', 'debris flow', 'evacuation', 'heavy rain'],
    'storm': ['severe weather', 'warning', 'damage', 'wind', 'rainfall'],
    'blizzard': ['snow storm', 'winter storm', 'snowfall', 'white out'],
    'avalanche': ['snow slide', 'warning', 'buried', 'mountain'],
    'heatwave': ['extreme heat', 'temperature record', 'cooling center', 'heat advisory']
}

# Words that indicate actual disaster news
DISASTER_INDICATORS = [
    'emergency', 'evacuation', 'death toll', 'damage', 'destroyed', 'warning',
    'alert', 'disaster', 'catastrophe', 'crisis', 'victims', 'rescue', 'relief',
    'survivors', 'affected', 'impact', 'devastation', 'recovery'
]

# Additional terms to exclude
EXCLUDE_TERMS = [
    'game', 'movie', 'film', 'entertainment', 'sports', 'pokemon', 'anime',
    'gaming', 'politics', 'election', 'opinion', 'editorial', 'review',
    'stock', 'market', 'price', 'economy', 'trade', 'business'
]

# Cache configurations
GEOCODING_CACHE = TTLCache(maxsize=1000, ttl=86400)  # 24 hour TTL
LOCATION_CACHE = TTLCache(maxsize=1000, ttl=3600)    # 1 hour TTL

@cached(cache=GEOCODING_CACHE)
def get_coordinates(location: str) -> tuple:
    """Cached version of get_coordinates"""
    try:
        location_info = geolocator.geocode(location, timeout=5)
        if location_info:
            return (location_info.latitude, location_info.longitude)
        return (np.nan, np.nan)
    except Exception as e:
        logger.error(f"Error geocoding {location}: {str(e)}")
        return (np.nan, np.nan)

@cached(cache=LOCATION_CACHE)
def extract_location_ner(text: str) -> List[str]:
    """Cached version of location extraction"""
    if not text:
        return []
    doc = nlp(text)
    return [ent.text for ent in doc.ents if ent.label_ == 'GPE']

async def fetch_disaster_news(client: httpx.AsyncClient, keyword: str, context_terms: List[str], params: Dict) -> List[Dict]:
    """Fetch and process news for a specific disaster type"""
    try:
        search_query = f"{keyword} AND ({' OR '.join(context_terms)})"
        search_params = {**params, "q": search_query}
        
        response = await client.get(NEWS_API_BASE_URL, params=search_params)
        response.raise_for_status()
        articles = response.json().get("articles", [])
        
        processed_articles = []
        for article in articles:
            if not is_relevant_disaster_news(
                article.get("title", ""),
                article.get("description", ""),
                keyword
            ):
                continue
                
            processed_article = await process_article(article, keyword)
            if processed_article:
                processed_articles.append(processed_article)
        
        return processed_articles
    except Exception as e:
        logger.error(f"Error fetching {keyword} news: {e}")
        return []

async def process_article(article: Dict, keyword: str) -> Optional[Dict]:
    """Process a single article"""
    title = article.get("title", "")
    locations = extract_location_ner(title)
    
    if not locations:
        return None
        
    country, region, city = process_location(locations)
    
    processed_article = {
        "title": title,
        "url": article.get("url"),
        "source": article.get("source", {}).get("name"),
        "publishedAt": article.get("publishedAt"),
        "disaster_type": keyword,
        "country": country,
        "region": region,
        "city": city
    }
    
    if country or region or city:
        location = city or region or country
        lat, lon = get_coordinates(location)
        if not (np.isnan(lat) or np.isnan(lon)):
            processed_article["latitude"] = lat
            processed_article["longitude"] = lon
    
    return processed_article

def process_location(locations: List[str]) -> tuple:
    """Process location list into country, region, city"""
    country, region, city = '', '', ''
    if len(locations) == 1:
        country = locations[0]
    elif len(locations) == 2:
        country, region = locations[0], locations[1]
    elif len(locations) >= 3:
        country, region, city = locations[0], locations[1], locations[2]
    return country, region, city

def is_relevant_disaster_news(title: str, content: str, disaster_type: str) -> bool:
    """Check if the article is actually about a disaster"""
    if not title or not content:
        return False
        
    text = f"{title} {content}".lower()
    
    # Check for disaster context keywords
    context_keywords = DISASTER_CONTEXTS.get(disaster_type, [])
    has_context = any(keyword.lower() in text for keyword in context_keywords)
    
    # Check for disaster indicators
    has_indicator = any(indicator.lower() in text for indicator in DISASTER_INDICATORS)
    
    # Check for exclusion terms
    has_exclusion = any(term.lower() in text for term in EXCLUDE_TERMS)
    
    return (has_context or has_indicator) and not has_exclusion

@router.get("/headlines")
async def get_disaster_news(
    page_size: Optional[int] = Query(20, description="number of results to return", le=100),
) -> Dict[str, Any]:
    """Get processed disaster-related news headlines"""
    
    if not NEWS_API_KEY:
        raise HTTPException(
            status_code=500,
            detail="API key not configured properly"
        )

    try:
        start_time = time.time()
        logger.info("Starting disaster news fetch")

        # Base parameters for all requests
        base_params = {
            "apiKey": NEWS_API_KEY,
            "from": (datetime.now() - timedelta(days=2)).strftime("%Y-%m-%d"),
            "to": datetime.now().strftime("%Y-%m-%d"),
            "language": "en",
            "pageSize": page_size,
            "sortBy": "relevancy"
        }

        # Fetch all disaster news in parallel
        async with httpx.AsyncClient(timeout=30.0, limits=httpx.Limits(max_keepalive_connections=20)) as client:
            tasks = [
                fetch_disaster_news(client, keyword, context_terms, base_params)
                for keyword, context_terms in DISASTER_CONTEXTS.items()
            ]
            results = await asyncio.gather(*tasks)

        # Combine and process all articles
        all_articles = [article for sublist in results for article in sublist if article]
        
        logger.info(f"Total articles collected: {len(all_articles)}")
        
        # Convert to DataFrame for processing
        logger.info("Converting to DataFrame and cleaning data")
        df = pd.DataFrame(all_articles)
        
        # Clean and filter data
        if not df.empty:
            # Remove duplicates
            initial_len = len(df)
            df = df.drop_duplicates(subset=["title"])
            logger.info(f"Removed {initial_len - len(df)} duplicate articles")
            
            # Sort by date and relevance score
            df["publishedAt"] = pd.to_datetime(df["publishedAt"])
            df = df.sort_values(["publishedAt"], ascending=[False])
            
            # Convert back to list of dictionaries
            processed_articles = df.to_dict(orient="records")
            logger.info(f"Final number of processed articles: {len(processed_articles)}")
        else:
            logger.warning("No articles found after processing")
            processed_articles = []
            
        logger.info("Returning processed articles")
        return {
            "status": "ok",
            "totalResults": len(processed_articles),
            "articles": processed_articles[:page_size]
        }
            
    except httpx.RequestError as e:
        logger.error(f"Request error: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch news: {str(e)}")
    except Exception as e:
        logger.error(f"Unexpected error: {e}", exc_info=True)  # Added exc_info for full traceback
        raise HTTPException(status_code=500, detail=str(e))