import { redirect } from "next/navigation";

import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { getCurrentUser } from "@/lib/session";
import { authOptions } from "@/lib/auth";
import Table from "@/components/table";

export const metadata = {
  title: 'Users | e.learning',
}

export default async function Users() {
  const user = await getCurrentUser()

  if (!user || user.role !== 'ADMIN' && user.role !== 'PROFESSOR') {
    redirect(authOptions?.pages?.signIn || "/")
  }
  
  return (
    <DashboardShell>
      <DashboardHeader
        heading='Users'
        text='Create and manage users.'
      />
      <Table columnNames={["Name", "Role", "Email"]}>
            <tr>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-primary sm:pl-6">
                Felipe Sander
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-muted-foreground">
                ADMIN
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-muted-foreground">
                felipe@email.com.br
              </td>
              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                <a
                  className="text-primary hover:text-muted-foreground"
                >
                  Edit<span className="sr-only">USER</span>
                </a>
              </td>
            </tr>

      </Table>
    </DashboardShell>
  )
}