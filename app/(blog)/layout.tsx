
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
    <>
     <header className="z-40 justify-self-center sticky top-[0px] bg-slate-200">
        <div className="flex mx-auto h-20 items-center justify-center py-6">
          <MainNav items={globalNavConfig.mainNav} />
          {/* <div className="flex flex-1 items-end space-x-4 sm:justify-end">
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
          </div> */}
        </div>
      </header>
      <main className="container h-full flex-1 flex-col space-y-8 p-8 md:flex">{children}</main>
      {/* <SiteFooter className="border-t" /> */}
    </>
  )
}
