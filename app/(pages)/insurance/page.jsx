import React from 'react';
import InsurancePage from './insurancepage';

export const metadata = {
  title: 'Maruti Car Insurance Renewal in Anantapur | Nivya Automobiles',
  description:
    'Renew or buy Maruti car insurance in Anantapur with cashless claims & best coverage at Nivya Automobiles.',
  openGraph: {
    title: 'Maruti Car Insurance Renewal in Anantapur | Nivya Automobiles',
    description:
      'Explore and buy Maruti Suzuki car insurance online or at our Hyderabad showroom.',
    url: 'https://www.nivyaautomobiles.com/insurance',
    siteName: 'Nivya Automobiles',
    images: [
      {
        url: 'https://www.nivyaautomobiles.com/images/insurance-banner.jpg',
        width: 1200,
        height: 630,
        alt: 'Car Insurance Options',
      },
    ],
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maruti Car Insurance Renewal in Anantapur | Nivya Automobiles',
    description:
      'Compare car insurance plans and buy the best policy for your Maruti Suzuki vehicle.',
    images: ['https://www.nivyaautomobiles.com/images/insurance-banner.jpg'],
  },
};

export default function page() {
  return (
    <div>
      <InsurancePage />
    </div>
  );
}
