'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import { authFooter, loginHeadline, authImage, loginSubHead } from '@/lib/constants'
import Link from 'next/link'
import { Outfit } from 'next/font/google'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

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
  const form = useForm<LoginProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  function handleSubmit(values: LoginProps) {
    // TODO: Call login API here
    console.log(values)
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
                  <Button type='submit' className='w-full'>
                    Login
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
