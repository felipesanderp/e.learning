'use client'

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
import { useState } from "react";
import { Courses } from "@prisma/client";

interface EditCourseFormProps {
  courseId: string
}

export function EditCourseForm({ courseId }: EditCourseFormProps) {
  const [course, setCourse] = useState<Courses>()

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
              <Textarea />
            </div>
          </section>

          <Separator className="my-8" />

          <section>
            <CardTitle>Lessons</CardTitle>
          </section>
        </CardContent>
      </Card>
    </form>
  )
}