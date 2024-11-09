from fastapi import FastAPI
from typing import Dict
from .routers import article

# from .volunteer import router as volunteer_router
app = FastAPI()
app.include_router(article.router, prefix="/articles", tags=["articles"])
#app.include_router(volunteer_router)

@app.get("/")
async def root() -> Dict[str, str]:
     return {"message": "Hello World"}

@app.get("/hello/{name}")
async def say_hello(name: str) -> Dict[str, str]:
    return {"message": f"Hello, {name}!"}

@app.get("/health")
async def health_check() -> Dict[str, str]:
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

    

# Define a root endpoint (optional)
@app.get("/")
async def read_root():
    return {"message": "Welcome to the News API"}

app = FastAPI(
    title="Disaster News API",
    description="API for tracking and analyzing disaster-related news",
    version="1.0.0"
)