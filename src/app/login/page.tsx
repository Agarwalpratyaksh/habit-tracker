"use client"

import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import firebaseApp from "@/lib/firebase";
import { useRouter } from "next/navigation";

const auth = getAuth(firebaseApp);

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
  
    const handleSignin = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const userData = await signInWithEmailAndPassword(auth,email,password);
        console.log(userData)
        router.push("/dashboard");
      } catch (error:any) {
        alert(error.message);
      }
    };
  
    return (
      <div className="p-4 max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSignin} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border rounded"
            required
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Sign Up
          </button>
        </form>
      </div>
    );
}

export default Login