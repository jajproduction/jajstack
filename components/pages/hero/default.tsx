'use client'

import { Button } from '@/components/ui/button'
import Glow from '@/components/ui/glow'
import { Mockup, MockupFrame } from '@/components/ui/mockup'
import Screenshot from '@/components/ui/screenshot'
import { Section } from '@/components/ui/section'
import { cloneCommand, cta, ctaLink, headline, subHeading } from '@/lib/ui.const'
import { cn } from '@/lib/utils'
import { Check, Copy } from 'lucide-react'
import { Outfit } from 'next/font/google'
import Link from 'next/link'
import { useState } from 'react'

const outfit = Outfit({ subsets: ['latin'] })

export default function Hero() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(cloneCommand)
    setCopied(true)
    setTimeout(() => setCopied(false), 1000)
  }

  return (
    <Section className={cn('fade-bottom overflow-hidden pb-0 sm:pb-0 md:pb-0')}>
      <h1
        className={`${outfit.className} animate-appear opacity-0 delay-300 text-3xl font-bold text-center md:text-6xl`}
      >
        {headline}
      </h1>
      <p className='animate-appear opacity-0 delay-500 text-muted-foreground text-center mt-2 md:mt-4 md:text-lg'>
        {subHeading}
      </p>
      <div className='animate-appear opacity-0 delay-600 relative z-50 flex justify-center mt-4 md:mt-8'>
        <Link href={ctaLink} target='_blank'>
          <Button size='lg' className='cursor-pointer'>
            {cta}
          </Button>
        </Link>
      </div>
      <div className='animate-appear opacity-0 delay-600 relative z-50 flex items-center justify-between bg-muted rounded-xl px-4 py-3 border mt-8 w-full max-w-md mx-auto overflow-x-auto'>
        <code className='text-sm text-muted-foreground whitespace-nowrap'>{cloneCommand}</code>
        <Button variant='ghost' size='icon' onClick={handleCopy} className='ml-2 flex-shrink-0 cursor-pointer'>
          {copied ? <Check className='h-4 w-4 text-green-500' /> : <Copy className='h-4 w-4' />}
        </Button>
      </div>
      <div className='relative w-full pt-12'>
        <MockupFrame className='animate-appear opacity-0 delay-700' size='small'>
          <Mockup type='responsive' className='bg-background/90 w-full rounded-xl border-0'>
            <Screenshot
              srcLight='/jajstack-light.png'
              srcDark='/jajstack-dark.png'
              alt='JajStack template UI'
              width={1248}
              height={765}
              className='w-full'
            />
          </Mockup>
        </MockupFrame>
        <Glow variant='top' className='animate-appear-zoom opacity-0 delay-1000' />
      </div>
    </Section>
  )
}
