"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";

function RedirectBtn() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleRedirect = async () => {
    setIsLoading(true);
    try {
      const user = getAuth().currentUser;
      if (user) {
        router.push("/dashboard");
      } else {
        router.push("/login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      className="bg-[#444DFF] hover:bg-[#444DFF]/90 text-white text-lg md:text-xl px-6 md:px-8 py-5 md:py-6 rounded-xl"
      onClick={handleRedirect}
      disabled={isLoading}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          Loading...
        </div>
      ) : (
        "Get started"
      )}
    </Button>
  );
}

export default RedirectBtn;
