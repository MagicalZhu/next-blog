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
  let postData:PostList = {}

  const  collectPostItems= (post:Post) => {
    const year = getYear(new Date(post.date))
    if (!postData[year]) {
      postData[year] = [post]
    } else {
      postData[year].push(post)
    }
  }

  posts.forEach((post) => {
    post.categories?.forEach((item) => {
      categoryData[item] = categoryData[item] ? categoryData[item] + 1 : 1
    })
    collectPostItems(post)
  })
  setPageData(postData)

  const [keyword, setKeyWord] = useState('')

  useEffect(() => {
    posts.forEach((post) => {
      if (keyword === '' || post?.categories?.includes(keyword)) {
        collectPostItems(post)
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
          Object.keys(pageData).sort((a,b) => {  return parseInt(b) - parseInt(a) })
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
        <div className="sticky top-16 -mt-10 max-h-[calc(var(--vh)-4rem)] overflow-y-auto pt-10 float-right">
          <span>分类:</span>
          <ul className="ml-6 list-disc [&>li]:mt-2">
            {
              Object.keys(categoryData).map((tag) => (
                <li className="marker:text-slate-400">
                  <Button variant="link"
                          className={cn(
                            "underline decoration-wavy decoration-1 underline-offset-2 px-0",
                            "decoration-slate-400 hover:decoration-slate-800"
                          )}
                          onClick={() => setKeyWord(tag)}
                    >
                      <span>{tag}</span>
                  </Button>
                  <span className="ml-4 text-xs text-muted-foreground">{categoryData[tag]}</span>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </main>
  )

}
