# ✍️ Tiptap + FastAPI Autocomplete Editor

A simple demo project implementing:
- A rich text editor using **Tiptap**
- Firebase **Authentication** (Email + Google)
- FastAPI backend for **autocomplete**
- Optional: SQL DB (not implemented here)

---

## 🧠 Features

- 🔒 Firebase Auth (email/password + Google)
- ✨ Tiptap Editor with basic styling options (Bold, Italic, etc.)
- 🔍 Autocomplete suggestions as you type
- 👻 Ghost text shown as suggestions
- ⌨️ Press Tab to accept the suggestion
- 🔗 Protected FastAPI endpoint with Firebase token verification

---

## 🛠 Setup Instructions

### 🖥 Client (Next.js + Tiptap)

1. Go to your Firebase Console → **Project Settings** → **General**
2. Scroll down to **Your Apps > Firebase SDK snippet**
3. Copy the config and create this file:

#### `lib/firebase.js`

```js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth/web-extension";

const firebaseConfig = {
  apiKey: "AIzaSyXXXX...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "XXXXXXXXXX",
  appId: "1:XXXXXXX:web:XXXX",
  measurementId: "G-XXXXXXX"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
```

4. In your frontend project root:

```bash
npm install
npm run dev
```

---

### 🐍 Server (FastAPI)

1. In Firebase Console → **Project Settings > Service accounts**
2. Click **Generate new private key**
3. Save it to:  
   `editor/backend/firebasePrivateKey.json`

4. From the `editor/backend` folder:

```bash
pip install -r requirements.txt
uvicorn main:app --reload
```

---

## 🔐 Firebase Setup Notes

1. Enable **Email/Password** and **Google Provider** in:
   Firebase Console → **Authentication > Sign-in methods**

---

## 🔗 API Usage

### `GET /autocomplete?query=<word>`

- Requires `Authorization: Bearer <Firebase_ID_Token>` in headers
- Returns a list of matching suggestions

#### Example:

```bash
curl -H "Authorization: Bearer <token>" \
     http://localhost:8000/autocomplete?query=app
```

Response:
```json
{
  "suggestions": ["apple", "application", "appreciate"]
}
```

---

## 🎥 Demo Video

[Demo Video](https://www.loom.com/share/05abcd156da140d6b875e4709a554c12?sid=b2df68bc-184a-4316-bb82-437b51a030dc)


---

## 📁 Folder Structure

```
project-root/
├── backend/                  ← FastAPI backend
│   ├── main.py
│   ├── firebase_auth.py
│   ├── dummy_data.py
│   ├── firebasePrivateKey.json
│   └── requirements.txt
├── lib/
│   └── firebase.js           ← Firebase client SDK config
├── app/
│   ├── context/AuthContext.tsx
│   ├── page.tsx              ← Editor page
├── public/
├── styles/
├── package.json
└── README.md
```

---

I didn’t implement SQL DB since it was optional, but would definitely add it if required.