// components/Navbar.tsx
"use client"

import * as React from "react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import Link from "next/link"
import { cn } from "@/lib/utils"
import Image from "next/image"
import logo from '../../public/HLogo-Transparent 1.png'

export default function HNavbar() {
  return (
    <nav className="max-w-full mx-2 px-2 sm:mx-24 md:mx-36  lg:mx-72 lg:px-8 border-b bg-white/0 dark:bg-zinc-800/0 shadow-sm rounded-full border-1 ">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-lg  font-bold text-gray-800 dark:text-white flex justify-between items-center">
        
            <Image src={logo} alt="" height={30} className="mr-6"/>
        
          Momentum
        </div>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={linkClasses}>Home</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Products</NavigationMenuTrigger>
              <NavigationMenuContent className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-lg">
                <ul className="grid gap-3 w-[200px]">
                  <li>
                    <Link href="/products/new" passHref legacyBehavior>
                      <NavigationMenuLink className={subLinkClasses}>
                        New Arrivals
                      </NavigationMenuLink>
                    </Link>
                  </li>
                  <li>
                    <Link href="/products/popular" passHref legacyBehavior>
                      <NavigationMenuLink className={subLinkClasses}>
                        Popular
                      </NavigationMenuLink>
                    </Link>
                  </li>
                  <li>
                    <Link href="/products/sale" passHref legacyBehavior>
                      <NavigationMenuLink className={subLinkClasses}>
                        On Sale
                      </NavigationMenuLink>
                    </Link>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/about" legacyBehavior passHref>
                <NavigationMenuLink className={linkClasses}>About</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  )
}

const linkClasses = cn(
  "px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white transition-colors"
)

const subLinkClasses = cn(
  "block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
)
