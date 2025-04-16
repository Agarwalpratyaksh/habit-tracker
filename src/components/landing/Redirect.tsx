"use client";
import React from "react";
import { Button } from "../ui/button";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";

function RedirectBtn() {
  const router = useRouter();
  const handleRedirect = async () => {
    const user = getAuth().currentUser;
    if (user) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  };

  return (
    <Button
      className="bg-[#444DFF] hover:bg-[#444DFF]/90 text-white text-lg md:text-xl px-6 md:px-8 py-5 md:py-6 rounded-xl"
      onClick={handleRedirect}
    >
      Get started
    </Button>
  );
}

export default RedirectBtn;
