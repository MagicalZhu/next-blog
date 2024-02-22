"use client"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import {  cn } from "@/lib/utils"

import React from 'react';
import { useScroll } from 'ahooks';

export function ScrollBtn() {
  const scroll = useScroll(document);
  return (
    <Button
      variant="ghost"
      size="icon"
      title="Scroll to top"
      className={cn(
        "sticky right-6 bottom-3 rounded-full float-right",
        scroll?.top && scroll?.top > 100
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
