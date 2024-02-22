import { PostItem } from "@/components/blog/post-item"

export const metadata = {
  title: "Posts",
  description: "Posts",
}

export default function PostsPage() {

  return (
    <div className="slide-enter container flex-1 items-start md:grid md:gap-6 lg:gap-10">
      <PostItem/>
    </div>
  )
}
