import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react"; // Or your preferred icon

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          {/* Replace with your Logo */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
             <rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 8h2v2H7zM11 8h2v2h-2zM15 8h2v2h-2zM7 12h2v2H7zM11 12h2v2h-2zM15 12h2v2h-2zM7 16h2v2H7zM11 16h2v2h-2zM15 16h2v2h-2z"/>
          </svg>
          <span className="font-bold inline-block">HabitGrid</span>
        </Link>
        <nav className="flex flex-1 items-center justify-end space-x-4">
          {/* Add other nav links if needed: Features, Pricing, etc. */}
          <Button variant="ghost" asChild>
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Get Started <LogIn className="ml-2 h-4 w-4" /></Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}