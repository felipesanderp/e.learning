import { getServerSession } from 'next-auth/next'
import * as z from 'zod'
import { hash, compare } from 'bcrypt'

import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { userAlterPassword } from '@/lib/validations/user'

const routeContextSchema = z.object({
  params: z.object({
    meId: z.string(),
  }),
})

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

    if (!session?.user || params.meId !== session?.user.id) {
      return new Response(null, { status: 403 })
    }

    const body = await req.json()
    const payload = userAlterPassword.parse(body)

    const userPassword = await db.user.findUnique({
      where: {
        id: session.user.id
      },
      select: {
        password: true,
      }
    })

    if (userPassword) {
      const comparePassword = await compare(payload.password, userPassword?.password)

      if(!comparePassword) {
        return new Response(null, { status: 403, statusText: 'Password does not match!' })
      }     
    }

    const newPassword = await hash(payload.confirmPassword, 10)

    await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        password: newPassword,
      },
    })

    return new Response(null, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}