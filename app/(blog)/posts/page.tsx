import Link from "next/link"
import { allPosts } from "contentlayer/generated"
import { compareDesc } from "date-fns"
import { Icons } from "@/components/icons"
import { ScrollArea } from "@/components/ui/scroll-area"
import { formatDate } from "@/lib/utils"
import { DocsPageHeader } from "@/components/page-header"

export const metadata = {
  title: "Posts",
  description:
    "This section includes end-to-end guides for developing Next.js 13 apps.",
}

export default function PostsPage() {
  const posts = allPosts
    .filter((guide) => guide.published)
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date))
    })

  return (
    <>
      {posts?.length ? (
        <div className="grid grid-cols-12 grid-flow-row-dense gap-2 md:gap-4 items-start">
          <div className="top-[128px] sticky">
            <Link
              href="/"
              rel="noreferrer"
              className="inline-flex">
              <Icons.back className="h-5 w-5"/>
              <span className="pl-2">Index</span>
            </Link>
          </div>
          <div className="px-8 col-span-9">
            {posts.map((post) => (
              <article
                key={post._id}
                className="group relative rounded-lg border p-6 shadow-md transition-shadow hover:shadow-lg mt-4"
              >
                <div className="flex flex-grow justify-between space-y-4">
                  <div className="space-y-2">
                    <h2 className="text-xl font-medium tracking-tight">
                      {post.title}
                    </h2>
                    {post.description && (
                      <p className="text-muted-foreground">{post.description}</p>
                    )}
                  </div>
                  {post.date && (
                    <p className="text-sm text-muted-foreground">
                      {formatDate(post.date)}
                    </p>
                  )}
                </div>
                <Link href={post.slug} className="absolute inset-0">
                  <span className="sr-only">View</span>
                </Link>
              </article>
            ))}
          </div>
          <div className="top-[88px] sticky">
            <span>分类:</span>
            <ul className="ml-6 list-disc [&>li]:mt-2">
              <li>Vue</li>
              <li>周刊</li>
              <li>React</li>
              <li>Java</li>
            </ul>
          </div>
        </div>
      ) : (
        <p>No posts published.</p>
      )}
    </>
  )
}
