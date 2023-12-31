"use client"

import * as React from "react"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"

import { MainNavItem } from "types"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons, IconComponent } from "@/components/icons"
import { MobileNav } from "@/components/mobile-nav"
import { icons } from "lucide-react"

interface MainNavProps {
  items?: MainNavItem[]
  children?: React.ReactNode
  className?: string
}

export function MainNav({ items, children, className }: MainNavProps) {
  const segment = useSelectedLayoutSegment()
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false)
  return (
    <div className="flex gap-6 md:gap-10">
      {items?.length ? (
        <nav className="hidden gap-6 md:flex float-right">
          { items?.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              target={item.href.startsWith('https://') ? '_blank' : '_self'}
              className={cn(
                "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
                item.href.startsWith(`/${segment}`)
                  ? "text-foreground"
                  : "text-foreground/60",
                item.disabled && "cursor-not-allowed opacity-80",
                className
              )}
            >
              {item.icon ? <IconComponent name={item.icon} className="h-5 w-5" />: item.title}
            </Link>
          ))}
        </nav>
      ) : null}
      <button
        className="flex items-center space-x-2 md:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        { showMobileMenu ? <Icons.close /> : <Icons.chevronRight />}
      </button>
      {showMobileMenu && items && (
        <MobileNav items={items}>
          {children}
        </MobileNav>
      )}
    </div>
  )
}
