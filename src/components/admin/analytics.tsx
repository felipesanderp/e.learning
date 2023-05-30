'use client'

import { useState, useEffect } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AdminAnalytics() {
  const [totalStudents, setTotalStudents] = useState<number>()
  const [totalProfessors, setTotalProfessors] = useState<number>()
  const [totalCourses, setTotalCourses] = useState<number>()

  useEffect(() => {
    async function getTotalStudents() {
      const response = await fetch('/api/users/total-students', {
        method: 'GET',
        next: { revalidate: 3600 }
      })

      setTotalStudents(await response.json())
    }

    getTotalStudents()
  }, [])

  useEffect(() => {
    async function getTotalProfessors() {
      const response = await fetch('/api/users/total-professors', {
        method: 'GET',
        next: { revalidate: 3600 }
      })

      setTotalProfessors(await response.json())
    }

    getTotalProfessors()
  }, [])

  useEffect(() => {
    async function getTotalCourses() {
      const response = await fetch('/api/courses/total-courses', {
        method: 'GET',
        next: { revalidate: 3600 }
      })

      setTotalCourses(await response.json())
    }

    getTotalCourses()
  }, [])

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Students
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalStudents}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Professors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalProfessors}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Courses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalCourses}</div>
        </CardContent>
      </Card>
    </div> 
  )
}