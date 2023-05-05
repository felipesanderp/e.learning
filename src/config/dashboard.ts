import { DashboardConfig } from "@/types"

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Home",
      href: "/dashboard",
    },
    {
      title: "Courses",
      href: "/dashboard/courses"
    },
    {
      title: "Lessons",
      href: "/dashboard/lessons"
    }
  ],
  sidebarNav: [
    {
      title: "Home",
      href: "/dashboard",
      icon: "home",
    },
    {
      title: "Courses",
      href: "/dashboard/courses",
      icon: "graduationCap",
    },
    {
      title: "Lessons",
      href: "/dashboard/lessons",
      icon: "bookOpen",
    }
  ]
}