import { CardSkeleton } from "@/components/card-skeleton"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"

export default function DashboardProfileLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Profile"
        text="Manage your account."
      />
      <div className="grid gap-10">
        <CardSkeleton />
      </div>
    </DashboardShell>
  )
}