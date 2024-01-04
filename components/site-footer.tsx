import * as React from "react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { ModeToggle } from "@/components/mode-toggle"

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)}>
      <div className="container flex flex-col items-center justify-center gap-4 md:h-16 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center leading-loose md:text-left text-xs">
            <a
              href={siteConfig.links.license}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-2 decoration-dashed decoration-1 hover:cursor-help"
              >
              CC BY-NC-ND{" "}
            </a>
            <span>Built by{" "}</span>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              {siteConfig.name}
            </a>
          </p>
        </div>
        {
          /* <ModeToggle /> */
        }
      </div>
    </footer>
  )
}
