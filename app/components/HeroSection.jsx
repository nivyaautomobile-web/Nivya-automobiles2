import ClientHeroTabs from '../ClientHeroTabs';
import Banner from './Banner';


export default function HeroSection() {
  const sliders = [
    // {
    //   desktopImg:
    //     '/images/Nivya-Web-Banner-Year-End.webp',
    //   mobileImg:
    //     'https://www.skyautomobiles.in/_next/image?url=%2Fimages%2Fother%2Fmain_swift_mobile.webp&w=1080&q=75',
    //   alt: 'Monsoon',
    //   link: '/vehicles/swift',
    // },
    {
      desktopImg:
        '/images/Nivya-Web-Banner-Accessories.webp',
      mobileImg:
        'https://www.skyautomobiles.in/_next/image?url=%2Fimages%2Fother%2Fmain_swift_mobile.webp&w=1080&q=75',
      alt: 'Monsoon',
      link: '/vehicles/swift',
    },
    {
      desktopImg:
        '/images/Nivya-Web-Banner-Victoris.webp',
      mobileImg:
        'https://www.skyautomobiles.in/_next/image?url=%2Fimages%2Fother%2Fmain_swift_mobile.webp&w=1080&q=75',
      alt: 'Monsoon',
      link: '/vehicles/victoris',
    },
 
    //        {
    //   desktopImg:
    //     '/images/banner-service.jpg',
    //   mobileImg:
    //     'https://www.skyautomobiles.in/_next/image?url=%2Fimages%2Fother%2Fmain_swift_mobile.webp&w=1080&q=75',
    //   alt: 'Monsoon',
    //   link: '/',
    // },
  ];

  return (
    <section className="relative">
      <div className='mt-20'>
      <Banner sliders={sliders} /></div>
      <ClientHeroTabs />
    </section>
  );
}
