import ContactSection from '@/app/components/ContactSection'
import React from 'react'

export const metadata = {
  title: 'Contact Nivya Automobiles | Maruti Suzuki Arena Anantapur',
  description: 'Contact Nivya Automobiles for Maruti car sales, service, finance & offers in Anantapur. Visit or call today.',
  keywords: [
    'Nivya Automobiles contact',
    'car showroom contact',
    'book service',
    'automobile enquiries', 'Maruti showroom Anantapur contact', 'Nivya Automobiles phone number'
  ],
  openGraph: {
    title: 'Contact Nivya Automobiles',
    description: 'Reach out for enquiries, service appointments, and support.',
    url: 'https://your-domain.com/contact',
    siteName: 'Nivya Automobiles',
    type: 'website',
  },
};

export default function Page() {
  return (
    <main className="mt-16 overflow-hidden">
      <ContactSection />
    </main>
  );
}
