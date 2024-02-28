
interface LayoutProps {
  children: React.ReactNode
}


export default async function HomeLayout({
  children,
}: LayoutProps) {
  return (
    <>
      <div className="max-w-[78ch] mx-auto relative">
        {children}
      </div>
    </>
  )
}
