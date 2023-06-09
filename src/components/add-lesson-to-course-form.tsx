import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Lessons } from "@prisma/client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { Icons } from "@/components/icons"

const addLessonSchema = z.object({
  lessonId: z.string()
})

type FormData = z.infer<typeof addLessonSchema>

interface AddLessonToCourseParams {
  courseId: string
  showAddLessonAlert: boolean
  setShowAddLessonAlert: Dispatch<SetStateAction<boolean>>
}

export function AddLessonToCourse({ 
  courseId, 
  showAddLessonAlert, 
  setShowAddLessonAlert 
}:AddLessonToCourseParams) {
  const router = useRouter()
  const [lessons, setLessons] = useState<Lessons[]>()
  const [isAddingLessonLoading, setIsAddingLessonLoading] = useState<boolean>(false)

  const form = useForm<FormData>({
    resolver: zodResolver(addLessonSchema),
    mode: 'all',
    defaultValues: {
      lessonId: undefined,
    }
  })

  useEffect(() => {
    async function getLessons() {
      const response = await fetch('/api/lessons', {
        method: 'GET',
      })

      setLessons(await response.json())
    }

    getLessons()
  }, [])

  async function onSubmit(data: FormData) {
    setIsAddingLessonLoading(true)

    const response = await fetch(`/api/courses/${courseId}/connect-lesson/${data.lessonId}`, {
      method: 'PATCH',
    })

    if (!response?.ok) {
      toast({
        title: "Algo deu errado.",
        description: "A aula não foi removida. or favor, tente novamente.",
        variant: "destructive",
      })
    }
    
    if(response.ok) {
      setIsAddingLessonLoading(false)
      setShowAddLessonAlert(false)
      router.refresh()
    }
  }

  return (
    <AlertDialog open={showAddLessonAlert} onOpenChange={setShowAddLessonAlert}>
      <Form {...form}>
        <form>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Selecione uma aula para adicionar a este curso.
              </AlertDialogTitle>
            </AlertDialogHeader>
            <div>   
              <div>
                <FormField
                  control={form.control}
                  name="lessonId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lesson</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione uma aula..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {lessons?.map((lesson) => (
                              <SelectItem
                                key={lesson.id}
                                value={lesson.id}
                              >
                                {lesson.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={form.handleSubmit(onSubmit)}
              >
                {isAddingLessonLoading ? (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Icons.add className="mr-2 h-4 w-4" />
                )}
                Adicionar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </form>
      </Form>
    </AlertDialog>
  )
}