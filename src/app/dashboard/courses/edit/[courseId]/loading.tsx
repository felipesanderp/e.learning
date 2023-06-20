import { EditCourseSkeleton } from "@/components/edit-course-skeleton"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"

export default function DashboardEditCourseLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Gerencie esse curso"
        text="Edite, delete e adicione novos items à esse curso somente."
      />
      <div className="grid gap-10">
        <EditCourseSkeleton />
      </div>
    </DashboardShell>
  )
}