from fastapi import FastAPI
from app.routers.volunteer import router as volunteer_router

app = FastAPI()

# Register the volunteer router
app.include_router(volunteer_router, prefix="/api", tags=["Volunteer Programs"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the Volunteer Program API"}
