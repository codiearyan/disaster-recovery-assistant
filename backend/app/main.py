from fastapi import FastAPI
from app.routers import volunteer
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict
from fastapi.middleware.cors import CORSMiddleware
from .routers import gdacs
from .routers import news
import logging
from pathlib import Path
from dotenv import load_dotenv
import os

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],  # Make sure PUT is allowed
    allow_headers=["*"],
)

logger = logging.getLogger(__name__)
# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

# Get the base directory and load .env
BASE_DIR = Path(__file__).resolve().parent.parent

env_path = BASE_DIR / ".env"
load_dotenv(env_path)

app.include_router(volunteer.router, prefix="/api")
app.include_router(gdacs.router)
app.include_router(news.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Volunteer Program API"}
