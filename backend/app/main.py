from fastapi import FastAPI
from typing import Dict
from fastapi.middleware.cors import CORSMiddleware
from .routers import gdacs
from .routers import news
import logging
from pathlib import Path
from dotenv import load_dotenv
import os

app = FastAPI()

logger = logging.getLogger(__name__)
# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

# Get the base directory and load .env
BASE_DIR = Path(__file__).resolve().parent.parent
logger.info(f"Base directory: {BASE_DIR}")
env_path = BASE_DIR / ".env"
logger.info(f"Looking for .env file at: {env_path}")
load_dotenv(env_path)

# Debug: Print environment variables
logger.info(f"NEWS_API_KEY present: {'NEWS_API_KEY' in os.environ}")
if 'NEWS_API_KEY' in os.environ:
    logger.info(f"NEWS_API_KEY length: {len(os.environ['NEWS_API_KEY'])}")


# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(gdacs.router)
app.include_router(news.router)
# @app.get("/")
# async def root() -> Dict[str, str]:
#     return {"message": "Hello World"}

@app.get("/hello/{name}")
async def say_hello(name: str) -> Dict[str, str]:
    return {"message": f"Hello, {name}!"}

@app.get("/health")
async def health_check() -> Dict[str, str]:
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)