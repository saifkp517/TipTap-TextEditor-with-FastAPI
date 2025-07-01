'use client'

import Tiptap from "../components/TipTap";
import { useAuth } from "./context/AuthContext";

export default function Home() {

  const { user, token, loading } = useAuth();
  
  return (
    <div className="bg-white">
      {
        user ? (
          <div className="p-6 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Welcome, {user.email}</h1>
            <div className="border">
              <Tiptap />
            </div>
          </div>
        ) : (
          <div className="p-6 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Please log in to continue</h1>
            <p className="text-gray-600">You can access the editor once you are logged in.</p>
            <button onClick={() => window.location.href = "/login"} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" > Login </button>
          </div>
        )
      }
    </div>
  );
}
