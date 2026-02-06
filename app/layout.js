import Script from 'next/script';
import './globals.css';
import LayoutWrapper from './LayoutWrapper';
import ModalConf from './components/ModalConf';
import CountdownTimer from './components/forms/test.jsx/CountdownTimer';
import NewYearWrapper from './components/forms/test.jsx/NewYearWrapper';
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
      <head>
        {/* Google Tag Manager */}
        {/* <Script id='gtm-script' strategy='afterInteractive'>
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];
            w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
            j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-M6KJ9FF2');
          `}
        </Script> */}
        {/* <!-- Google tag (gtag.js) --> */}
        <script
          async
          src='https://www.googletagmanager.com/gtag/js?id=G-LP6Q5Z2HK2'
          strategy='afterInteractive'
        />
        <script id='ga4-script' strategy='afterInteractive'>
           
          {` window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-LP6Q5Z2HK2');`}
        </script>
      </head>

      <body>
        {/* Google Tag Manager (noscript) */}
        {/* <noscript>
          <iframe
            src='https://www.googletagmanager.com/ns.html?id=GTM-M6KJ9FF2'
            height='0'
            width='0'
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript> */}

        <LayoutWrapper>
          <ModalConf />
          <CountdownTimer target='2025-12-31T23:59:00' />
          {/* <NewYearWrapper />  */}
          <NumberPopup />
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
