interface EditCoursePageProps {
  params: { courseId: string }
}

export default async function EditCoursePage({ params }:EditCoursePageProps) {
  return (
    <h1>{params.courseId}</h1>
  )
}