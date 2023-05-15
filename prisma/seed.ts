import { PrismaClient, ROLE } from '@prisma/client'
import { hash } from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const hashPassword = await hash('admin_elearning', 10)

  await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@elearning.com',
      password: hashPassword,
      role: ROLE.ADMIN,
    }
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })