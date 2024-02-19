"use client"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import {  cn } from "@/lib/utils"

export function ScrollBtn() {
  return (
    <Button
      variant="ghost"
      title="Scroll to top"
      className={cn(
        "sticky right-6 bottom-3 rounded-full float-right",
      )}
      onClick = {() => window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })}
    >
      <Icons.ArrowUpIcon className="w-4 h-6" />
  </Button>
  )
}
