"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import * as z from 'zod'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lessons } from "@prisma/client"

import { lessonPatchSchema } from "@/lib/validations/lesson";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { toast } from "@/hooks/use-toast";

type FormData = z.infer<typeof lessonPatchSchema>

interface EditLessonForm {
  lesson: Pick<Lessons, "id" | "name" | "slug" | "description" | "video_id">
}

export function EditLessonForm({ lesson }: EditLessonForm) {
  const router = useRouter()

  const [isSaving, setIsSaving] = useState<boolean>(false)
  
  const form = useForm<FormData>({
    resolver: zodResolver(lessonPatchSchema),
    mode: 'all',
    values: {
      name: lesson.name,
      description: lesson.description,
      video_id: lesson.video_id,
    }
  })

  async function onSubmit(data: FormData) {
    setIsSaving(true)

    const response = await fetch(`/api/lessons/${lesson.slug}`, {
      method: 'PATCH',
      body: JSON.stringify({
        name: data.name,
        description: data.description,
        video_id: data.video_id,
      })
    })

    setIsSaving(false)

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "The lesson was not updated. Please try again.",
        variant: "destructive",
      })
    }

    toast({
      description: "The lesson has been updated.",
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
            <CardTitle>
              Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <section className="space-y-4">
              <div className="grid grid-cols-2 items-end gap-6">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input
                    type="text"
                    {...form.register('name')}
                  />
                  {form.formState.errors.name && (
                    <p className="text-sm font-medium text-destructive">
                      {form.formState.errors.name.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-1 space-y-2">
                  <Label>Slug</Label>
                  <Input 
                    disabled
                    placeholder={lesson.slug}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Video Link</Label>
                <Input 
                  type="text"
                  {...form.register('video_id')}
                />
                {form.formState.errors.video_id && (
                  <p className="text-sm font-medium text-destructive">
                    {form.formState.errors.video_id.message}
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
            Update Lesson
          </Button>
        </div>
      </form>
    </>
  )
}