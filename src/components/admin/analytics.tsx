'use client'

import { useState, useEffect } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from '../icons';

export function AdminAnalytics() {
  const [totalStudents, setTotalStudents] = useState<number>()
  const [totalProfessors, setTotalProfessors] = useState<number>()
  const [totalCourses, setTotalCourses] = useState<number>()
  const [totalLessons, setTotalLessons] = useState<number>()

  const [isLoadingStudents, setIsLoadingStudents] = useState<boolean>(false)
  const [isLoadingProfessors, setIslLoadingProfessors] = useState<boolean>(false)
  const [isLoadingCourses, setIslLoadingCourses] = useState<boolean>(false)
  const [isLoadingLessons, setIsLoadingLessons] = useState<boolean>(false)

  useEffect(() => {
    async function getTotalStudents() {
      setIsLoadingStudents(true)
      const response = await fetch('/api/users/total-students', {
        method: 'GET',
        next: { revalidate: 3600 }
      })

      setTotalStudents(await response.json())
      setIsLoadingStudents(false)
    }

    getTotalStudents()
  }, [])

  useEffect(() => {
    async function getTotalProfessors() {
      setIslLoadingProfessors(true)
      const response = await fetch('/api/users/total-professors', {
        method: 'GET',
        next: { revalidate: 3600 }
      })

      setTotalProfessors(await response.json())
      setIslLoadingProfessors(false)
    }

    getTotalProfessors()
  }, [])

  useEffect(() => {
    async function getTotalCourses() {
      setIslLoadingCourses(true)
      const response = await fetch('/api/courses/total-courses', {
        method: 'GET',
        next: { revalidate: 3600 }
      })

      setTotalCourses(await response.json())
      setIslLoadingCourses(false)
    }

    getTotalCourses()
  }, [])

  useEffect(() => {
    async function getTotalLessons() {
      setIsLoadingLessons(true)
      const response = await fetch('/api/lessons/total-lessons', {
        method: 'GET',
        next: { revalidate: 3600 }
      })

      setTotalLessons(await response.json())
      setIsLoadingLessons(false)
    }

    getTotalLessons()
  }, [])

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total de Alunos
          </CardTitle>
          <Icons.user className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {isLoadingStudents ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ): (
              totalStudents
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total de Professores
          </CardTitle>
          <Icons.users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {isLoadingProfessors ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ): (
              totalProfessors
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total de Cursos
          </CardTitle>
          <Icons.graduationCap className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {isLoadingCourses ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ): (
              totalCourses
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total de Aulas
          </CardTitle>
          <Icons.bookOpen className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {isLoadingLessons ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ): (
              totalLessons
            )}
          </div>
        </CardContent>
      </Card>
    </div> 
  )
}