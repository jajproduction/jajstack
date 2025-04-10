import Link from 'next/link'
import { Outfit } from 'next/font/google'
import { brand, footerLinks } from '@/lib/ui.const'

const outfit = Outfit({ subsets: ['latin'] })

export default function Footer() {
  return (
    <footer className='animate-appear opacity-0 delay-700 border-t mt-24 py-8 px-4 md:px-12'>
      <div className='max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4'>
        <div className={`${outfit.className} text-lg font-bold`}>
          {brand}
          <span className='text-muted-foreground font-normal'> © {new Date().getFullYear()}</span>
        </div>

        <div className='flex items-center gap-6 text-sm text-muted-foreground'>
          {footerLinks.map(link => (
            <Link
              key={link.title}
              href={link.link}
              target='_blank'
              rel='noopener noreferrer'
              className='hover:underline'
            >
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
