from fastapi import APIRouter, Query, HTTPException
from gdacs.api import GDACSAPIReader
from typing import Any, Optional
import logging
from fastapi import Query, HTTPException

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/gdacs", tags=["GDACS"])

@router.get("/events")
async def get_events(
    limit: Optional[int] = Query(None, description="Limit the number of events returned"),
    event_type: Optional[str] = Query(None, description="Filter by event type (e.g., TC, FL, EQ)")
) -> Any:
    """Get latest GDACS events"""
    try:
        client = GDACSAPIReader()
        events = client.latest_events(event_type=event_type) if event_type else client.latest_events()
        return events[:limit] if limit else events
    except Exception as e:
        logger.error(f"Error fetching GDACS events: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/events/{event_type}/{event_id}")
async def get_event_by_id(event_type: str, event_id: str) -> Any:
    """Get a specific GDACS event"""
    try:
        client = GDACSAPIReader()
        event = client.get_event(event_type=event_type, event_id=event_id)
        if not event:
            raise HTTPException(status_code=404, detail="Event not found")
        return event
    except Exception as e:
        logger.error(f"Error fetching GDACS event: {e}")
        raise HTTPException(status_code=500, detail=str(e))