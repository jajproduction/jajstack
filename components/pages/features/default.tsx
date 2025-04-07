import { stacks } from '@/lib/constants'
import Link from 'next/link'
import Image from 'next/image'

export default function Features() {
  return (
    <div className='flex flex-wrap items-center justify-center gap-2 mt-12 mx-4 md:mx-48'>
      {stacks.map(stack => (
        <Link
          key={stack.name}
          href={stack.link}
          target='_blank'
          className='flex-none border rounded-lg px-4 py-2 group/hover border-zinc-500  hover:border-zinc-400 hover:bg-zinc-400/20 dark:border-zinc-700'
        >
          <div className='flex items-center space-x-2'>
            <div className='w-4 h-4 flex items-center justify-center'>
              <Image
                src={`/${stack.svg}`}
                alt='Stack'
                width={25}
                height={25}
                className='object-contain w-full h-full'
              />
            </div>
            <span className='text-sm text-zinc-500 group-hover/hover:text-zinc-950 dark:group-hover/hover:text-zinc-300'>
              {stack.name}
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}
