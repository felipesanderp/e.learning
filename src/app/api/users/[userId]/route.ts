import { getServerSession } from 'next-auth/next'
import * as z from 'zod'

import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { userPatchSchema } from "@/lib/validations/user"
import { hash } from 'bcrypt'

const routeContextSchema = z.object({
  params: z.object({
    userId: z.string(),
  })
})

export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context)

    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    const { user } = session

    if (user.role !== 'ADMIN' && user.role !== 'PROFESSOR') {
      return new Response("Unauthorized", { status: 403 })
    }

    await db.user.delete({
      where: {
        id: params.userId as string,
      },
    })

    return new Response(null, { status: 204 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context)

    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    const { user } = session

    if (user.role !== 'ADMIN' && user.role !== 'PROFESSOR') {
      return new Response("Unauthorized", { status: 403 })
    }

    const json = await req.json()
    const body = userPatchSchema.parse(json)

      await db.user.update({
         where: {
          id: params.userId as string,
        },
        data: {
          email: body.email,
          name: body.name,
          role: body.role,
          password: await hash(body.password!!, 10),
          image: body.image,
        }
      })


    return new Response(null, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    console.log(error)

    return new Response(null, { status: 500 })
  }
}