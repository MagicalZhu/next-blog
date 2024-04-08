"use client"

import * as React from "react"

import { TableOfContents } from "@/lib/toc"
import { cn } from "@/lib/utils"
import { useMounted } from "@/hooks/use-mounted"
import { Icons } from "@/components/icons"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"

import { buttonVariants } from "@/components/ui/button"

interface TocProps {
  toc: TableOfContents
}

export function TableOfContents({ toc }: TocProps) {
  const itemIds = React.useMemo(
    () =>
      toc.items
        ? toc.items
            .flatMap((item) => [item.url, item?.items?.map((item) => item.url)])
            .flat()
            .filter(Boolean)
            .map((id) => id?.split("#")[1])
        : [],
    [toc]
  )
  const activeHeading = useActiveItem(itemIds)
  const mounted = useMounted()

  if (!toc?.items) {
    return null
  }

  return mounted ? (
    <div>
      <Tree tree={toc} activeItem={activeHeading} />
      <Separator className="my-4"/>
      <Link href="/posts"
            className={cn(
              buttonVariants({ variant: "link", size: "icon" }),
              "h-6 w-full justify-start",
              "hover:no-underline group"
              )}>
        <span className="mr-2 text-muted-foreground font-normal group-hover:text-black">Back to posts</span>
        <Icons.back className="h-4 w-4 text-muted-foreground group-hover:text-black" strokeWidth={1}/>
      </Link>
    </div>
  ) : null
}

function useActiveItem(itemIds: (string | undefined)[]) {
  const [activeId, setActiveId] = React.useState<string>("")

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: `0% 0% -80% 0%` }
    )

    itemIds?.forEach((id) => {
      if (!id) {
        return
      }

      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      itemIds?.forEach((id) => {
        if (!id) {
          return
        }

        const element = document.getElementById(id)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [itemIds])

  return activeId
}

interface TreeProps {
  tree: TableOfContents
  level?: number
  activeItem?: string | null
}

function Tree({ tree, level = 1, activeItem }: TreeProps) {
  return tree?.items?.length && level < 7 ? (
    <ul className={cn("m-0 list-none", { "pl-4": level !== 1 })}>
      {tree.items.map((item, index) => {
        return (
          <li key={index} className={cn("mt-0 pt-1")}>
            <a
              href={item.url}
              className={cn(
                "inline-block no-underline",
                item.url === `#${activeItem}`
                  ? "text-sm font-medium text-primary"
                  : "text-sm text-muted-foreground"
              )}
            >
              {item.title}
            </a>
            {item.items?.length ? (
              <Tree tree={item} level={level + 1} activeItem={activeItem} />
            ) : null}
          </li>
        )
      })}
    </ul>
  ) : null
}
