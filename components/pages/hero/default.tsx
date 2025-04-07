'use client'

import { Button } from '@/components/ui/button'
import { cloneCommand, cta, ctaLink, headline, subHeading } from '@/lib/constants'
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
    <div className='px-4 mt-12 md:mt-24'>
      <h1 className={`${outfit.className} text-3xl font-bold text-center md:text-6xl`}>{headline}</h1>
      <p className='text-muted-foreground text-center mt-2 md:mt-4 md:text-lg'>{subHeading}</p>
      <div className='flex justify-center mt-4 md:mt-8'>
        <Link href={ctaLink} target='_blank'>
          <Button>{cta}</Button>
        </Link>
      </div>
      <div className='flex items-center justify-between bg-muted rounded-xl px-4 py-3 border mt-8 w-full max-w-md mx-auto overflow-x-auto'>
        <code className='text-sm text-muted-foreground whitespace-nowrap'>{cloneCommand}</code>
        <Button variant='ghost' size='icon' onClick={handleCopy} className='ml-2 flex-shrink-0'>
          {copied ? <Check className='h-4 w-4 text-green-500' /> : <Copy className='h-4 w-4' />}
        </Button>
      </div>
    </div>
  )
}
