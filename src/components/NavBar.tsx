// components/Navbar.tsx
"use client";

import * as React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";
import logo from "../../public/HLogo-Transparent 1.png";
import { AlarmClockCheck, ChevronDown, ListCheck, LogOut, Moon, Sun, User } from "lucide-react";
import { useTheme } from "next-themes";
import { useAuth } from "@/context/AuthContext";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export default function HNavbar({logout}:{logout:()=>void}) {
  const { setTheme, resolvedTheme } = useTheme();
  const { user } = useAuth();

  const isDark = resolvedTheme === "dark";
  return (
    <nav className="max-w-full mt-7 mx-1 px-1 lg:py-2 sm:mx-4 md:mx-8 lg:mx-48 xl:mx-80 border-b shadow-sm rounded-full border-1">
      <div className="container mx-auto px-2 sm:px-4 py-3 flex justify-between items-center">
        <div className="text-lg text-gray-800 dark:text-white flex justify-between items-center cursor-pointer pl-6">
          <Image src={logo} alt="Floee Logo" height={30} className="mr-2" />
          <span className="">Floee</span>
        </div>
        <NavigationMenu>
          <NavigationMenuList className="space-x-1 sm:space-x-2">
            <NavigationMenuItem>
              <Link href="/dashboard" legacyBehavior passHref>
                <NavigationMenuLink className={linkClasses}>
                  <div className="flex justify-center items-center">
                    <ListCheck className="size-5" />
                    <span className="hidden sm:inline ml-2">Habits</span>
                  </div>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/timer" legacyBehavior passHref>
                <NavigationMenuLink className={linkClasses}>
                  <div className="flex justify-center items-center">
                    <AlarmClockCheck className="size-5" />
                    <span className="hidden sm:inline ml-2">PomoDoro</span>
                  </div>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink className="px-2 py-2">
                <button
                  onClick={() => setTheme(isDark ? "light" : "dark")}
                  aria-label="Toggle Theme"
                  className="transition"
                >
                  {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </NavigationMenuLink>
            </NavigationMenuItem>


<Popover>
  <PopoverTrigger asChild>
    <button className={` px-2 sm:px-3 py-2 flex items-center hover:bg-accent rounded-md`}>
      <User size={18} />
      <span className="hidden sm:inline mx-1">User </span>
      <ChevronDown size={12}/>
    </button>
  </PopoverTrigger>

  <PopoverContent align="start" side="bottom" className="w-[200px] p-4">
    <ul className="grid gap-3 w-full">
      <li className="text-sm text-gray-700 dark:text-gray-300 truncate">
        {user?.email}
      </li>
      <li>
        <button
          onClick={logout}
          className={cn(subLinkClasses, "w-full text-left")}
        >
          <div className="flex items-center">
            <LogOut className="mr-2 size-4" />
            <span>Log out</span>
          </div>
        </button>
      </li>
    </ul>
  </PopoverContent>
</Popover>



          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}

const linkClasses = cn(
  "px-2 sm:px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white transition-colors"
);

const subLinkClasses = cn(
  "block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-md transition-colors"
);