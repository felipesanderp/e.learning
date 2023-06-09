"use client"

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { Lessons } from '@prisma/client'

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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Icons } from "@/components/icons"
import { Button } from '@/components/ui/button'
import { toast } from '@/hooks/use-toast'

async function removeLessonFromCourse(courseId: string, lessonId: string) {
  const response = await fetch(`/api/courses/${courseId}/remove-lesson/${lessonId}/`, {
    method: 'PATCH',
  })

  if (!response?.ok) {
    toast({
      title: "Algo deu errado.",
      description: "A aula não foi removida. Por favor, tente novamente.",
      variant: "destructive",
    })
  }

  return true
}

interface EditCourseLessonOperationsProps {
  lesson: Pick<Lessons, "id" | 'name'>
  courseId: string
}

export function EditCourseLessonOperations(
  { lesson, courseId }: EditCourseLessonOperationsProps
) {
  const router = useRouter()
  const [showRemoveAlert, setShowRemoveAlert] = React.useState<boolean>(false)
  const [isRemovingLoading, setIsRemovingLoading] = React.useState<boolean>(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <Icons.moreDots className="h-4 w-4" />
            <span className="sr-only">Abrir menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem
            onClick={async (event) => {
              event.preventDefault()

              router.push(`/dashboard/lessons/edit/${lesson.id}`)
            }}
          >
            <Icons.pen className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Editar
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => setShowRemoveAlert(true)}
          >
            <Icons.trash className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Remover
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

    {/* alert dialog to remove lesson from course*/}
      <AlertDialog open={showRemoveAlert} onOpenChange={setShowRemoveAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Tem certeza que deseja remover essa aula desse curso?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={async (event) => {
                event.preventDefault()
                setIsRemovingLoading(true)

                const removed = await removeLessonFromCourse(courseId, lesson.id)

                if (removed) {
                  setIsRemovingLoading(false)
                  setShowRemoveAlert(false)
                  router.refresh()
                }
              }}
              className="bg-red-600 focus:ring-red-600"
            >
              {isRemovingLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.trash className="mr-2 h-4 w-4" />
              )}
              Remover
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}