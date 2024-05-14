"use client"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import {  cn } from "@/lib/utils"

import React from 'react';
import useScroll from "@/hooks/use-scroll";

export function ScrollBtn() {
  const scrolled = useScroll(100);
  return (
    <Button
      variant="ghost"
      size="icon"
      title="Scroll to top"
      className={cn(
        "sticky right-6 bottom-3 rounded-full float-right",
        scrolled
          ? "opacity-80"
          : "hidden"
      )}
      onClick = {() => window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })}
    >
      <Icons.ArrowUpIcon className="h-4 w-4" />
  </Button>
  )
}
