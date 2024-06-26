import { Inter } from "next/font/google"
import { GeistSans } from "geist/font/sans"
import localFont from "next/font/local"
import { DM_Sans } from "next/font/google"
import "@/styles/index.css"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import StoreProvider from "@/components/store-provider"

import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"


const fontSans = GeistSans

/*
const fontSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-sans",
})
*/

const interSans = Inter({
  subsets: ["latin"],
  variable: "--font-inter-sans",
})

// Font files can be colocated inside of `pages`
const fontHeading = localFont({
  src: "../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
})

interface RootLayoutProps {
  children: React.ReactNode
}

// define website metadata
export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Next.js",
    "Blog",
    "Tailwind CSS",
  ],
  authors: [
    {
      name: "huakucha",
      url: "https://www.huakucha.top",
    },
  ],
  creator: "huakucha",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "zh-cn",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "slide-enter",
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          interSans.variable,
          fontHeading.variable
        )}
      >

          <ThemeProvider attribute="class"
                        defaultTheme="system"
                        enableSystem>
            <StoreProvider>
              <div vaul-drawer-wrapper="">
                <div className="relative flex min-h-screen flex-col bg-background">
                  <SiteHeader />
                    {children}
                  <SiteFooter />
                </div>
              </div>
            </StoreProvider>
            <Toaster />
            <TailwindIndicator />
          </ThemeProvider>

      </body>
    </html>
  )
}
