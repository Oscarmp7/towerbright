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

export async function submitContactForm(data: ContactFormData) {
  const { name, email, phone, service, message } = data

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
    console.error('Resend error:', error)
    return { success: false, error: 'Failed to send message. Please try WhatsApp or email directly.' }
  }

  return { success: true }
}
