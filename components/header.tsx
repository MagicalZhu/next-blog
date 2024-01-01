import { MainNav } from "@/components/main-nav"
import { globalNavConfig } from "@/config/globalNav"

export function MainHeader() {
  return (
    <header className="z-40 justify-self-center sticky top-[0px] bg-white">
      <div className="flex h-[3em] items-end justify-end py-3 px-6">
        <MainNav items={globalNavConfig.mainNav} />
        {/* <div className="flex flex-1 items-end space-x-4 sm:justify-end">
          <nav className="flex space-x-4">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              s.gitHub className="h-7 w-<Icon7" />
              <span className="sr-only">GitHub</span>
            </Link>
          </nav>
        </div> */}
      </div>
    </header>
  )
}
