from fastapi import FastAPI
from typing import Dict
from fastapi.middleware.cors import CORSMiddleware
from .routers import gdacs
import logging

app = FastAPI()

logger = logging.getLogger(__name__)
# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(gdacs.router)

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