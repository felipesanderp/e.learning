"use client"

import { useEffect, useMemo, useState } from "react";
import { Courses, User } from "@prisma/client";
import { CoursesCard } from "../courses-card";

interface MyCourseProps {
  user: Pick<User, "id">
}

export function MyCourses({ user }: MyCourseProps) {
  const [myCourses, setMyCourses] = useState<Courses>()

  useMemo(() => {
    async function getMyCourses(meId: User['id']) {
      const response = await fetch(`/api/users/me/${meId}/my-courses`, {
        method: 'GET',
        next: { revalidate: 3600 }
      })
  
      const courses = await response.json()
  
      setMyCourses(courses)
    }
    getMyCourses(user.id)
  }, [user])

  return (
    <>
      {myCourses !== undefined ? (
        <CoursesCard 
          course={myCourses}
        />
      ): 'Loading...'}
    </>
  )
}