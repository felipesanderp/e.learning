"use client"

import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Courses, Lessons, User } from '@prisma/client';

import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle,
} from "@/components/ui/card";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Icons } from './icons';
import { toast } from '@/hooks/use-toast';
import { formatDate } from '@/lib/utils';

async function deleteCourse(courseId: string) {
  const response = await fetch(`/api/courses/${courseId}`, {
    method: 'DELETE',
  })

  if(!response.ok) {
    toast({
      title: "Algo deu errado.",
      description: "O curso não foi deletado. Por favor, tente novamente.",
      variant: "destructive",
    })
  }

  toast({
    title: "Curso deletado.",
    variant: "success"
  })

  return true
}

interface CoursesCardProps {
  course: Pick<Courses, "id" | "title" | "imageURL" | "description" | "slug" | 'createdAt'>
  lesson?: Pick<Lessons, "id">[]
  user?: Pick<User, "role">
}

export function CoursesCard({ course, lesson, user }: CoursesCardProps) {
  const router = useRouter()
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false)
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false)

  return (
    <ContextMenu>
      <Card className="mx-auto flex w-[25rem] flex-col overflow-hidden rounded-xl shadow-xl shadow-gray-400 transition-all duration-300 hover:scale-[1.05] hover:shadow-2xl dark:shadow-black">
        <CardHeader className="p-2">
        <ContextMenuTrigger>
          <div className="relative h-60">
            <Image 
              src={course.imageURL}
              alt={course.title}
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </ContextMenuTrigger>
          <CardTitle>
            {course.title}
          </CardTitle>

          <CardDescription>
            {lesson?.length} Lessons
          </CardDescription>
        </CardHeader>

        <ScrollArea className="h-[72px]">
          <CardContent className='p-2'>
            <p>{course.description}</p>
          </CardContent>
        </ScrollArea>

        <CardFooter className="justify-between p-2">
          <div className="text-muted-foreground">
            {course.createdAt && (
              formatDate(course.createdAt.toISOString())
            )}
          </div>
          {user?.role === 'ADMIN' || user?.role === "PROFESSOR" ? (
            <Link href={`/dashboard/courses/edit/${course.id}`}>
              <Button>
                Editar
              </Button>
            </Link> 
          ): (
            <Link href={`/dashboard/courses/${course.id}`}>
              <Button>
                Acessar
              </Button>
            </Link>
          )}
        </CardFooter>
      </Card>
      
      {user?.role === "ADMIN" || user?.role === 'PROFESSOR' ? (
        <ContextMenuContent>
          <ContextMenuItem 
            onSelect={() => setShowDeleteAlert(true)}
            className="text-red-500 focus:bg-red-200 focus:text-bg-500"
          >
            <Icons.trash className="mr-2 h-3.5 w-3.5 text-red-500" />
            Delete
          </ContextMenuItem>
        </ContextMenuContent>
      ) : ''}

      {/* Alert dialog for delete course */}
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Você tem certeza que deseja deletar este curso?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Essa ação não poderá ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={async (event) => {
                event?.preventDefault()
                setIsDeleteLoading(true)
                
                const deleted = await deleteCourse(course.id)

                if(deleted) {
                  setIsDeleteLoading(false)
                  setShowDeleteAlert(false)
                  router.refresh()
                }
              }}
              className="bg-red-600 focus:ring-red-600"
            >
               {isDeleteLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.trash className="mr-2 h-4 w-4" />
              )}
              <span>Deletar</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ContextMenu>
  )
}