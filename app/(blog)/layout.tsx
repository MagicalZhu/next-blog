
import { MainHeader } from "@/components/layout/header"
import { DocsSearch } from "@/components/func/search"
import { SiteFooter } from "@/components/layout/site-footer"

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
