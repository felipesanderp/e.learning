import { redirect } from "next/navigation"

import { db } from "@/lib/db"
import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { getCurrentUser } from "@/lib/session";
import { CreateCourse } from "@/components/create-course";
import { CoursesCard } from "@/components/courses-card";

export const metadata = {
  title: 'Courses | e.learning',
}

export interface Course {
  title: string
  professor: string;
  lessons: number,
  createdAt: Date;
  cover: string
}

// const courses: Course[] = [
//   {
//     title: "Async Awakenings",
//     professor: "Nina Netcode",
//     lessons: 15,
//     cover:
//       "https://images.unsplash.com/photo-1547355253-ff0740f6e8c1?w=300&dpr=2&q=80",
//     createdAt: new Date(),
//   },
//   {
//     title: "The Art of Reusability",
//     professor: "Lena Logic",
//     lessons: 15,
//     cover:
//       "https://images.unsplash.com/photo-1576075796033-848c2a5f3696?w=300&dpr=2&q=80",
//     createdAt: new Date(),
//   },
//   {
//     title: "Stateful Symphony",
//     professor: "Beth Binary",
//     lessons: 15,
//     cover:
//       "https://images.unsplash.com/photo-1606542758304-820b04394ac2?w=300&dpr=2&q=80",
//     createdAt: new Date(),
//   },
//   {
//     title: "React Rendezvous",
//     professor: "Ethan Byte",
//     lessons: 15,
//     cover:
//       "https://images.unsplash.com/photo-1598295893369-1918ffaf89a2?w=300&dpr=2&q=80",
//     createdAt: new Date(),
//   },
//   {
//     title: "React Rendezvous",
//     professor: "Ethan Byte",
//     lessons: 15,
//     cover:
//       "https://images.unsplash.com/photo-1598295893369-1918ffaf89a2?w=300&dpr=2&q=80",
//     createdAt: new Date(),
//   },
//   {
//     title: "React Rendezvous",
//     professor: "Ethan Byte",
//     lessons: 15,
//     cover:
//       "https://images.unsplash.com/photo-1598295893369-1918ffaf89a2?w=300&dpr=2&q=80",
//     createdAt: new Date(),
//   },
// ]

export default async function CoursesPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/")
  }

  const courses = await db.courses.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      imageURL: true,
      slug: true,
    },
  })
  
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Courses"
        text={user?.role === "ADMIN" || user?.role === 'PROFESSOR' ? "Create and manage courses." : "See the available courses."}
      >
        {user?.role === 'ADMIN' || user?.role === 'PROFESSOR' ?
          <CreateCourse /> : ''
        }
      </DashboardHeader>
      
      <div className="container grid gap-y-4 w-full lg:grid-cols-4">
        {courses.map((course) => (
          <CoursesCard 
            key={course.id}
            course={course}
          />
        ))}
      </div>
    </DashboardShell>
  )
}