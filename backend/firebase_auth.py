# firebase_auth.py

import firebase_admin
from firebase_admin import auth, credentials
from fastapi import Header, HTTPException, status

# Initialize Firebase app once
if not firebase_admin._apps:
    cred = credentials.Certificate("./firebasePrivateKey.json")
    firebase_admin.initialize_app(cred)

def verify_token(authorization: str = Header(...)):
    if not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing or invalid Authorization header",
        )

    id_token = authorization.split(" ")[1]

    try:
        decoded_token = auth.verify_id_token(id_token)
        print("✅ Firebase token decoded:", decoded_token)
        return decoded_token
    except Exception as e:
        print("❌ Firebase token verification failed:", e)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired Firebase token",
        )
