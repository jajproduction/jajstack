import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { desc, feat, features } from '@/lib/constants'
import { Outfit } from 'next/font/google'

const outfit = Outfit({ subsets: ['latin'] })

export default function Features() {
  return (
    <section className='px-4 py-16 md:px-12 lg:px-20'>
      <div className='text-center mb-12'>
        <h1 className={`${outfit.className} text-3xl md:text-4xl font-bold`}>{feat}</h1>
        <p className='text-muted-foreground mt-4 max-w-2xl mx-auto text-base md:text-lg'>{desc}</p>
      </div>
      <div className='grid gap-6 grid-cols-1 md:grid-cols-2'>
        {features.map(feature => (
          <Card key={feature.title}>
            <CardHeader>
              <CardTitle className='text-lg'>{feature.title}</CardTitle>
              <CardDescription className='text-sm'>{feature.desc}</CardDescription>
            </CardHeader>
            <CardContent>
              {feature.points && (
                <ul className='list-disc pl-5 text-sm space-y-1'>
                  {feature.points.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
