from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
import google.generativeai as genai
import os
import asyncio
import json
from dotenv import load_dotenv
from pathlib import Path

# Get the absolute path to the .env file
env_path = Path(__file__).resolve().parent.parent.parent / '.env'

# Load environment variables
load_dotenv(dotenv_path=env_path)

# Get and print the API key for debugging
api_key = os.getenv('GOOGLE_API_KEY')
print(f"API Key loaded: {'Yes' if api_key else 'No'}")

# Configure Gemini
if not api_key:
    # Fallback to hardcoded key for development
    api_key = "AIzaSyDEqbAhfuORsR-5gayd7fie1gRjYW1XtgA"

genai.configure(api_key=api_key)

router = APIRouter()

# Define disaster-related keywords
disaster_keywords = [
    "disaster", "earthquake", "flood", "emergency", "rescue", "aid"
]

def is_disaster_related(query: str) -> bool:
    return any(keyword in query.lower() for keyword in disaster_keywords)

class ChatRequest(BaseModel):
    user_input: str

async def generate_stream_response(user_input: str):
    try:
        model = genai.GenerativeModel(
            model_name='gemini-1.5-flash',
            safety_settings=[
                {
                    "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
                    "threshold": "BLOCK_NONE"
                },
                {
                    "category": "HARM_CATEGORY_HATE_SPEECH",
                    "threshold": "BLOCK_NONE"
                },
                {
                    "category": "HARM_CATEGORY_HARASSMENT",
                    "threshold": "BLOCK_NONE"
                },
                {
                    "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                    "threshold": "BLOCK_NONE"
                }
            ]
        )
        
        prompt = f"""
        As a disaster response assistant, provide a safe and helpful response about {user_input}.
        Focus on official safety guidelines and emergency procedures.
        Keep the response brief and under 50 words.
        """
        
        response = model.generate_content(
            prompt,
            generation_config={
                'temperature': 0.7,
                'top_p': 0.8,
                'top_k': 40,
                'max_output_tokens': 100,
            },
            safety_settings=[
                {
                    "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
                    "threshold": "BLOCK_NONE"
                }
            ]
        )
        
        # Handle the response in chunks
        if response.text:
            words = response.text.split()
            for i in range(0, len(words), 3):  # Send 3 words at a time
                chunk = " ".join(words[i:i+3])
                yield f"data: {json.dumps({'response': chunk, 'done': False})}\n\n"
                await asyncio.sleep(0.1)  # Add small delay between chunks
            
            # Send the done message
            yield f"data: {json.dumps({'response': '', 'done': True})}\n\n"
        
    except Exception as e:
        print(f"Error details: {str(e)}")
        yield f"data: {json.dumps({'response': 'Error processing request', 'done': True})}\n\n"

@router.post("/chat")
async def chat_with_ai(request: ChatRequest):
    user_input = request.user_input

    if not is_disaster_related(user_input):
        return StreamingResponse(
            content=iter([f"data: {json.dumps({'response': 'No, please ask about disaster-related topics.', 'done': True})}\n\n"]),
            media_type="text/event-stream"
        )

    return StreamingResponse(
        content=generate_stream_response(user_input),
        media_type="text/event-stream"
    )

@router.get("/")
async def root():
    return {"message": "Chatbot API is running!"}