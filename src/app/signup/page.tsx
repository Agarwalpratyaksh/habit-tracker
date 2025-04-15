"use client";

import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import firebaseApp from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import Link from "next/link";

const auth = getAuth(firebaseApp);

export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        if (!email || !password) {
            setError("Please enter both email and password.");
            setIsLoading(false);
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log("User signed up:", userCredential.user);
            router.push("/dashboard");
        } catch (err: any) {
            let errorMessage = "Failed to sign up. Please try again.";
            if (err.code === 'auth/email-already-in-use') {
                errorMessage = "This email is already in use.";
            } else if (err.code === 'auth/invalid-email') {
                errorMessage = "Please enter a valid email address.";
            } else if (err.code === 'auth/weak-password') {
                errorMessage = "Password should be at least 6 characters.";
            }
            console.error("Firebase Auth Error:", err.code, err.message);
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
      <div className="flex flex-col items-center justify-center h-screen overflow-hidden p-4">
            <div className="w-full max-w-sm">
                <div className="flex items-center justify-center mb-4 gap-3">
                    <Lock className="h-8 w-8 sm:h-10 sm:w-10" />
                    <h1 className="text-3xl sm:text-4xl font-bold">
                        Sign Up
                    </h1>
                </div>

                <p className="text-center text-sm text-gray-400 mb-8">
                    Please enter your email and password to create an account.
                </p>

                {error && (
                    <p className="text-red-500 text-sm text-center pb-2 -mt-3">{error}</p>
                )}

                <form onSubmit={handleSignup} className="space-y-5">
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <User className="h-5 w-5 text-gray-500" />
                        </span>
                        <input
                            id="email"
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-10 pr-3 py-2.5 border-white/50 border-1 rounded-lg placeholder-gray-500 text-gray-200 focus:outline-none focus:border-blue-500 transition-colors"
                            required
                            disabled={isLoading}
                        />
                    </div>

                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <Lock className="h-5 w-5 text-gray-500" />
                        </span>
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-10 pr-3 py-2.5 border-white/50 border-1 rounded-lg placeholder-gray-500 text-gray-200 focus:outline-none focus:border-blue-500 transition-colors"
                            required
                            disabled={isLoading}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-300"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            disabled={isLoading}
                        >
                            {showPassword ? (
                                <EyeOff className="h-5 w-5" />
                            ) : (
                                <Eye className="h-5 w-5" />
                            )}
                        </button>
                    </div>

                    <button
                        type="submit"
                        className={`w-full bg-blue-600 hover:bg-blue-800 text-white font-semibold py-2.5 px-4 rounded-lg transition duration-150 ease-in-out ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Signing up...' : 'Sign up'}
                    </button>

                    <div className="flex justify-centre text-md pt-2">
                       <div className="mr-2">Already have an account ? </div>
                        <Link href="/login" // Update link as needed
                              className="font-medium text-blue-500 hover:text-blue-300">
                            Sign up
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
