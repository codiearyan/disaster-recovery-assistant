from fastapi import APIRouter, Query, HTTPException
from gdacs.api import GDACSAPIReader
from typing import Any, Optional, Dict, List
import logging
import httpx

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/gdacs", tags=["GDACS"])

@router.get("/events")
async def get_events(
    limit: Optional[int] = Query(None, description="Limit the number of events returned"),
    event_type: Optional[str] = Query(None, description="Filter by event type (e.g., TC, FL, EQ)")
) -> List[Dict[str, Any]]:
    """Get latest GDACS events with filtered fields"""
    try:
        client = GDACSAPIReader()
        response = client.latest_events(event_type=event_type) if event_type else client.latest_events()
        
        # Debug logs
        logger.info(f"Raw response type: {type(response)}")
        logger.info(f"Raw response: {response}")
        
        # Convert response to dict if it's not already
        if not isinstance(response, dict):
            response = response.__dict__ if hasattr(response, '__dict__') else {}
        
        logger.info(f"Processed response: {response}")
        
        filtered_events = []
        features = response.get("features", [])
        
        logger.info(f"Number of features found: {len(features)}")
        
        for feature in features:
            logger.info(f"Processing feature: {feature}")
            properties = feature.get("properties", {})
            logger.info(f"Properties: {properties}")
            
            filtered_event = {
                "eventid": properties.get("eventid"),
                "episodeid": properties.get("episodeid"),
                "eventtype": properties.get("eventtype"),
                "name": properties.get("name"),
                "htmldescription": properties.get("htmldescription"),
                "icon": properties.get("icon"),
                "url": properties.get("url"),
                "alertlevel": properties.get("alertlevel"),
                "iscurrent": properties.get("iscurrent"),
                "country": properties.get("country"),
                "fromdate": properties.get("fromdate"),
                "todate": properties.get("todate"),
                "affectedcountries": properties.get("affectedcountries", []),
                "severitydata": properties.get("severitydata")
            }
            
            logger.info(f"Filtered event: {filtered_event}")
            filtered_events.append(filtered_event)
        
        if limit:
            return filtered_events[:limit]
        return filtered_events
        
    except Exception as e:
        logger.error(f"Error fetching GDACS events: {e}")
        logger.exception("Full traceback:")
        raise HTTPException(status_code=500, detail=str(e))
    
@router.get("/getgeometry")
async def get_geometry(
    eventtype: str = Query(..., description="Event type (e.g., EQ, TC)"),
    eventid: int = Query(..., description="Event ID"),
    episodeid: int = Query(..., description="Episode ID")
) -> Dict[str, Any]:
    """Get geometry coordinates for a specific event"""
    try:
        # Construct the geometry URL
        geometry_url = (
            f"https://www.gdacs.org/gdacsapi/api/polygons/getgeometry"
            f"?eventtype={eventtype}&eventid={eventid}&episodeid={episodeid}"
        )
        
        async with httpx.AsyncClient() as client:
            response = await client.get(geometry_url)
            response.raise_for_status()
            data = response.json()
            
            # Find the Polygon feature
            for feature in data.get("features", []):
                geometry = feature.get("geometry", {})
                if geometry.get("type") == "Polygon":
                    return {
                        "geometry": {
                            "type": "Polygon",
                            "coordinates": geometry.get("coordinates", [])
                        }
                    }
            
            # If no polygon found, return empty coordinates
            return {
                "geometry": {
                    "type": "Polygon",
                    "coordinates": []
                }
            }
            
    except Exception as e:
        logger.error(f"Error fetching geometry: {e}")
        raise HTTPException(status_code=500, detail=str(e))