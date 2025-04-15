import React from "react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="py-6 md:px-8 md:py-0 border-t">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built with ❤️. &copy; {currentYear} HabitGrid. All rights reserved.
        </p>
        <nav className="flex gap-4 sm:gap-6">
          <Link
            href="/terms"
            className="text-sm hover:underline underline-offset-4 text-muted-foreground"
          >
            Terms of Service
          </Link>
          <Link
            href="/privacy"
            className="text-sm hover:underline underline-offset-4 text-muted-foreground"
          >
            Privacy Policy
          </Link>
        </nav>
      </div>
    </footer>
  );
}