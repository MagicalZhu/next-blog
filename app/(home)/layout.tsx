
interface LayoutProps {
  children: React.ReactNode
}


export default async function HomeLayout({
  children,
}: LayoutProps) {
  return (
    <main className="flex flex-1">
      <div className="max-w-[78ch] m-auto  relative w-full h-full">
        {children}
      </div>
    </main>
  )
}
