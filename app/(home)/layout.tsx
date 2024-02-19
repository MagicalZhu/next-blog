
import { SiteFooter } from "@/components/layout/site-footer"


interface LayoutProps {
  children: React.ReactNode
}


export default async function HomeLayout({
  children,
}: LayoutProps) {
  return (
    <>
      <div className="container relative">
        {children}
      </div>
    </>
  )
}
