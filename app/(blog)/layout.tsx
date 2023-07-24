
import { globalNavConfig } from "@/config/globalNav"
import { MainNav } from "@/components/main-nav"
import { DocsSearch } from "@/components/search"
import { DocsSidebarNav } from "@/components/sidebar-nav"
import { SiteFooter } from "@/components/site-footer"
import { siteConfig } from "@/config/site"
import { Icons } from "@/components/icons"
import Link from "next/link"

interface BlogsLayoutProperties {
  children: React.ReactNode
}


export default function BlogsLayout({ children }: BlogsLayoutProperties) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full bg-background">
        <div className="container flex h-20 items-center py-6 space-x-4 sm:justify-between sm:space-x-0">
          <MainNav items={globalNavConfig.mainNav} />
          <div className="flex flex-1 items-end space-x-4 sm:justify-end">
            {/*
            <nav className="flex space-x-4">
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
              >
                <Icons.gitHub className="h-7 w-7" />
                <span className="sr-only">GitHub</span>
              </Link>
            </nav>
            */}
          </div>
        </div>
      </header>
      <div className="container flex-1">{children}</div>
      {/* <SiteFooter className="border-t" /> */}
    </div>
  )
}
