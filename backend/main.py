# main.py

from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dummy_data import get_suggestions
from firebase_auth import verify_token

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/autocomplete")
def autocomplete(query: str, user_data=Depends(verify_token)):
    if not query:
        raise HTTPException(status_code=400, detail="Query parameter required")
    suggestions = get_suggestions(query)
    return {"suggestions": suggestions}
