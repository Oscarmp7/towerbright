import type { Metadata } from 'next'
import { GalleryContent } from './GalleryContent'

export const metadata: Metadata = {
  title: 'Gallery — TowerBright',
  description: 'See our work: premium cleaning results in luxury condominiums across Miami and Brickell.',
}

export default function GalleryPage() {
  return <GalleryContent />
}
