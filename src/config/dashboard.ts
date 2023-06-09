import { DashboardConfig } from "@/types"

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Home",
      href: "/dashboard",
    },
    {
      title: "Cursos",
      href: "/dashboard/courses"
    },
    {
      title: "Aulas",
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
      title: "Cursos",
      href: "/dashboard/courses",
      icon: "graduationCap",
    },
    {
      title: "Aulas",
      href: "/dashboard/lessons",
      icon: "bookOpen",
    }
  ]
}