from fastapi import APIRouter
from typing import Optional
from newsapi import NewsApiClient
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from app.routers import article
from fastapi import APIRouter, HTTPException, Query, Depends
from typing import List, Optional, Dict
from datetime import datetime, timedelta
from newsapi import NewsApiClient
import logging
from pydantic import BaseModel, Field
import pandas as pd
from functools import lru_cache
from app.config import Settings, get_settings

# Initialize News API client with your API key
newsapi = NewsApiClient(api_key='5201c41ca96447e3b51f658a596def79')

# Create an APIRouter instance
router = APIRouter()

# Pydantic models for structured responses
class ArticleResponse(BaseModel):
    status: str
    totalResults: int
    articles: list

class SourcesResponse(BaseModel):
    status: str
    sources: list

@router.get("/top-headlines", response_model=ArticleResponse)
async def get_top_headlines(q: Optional[str] = 'disaster', country: Optional[str] = 'us', language: Optional[str] = 'en'):
    """
    Fetch top headlines based on query parameters
    - q: query term (default is 'bitcoin')
    - country: country code (default is 'us')
    - language: language code (default is 'en')
    """
    top_headlines = newsapi.get_top_headlines(q=q, country=country, language=language)
    return top_headlines

@router.get("/everything", response_model=ArticleResponse)
async def get_everything(q: Optional[str] = 'bitcoin', from_param: Optional[str] = '2017-12-01', 
                          to: Optional[str] = '2017-12-12', language: Optional[str] = 'en', 
                          sort_by: Optional[str] = 'relevancy', page: Optional[int] = 1):
    """
    Fetch detailed articles with filtering options
    - q: query term (default is 'bitcoin')
    - from_param: start date (default '2017-12-01')
    - to: end date (default '2017-12-12')
    - language: language code (default 'en')
    - sort_by: sorting method (default 'relevancy')
    - page: page number for pagination (default is 1)
    """
    all_articles = newsapi.get_everything(q=q, from_param=from_param, to=to, language=language,
                                          sort_by=sort_by, page=page)
    return all_articles

@router.get("/sources", response_model=SourcesResponse)
async def get_sources():
    """
    Get all available news sources
    """
    sources = newsapi.get_sources()
    return sources


class ArticleBase(BaseModel):
    title: str
    description: Optional[str] = Field(None, description="Article description")
    url: str
    source: str
    published_at: datetime
    disaster_type: str

class ArticleResponse(ArticleBase):
    processed_at: datetime

class DisasterSummary(BaseModel):
    disaster_type: str
    article_count: int
    unique_sources: int
    earliest_article: datetime
    latest_article: datetime

class ErrorResponse(BaseModel):
    detail: str

# Initialize logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Constants
DISASTER_KEYWORDS = {
    'earthquake': ['earthquake', 'seismic'],
    'flood': ['flood', 'flooding'],
    'tsunami': ['tsunami'],
    'hurricane': ['hurricane', 'tropical storm'],
    'wildfire': ['wildfire', 'forest fire', 'bushfire'],
    'tornado': ['tornado'],
    'cyclone': ['cyclone']
}

# Cache newsapi client
@lru_cache()
def get_newsapi_client(settings: Settings = Depends(get_settings)) -> NewsApiClient:
    return NewsApiClient(api_key=settings.NEWSAPI_KEY)

@router.get(
    "/articles/",
    response_model=List[ArticleResponse],
    responses={
        200: {"description": "Successfully retrieved articles"},
        500: {"model": ErrorResponse}
    }
)
async def get_disaster_articles(
    days: int = Query(2, ge=1, le=7, description="Number of days to look back"),
    disaster_type: Optional[str] = Query(
        None,
        description="Specific disaster type to filter by"
    ),
    language: str = Query("en", description="Article language"),
    newsapi: NewsApiClient = Depends(get_newsapi_client)
) -> List[ArticleResponse]:
    """
    Fetch disaster-related news articles from the past specified days.
    """
    try:
        all_articles = []
        keywords_to_search = (
            DISASTER_KEYWORDS.get(disaster_type, [disaster_type])
            if disaster_type
            else [kw for kws in DISASTER_KEYWORDS.values() for kw in kws]
        )
        
        two_days_ago = datetime.now() - timedelta(days=days)
        
        for keyword in keywords_to_search:
            logger.info(f"Fetching articles for keyword: {keyword}")
            
            response = newsapi.get_everything(
                q=keyword,
                from_param=two_days_ago.strftime('%Y-%m-%d'),
                to=datetime.now().strftime('%Y-%m-%d'),
                language=language,
                sort_by='relevancy'
            )
            
            if response['status'] == 'ok':
                # Process articles
                for article in response['articles']:
                    processed_article = {
                        'title': article.get('title', 'Unknown'),
                        'description': article.get('description'),
                        'url': article.get('url', ''),
                        'source': article.get('source', {}).get('name', 'Unknown'),
                        'published_at': article.get('publishedAt'),
                        'disaster_type': (
                            disaster_type or
                            next(
                                (dt for dt, kws in DISASTER_KEYWORDS.items()
                                 if any(k in article['title'].lower() for k in kws)),
                                'unknown'
                            )
                        ),
                        'processed_at': datetime.now()
                    }
                    all_articles.append(processed_article)
            else:
                logger.error(f"API error for {keyword}: {response.get('message')}")
        
        return all_articles
    
    except Exception as e:
        logger.error(f"Error fetching articles: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Error fetching articles: {str(e)}"
        )

@router.get(
    "/articles/summary",
    response_model=List[DisasterSummary],
    responses={
        200: {"description": "Successfully retrieved disaster summary"},
        500: {"model": ErrorResponse}
    }
)
async def get_disaster_summary(
    days: int = Query(2, ge=1, le=7),
    newsapi: NewsApiClient = Depends(get_newsapi_client)
) -> List[DisasterSummary]:
    """
    Get a summary of disaster news articles grouped by disaster type.
    """
    try:
        # Fetch articles using the existing endpoint
        articles = await get_disaster_articles(days=days, newsapi=newsapi)
        
        # Convert to DataFrame for analysis
        df = pd.DataFrame(articles)
        
        if df.empty:
            return []
        
        # Group by disaster type and calculate statistics
        summary = df.groupby('disaster_type').agg({
            'title': 'count',
            'source': lambda x: len(set(x)),
            'published_at': ['min', 'max']
        }).reset_index()
        
        # Flatten column names
        summary.columns = ['disaster_type', 'article_count', 'unique_sources',
                         'earliest_article', 'latest_article']
        
        return summary.to_dict('records')
    
    except Exception as e:
        logger.error(f"Error generating summary: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Error generating summary: {str(e)}"
        )

