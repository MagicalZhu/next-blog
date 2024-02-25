"use client"

import {useEffect, useState} from "react"
import { compareDesc, getYear } from "date-fns"
import { allPosts } from "contentlayer/generated"
import type { Post } from "contentlayer/generated"
import Link from "next/link"
import { formatDate,cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import { useAppSelector, useAppDispatch } from '@/store/store'
import { setCategory } from '@/store/posts/postSlice'

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


  const keyword = useAppSelector((state) => state.post.category)

  // const [keyword, setKeyword] = useState('')
  const dispatch = useAppDispatch()
  console.log('--------:'+keyword)

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
    <main className="relative py-6 md:grid md:grid-cols-[1fr_300px] md:gap-10 md:py-10">
      <div>
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
                        className="flex items-center pt-8"
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
      <div className="hidden text-sm md:block">
        <div className="sticky top-16 -mt-10  overflow-y-auto pt-10 float-right">
          <span>分类:</span>
          <ul className="ml-6 list-disc">
            {
              Object.keys(categoryData).map((tag,index) => (
                <li className="marker:text-zinc-400">
                  <Button variant="link"
                          key={index}
                          className={cn(
                            "px-1",
                            (keyword === tag)
                              ? "underline decoration-wavy decoration-1 underline-offset-4 decoration-black  text-black"
                              : "hover:no-underline text-slate-400"
                          )}
                          onClick={() => dispatch(setCategory(tag))}
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
