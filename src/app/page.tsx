import { Hero } from '@/components/sections/Hero'
import { TrustBar } from '@/components/sections/TrustBar'
import { Services } from '@/components/sections/Services'
import { WhyUs } from '@/components/sections/WhyUs'
import { Portfolio } from '@/components/sections/Portfolio'
import { Properties } from '@/components/sections/Properties'
import { BookingCTA } from '@/components/sections/BookingCTA'

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustBar />
      <Services />
      <WhyUs />
      <Portfolio />
      <Properties />
      <BookingCTA />
    </main>
  )
}
