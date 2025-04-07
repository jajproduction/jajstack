import Features from '@/components/pages/features/default'
import Hero from '@/components/pages/hero/default'
import Navbar from '@/components/pages/navbar/default'
import Stacks from '@/components/pages/stacks/default'

export default function Home() {
  return (
    <main className='max-w-6xl mx-auto'>
      <Navbar />
      <Hero />
      <Stacks />
      <Features />
    </main>
  )
}
