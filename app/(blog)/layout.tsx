import {  cn } from "@/lib/utils"

interface BlogsLayoutProperties {
  children: React.ReactNode
}


export default function BlogsLayout({ children }: BlogsLayoutProperties) {
  return (
    <main className="flex-1">
      {children}
    </main>
  )
}
