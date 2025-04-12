import { loginUser } from '@/services/auth'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const user = await loginUser(body)

    const { user_id, role, firstname, lastname, email } = user

    const response = NextResponse.json({ user_id, role, firstname, lastname, email })
    response.cookies.set('role', role, { httpOnly: true, path: '/' })
    response.cookies.set('user_id', user_id.toString(), { httpOnly: true, path: '/' })
    return response
  } catch (error: any) {
    const status = error.status || 500
    const message = error.message || 'Internal Server Error'
    return NextResponse.json({ message }, { status })
  }
}
