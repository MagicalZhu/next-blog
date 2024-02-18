import Link from "next/link"
import { allPosts } from "contentlayer/generated"
import type { Post } from "contentlayer/generated"
import { compareDesc } from "date-fns"
import { Icons } from "@/components/icons"
import { ScrollArea } from "@/components/ui/scroll-area"
import { formatDate,cn } from "@/lib/utils"
import { DocsPageHeader } from "@/components/layout/page-header"
import {getYear} from 'date-fns'

export const metadata = {
  title: "Posts",
  description: "Posts",
}

export default function PostsPage() {
  const postData:{
    [keyName:number]:Post[]
  } = {}

  const tagsData:{
    [keyName:string]: number
  } = { }

  const posts = allPosts
    .filter((guide) => !guide.draft)
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date))
  })
  posts.forEach((post) => {
    const year = getYear(new Date(post.date))
    if (!postData[year]) {
      postData[year] = [post]
    } else {
      postData[year].push(post)
    }
    post.tags?.forEach((item) => {
      if (!tagsData[item]) {
        tagsData[item] = 1
      } else {
        tagsData[item] = tagsData[item] + 1
      }
    })
  })


  return (
    <div className="slide-enter container flex-1 items-start md:grid md:gap-6 lg:gap-10">
      {Object.keys(postData)?.length ? (
        <main className="relative lg:gap-16 xl:grid xl:grid-cols-[1fr_200px]">
          <div className="space-y-8">
            {
              Object.keys(postData).sort((a,b) => {  return parseInt(b) - parseInt(a) })
                                  .map((year) => (
                <>
                  <div className="relative pointer-events-none blogGroup">
                    <span className="blogYear">
                      {year}
                    </span>
                  </div>
                  { postData[year].map((post:Post) => (
                    <Link
                      href={post.slug}
                      key={post._id}
                      className="flex items-center"
                    >
                      <div className="ml-4 space-y-1">
                        <p className="font-semibold leading-none">{post.title}</p>
                        {post.description &&
                          (
                            <p className="text-sm text-muted-foreground">
                              {post.description}
                            </p>
                          )
                        }
                      </div>
                      {post.date && (
                        <div className="text-xs ml-auto text-muted-foreground">
                          {formatDate(post.date)}
                        </div>
                      )}
                    </Link>
                  ))}
                </>
              ))
            }
          </div>
          <div className="hidden text-sm xl:block">
            <div className="sticky top-16 -mt-10 max-h-[calc(var(--vh)-4rem)] overflow-y-auto pt-10 float-right">
              <span>标签:</span>
              <ul className="ml-6 list-disc [&>li]:mt-2">
                {
                  Object.keys(tagsData).map((tag) => (
                    <li className="marker:text-slate-400">
                      <Link href={"/posts"}
                            className={cn(
                              "underline decoration-wavy decoration-1 underline-offset-2",
                              "decoration-slate-400 hover:decoration-slate-800"
                            )}>
                        <span>{tag}</span>
                      </Link>
                      <span className="ml-4 text-xs text-muted-foreground">{tagsData[tag]}</span>
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>
        </main>
      ) : (
        <p>No posts published.</p>
      )}
    </div>
  )
}
