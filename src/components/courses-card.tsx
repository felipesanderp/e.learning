"use client"

import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Courses, User } from '@prisma/client';

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

async function deleteCourse(courseId: string) {
  const response = await fetch(`/api/courses/${courseId}`, {
    method: 'DELETE',
  })

  if(!response.ok) {
    toast({
      title: "Something went wrong.",
      description: "The course was not deleted. Please try again.",
      variant: "destructive",
    })
  }

  toast({
    title: "Course deleted.",
    variant: "success"
  })

  return true
}

interface CoursesCardProps {
  course: Pick<Courses, "id" | "title" | "imageURL" | "description" | "slug">
  user: Pick<User, "role">
}

export function CoursesCard({ course, user }: CoursesCardProps) {
  const router = useRouter()
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false)
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false)

  return (
    <ContextMenu>
      <Card className="w-[300px]">
        <CardHeader className="p-2">
        <ContextMenuTrigger>
          <div className="relative rounded-md border w-full h-[150px]">
            <Image 
              src={course.imageURL}
              alt={course.title}
              fill
              quality={50}
              className="rounded-md"
            />
          </div>
        </ContextMenuTrigger>
          <CardTitle>
            {course.title}
          </CardTitle>

          <CardDescription>
            Lessons
          </CardDescription>
        </CardHeader>

        <ScrollArea className="h-[72px]">
          <CardContent>
            <p>{course.description}</p>
          </CardContent>
        </ScrollArea>

        <CardFooter className="justify-between p-4">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage alt="" src='https://github.com/diego3g.png'/>
              <AvatarFallback>
                <span className="sr-only">Diego S.</span>
              </AvatarFallback>
            </Avatar>
            Diego Shell
          </div>
          {user.role === 'ADMIN' || user.role === "PROFESSOR" ? (
            <Link href={`/dashboard/courses/edit/${course.id}`}>
              <Button>
                Editar
              </Button>
            </Link> 
          ): (
            <Link href={`/dashboard/courses/${course.slug}`}>
              <Button>
                Acessar
              </Button>
            </Link>
          )}
        </CardFooter>
      </Card>
      
      {user.role === "ADMIN" || user.role === 'PROFESSOR' ? (
        <ContextMenuContent>
          <ContextMenuItem>
            <Icons.pen className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Edit
          </ContextMenuItem>
          <ContextMenuSeparator />
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
            <AlertDialogCancel>Cancel</AlertDialogCancel>
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
              <span>Delete</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ContextMenu>
  )
}