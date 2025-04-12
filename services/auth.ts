import { RegisterRequest } from '@/lib/auth.types'
import { getCurrentPhilippineTime } from '@/lib/functions'
import prisma from '@/prisma/prisma'
import bcrypt from 'bcryptjs'

export async function createUser(body: RegisterRequest) {
  const hashedPassword = await bcrypt.hash(body.password, 10)

  const user = await prisma.user.create({
    data: {
      firstname: body.firstname,
      lastname: body.lastname,
      email: body.email,
      password: hashedPassword,
      created_at: getCurrentPhilippineTime()
    }
  })

  return user
}
