
import { MainHeader } from "@/components/header"
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
      <MainHeader/>
      <div className="mx-auto max-w-[1200px] h-full flex-1 flex-col space-y-8 px-8 md:flex">
        {children}
      </div>
      <SiteFooter />
    </>
  )
}
