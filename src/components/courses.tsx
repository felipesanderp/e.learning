import Link from "next/link";

import { Course } from '../app/dashboard/courses/page'
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { formatDate } from "@/lib/utils";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

interface CourseItemProps {
  course: Pick<Course, "title" | "professor" | "createdAt" | "cover">
}

export function CourseItem({ course }: CourseItemProps ) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage alt={course.title} src={course.cover} />
          <AvatarFallback>
            <span className="sr-only">{course.title}</span>
          </AvatarFallback>
        </Avatar>

        <div>
          <Link
          href={'/dashboard/courses'}
          className="font-semibold hover:underline"
          >
            {course.title}
          </Link>
          <div>
            <p className="text-sm text-muted-foreground">
              {formatDate(course.createdAt?.toDateString())}
            </p>
          </div>
        </div>
      </div>
      <Button
        variant={'ghost'}
        size="sm"
      >
        <ArrowRight size={24} />
      </Button>
    </div>
  )
}