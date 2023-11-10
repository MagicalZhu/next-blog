import Link from "next/link"

import { env } from "@/env.mjs"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import "@/styles/about.css"

export default async function IndexPage() {

  return (
    <>
        <div className="font-mono font-italic text-3xl items-start">
          Pacos
          {/* <span className="text-sm align-text-bottom text-gray-400 pl-3">do More</span> */}
        </div>
        <p className="font-mono text-base">
          Hey! I'm Pacos, a FE & BE developer.Currently working at a Japanese company.
        </p>

        <div className="grid grid-cols-2 gap-1">
          <section>
            <Link href="/posts"
              target="_blank"
              className="flex items-center gap-1 decoration-none border-none cursor-pointer hover:opacity-30"
            >
              <span className="blockTitle">Posts</span>
              <Icons.MoveUpRight className="text-xl text-muted-foreground " size={15}/>
            </Link>
          </section>

          <section>
            <Link href="/projects"
              target="_blank"
              className="flex items-center gap-1 decoration-none border-none cursor-pointer hover:opacity-30"
            >
              <span className="blockTitle">Projects</span>
              <Icons.MoveUpRight className="text-xl text-muted-foreground " size={15}/>
            </Link>
          </section>
        </div>

        <div className="grid grid-cols-2 gap-1">
          <div>
            123
          </div>
          <div>
            <span>0.</span>
            <Link href="https://github.com/MagicalZhu/NoteLib"
                  target="_blank"
                  className="decoration-black underline underline-offset-8	decoration-1 decoration-zinc-300 hover:decoration-black">
              <em className="ml-2">NoteLib</em>
            </Link>
          </div>
        </div>

        <section>
          <p className="blockTitle">Now</p>
          <p className="font-mono mt-[8px]">
            The programming languages I currently use regularly are Javascript and java.And i have recently been learning more about the Spring Framework and computer networking.
          </p>
          <p className="font-mono pt-[2em]">
            Outside of programming, I also watch movies, especially science fiction and action movies, such as the Marvel series and the DC series.
          </p>
        </section>
        <hr className="mt-[15px]"/>

        <section>
          <span className="blockTitle">Contact</span>
          <div className="grid grid-cols-3 gap-1 mt-[8px]">
            <div>
              <Link className="connectItem"
                target="_blank"
                href="mailto:huakucha95@163.com"
              >
                <Icons.Mail className="text-xl mr-2"/>
                <p>Email</p>
              </Link>
            </div>
            <div>
              <Link className="connectItem"
                target="_blank"
                href="https://github.com/MagicalZhu"
              >
                <Icons.Github className="text-xl mr-2"/>
                <p>Github</p>
              </Link>
            </div>
            <div>
              <Link className="connectItem"
                target="_blank"
                href="https://m.cmx.im/@athu"
              >
                <Icons.Mail className="text-xl mr-2"/>
                <p>Mastodon</p>
              </Link>
            </div>
          </div>
        </section>
    </>
  )
}
