import Link from "next/link"
import { notFound } from "next/navigation"
import { allPosts } from "contentlayer/generated"

import { getTableOfContents } from "@/lib/toc"
import { Icons } from "@/components/icons"
import { Mdx } from "@/components/mdx/mdx-components"
import { DocsPageHeader } from "@/components/layout/page-header"
import { TableOfContents } from "@/components/mdx/toc"

import { Metadata } from "next"
import {  cn, formatDate } from "@/lib/utils"
import { buttonVariants,Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollBtn } from "@/components/layout/scroll-btn"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

interface PostPageProps {
  params: {
    slug: string[]
  }
}

async function getPageFromParams(params) {
  const slug = params?.slug?.join("/")
  const page = allPosts.find((item) => item.slugAsParams === slug)
  if (!page) {
    null
  }
  return page
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const page = await getPageFromParams(params)
  if (!page) {
    return {}
  }

  return {
    title: page.title,
    description: page.description,
    openGraph: {
      title: page.title,
      description: page.description,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
    },
  }
}

export async function generateStaticParams(): Promise<PostPageProps["params"][]> {
  return allPosts.map((guide) => ({
    slug: guide.slugAsParams.split("/"),
  }))
}

export default async function PostPage({ params }: PostPageProps) {
  const page = await getPageFromParams(params)
  if (!page) {
    notFound()
  }

  const toc = await getTableOfContents(page.body.raw)
  return (
    <>
      <div className={cn(
        "slide-enter max-w-[85vw] mx-auto flex-1 items-start",
        "md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6",
        "lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10"
      )}>
        <aside className="fixed top-14 z-30 hidden w-full shrink-0 md:sticky md:block">
          <ScrollArea className="h-full py-6 pr-6 lg:py-8">
            <TableOfContents toc={toc} />
          </ScrollArea>
        </aside>
        <main className="relative py-6 lg:gap-10 lg:py-10 xl:grid">
          <div  className="w-[85%] min-w-0">
            <div>
              <h1 className="mt-2 inline-block font-heading text-4xl leading-tight lg:text-5xl">
                {page.title}
              </h1>
              {page.authors?.length ? (
                <ScrollArea className="whitespace-nowrap">
                  <div className="mt-6 flex space-x-2 pl-4">
                    {/* page.authors ? (
                        <Link
                          href={`https://twitter.com/${page.authors}`}
                          className="flex items-center space-x-2 text-sm"
                        >
                            <Avatar className="h-12 w-12">
                              <AvatarImage src="/images/avatars/ant.png" />
                              <AvatarFallback>{page.authors}</AvatarFallback>
                            </Avatar>
                          <div className="flex-1 text-left leading-tight">
                            <p className="font-medium">{page.authors}</p>
                            <p className="text-xs text-muted-foreground">
                              @{page.authors}
                            </p>
                          </div>
                        </Link>
                      ) : null
                    */}
                    {page.date && (
                      <time dateTime={page.date}
                            className="text-sm text-muted-foreground my-auto">
                        {formatDate(page.date, true)}
                      </time>
                    )}
                    {
                      page.tags?.map((tag:string) => (
                        <div className="flex items-center gap-1">
                          <Badge key={tag}
                                variant="secondary"
                                className="rounded-md">
                            <span className="text-black">{tag}</span>
                          </Badge>
                        </div>
                      ))
                    }
                  </div>
                  <ScrollBar orientation="horizontal" className="w-[1px]"/>
                </ScrollArea>
              ) : null}
            </div>
            <article className="sm:tracking-wide tracking-[1px]">
              <Mdx code={page.body.code} />
            </article>
          </div>
        </main>
      </div>
      <ScrollBtn/>
    </>
  )
}
