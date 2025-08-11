import type React from "react"
import "../app/globals.css"
import { ThemeProvider } from "../components/theme-provider"

export const metadata = {
  title: "AggieX - A&M's Startup Accelerator",
  description:
    "AggieX is Texas A&M's startup accelerator. We help students and alumni build their startups and connect with the resources they need to succeed.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
