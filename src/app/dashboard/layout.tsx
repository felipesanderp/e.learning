import * as React from "react"
import Link from "next/link"
import { notFound } from "next/navigation"

import { Icons } from "@/components/icons"
import { UserAccountNav } from "@/components/user-account-nav"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

import { dashboardConfig } from "@/config/dashboard"
import { siteConfig } from "@/config/site"
import { getCurrentUser } from "@/lib/session"

interface DashboardLayoutProps {
  children?: React.ReactNode
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const user = await getCurrentUser()

  if (!user) {
    return notFound()
  }

  return (
    <div>
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <Link href="/dashboard" className="hidden items-center space-x-2 md:flex">
            <Icons.graduationCap className="stroke-purple-500" />
            <span className="hidden font-bold sm:inline-block">
              {siteConfig.name}
            </span>
          </Link>
          <MainNav items={dashboardConfig.mainNav} className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <ThemeToggle />
            <UserAccountNav 
              user={{
                name: user.name,
                image: user.image,
                email: user.email,
              }}
            />
          </div>
        </div>
      </div>
      {children}
    </div>
  )
}