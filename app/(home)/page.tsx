import Link from "next/link"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/config/site"
import dayjs from 'dayjs'

const years = dayjs().diff(dayjs('2017-9-1'), 'year')

export default async function IndexPage() {

  return (
    <>
      <div className="md:flex rounded-xl md:p-0">
        <Link href="/about"
                className={cn(
                  "border-none cursor-default",
                )}
            >
          <img className="md:h-auto md:rounded-none rounded-full mx-auto sm:mx-0"
            src="/images/avatars/ant.png"
            alt=""
            width="200" height="268"/>
        </Link>
        <div className="md:pl-14 my-auto">
          <div className="hidden sm:flex sm:text-left items-center">
            <span className="font-bold text-3xl">{siteConfig.name}</span>
          </div>
          <div className="hidden sm:flex sm:text-left sm:pt-4 items-center">
            <span className="text-primary/80">Hey, I am {siteConfig.name}, a FE & BE developer with over { years } years.</span>
          </div>
          <div className="hidden sm:flex sm:text-left sm:pt-4 items-center">
            <span className="text-primary/80">You can check out my details by </span>
            &nbsp;
            <Link href="/about"
                className={cn(
                  "text-primary/80",
                  "border-none cursor-pointer hover:opacity-30 duration-700",
                  "underline underline-offset-4 decoration-dashed decoration-[0.08em] decoration-zinc-400",
                  "hover:decoration-solid"
                )}
            >
              here
            </Link>
          </div>
        </div>
      </div>
      <div className="pt-8 pl-8">
        <div className="animate-delay-600 flex justify-center sm:justify-start">
          <div className="flex space-x-8">
            <a className="cursor-pointer hover:opacity-30"
              target="_blank"
              href="mailto:huakucha95@163.com"
            >
              <span className="i-simple-icons-gmail w-7 h-7 text-pink-600"/>
            </a>

            <a className="cursor-pointer hover:opacity-30"
              target="_blank"
              href={siteConfig.links.github}
            >
              <span className="i-carbon-logo-github w-7 h-7"/>
            </a>

            <a className="cursor-pointer hover:opacity-30"
              target="_blank"
              href="https://m.cmx.im/@athu"
            >
              <span className="i-carbon-logo-mastodon w-7 h-7 text-indigo-600"/>
            </a>

            <a className="cursor-pointer hover:opacity-30"
              target="_blank"
              href={siteConfig.links.twitter}
            >
              <span className="i-simple-icons-x w-7 h-7 "/>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
