import Script from 'next/script';
import './globals.css';
import LayoutWrapper from './LayoutWrapper';

export const metadata = {
  title: 'Nivya Automobiles',
  description:
    'Explore new and used Maruti Suzuki cars in Hyderabad with Nivya Automobiles. Find the best deals, offers, and services.',
  verification: {
    google: 'SqUUPnh17HPH2EXh3vAwJlyUgO3Hak6wy_ywVW6CzDw',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <head>
        {/* Google Analytics */}
        <Script
          src='https://www.googletagmanager.com/gtag/js?id=G-LP6Q5Z2HK2'
          strategy='afterInteractive'
        />

        <Script id='ga-gtag' strategy='afterInteractive'>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-LP6Q5Z2HK2');
          `}
        </Script>
      </head>
      <LayoutWrapper>{children}</LayoutWrapper>
    </html>
  );
}
