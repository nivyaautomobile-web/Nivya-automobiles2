import Script from 'next/script';
import './globals.css';
import LayoutWrapper from './LayoutWrapper';
import ModalConf from './components/ModalConf';

import NumberPopup from './components/forms/Popup';

export const metadata = {
  title: 'Nivya Automobiles',
  description:
    'Explore new and used Maruti Suzuki cars in Hyderabad with Nivya Automobiles. Find the best deals, offers, and services.',
  verification: {
    google: 'SqUUPnh17HPH2EXh3vAwJlyUgO3Hak6wy_ywVW6CzDw',
  },
  icons: {
    icon: [{ url: '/favicon.ico', sizes: '48x48', type: 'image/x-icon' }],
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <head></head>
      <body>
        <LayoutWrapper>
          <ModalConf />
          <NumberPopup />
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
