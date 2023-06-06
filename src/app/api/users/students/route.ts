import { getServerSession } from 'next-auth/next'

import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    const { user } = session

    if (user.role !== 'ADMIN' && user.role !== 'PROFESSOR') {
      return new Response("Unauthorized", { status: 403 })
    }

    const students = await db.user.findMany({
      where: {
        role: 'STUDENT',
        AND: {
          isActive: 'true'
        }
      }
    })

    return new Response(JSON.stringify(students))
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}