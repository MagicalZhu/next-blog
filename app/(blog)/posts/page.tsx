import Link from "next/link"
import { allPosts } from "contentlayer/generated"
import { compareDesc } from "date-fns"

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
    <div className="py-6 lg:py-10">
      {posts?.length ? (
        <div className="grid gap-4 md:grid-cols-2 md:gap-6">
          {posts.map((post) => (
            <article
              key={post._id}
              className="group relative rounded-lg border p-6 shadow-md transition-shadow hover:shadow-lg"
            >
              <div className="flex flex-col justify-between space-y-4">
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
      ) : (
        <p>No posts published.</p>
      )}
    </div>
  )
}
