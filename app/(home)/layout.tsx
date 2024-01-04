
import { MainHeader } from "@/components/header"
import { SiteFooter } from "@/components/site-footer"


interface LayoutProps {
  children: React.ReactNode
}


export default async function HomeLayout({
  children,
}: LayoutProps) {
  return (
    <>
      <MainHeader/>
      <main className="max-w-[98ch] mx-auto h-full flex-1 flex-col space-y-8 p-8 md:flex">
        {children}
      </main>
      <SiteFooter/>
    </>
  )
}
