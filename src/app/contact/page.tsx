import type { Metadata } from 'next'
import { ContactContent } from './ContactContent'

export const metadata: Metadata = {
  title: 'Contact — TowerBright',
  description: 'Book a premium cleaning service for your luxury condominium in Miami. Contact TowerBright today.',
}

export default function ContactPage() {
  return <ContactContent />
}
