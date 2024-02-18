import Link from "next/link"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import dayjs from 'dayjs'
import { compareDesc } from "date-fns"
import { allPosts } from "contentlayer/generated"
import { formatDate } from "@/lib/utils"

const lastPosts = allPosts
.filter((guide) => !guide.draft)
.sort((a, b) => {
  return compareDesc(new Date(a.date), new Date(b.date))
})
.splice(0,4)
.map((item) => {
  return {
    title: item.title,
    tags: item.tags,
    time: item.date,
    slug: item.slug
  }
})

const years = dayjs().diff(dayjs('2017-9-1'), 'year')

export default async function IndexPage() {

  return (
    <div className="slide-enter pt-4 space-y-5">
      <section className="flex items-center gap-1 decoration-none border-none">
        <div>
          <p className="text-xl font-semibold">
            Bonjour, Here's {siteConfig.name} Space
            <span className="ml-2 text-2xl i-fluent-emoji-hugging-face align-text-bottom"></span>
          </p>
        </div>
      </section>

      <section>
        <p className="pt-2 max-w-[75ch]">
          FE & BE developer with over { years } years of web experience.
          <br/>
          Outside of work I learning Spring Framework、Database and CloudNative...
        </p>
      </section>

      <div className="grid grid-cols-2 gap-1">
        <section className="indexSection">
          <span className="indexBlock text-lg">Last posts</span>
        </section>
        <section className="mt-[15px]">
          <Link href="/posts"
                className={cn(
                  "flex gap-1 border-none cursor-pointer hover:opacity-30 w-32 duration-700 float-right",
                  "underline underline-offset-4 decoration-dashed decoration-[0.08em] decoration-zinc-400",
                  "hover:decoration-solid"
                )}
          >
            <p>See all posts</p>
          </Link>
        </section>
      </div>
      <section className="grid grid-cols-2 gap-6 md:flex-row md:flex-wrap">
        {
          lastPosts.map((article) => (
            <>
              <Link className="group flex cursor-pointer flex-col gap-5 rounded-md border
                                border-neutral-400 p-4 transition-all
                                  duration-300 hover:-translate-y-2 hover:border-neutral-700"
                        href={article.slug} >
                <div className="flex w-full flex-col justify-between gap-10 md:flex-row md:items-center">
                  <p className="basis-1/2">{ article.title }</p>
                  <p className="opacity-40 text-xs">
                    {formatDate(article.time, true) }
                  </p>
                  <div className="md:i-carbon-arrow-up-right flex flex-row items-center gap-4 text-muted-foreground"/>

                </div>
                <p className="flex">
                  {
                    article?.tags?.map((tagName) => (
                      <span className="tagName">
                        #{tagName}
                      </span>
                    ))
                  }
                </p>
              </Link>
            </>
          ))
        }
      </section>
      <section className="animate-delay-600">
        <p className="indexBlock text-lg">Now</p>
        <p className="mt-[8px]">
          The programming languages I currently use regularly are Javascript and java.And i have recently been learning more about the Spring Framework and computer networking.
        </p>
        <p className="pt-4">
          Outside of programming, I also watch movies, especially science fiction and action movies, such as the Marvel series and the DC series.      </p>
      </section>
      <hr className="indexHr"/>

      <section className="animate-delay-600">
        <span className="indexBlock text-lg">Contact</span>
        <div className="grid grid-cols-3 gap-1 mt-[8px]">
          <div>
            <a className="connectItem"
              target="_blank"
              href="mailto:huakucha95@163.com"
            >
              <span className="i-carbon-email-new"/>
              <p>Email</p>
            </a>
          </div>
          <div>
            <a className="connectItem"
              target="_blank"
              href="https://github.com/MagicalZhu"
            >
              <span className="i-carbon-logo-github"/>
              <p>Github</p>
            </a>
          </div>
          <div>
            <a className="connectItem"
              target="_blank"
              href="https://m.cmx.im/@athu"
            >
              <span className="i-carbon-logo-mastodon"/>
              <p>Mastodon</p>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
