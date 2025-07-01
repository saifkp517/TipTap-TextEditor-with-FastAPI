"use client"

import { useState, ChangeEvent } from "react";
import { auth } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signOut,
  UserCredential,
} from "firebase/auth";

type UserData = {
  email: string;
  token: string;
};

export default function RegisterPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [user, setUser] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const registerWithEmail = async () => {
    setError(null); // Clear any previous error
    try {
      const res: UserCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await res.user.getIdToken();
      setUser({ email: res.user.email ?? "", token });
      console.log("User registered:", res.user.email);
      window.location.href = "/login"; 
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        console.error("Registration error:", err.message);
      }
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Register</h1>

      {user ? (
        <div>
          <p>Welcome, {user.email}</p>
          <button
            onClick={handleLogout}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
          >
            Logout
          </button>
        </div>
      ) : (
        <>
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-2 mb-2 rounded"
            value={email}
            onChange={handleEmailChange}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border p-2 mb-4 rounded"
            value={password}
            onChange={handlePasswordChange}
          />

          {error && (
            <p className="text-red-600 text-sm mb-2">
              Error: {error}
            </p>
          )}

          <button
            onClick={registerWithEmail}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded"
          >
            Register
          </button>
        </>
      )}
    </div>
  );
}
