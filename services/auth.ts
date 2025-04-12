import { LoginRequest, RegisterRequest } from '@/lib/auth.types'
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

class AuthError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

export async function loginUser(body: LoginRequest) {
  const user = await prisma.user.findUnique({
    where: { email: body.email }
  })

  if (!user || !(await bcrypt.compare(body.password, user.password))) {
    throw new AuthError('Invalid email or password', 401)
  }

  if (user.verified === 0) {
    throw new AuthError('Your account is not verified', 403)
  }

  return user
}
