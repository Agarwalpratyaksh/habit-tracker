"use client";

import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebaseApp from "@/lib/firebase"; // Assuming this path is correct
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Lock, User } from "lucide-react";
// Import icons from react-icons

// Initialize Firebase Auth
const auth = getAuth(firebaseApp);

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // State for password visibility
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSignin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        // Basic email validation (optional, Firebase handles it too)
        if (!email || !password) {
            setError("Please enter both email and password.");
            setIsLoading(false);
            return;
        }

        try {
            const userData = await signInWithEmailAndPassword(auth, email, password);
            console.log("User logged in:", userData.user);
            router.push("/dashboard"); // Redirect on success
        } catch (err: any) {
            let errorMessage = "Failed to sign in. Please try again.";
            if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
                errorMessage = "Invalid email or password.";
            } else if (err.code === 'auth/invalid-email') {
                errorMessage = "Please enter a valid email address.";
            } else if (err.code === 'auth/too-many-requests') {
                errorMessage = "Too many attempts. Please try again later.";
            }
            console.error("Firebase Auth Error:", err.code, err.message);
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        // Outer container: Full screen, dark background, flex center
        <div className="flex flex-col items-center justify-center h-screen overflow-hidden p-4">

            {/* Main content container */}
            <div className="w-full max-w-sm"> {/* Adjusted max-width to sm */}

                {/* Logo / Title */}
                <div className="flex items-center justify-center mb-4 gap-3">
                     {/* You can replace FiLogIn with your actual logo SVG */}
                    <Lock className="h-8 w-8 sm:h-10 sm:w-10" />
                    <h1 className="text-3xl sm:text-4xl font-bold ">
                        Log In {/* Replaced "Cuez" */}
                    </h1>
                </div>

                {/* Subtitle */}
                <p className="text-center text-sm text-gray-400 mb-8">
                    Please enter your email and your password.
                </p>

                {error && (
                        <p className="text-red-500 text-sm text-center pb-2 -mt-3">{error}</p>
                    )}

                {/* Login Form */}
                <form onSubmit={handleSignin} className="space-y-5"> {/* Using space-y for gaps */}
                    {/* Email Input with Icon */}
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

                    {/* Password Input with Icon and Toggle */}
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
                            type="button" // Prevent form submission
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

                    {/* Error Message Display */}
                    

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={`w-full bg-blue-600 hover:bg-blue-800 text-white font-semibold py-2.5 px-4 rounded-lg transition duration-150 ease-in-out ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Logging in...' : 'Log in'}
                    </button>

                    {/* Links: Forgot Password / Sign Up */}
                    <div className="flex justify-centre text-md pt-2">
                       <div className="mr-2">Don`t have an account yet ? </div>
                        <Link href="/signup" // Update link as needed
                              className="font-medium text-blue-500 hover:text-blue-300">
                            Sign up
                        </Link>
                    </div>
                </form>

            </div> {/* End of main content container */}

            {/* Footer */}
            {/* <footer className="absolute bottom-4 text-center text-xs text-gray-500 w-full">
                © {new Date().getFullYear()} Flee. All rights reserved. 
            </footer> */}
        </div>
    );
}

export default LoginPage;