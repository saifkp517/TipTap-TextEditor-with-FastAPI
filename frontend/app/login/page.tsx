"use client"

import { useState, ChangeEvent } from "react";
import { auth, googleProvider } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  UserCredential,
} from "firebase/auth";

type UserData = {
  email: string;
  token: string;
};

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [user, setUser] = useState<UserData | null>(null);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const loginWithEmail = async () => {
    try {
      const res: UserCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await res.user.getIdToken();
      setUser({ email: res.user.email ?? "", token });
      window.location.href = "/"
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Email login error:", err.message);
      }
    }
  };

  const loginWithGoogle = async () => {
    try {
      const res: UserCredential = await signInWithPopup(auth, googleProvider);
      const token = await res.user.getIdToken();
      setUser({ email: res.user.email ?? "", token });
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Google login error:", err.message);
      }
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Login</h1>

      {user ? (
        <div>
          <p>Logged in as {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <>
          <input
            type="email"
            placeholder="Email"
            className="border p-1 m-1"
            value={email}
            onChange={handleEmailChange}
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-1 m-1"
            value={password}
            onChange={handlePasswordChange}
          />
          <div className="my-2 ">
            <button onClick={loginWithEmail} className="mr-2">
              Login
            </button>
            <br />
            <button onClick={loginWithGoogle}>Login with Google</button>
            <br />
            <button onClick={() => window.location.href = "/register"}>Don't have an account? Sign Up</button>
          </div>
        </>
      )}
    </div>
  );
}
