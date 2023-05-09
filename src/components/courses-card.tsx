import Image from 'next/image'

import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle,
} from "@/components/ui/card";
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import Link from 'next/link';
import { Courses } from '@prisma/client';


interface CoursesCardProps {
  course: Pick<Courses, "id" | "title" | "imageURL" | "description">
}

export function CoursesCard({ course }: CoursesCardProps) {
  return (
    <Card className="w-[300px]">
      <CardHeader className="p-2">
        <div className="relative rounded-md border w-full h-[150px]">
          <Image 
            src={course.imageURL}
            alt={course.title}
            fill
            quality={50}
            className="rounded-md"
          />
        </div>

        <CardTitle>
          {course.title}
        </CardTitle>

        <CardDescription>
           Lessons
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4">
        <p>{course.description}</p>
      </CardContent>

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
  )
}