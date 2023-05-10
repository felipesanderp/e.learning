import Image from 'next/image'

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
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import Link from 'next/link';
import { Courses } from '@prisma/client';
import { ScrollArea } from '@/components/ui/scroll-area';


interface CoursesCardProps {
  course: Pick<Courses, "id" | "title" | "imageURL" | "description">
}

export function CoursesCard({ course }: CoursesCardProps) {
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
          <Link href={`/dashboard/courses/${course.id}`}>
            <Button>
              Acessar
            </Button>
          </Link> 
        </CardFooter>
      </Card>
      
      <ContextMenuContent>
        <ContextMenuItem>Edit</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}