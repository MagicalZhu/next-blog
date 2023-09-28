import Link from "next/link"

import { globalNavConfig } from "@/config/globalNav"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"

interface WelcomeLayoutProps {
  children: React.ReactNode
}

export default async function WelcomeLayout({
  children,
}: WelcomeLayoutProps) {
  return (
    <>
      <header className="z-40 justify-self-center sticky top-[0px]">
        <div className="flex mx-auto h-15 items-end justify-end py-6 pr-8">
          <MainNav items={globalNavConfig.mainNav}/>
        </div>
      </header>
      <main className="container h-full flex-1 flex-col space-y-8 p-8 md:flex">{children}</main>
      {/* <SiteFooter /> */}
    </>
  )
}
