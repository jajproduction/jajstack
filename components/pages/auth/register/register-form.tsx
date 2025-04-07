'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import Link from 'next/link'
import { Outfit } from 'next/font/google'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { authFooter, authImage, regHeadline, regSubHead } from '@/lib/constants'

const outfit = Outfit({ subsets: ['latin'] })

const formSchema = z.object({
  firstname: z
    .string()
    .trim()
    .min(2, { message: 'It must contain at least 2 character(s)' })
    .refine(val => val.trim().length >= 2, {
      message: 'First name must not be empty or only whitespace'
    }),
  lastname: z
    .string()
    .trim()
    .min(2, { message: 'It must contain at least 2 character(s)' })
    .refine(val => val.trim().length >= 2, {
      message: 'Last name must not be empty or only whitespace'
    }),
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
    .min(6, { message: 'Password must be at least 6 characters' })
    .refine(val => val.trim().length >= 6, {
      message: 'Password must not be empty or only whitespace'
    })
})

type RegisterProps = z.infer<typeof formSchema>

export function RegisterForm({ className, ...props }: React.ComponentProps<'div'>) {
  const form = useForm<RegisterProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: '',
      lastname: '',
      email: '',
      password: ''
    }
  })

  function handleSubmit(values: RegisterProps) {
    // TODO: Call register API here
    console.log(values)
  }
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className='overflow-hidden'>
        <CardContent className='grid p-0 md:grid-cols-2'>
          <div className='p-6 md:p-8'>
            <div className='flex flex-col gap-6'>
              <div className='flex flex-col items-center text-center'>
                <h1 className={`${outfit.className} text-2xl font-bold`}>{regHeadline}</h1>
                <p className='text-balance text-muted-foreground'>{regSubHead}</p>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
                  <FormField
                    control={form.control}
                    name='firstname'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='lastname'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                    Create an account
                  </Button>
                </form>
              </Form>
              <div className='text-center text-sm'>
                Already have an account?{' '}
                <Link href='/auth/login' className='underline underline-offset-4'>
                  Sign in
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
