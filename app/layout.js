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
      <LayoutWrapper>{children}</LayoutWrapper>
    </html>
  );
}
