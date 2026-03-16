'use server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export interface ContactFormData {
  name: string
  email: string
  phone: string
  service: string
  message: string
}

type ActionResult = { success: true } | { success: false; error: string }

export async function submitContactForm(data: ContactFormData): Promise<ActionResult> {
  const name = data.name.trim().slice(0, 100)
  const email = data.email.trim().slice(0, 200)
  const phone = data.phone.trim().slice(0, 30)
  const service = data.service.trim().slice(0, 100)
  const message = data.message.trim().slice(0, 2000)

  // Basic email format check
  if (!name || !email) {
    return { success: false, error: 'Name and email are required.' }
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { success: false, error: 'Please enter a valid email address.' }
  }

  const { error } = await resend.emails.send({
    from: 'TowerBright Website <no-reply@towerbrightco.com>',
    to: ['info@towerbrightco.com'],
    replyTo: email,
    subject: `New Lead: ${name} — ${service || 'General Inquiry'}`,
    text: `
New contact form submission from towerbrightco.com

Name:    ${name}
Email:   ${email}
Phone:   ${phone || '—'}
Service: ${service || '—'}

Message:
${message || '—'}
    `.trim(),
  })

  if (error) {
    console.error('Resend error:', error.message)
    return { success: false, error: 'Failed to send message. Please try WhatsApp or email directly.' }
  }

  return { success: true }
}
