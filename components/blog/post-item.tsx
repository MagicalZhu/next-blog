"use client"

import {useEffect, useState} from "react"
import { compareDesc, getYear } from "date-fns"
import { allPosts } from "contentlayer/generated"
import type { Post } from "contentlayer/generated"
import Link from "next/link"
import { formatDate,cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface PostList {
  [keyName:number]:Post[]
}
interface CateList {
  [keyName:string]: number
}

const posts = allPosts
  .filter((guide) => !guide.draft)
  .sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date))
  })


export function PostItem() {

  const [pageData, setPageData] = useState({})
  const categoryData:CateList = { }

  posts.forEach((post) => {
    post.categories?.forEach((item) => {
      categoryData[item] = categoryData[item] ? categoryData[item] + 1 : 1
    })
  })

  const [keyword, setKeyWord] = useState('')

  useEffect(() => {
    const postData:PostList = {}
    posts.forEach((post) => {
      if (keyword === '' || post?.categories?.includes(keyword)) {
        const year = getYear(new Date(post.date))
        if (!postData[year]) {
          postData[year] = [post]
        } else {
          postData[year].push(post)
        }
      }
    })
    setPageData(postData)
  }, [keyword])


  if (!Object.keys(pageData)?.length) {
    return (
      <p>No posts published.</p>
    )
  }

  return (
    <main className="relative lg:gap-16 xl:grid xl:grid-cols-[1fr_200px]">
      <div className="space-y-8">
        {
          Object.keys(pageData)
            .sort((a,b) => {  return parseInt(b) - parseInt(a) })
            .map((year) => (
              <>
                <div className="relative pointer-events-none blogGroup">
                  <span className="blogYear">
                    {year}
                  </span>
                </div>
                { pageData[year].map((post:Post) => (
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
        <div className="fixed top-16 -mt-10 max-h-[calc(var(--vh)-4rem)] overflow-y-auto  float-right">
          <span>分类:</span>
          <ul className="ml-6 list-disc">
            {
              Object.keys(categoryData).map((tag,index) => (
                <li className="marker:text-zinc-400"
                    key={index}>
                  <Button variant="link"
                          className={cn(
                            "px-1",
                            (keyword === tag)
                              ? "underline decoration-wavy decoration-1 underline-offset-4 decoration-black  text-black"
                              : "hover:no-underline text-slate-400"
                          )}
                          onClick={() => setKeyWord(tag)}
                    >
                      <span>{tag}</span>
                  </Button>
                  <span className={cn(
                    "ml-4 text-xs",
                    (keyword === tag)
                      ? "text-black font-bold"
                      : "text-muted-foreground"
                  )}>
                    {categoryData[tag]}
                  </span>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </main>
  )
}
