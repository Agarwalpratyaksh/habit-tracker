"use client";
import React from "react";
import { Menu } from "../ui/aceternity/navbar-menu";
import { cn } from "@/lib/utils";
import logo from "../../../public/HLogo-Transparent 1.png";
import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export function LNavbar() {
  const router = useRouter()
  const login = ()=>{
    router.push('/login')
  }

  const signup = ()=>{
    router.push('/signup')
  }
  return (
    <div className="relative w-full flex items-center ">
      <div className={cn("fixed top-5 md:top-10 inset-x-0 max-w-2xl mx-auto z-50")}>
        <Menu>
          <div className="flex gap-2 items-center cursor-pointer">
            <Image src={logo} alt="Floee Logo" height={30} className="mr-2" />
            <span className="text-xl">Floee</span>
          </div>
          <div className="flex gap-3">
            <Button className="border-1 hover:bg-white/10" variant={"ghost"} onClick={login}>Login</Button>
            <Button className="border-1 bg-[#444DFF] hover:bg-[#444DFF]/70" variant={"ghost"} onClick={signup}>Signup</Button>
          </div>
        </Menu>
      </div>
    </div>
  );
}
