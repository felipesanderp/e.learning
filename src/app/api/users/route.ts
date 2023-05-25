import { getServerSession } from 'next-auth/next'
import * as z from 'zod'
import { hash } from 'bcrypt'

import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

const userCreateSchema = z.object({
  email: z.string(),
  password: z.string(),
  name: z.string(),
  role: z.enum(['ADMIN', 'PROFESSOR', 'STUDENT'])
})

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

    const users = await db.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        role: true,
      }
    })

    return new Response(JSON.stringify(users))
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    const { user } = session

    if (user.role !== 'ADMIN' && user.role !== 'PROFESSOR') {
      return new Response("Unauthorized", { status: 403 })
    }

    const json = await req.json()
    const body = userCreateSchema.parse(json)

    const passwordHash = await hash(body.password, 10)

    const userCreated = await db.user.create({
      data: {
        email: body.email,
        name: body.name,
        password: passwordHash,
        role: body.role,
      },
    })

    return new Response(JSON.stringify(userCreated))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}