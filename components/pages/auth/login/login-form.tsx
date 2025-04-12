'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import { authFooter, loginHeadline, authImage, loginSubHead } from '@/lib/auth.const'
import Link from 'next/link'
import { Outfit } from 'next/font/google'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useLoading } from '@/hooks/useLoading'
import { Spinner } from '@/components/ui/spinner'
import axios from 'axios'
import toast from 'react-hot-toast'

const outfit = Outfit({ subsets: ['latin'] })

const formSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: 'Invalid email address' })
    .refine(val => val.trim().length > 0, {
      message: 'Email must not be empty or only whitespace'
    }),
  password: z
    .string()
    .trim()
    .min(6, { message: 'Invalid password' })
    .refine(val => val.trim().length >= 6, {
      message: 'Password must not be empty or only whitespace'
    })
})

type LoginProps = z.infer<typeof formSchema>

export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
  const { loading, setLoading } = useLoading()

  const form = useForm<LoginProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  async function handleSubmit(values: LoginProps) {
    setLoading(true)
    try {
      const response = await axios.post('/api/auth/login', values)
      form.reset()
      toast.success('Login successfully!')
      setLoading(false)

      const { user_id, role, firstname, lastname, email } = response.data

      document.cookie = `role=${role}; path=/; secure; samesite=lax; HttpOnly`
      document.cookie = `user_id=${user_id}; path=/; secure; samesite=lax; HttpOnly`

      localStorage.setItem('role', role)
      localStorage.setItem('user_id', user_id)
      localStorage.setItem('firstname', firstname)
      localStorage.setItem('lastname', lastname)
      localStorage.setItem('email', email)

      window.location.href = '/dashboard'
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 403) {
        toast.error('Your account is not verified!')
        setLoading(false)
      } else {
        toast.error('Invalid credentials!')
        setLoading(false)
      }
    }
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className='overflow-hidden'>
        <CardContent className='grid p-0 md:grid-cols-2'>
          <div className='p-6 md:p-8'>
            <div className='flex flex-col gap-6'>
              <div className='flex flex-col items-center text-center'>
                <h1 className={`${outfit.className} animate-appear opacity-0 delay-100 text-2xl font-bold`}>
                  {loginHeadline}
                </h1>
                <p className='animate-appear opacity-0 delay-300 text-balance text-muted-foreground'>{loginSubHead}</p>
              </div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
                  <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type='password' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type='submit' className='w-full' disabled={loading}>
                    {loading ? (
                      <div className='flex items-center gap-3'>
                        <Spinner size='small' show={true} />
                        <span>Please wait...</span>
                      </div>
                    ) : (
                      'Login'
                    )}
                  </Button>
                </form>
              </Form>
              <div className='text-center text-sm'>
                Don&apos;t have an account?{' '}
                <Link href='/auth/register' className='underline underline-offset-4'>
                  Sign up
                </Link>
              </div>
            </div>
          </div>
          <div className='relative hidden bg-muted md:block'>
            <Image
              src={authImage}
              alt='Photo'
              width={990}
              height={990}
              priority
              className='absolute inset-0 h-full w-full object-cover dark:brightness-[0.5] dark:grayscale'
            />
          </div>
        </CardContent>
      </Card>
      <div className='text-balance text-center text-xs text-muted-foreground'>{authFooter}</div>
    </div>
  )
}
