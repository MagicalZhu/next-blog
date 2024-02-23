"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { MainNavItem } from "types"
import { cn } from "@/lib/utils"
import { Icons, IconComponent } from "@/components/icons"
import { globalNavConfig } from "@/config/globalNav"

interface MainNavProps {
  items?: MainNavItem[]
  children?: React.ReactNode
  className?: string
}

export function MainNav({ children, className }: MainNavProps) {
  const pathName = usePathname()
  const items = globalNavConfig.mainNav
  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Icons.logo className="h-5 w-5" strokeWidth={1.5}/>
      </Link>

      {items?.length ? (
        <nav className="flex items-center gap-6 text-sm">
            { items?.map((item, index) => (
              <Link
                key={index}
                href={item.disabled ? "#" : item.href}
                target={item.href.startsWith('https://') ? '_blank' : '_self'}
                className={cn(
                  "font-bold transition-colors hover:text-foreground/80",
                  (pathName.startsWith(`${item.href}`) && pathName !== '/')
                    ? "text-black"
                    : "text-foreground/60",
                  item.disabled && "cursor-not-allowed opacity-80",
                  className
                )}
              >
                {/* {item.icon ? <IconComponent name={item.icon} className="h-5 w-5" />: item.title} */}
                { item.title }
              </Link>
            ))}
          </nav>
        ) : null
      }
    </div>
  )
}
