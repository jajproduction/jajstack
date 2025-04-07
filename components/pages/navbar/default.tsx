import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuLink
} from '@/components/ui/navigation-menu'
import { Layers, Menu } from 'lucide-react'
import { ModeToggle } from '@/components/themes/mode-toggle'
import { Outfit } from 'next/font/google'
import { links, navTitle } from '@/lib/constants'

const outfit = Outfit({ subsets: ['latin'] })

export default function Navbar() {
  return (
    <nav className='flex sticky top-0 z-50 h-16 w-full shrink-0 items-center px-4 backdrop-blur-lg dark:bg-zinc-950/50 md:px-0'>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant='ghost' size='icon' className='lg:hidden'>
            <Menu className='h-6 w-6' />
          </Button>
        </SheetTrigger>
        <SheetContent side='left' className='backdrop-blur-lg bg-zinc-50/90 dark:bg-zinc-950/50'>
          <SheetHeader>
            <SheetTitle>
              <Link href='#' prefetch={false}>
                <Layers className='h-6 w-6 dark:text-zinc-200' />
              </Link>
            </SheetTitle>
            <SheetDescription className='sr-only'>Lorem ipsum</SheetDescription>
          </SheetHeader>
          <div className='p-4 pt-0'>
            {links.map(link => (
              <Link
                href={link.link}
                className='flex w-full items-center py-2 text-lg font-semibold'
                prefetch={false}
                key={link.name}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
      <div className='flex items-center justify-between w-full'>
        <div>
          <Link
            href='/'
            className='mr-6 hidden lg:flex lg:items-center lg:space-x-1'
            prefetch={false}
          >
            <Layers className='h-4 w-4' />
            <span className={`${outfit.className} font-bold`}>{navTitle}</span>
          </Link>
        </div>
        <div>
          <NavigationMenu className='hidden lg:flex'>
            <NavigationMenuList>
              {links.map(link => (
                <NavigationMenuLink key={link.name} asChild>
                  <Link
                    href={link.link}
                    className='group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors text-zinc-500 hover:bg-transparent focus:bg-transparent focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:hover:text-zinc-100 dark:focus:text-zinc-100'
                    prefetch={false}
                  >
                    {link.name}
                  </Link>
                </NavigationMenuLink>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
      <div className='flex items-center space-x-2'>
        <ModeToggle />
        <Button size='sm'>Login</Button>
      </div>
    </nav>
  )
}
