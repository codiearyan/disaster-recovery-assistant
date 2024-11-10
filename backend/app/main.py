from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import chat_bot, volunteer
from app.auth import ClerkAuthMiddleware
from .routers import gdacs
from .routers import news

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the chat bot router with a prefix
app.include_router(chat_bot.router, prefix="/api/chatbot", tags=["chatbot"])
app.add_middleware(
    ClerkAuthMiddleware,
    protected_paths=["/api/volunteer"]  # Only protect volunteer routes
)
app.include_router(gdacs.router)
app.include_router(news.router)
@app.get("/")
async def root():
    return {"message": "API is running"}
