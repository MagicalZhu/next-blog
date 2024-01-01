import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import dayjs from 'dayjs'
import { env } from "@/env.mjs"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(d: string | Date, hasYear: boolean = false) {
  const date = dayjs(d)
  if (!hasYear) {
    return date.format('MMM D')
  }
  return date.format('MMM D , YYYY')
}

export function absoluteUrl(path: string) {
  return `${env.NEXT_PUBLIC_APP_URL}${path}`
}
