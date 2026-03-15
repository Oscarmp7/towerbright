import type { Metadata } from 'next'
import { ServicesContent } from './ServicesContent'

export const metadata: Metadata = {
  title: 'Services — TowerBright',
  description: 'Premium cleaning services: indoor window cleaning, balcony polish, bathroom polish, and marble rejuvenation for luxury condominiums in Miami.',
}

export default function ServicesPage() {
  return <ServicesContent />
}
