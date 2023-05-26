'use client'

import Link from "next/link";
import { Fragment, useState } from "react";
import { Courses } from "@prisma/client";

import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { EditCourseLessonOperations } from "./edit-course-lesson-operations";

interface EditCourseFormProps {
  courseId: string
}

interface Course extends Courses {
  lessons: {
    id: string
    name: string,
  }[]
}

export function EditCourseForm({ courseId }: EditCourseFormProps) {
  const [course, setCourse] = useState<Course>()

  async function getCourseDetails() {
    const response = await fetch(`/api/courses/${courseId}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
    })
  
    setCourse(await response.json())
  }
  getCourseDetails()

  return (
    <form className="grid grid-cols-1 gap-4 md:grid-cols-6">
      <Card className="md:col-span-6">
        <CardHeader>
          <CardTitle>Details</CardTitle>
        </CardHeader>
        <CardContent>
          <section className="space-y-4">
            <div className="grid grid-cols-2 items-end gap-6">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input 
                  type="text"
                  placeholder={course?.title}
                />
              </div>
              <div className="grid gap-1 space-y-2">
                <Label>Slug</Label>
                <Input 
                  disabled
                  placeholder={course?.slug}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Image</Label>
              <Input 
                type="text"
                placeholder={course?.imageURL}
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea 
                placeholder={course?.description}
              />
            </div>
          </section>

          <Separator className="my-8" />

          <section>
            <CardTitle className="mb-4">Lessons</CardTitle>
          </section>
          <div className="mb-2 space-y-4">
            {course?.lessons.length ? (
              <div>
                {course?.lessons.map((lesson, index) => (
                  <div key={index} className="divide-y divide-border rounded-md border">
                    <div  className="flex items-center justify-between p-2">
                      <div className="grid gap-1">
                        <Link
                          href="/dashboard/lessons"
                          className="font-semibold hover:underline"
                        >
                          {lesson.name}
                        </Link>
                      </div>
                      <EditCourseLessonOperations lesson={{ id: lesson.id, name: lesson.name }} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <h2>No lessons.</h2>
            )}
          </div>
        </CardContent>
      </Card>
    </form>
  )
}