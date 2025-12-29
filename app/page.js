import React from 'react';
import HeroSection from './components/HeroSection';
import About from './components/About';
import WhyChooseUs from './components/WhyChooseUs';
import CarListing from './components/CarListing';
import Services from './components/service';
import Testimonials from './components/Testimonials';
export const metadata = {
  title: 'Maruti Suzuki Arena in Anantapur | Nivya Automobiles – Best Car Offers 2025',
  description:
    'Buy new Maruti Suzuki Arena cars in Anantapur at Nivya Automobiles. Best year-end offers, on-road price, finance, insurance & test drive. Visit today!',
  keywords:
    'Maruti Suzuki Arena Anantapur, Nivya Automobiles, Maruti showroom Anantapur, Maruti cars price Anantapur, Arena dealer near me',
  author: 'Nivya Automobiles',
  openGraph: {
    title: 'Nivya Automobiles | Maruti Suzuki Hyderabad',
    description:
      'Your trusted Maruti Suzuki dealer in Hyderabad. Buy new or used cars, book services, and explore accessories.',
    url: 'https://www.nivyamaruti.com',
    siteName: 'Nivya Automobiles',
    images: [
      {
        url: 'https://www.nivyamaruti.com/images/home-banner.jpg',
        width: 1200,
        height: 630,
        alt: 'Nivya Automobiles Showroom',
      },
    ],
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nivya Automobiles | Maruti Suzuki Hyderabad',
    description:
      'Explore new and used Maruti Suzuki cars, accessories, and services in Hyderabad.',
    images: ['https://www.nivyaautomobiles.com/images/home-banner.jpg'],
  },
};

export default function page() {
  return (
    <div>
      <HeroSection />
      <CarListing />
      <About />
      <WhyChooseUs />
      <Services />
      <Testimonials />
    </div>
  );
}
