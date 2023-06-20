'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";
import * as z from 'zod'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ROLE } from '@prisma/client';

import { userPatchSchema } from '@/lib/validations/user';

import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Icons } from "@/components/icons";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

import { ResetUserPasswordForm } from "@/components/reset-user-password-form";
import { EditCourseStudentOperations } from "./edit-course-student-operations";

type FormData = z.infer<typeof userPatchSchema>

interface EditeUserFormProps {
  user: {
    id: string
    name: string
    email: string
    bio: string
    role: ROLE
    enrollments: {
      course: {
        id: string
        title: string
      }
    }[]
  }
}

export function EditUseForm({ user }: EditeUserFormProps) {
  const router = useRouter()

  const [isSaving, setIsSaving] = useState<boolean>(false)

  const form = useForm({
    resolver: zodResolver(userPatchSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      role: user.role,
      bio: user.bio,
    }
  })

  async function onSubmit(data: FormData) {
    setIsSaving(true)
    const response = await fetch(`/api/users/${user.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        image: data.image,
        role: data.role,
      })
    })

    setIsSaving(false)

    if (!response.ok) {
      return toast({
        title: "Algo deu errado.",
        description: "O usuário não foi atualizado! Por favor, tente novamente.",
        variant: "destructive"
      })
    }

    toast({
      description: "O usuário foi atualizado.",
    })

    router.refresh()
  }

  return (
    <div className="grid max-w-screen-2xl grid-cols-1 gap-4 md:grid-cols-6">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="md:col-span-4 space-y-4"
      >
        <Card>
          <CardHeader>
            <CardTitle>Detalhes</CardTitle>
          </CardHeader>
          <CardContent>
            <section className="space-y-4">
              <div className="grid grid-cols-2 items-end gap-6">
                <div className="space-y-2">
                  <Label>Nome</Label>
                  <Input 
                    type="text"
                    {...form.register('name')}
                  />
                </div>
                <div className="space-y-2">
                  <Label>E-mail</Label>
                  <Input 
                    type="email"
                    {...form.register('email')}
                  />
                </div>
              </div>
            </section>

            <div className="mt-2 space-y-2">
              <Label>Bio</Label>
              <Textarea 
                {...form.register('bio')}
              />
            </div> 

            <Separator className="my-8" />

            <section>
              <CardTitle className="mb-4">Cursos</CardTitle>
            </section>
            <div className="mb-2 space-y-4">
              {user.enrollments.length ? (
                <div className="space-y-2">
                  {user.enrollments.map((course, index) => (
                    <div key={index} className="divide-y divide-border rounded-md border">
                      <div  className="flex items-center justify-between p-2">
                        <div className="grid gap-1">
                          <p className="font-semibold"
                          >
                            {course.course.title}
                          </p>
                        </div>
                        <EditCourseStudentOperations 
                          studentId={user.id}
                          courseId={course.course.id}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <h2>Sem cursos.</h2>
              )}
            </div>
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
            Atualizar usuário
          </Button>
        </div>
      </form>

      <ResetUserPasswordForm 
        user={{
          id: user.id
        }}
      />
    </div>
  )
}