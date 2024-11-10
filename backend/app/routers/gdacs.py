from fastapi import APIRouter, Query, HTTPException
from typing import List, Dict, Any, Optional
import httpx
import asyncio
from functools import lru_cache
from datetime import datetime, timedelta
import logging
import xml.etree.ElementTree as ET

router = APIRouter(
    prefix="/gdacs",
    responses={404: {"description": "Not found"}},
)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class GDACSAPIReader:
    """Custom GDACS API Reader"""
    def __init__(self):
        # Using the full RSS feed URL
        self.rss_url = "https://www.gdacs.org/xml/rss_7d.xml"  # Changed to 7 days feed

    async def latest_events(self, event_type: Optional[str] = None) -> dict:
        """Fetch latest events from GDACS RSS feed"""
        async with httpx.AsyncClient(timeout=30.0) as client:  # Increased timeout
            try:
                logger.info(f"Fetching data from {self.rss_url}")
                response = await client.get(
                    self.rss_url,
                    headers={
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                        "Accept": "application/xml",
                    }
                )
                response.raise_for_status()
                
                # Log response status and content length
                logger.info(f"Response status: {response.status_code}")
                logger.info(f"Response content length: {len(response.text)}")
                
                # Parse XML
                root = ET.fromstring(response.text)
                features = []
                
                # Log the XML structure
                logger.info(f"XML root tag: {root.tag}")
                logger.info(f"Number of items found: {len(root.findall('.//item'))}")
                
                # Find all item elements
                for item in root.findall(".//item"):
                    try:
                        # Extract event type from title
                        title = item.find("title")
                        title_text = title.text if title is not None else ""
                        current_event_type = title_text.split(" ")[0] if title_text else ""
                        
                        logger.info(f"Processing event: {title_text}")
                        
                        # Filter by event type if specified
                        if event_type and current_event_type.lower() != event_type.lower():
                            continue
                        
                        # Get coordinates from georss:point
                        geo_point = item.find(".//{http://www.georss.org/georss}point")
                        if geo_point is not None and geo_point.text:
                            lat_lon = geo_point.text.split()
                            logger.info(f"Found coordinates: {lat_lon}")
                        else:
                            lat_lon = ["0", "0"]
                            logger.warning(f"No coordinates found for event: {title_text}")
                        
                        # Create feature object
                        feature = {
                            "properties": {
                                "eventid": item.find("guid").text if item.find("guid") is not None else "",
                                "eventtype": current_event_type,
                                "name": title_text,
                                "htmldescription": item.find("description").text if item.find("description") is not None else "",
                                "url": item.find("link").text if item.find("link") is not None else "",
                                "alertlevel": "",  # Simplified for now
                                "country": "",     # Simplified for now
                                "fromdate": item.find("pubDate").text if item.find("pubDate") is not None else "",
                                "coordinates": {
                                    "lat": float(lat_lon[0]),
                                    "lon": float(lat_lon[1])
                                }
                            }
                        }
                        features.append(feature)
                        logger.info(f"Added feature: {feature['properties']['name']}")
                    
                    except Exception as item_error:
                        logger.error(f"Error processing item: {item_error}")
                        continue
                
                logger.info(f"Total features processed: {len(features)}")
                return {"features": features}
                
            except Exception as e:
                logger.error(f"Error fetching events from GDACS RSS: {e}")
                if 'response' in locals():
                    logger.error(f"Response content: {response.text[:500]}...")  # Log first 500 chars of response
                return {"features": []}

@router.get("/events")
async def get_events(
    limit: Optional[int] = Query(None, description="Limit the number of events returned"),
    event_type: Optional[str] = Query(None, description="Filter by event type (e.g., TC, FL, EQ)"),
    include_geometry: bool = Query(True, description="Include geometry data in response")
) -> List[Dict[str, Any]]:
    """Get latest GDACS events"""
    try:
        logger.info(f"Received request with params: limit={limit}, event_type={event_type}")
        client = GDACSAPIReader()
        response = await client.latest_events(event_type=event_type)
        
        features = response.get("features", [])
        logger.info(f"Got {len(features)} features from RSS feed")
        
        if limit:
            features = features[:limit]

        filtered_events = []
        
        for feature in features:
            properties = feature.get("properties", {})
            filtered_event = {
                "eventid": properties.get("eventid"),
                "eventtype": properties.get("eventtype"),
                "name": properties.get("name"),
                "htmldescription": properties.get("htmldescription"),
                "url": properties.get("url"),
                "alertlevel": properties.get("alertlevel"),
                "country": properties.get("country"),
                "fromdate": properties.get("fromdate"),
                "coordinates": properties.get("coordinates", {"lat": 0, "lon": 0}),
            }
            
            if include_geometry:
                lon = properties.get("coordinates", {}).get("lon", 0)
                lat = properties.get("coordinates", {}).get("lat", 0)
                filtered_event["geometry"] = {
                    "type": "Polygon",
                    "coordinates": [[
                        [lon - 0.5, lat - 0.5],
                        [lon + 0.5, lat - 0.5],
                        [lon + 0.5, lat + 0.5],
                        [lon - 0.5, lat + 0.5],
                        [lon - 0.5, lat - 0.5]
                    ]]
                }
            
            filtered_events.append(filtered_event)

        logger.info(f"Returning {len(filtered_events)} filtered events")
        return filtered_events
        
    except Exception as e:
        logger.error(f"Error fetching GDACS events: {e}")
        logger.exception("Full traceback:")
        raise HTTPException(status_code=500, detail=str(e))