"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { MainNavItem } from "types"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { globalNavConfig } from "@/config/globalNav"
import { useAppDispatch } from '@/store/store'
import { setCategory } from '@/store/posts/postSlice'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface MainNavProps {
  items?: MainNavItem[]
  children?: React.ReactNode
  className?: string
}

export function MainNav({ children, className }: MainNavProps) {
  const pathName = usePathname()
  const items = globalNavConfig.mainNav
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    if (pathName === '/') {
      dispatch(setCategory(''))
    }
  }, [pathName])

  return (
    <>
      <Link href="/" className="hidden md:flex">
        <Icons.logo className="h-5 w-5" strokeWidth={1.5}/>
      </Link>
      <div className={cn(
        "mr-4 hidden md:flex md:mx-auto",
        "border rounded-lg shadow-xl px-4 py-2"
      )}>
        {items?.length ? (
          <nav className="flex items-center gap-6 text-sm">
              { items?.map((item, index) => (
                <Link
                  key={index}
                  href={item.disabled ? "#" : item.href}
                  target={item.href.startsWith('https://') ? '_blank' : '_self'}
                  className={cn(
                    "font-medium transition-colors hover:text-foreground/80",
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

      <div className="hidden md:flex hover:cursor-pointer">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Icons.MixIcon className="h-5 w-5" strokeWidth={1.5}/>
          </DropdownMenuTrigger>
          <DropdownMenuContent >
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator/>
            <DropdownMenuItem>
              <Icons.PersonStanding className="h-5 w-5" strokeWidth={1.5}/>
              <Link href="/about" className="ml-2">
                About
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Icons.PenSquare className="h-5 w-5" strokeWidth={1.5}/>
              <Link href="/editor" className="ml-2">
                NoteBook
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {
        /*
          <Link href="/about" className="hidden md:flex">
            <Icons.MixIcon className="h-5 w-5" strokeWidth={1.5}/>
          </Link>
        */
      }
    </>
  )
}
