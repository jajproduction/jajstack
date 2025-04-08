import prisma from '@/prisma/prisma'
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'

interface RegisterRequest {
  firstname: string
  lastname: string
  email: string
  password: string
}

export async function POST(req: Request) {
  try {
    const body: RegisterRequest = await req.json()
    const hashedPassword = await bcrypt.hash(body.password, 10)

    const user = await prisma.user.create({
      data: {
        firstname: body.firstname,
        lastname: body.lastname,
        user_email: body.email,
        user_password: hashedPassword
      }
    })

    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
