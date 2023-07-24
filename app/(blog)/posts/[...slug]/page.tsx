import Link from "next/link"
import { notFound } from "next/navigation"
import { allPosts } from "contentlayer/generated"

import { getTableOfContents } from "@/lib/toc"
import { Icons } from "@/components/icons"
import { Mdx } from "@/components/mdx-components"
import { DocsPageHeader } from "@/components/page-header"
import { TableOfContents } from "@/components/toc"

import "@/styles/mdx.css"
import { Metadata } from "next"

import {  cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

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

export async function generateStaticParams(): Promise<
PostPageProps["params"][]
> {
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
      <main className="relative py-6 lg:grid lg:grid-cols-[1fr_300px] lg:gap-10 lg:py-10 xl:gap-20">
        <div>
          <DocsPageHeader heading={page.title} text={page.description} />
          <Mdx code={page.body.code} />
          <hr className="my-4" />
          <div className="flex justify-center py-6 lg:py-10">
            <Link
              href="/posts"
              className={cn(buttonVariants({ variant: "ghost" }))}
            >
              <Icons.chevronLeft className="mr-2 h-4 w-4" />
              See all posts
            </Link>
          </div>
        </div>
        <div className="hidden text-sm lg:block flex">
          <div className="sticky top-16 -mt-10 max-h-[calc(var(--vh)-4rem)] overflow-y-auto pt-10">
            <TableOfContents toc={toc} />
          </div>
        </div>
      </main>
    </>
  )
}
