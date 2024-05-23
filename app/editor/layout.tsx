
interface LayoutProps {
  children: React.ReactNode
}


export default async function EditorLayout({
  children,
}: LayoutProps) {
  return (
    <>
      <main className="flex-1">
        <div className="max-w-[78ch] mx-auto relative">
          {children}
        </div>
      </main>
    </>
  )
}
