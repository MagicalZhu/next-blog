import { globalNavConfig } from "@/config/globalNav"
import { cn } from "@/lib/utils"
import { MainNav } from "@/components/layout/main-nav"
import { SiteFooter } from "@/components/layout/site-footer"

interface FavLayoutProps {
  children: React.ReactNode
}

export default async function FavLayout({
  children,
}: FavLayoutProps) {
  return (
    <>
      <main className="flex-1">
        <header className="z-40 justify-self-center sticky top-[0px]">
          <div className="flex mx-auto h-20 items-center justify-center py-6">
            <MainNav items={globalNavConfig.mainNav} />
          </div>
        </header>
        <main className="slide-enter container h-full flex-1 flex-col space-y-8 p-8 md:flex">{children}</main>
        {/* <SiteFooter /> */}
      </main>
    </>
  )
}
