from fastapi import FastAPI
from app.routers import volunteer
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],  # Make sure PUT is allowed
    allow_headers=["*"],
)

# Include the router with a prefix
app.include_router(volunteer.router, prefix="/api")

@app.get("/")
def read_root():
    return {"message": "Welcome to the Volunteer Program API"}
