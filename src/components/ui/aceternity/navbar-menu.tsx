"use client";
import React from "react";

export const Menu = ({ children }: { children: React.ReactNode }) => {
  return (
    <nav className="relative rounded-full border  dark:bg-black border-black/[0.2] dark:border-white/[0.2] bg-white shadow-input flex justify-between space-x-4 px-12 md:py-5 py-4 ">
      {children}
    </nav>
  );
};
