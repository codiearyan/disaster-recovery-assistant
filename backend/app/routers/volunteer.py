from fastapi import APIRouter, HTTPException # type: ignore
from pydantic import BaseModel
from app.schemas.volunteerschemas import (
    VolunteerProgramCreate,
    VolunteerProgramResponse,
    VolunteerParticipationCreate,
    VolunteerParticipationResponse,
    VolunteerMemberCreate,
    VolunteerMemberResponse,
    SubscriptionCreate,
    VolunteerAuth
)
from app.firebase_config import db
import uuid
from datetime import datetime
from typing import List
import logging
import pycountry # type: ignore
from app.config.email_config import send_disaster_alert

router = APIRouter()
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# CRUD Operations
def create_volunteer_program(program: VolunteerProgramCreate):
    try:
        # Check if volunteer exists
        if not check_volunteer_exists(program.email):
            raise HTTPException(
                status_code=401, 
                detail="Please register as a volunteer before creating a program"
            )
        
        # Log the incoming data
        logger.info(f"Attempting to create program with data: {program.model_dump()}")
        
        program_id = str(uuid.uuid4())
        program_data = program.model_dump()
        
        # Validate required fields
        required_fields = ['title', 'description', 'created_by', 'email', 
                         'phone_number', 'disaster_type', 'event_date']
        for field in required_fields:
            if field not in program_data or not program_data[field]:
                raise ValueError(f"Missing required field: {field}")
        
        # Convert datetime to string for Firestore
        if isinstance(program_data["event_date"], datetime):
            program_data["event_date"] = program_data["event_date"].isoformat()
            
        program_data["id"] = program_id
        program_data["created_at"] = datetime.utcnow().isoformat()
        
        # Log before saving to Firestore
        logger.info(f"Saving program data to Firestore: {program_data}")
        
        db.collection("volunteer_programs").document(program_id).set(program_data)
        return program_data
    except ValueError as ve:
        logger.error(f"Validation error: {str(ve)}")
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        logger.error(f"Unexpected error in create_volunteer_program: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# def list_volunteer_programs():
#     try:
#         programs = db.collection("volunteer_programs").stream()
#         return [program.to_dict() for program in programs]
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

def list_volunteer_programs():
    try:
        programs_ref = db.collection("volunteer_programs")
        programs = programs_ref.stream()
        programs_list = []
        for program in programs:
            program_data = program.to_dict()
            # Ensure the data has all required fields
            if "id" not in program_data:
                program_data["id"] = program.id
            programs_list.append(program_data)
        return programs_list
    except Exception as e:
        print(f"Error fetching programs: {e}")
        return []

def join_volunteer_program(participation: VolunteerParticipationCreate):
    try:
        program_ref = db.collection("volunteer_programs").document(participation.program_id).get()
        if not program_ref.exists:
            raise HTTPException(status_code=404, detail="Program not found")
        
        participation_id = str(uuid.uuid4())
        participation_data = participation.model_dump()
        participation_data["id"] = participation_id
        db.collection("participations").document(participation_id).set(participation_data)
        return participation_data
    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Add these new functions to your existing CRUD operations
def add_program_member(member: VolunteerMemberCreate):
    try:
        logger.info(f"Attempting to add member with data: {member.model_dump()}")
        
        # Check if the program exists
        program_ref = db.collection("volunteer_programs").document(member.program_id).get()
        if not program_ref.exists:
            raise HTTPException(status_code=404, detail="Volunteer program not found")
        
        # Generate unique ID for the member
        member_id = str(uuid.uuid4())
        member_data = member.model_dump()
        
        # Validate required fields
        required_fields = ['name', 'email', 'phone_number', 'age', 'skills', 'availability']
        for field in required_fields:
            if field not in member_data or not member_data[field]:
                raise ValueError(f"Missing required field: {field}")
        
        # Add additional fields
        member_data["id"] = member_id
        member_data["created_at"] = datetime.utcnow().isoformat()
        
        logger.info(f"Saving member data to Firestore: {member_data}")
        
        # Store in a subcollection of the program
        db.collection("volunteer_programs")\
          .document(member.program_id)\
          .collection("members")\
          .document(member_id)\
          .set(member_data)
        
        return member_data
    except ValueError as ve:
        logger.error(f"Validation error: {str(ve)}")
        raise HTTPException(status_code=400, detail=str(ve))
    except HTTPException as he:
        raise he
    except Exception as e:
        logger.error(f"Error adding member: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Add this new function with your existing CRUD operations
def get_program_by_id(program_id: str):
    try:
        program_ref = db.collection("volunteer_programs").document(program_id).get()
        if not program_ref.exists:
            raise HTTPException(status_code=404, detail="Program not found")
        
        program_data = program_ref.to_dict()
        if "id" not in program_data:
            program_data["id"] = program_ref.id
            
        logger.info(f"Program fetched: {program_data}")
        return program_data
    except HTTPException as he:
        raise he
    except Exception as e:
        logger.error(f"Error fetching program: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

# Add this new function with your existing CRUD operations
def delete_program_by_id(program_id: str):
    try:
        # Check if program exists
        program_ref = db.collection("volunteer_programs").document(program_id).get()
        if not program_ref.exists:
            raise HTTPException(status_code=404, detail="Program not found")
        
        # Delete all members in the subcollection first
        members_ref = db.collection("volunteer_programs")\
                       .document(program_id)\
                       .collection("members")\
                       .stream()
        
        # Delete each member document
        for member in members_ref:
            member.reference.delete()
        
        # Delete the program document
        db.collection("volunteer_programs").document(program_id).delete()
        
        logger.info(f"Program with ID {program_id} deleted successfully")
        return {"message": f"Program with ID {program_id} deleted successfully"}
    except HTTPException as he:
        raise he
    except Exception as e:
        logger.error(f"Error deleting program: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

# Add this new function with your existing CRUD operations
def update_program_by_id(program_id: str, program_update: VolunteerProgramCreate):
    try:
        # Log the attempt
        logger.info(f"Attempting to update program with ID: {program_id}")
        
        # Check if program exists
        program_ref = db.collection("volunteer_programs").document(program_id).get()
        if not program_ref.exists:
            logger.error(f"Program with ID {program_id} not found")
            raise HTTPException(
                status_code=404, 
                detail=f"Program with ID {program_id} not found in database"
            )
        
        # Get existing program data
        existing_program = program_ref.to_dict()
        logger.info(f"Found existing program: {existing_program}")
        
        # Prepare update data
        update_data = program_update.model_dump()
        
        # Convert datetime to string for Firestore
        if isinstance(update_data["event_date"], datetime):
            update_data["event_date"] = update_data["event_date"].isoformat()
        
        # Preserve the original id and created_at
        update_data["id"] = program_id
        update_data["created_at"] = existing_program.get("created_at")
        
        logger.info(f"Updating program with data: {update_data}")
        
        # Update the program document
        db.collection("volunteer_programs").document(program_id).set(update_data)
        
        return update_data
    except HTTPException as he:
        raise he
    except Exception as e:
        logger.error(f"Error updating program: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Route Handlers
@router.post("/programs", response_model=VolunteerProgramResponse)
async def create_program(program: VolunteerProgramCreate):
    try:
        logger.info("Received request to create program")
        result = create_volunteer_program(program)
        logger.info(f"Program created successfully: {result}")
        return result
    except HTTPException as he:
        logger.error(f"HTTP Exception in create_program: {he.detail}")
        raise he
    except Exception as e:
        logger.error(f"Unexpected error in create_program endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/programs", response_model=List[VolunteerProgramResponse])
async def get_programs():
    try:
        programs = list_volunteer_programs()
        logging.info(f"Programs fetched: {programs}")
        if not programs:
            return []
        return programs
    except Exception as e:
        logging.error(f"Error in get_programs: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

@router.post("/programs/join", response_model=VolunteerParticipationResponse)
async def join_program(participation: VolunteerParticipationCreate):
    try:
        result = join_volunteer_program(participation)
        logging.info(f"Participation created: {result}")
        return result
    except Exception as e:
        logging.error(f"Error in join_program: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

@router.post("/programs/{program_id}/members", response_model=VolunteerMemberResponse)
async def add_member(program_id: str, member: VolunteerMemberCreate):
    try:
        # Ensure the program_id in the path matches the one in the request body
        if program_id != member.program_id:
            raise HTTPException(
                status_code=400,
                detail="Program ID in path does not match program ID in request body"
            )
        
        logger.info(f"Adding new member to program {program_id}")
        result = add_program_member(member)
        logger.info(f"Member added successfully: {result}")
        return result
    except HTTPException as he:
        logger.error(f"HTTP Exception in add_member: {he.detail}")
        raise he
    except Exception as e:
        logger.error(f"Unexpected error in add_member endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/programs/{program_id}/members", response_model=List[VolunteerMemberResponse])
async def list_program_members(program_id: str):
    try:
        # Check if program exists
        program_ref = db.collection("volunteer_programs").document(program_id).get()
        if not program_ref.exists:
            raise HTTPException(status_code=404, detail="Volunteer program not found")
        
        # Get all members
        members_ref = db.collection("volunteer_programs")\
                       .document(program_id)\
                       .collection("members")\
                       .stream()
        
        members_list = [member.to_dict() for member in members_ref]
        return members_list
    except HTTPException as he:
        raise he
    except Exception as e:
        logger.error(f"Error listing members: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

@router.get("/programs/{program_id}/get", response_model=VolunteerProgramResponse)
async def get_program(program_id: str):
    try:
        logger.info(f"Fetching program with ID: {program_id}")
        result = get_program_by_id(program_id)
        return result
    except HTTPException as he:
        logger.error(f"HTTP Exception in get_program: {he.detail}")
        raise he
    except Exception as e:
        logger.error(f"Unexpected error in get_program endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

@router.put("/programs/{program_id}/update", response_model=VolunteerProgramResponse)
async def update_program(program_id: str, program: VolunteerProgramCreate):
    try:
        # First verify program exists
        program_ref = db.collection("volunteer_programs").document(program_id).get()
        if not program_ref.exists:
            raise HTTPException(
                status_code=404,
                detail=f"Program with ID {program_id} not found"
            )
            
        logger.info(f"Received update request for program ID: {program_id}")
        logger.info(f"Update data: {program.model_dump()}")
        
        result = update_program_by_id(program_id, program)
        logger.info(f"Program updated successfully: {result}")
        return result
    except HTTPException as he:
        logger.error(f"HTTP Exception in update_program: {he.detail}")
        raise he
    except Exception as e:
        logger.error(f"Unexpected error in update_program endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/programs/{program_id}/delete")
async def delete_program(program_id: str):
    try:
        logger.info(f"Attempting to delete program with ID: {program_id}")
        result = delete_program_by_id(program_id)
        return result
    except HTTPException as he:
        logger.error(f"HTTP Exception in delete_program: {he.detail}")
        raise he
    except Exception as e:
        logger.error(f"Unexpected error in delete_program endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

def delete_program_member(program_id: str, member_id: str):
    try:
        logger.info(f"Checking program existence for ID: {program_id}")
        # Check if program exists
        program_ref = db.collection("volunteer_programs").document(program_id).get()
        if not program_ref.exists:
            logger.error(f"Program with ID {program_id} not found")
            raise HTTPException(status_code=404, detail=f"Program with ID {program_id} not found")
            
        logger.info(f"Checking member existence for ID: {member_id}")
        # Check if member exists
        member_ref = db.collection("volunteer_programs")\
                      .document(program_id)\
                      .collection("members")\
                      .document(member_id)
                      
        member = member_ref.get()
        if not member.exists:
            logger.error(f"Member with ID {member_id} not found in program {program_id}")
            raise HTTPException(status_code=404, detail=f"Member with ID {member_id} not found")
            
        # Delete the member
        member_ref.delete()
        
        logger.info(f"Member {member_id} successfully deleted from program {program_id}")
        return {"message": f"Member successfully deleted"}
    except HTTPException as he:
        raise he
    except Exception as e:
        logger.error(f"Error deleting member: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

@router.delete("/programs/{program_id}/members/{member_id}")
async def delete_member(program_id: str, member_id: str):
    try:
        logger.info(f"Received delete request for member {member_id} in program {program_id}")
        result = delete_program_member(program_id, member_id)
        return result
    except HTTPException as he:
        logger.error(f"HTTP Exception in delete_member: {he.detail}")
        raise he
    except Exception as e:
        logger.error(f"Unexpected error in delete_member endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

class CountryResponse(BaseModel):
    name: str

@router.get("/countries", response_model=List[CountryResponse])
async def get_countries():
    """
    Get list of all country names using pycountry
    """
    try:
        logger.info("Fetching list of countries")
        countries = [{"name": country.name} for country in pycountry.countries]
        # Sort countries alphabetically
        countries.sort(key=lambda x: x["name"])
        return countries
    except Exception as e:
        logger.error(f"Error fetching countries: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

@router.get("/countries/search")
async def search_countries(query: str = ""):
    """
    Search countries by name
    """
    try:
        logger.info(f"Searching countries with query: {query}")
        if not query:
            countries = [{"name": country.name} for country in pycountry.countries]
            countries.sort(key=lambda x: x["name"])
            return countries
        
        # Filter countries based on search query
        filtered_countries = [
            {"name": country.name}
            for country in pycountry.countries
            if query.lower() in country.name.lower()
        ]
        filtered_countries.sort(key=lambda x: x["name"])
        return filtered_countries
    except Exception as e:
        logger.error(f"Error searching countries: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

# Add this function with your existing CRUD operations
def create_subscription(subscription: SubscriptionCreate):
    try:
        logger.info(f"Creating subscription with data: {subscription.model_dump()}")
        
        subscription_id = str(uuid.uuid4())
        subscription_data = subscription.model_dump()
        
        # Add additional fields
        subscription_data["id"] = subscription_id
        subscription_data["created_at"] = datetime.utcnow().isoformat()
        
        # Store in Firestore
        db.collection("subscriptions").document(subscription_id).set(subscription_data)
        
        return subscription_data
    except Exception as e:
        logger.error(f"Error creating subscription: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Update the subscribe endpoint
@router.post("/subscribe", response_model=dict)
async def subscribe(subscription: SubscriptionCreate):
    try:
        logger.info("Received subscription request")
        result = create_subscription(subscription)
        return {
            "message": "Subscription created successfully",
            "data": result
        }
    except HTTPException as he:
        logger.error(f"HTTP Exception in subscribe: {he.detail}")
        raise he
    except Exception as e:
        logger.error(f"Unexpected error in subscribe endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

def check_volunteer_exists(email: str) -> bool:
    try:
        volunteer_ref = db.collection("volunteers").where("email", "==", email).limit(1).stream()
        return any(volunteer.exists for volunteer in volunteer_ref)
    except Exception as e:
        logger.error(f"Error checking volunteer existence: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

def register_volunteer(volunteer: VolunteerAuth):
    try:
        if check_volunteer_exists(volunteer.email):
            raise HTTPException(status_code=400, detail="Volunteer already exists")
        
        volunteer_id = str(uuid.uuid4())
        volunteer_data = volunteer.model_dump()
        volunteer_data["id"] = volunteer_id
        volunteer_data["created_at"] = datetime.utcnow().isoformat()
        
        db.collection("volunteers").document(volunteer_id).set(volunteer_data)
        return volunteer_data
    except HTTPException as he:
        raise he
    except Exception as e:
        logger.error(f"Error registering volunteer: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/volunteers/register", response_model=dict)
async def register_new_volunteer(volunteer: VolunteerAuth):
    try:
        result = register_volunteer(volunteer)
        return {
            "message": "Volunteer registered successfully",
            "data": result
        }
    except HTTPException as he:
        logger.error(f"HTTP Exception in register_volunteer: {he.detail}")
        raise he
    except Exception as e:
        logger.error(f"Unexpected error in register_volunteer endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/volunteers/check/{email}")
async def check_volunteer(email: str):
    try:
        exists = check_volunteer_exists(email)
        return {
            "exists": exists,
            "message": "Volunteer found" if exists else "Volunteer not found"
        }
    except Exception as e:
        logger.error(f"Error checking volunteer: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

async def notify_subscribers_of_disaster(disaster_info: dict):
    try:
        # Get all subscribers
        subscribers_ref = db.collection("subscriptions").stream()
        subscribers = [doc.to_dict() for doc in subscribers_ref]
        
        # Filter subscribers based on location and disaster type preferences
        relevant_subscribers = [
            sub for sub in subscribers
            if (disaster_info['disaster_type'] in sub['disaster_events'] and
                (sub['location_type'] == "Countries" and disaster_info['location'] == sub['location']) or
                sub['location_type'] == "Your Location")
        ]
        
        if relevant_subscribers:
            await send_disaster_alert(relevant_subscribers, disaster_info)
            
        return {"message": f"Alert sent to {len(relevant_subscribers)} subscribers"}
    except Exception as e:
        logger.error(f"Error sending disaster alerts: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/disaster-alert")
async def create_disaster_alert(disaster_info: dict):
    try:
        result = await notify_subscribers_of_disaster(disaster_info)
        return result
    except Exception as e:
        logger.error(f"Error in disaster alert endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))