"use client";
import React from "react";





export const Menu = ({
  
  children,
}: {
 
  children: React.ReactNode;
}) => {
  return (
    <nav
     
      className="relative rounded-full border border-transparent dark:bg-black dark:border-white/[0.2] bg-white shadow-input flex justify-between space-x-4 px-12 md:py-5 py-4 "
    >
      {children}
    </nav>
  );
};


