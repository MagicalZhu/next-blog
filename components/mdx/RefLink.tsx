import { cn } from "@/lib/utils"
import { Icons } from '@/components/icons'
import Link from "next/link"
import { badgeVariants } from "@/components/ui/badge"

interface RefLinkProps {
  src: string,
  children?: React.ReactNode
}

export function RefLink({
  src,
  children
}: RefLinkProps) {
  return (
    <div className="mt-1">
      <Link
        href={src}
        target="_blank"
        rel="noreferrer"
        className={cn(
          badgeVariants({ variant: "secondary" }),
          "rounded px-2 py-0.5"
        )}
      >
          {children}
        <Icons.ExternalLink className="h-4 w-4 pl-1" />
      </Link>
    </div>
  )
}
