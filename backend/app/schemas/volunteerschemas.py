from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime

# Schema for creating a volunteer program
class VolunteerProgramBase(BaseModel):
    title: str
    description: str
    created_by: str
    email: EmailStr
    phone_number: str
    disaster_type: str
    event_date: datetime

class VolunteerProgramCreate(VolunteerProgramBase):
    pass

# Response schema for a volunteer program
class VolunteerProgramResponse(VolunteerProgramBase):
    id: str

    class Config:
        from_attributes = True

# Schema for creating a volunteer participation
class VolunteerParticipationBase(BaseModel):
    program_id: str
    volunteer_name: str

class VolunteerParticipationCreate(VolunteerParticipationBase):
    pass

# Response schema for volunteer participation
class VolunteerParticipationResponse(VolunteerParticipationBase):
    id: str

    class Config:
        from_attributes = True

# Add these new schemas to your existing file

class VolunteerMemberBase(BaseModel):
    program_id: str
    name: str
    email: EmailStr
    phone_number: str
    age: int
    skills: str
    availability: str  # e.g., "Full-time", "Weekends", etc.

class VolunteerMemberCreate(VolunteerMemberBase):
    pass

class VolunteerMemberResponse(VolunteerMemberBase):
    id: str
    created_at: str

    class Config:
        from_attributes = True

class SubscriptionCreate(BaseModel):
    name: str
    email: EmailStr
    phone_number: str
    disaster_events: str
    location_type: str  # "Your Location" or "Countries"
    location: str  # Actual location value
