from fastapi import FastAPI
from typing import Dict

from .volunteer import router as volunteer_router
app = FastAPI()

app.include_router(volunteer_router)

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