'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Courses } from "@prisma/client";
import * as z from 'zod'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { AddLessonToCourse } from "./add-lesson-to-course-form";
import { coursePatchSchema } from "@/lib/validations/course";
import { toast } from "@/hooks/use-toast";

interface EditCourseFormProps {
  courseId: string
}

interface Course extends Courses {
  lessons: {
    id: string
    name: string,
  }[]
}

type FormData = z.infer<typeof coursePatchSchema>

export function EditCourseForm({ courseId }: EditCourseFormProps) {
  const router = useRouter()
  
  const [course, setCourse] = useState<Course>()
  const [showAddLessonAlert, setShowAddLessonAlert] = useState<boolean>(false)
  const [isSaving, setIsSaving] = useState<boolean>(false)

  const form = useForm<FormData>({
    resolver: zodResolver(coursePatchSchema),
    mode: 'onChange',
    values: {
      title: course?.title,
      description: course?.description,
      imageURL: course?.imageURL,
    }
  })

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

  async function onSubmit(data: FormData) {
    setIsSaving(true)

    const response = await fetch(`/api/courses/${courseId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: data.title,
        description: data.description,
        imageURL: data.imageURL,
      })
    })

    setIsSaving(false)

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "The course was not updated. Please try again.",
        variant: "destructive",
      })
    }

    toast({
      description: "The course has been updated.",
    })

    router.refresh()
  }

  return (
    <>
      <form 
        onSubmit={form.handleSubmit(onSubmit)} 
        className="grid grid-cols-1 gap-4 md:grid-cols-6"
      >
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
                    {...form.register('title')}
                  />
                  {form.formState.errors.title && (
                    <p className="text-sm font-medium text-destructive">
                      {form.formState.errors.title.message}
                    </p>
                  )}
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
                  {...form.register('imageURL')}
                />
                {form.formState.errors.imageURL && (
                  <p className="text-sm font-medium text-destructive">
                    {form.formState.errors.imageURL.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea 
                  {...form.register('description')}
                />
                {form.formState.errors.description && (
                  <p className="text-sm font-medium text-destructive">
                    {form.formState.errors.description.message}
                  </p>
                )}
              </div>
            </section>

            <Separator className="my-8" />

            <section>
              <CardTitle className="mb-4">Lessons</CardTitle>
            </section>
            <div className="mb-2 space-y-4">
              {course?.lessons.length ? (
                <div className="space-y-2">
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
                        <EditCourseLessonOperations 
                          lesson={{ id: lesson.id, name: lesson.name }}
                          courseId={courseId} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <h2>No lessons.</h2>
              )}
            </div>
            <Button
              type="button"
              variant="link"
              className="border-none text-blue-600"
              onClick={() => setShowAddLessonAlert(true)}
            >
              <Icons.add className="h-4 w-4" />
              Add Lesson
            </Button>
          </CardContent>
        </Card>
        <div>
          <Button
            disabled={isSaving}
            type="submit"
          >
            {isSaving && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Update Course
          </Button>
        </div>
      </form>
      
      <AddLessonToCourse 
        courseId={courseId}
        setShowAddLessonAlert={setShowAddLessonAlert}
        showAddLessonAlert={showAddLessonAlert}
      />
    </>
  )
}