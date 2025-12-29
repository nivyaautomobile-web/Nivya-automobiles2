import About from '@/app/components/About';
import ResponsiveBanner from '@/app/components/ResponsiveBanner';
import React from 'react';

export const metadata = {
  title: 'About Nivya Automobiles | Trusted Maruti Suzuki Arena Dealer Anantapur',
  description:
    'Nivya Automobiles is a trusted Maruti Suzuki Arena dealer in Anantapur offering new cars, used cars, service & customer-first experience.',
  keywords: 'Nivya Automobiles Anantapur, Maruti Suzuki dealer Anantapur, Arena showroom Anantapur',
  openGraph: {
    title: 'Nivya Automobiles - Maruti Suzuki Dealer in Hyderabad',
    description:
      'Buy or service your Maruti Suzuki car with Nivya Automobiles.',
    url: 'https://www.nivyaautomobiles.com/about',
    siteName: 'Nivya Automobiles',
    images: [
      {
        url: 'https://www.nivyaautomobiles.com/images/showroom.jpg',
        width: 1200,
        height: 630,
        alt: 'Nivya Automobiles Showroom',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nivya Automobiles | Maruti Suzuki Hyderabad',
    description: 'Explore Maruti Suzuki cars with Nivya Automobiles.',
    images: ['https://www.nivyaautomobiles.com/images/twitter-banner.jpg'],
  },
};

export default function page() {
  return (
    <div className='mt-14'>
      <ResponsiveBanner
        desktopSrc='https://www.skyautomobiles.in/_next/image?url=%2Fimages%2Fother%2Fcontact%20us%20banner.webp&w=3840&q=75'
        mobileSrc='https://www.skyautomobiles.in/_next/image?url=%2Fimages%2Fother%2Foffer_mobile.webp&w=1080&q=75'
        altText='Sky Automobiles Contact Us Banner'
      />
      <div className='mx-auto max-w-7xl'>
        <About />
      </div>
    </div>
  );
}
