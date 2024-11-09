from fastapi import APIRouter, HTTPException
from app.schemas.volunteerschemas import (
    VolunteerProgramCreate,
    VolunteerProgramResponse,
    VolunteerParticipationCreate,
    VolunteerParticipationResponse,
    VolunteerMemberCreate,
    VolunteerMemberResponse
)
from app.firebase_config import db
import uuid
from datetime import datetime
from typing import List
import logging

router = APIRouter()
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# CRUD Operations
def create_volunteer_program(program: VolunteerProgramCreate):
    try:
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

@router.get("/programs/{program_id}", response_model=VolunteerProgramResponse)
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