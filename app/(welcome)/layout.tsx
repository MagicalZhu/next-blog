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
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background justify-self-center">
        <div className="flex mx-auto  h-20 items-center justify-center py-6">
          <MainNav items={globalNavConfig.mainNav}/>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      {/* <SiteFooter /> */}
    </div>
  )
}
