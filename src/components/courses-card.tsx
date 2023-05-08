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

interface CoursesCardProps {
  cover: string;
  title: string;
  numberOfLessons: number;
}

export function CoursesCard({ cover, title, numberOfLessons }: CoursesCardProps) {
  return (
    <Card className="w-[300px]">
      <CardHeader className="p-2">
        <div className="relative rounded-md border w-full h-[150px]">
          <Image 
            src={cover}
            alt={title}
            fill
            quality={50}
          />
        </div>

        <CardTitle>
          {title}
        </CardTitle>

        <CardDescription>
          {numberOfLessons} Lessons
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas nam pariatur tempore dolorum repudiandae distinctio iusto voluptatem debitis vel quaerat beatae aliquam vero quos ipsa, officia corporis! Dolor, et quisquam?</p>
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
        <Button>
          Acessar
        </Button>
      </CardFooter>
    </Card>
  )
}