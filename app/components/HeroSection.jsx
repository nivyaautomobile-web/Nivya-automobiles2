import ClientHeroTabs from '../ClientHeroTabs';
import Banner from './Banner';


export default function HeroSection() {
  const sliders = [
    {
      desktopImg:
        '/images/Nivya-Web-Banner-Year-End.webp',
      mobileImg:
        'https://www.skyautomobiles.in/_next/image?url=%2Fimages%2Fother%2Fmain_swift_mobile.webp&w=1080&q=75',
      alt: 'Monsoon',
      link: '/vehicles',
    },
    {
      desktopImg:
        '/images/Nivya-Web-Banner-Accessories.webp',
      mobileImg:
        'https://www.skyautomobiles.in/_next/image?url=%2Fimages%2Fother%2Fmain_swift_mobile.webp&w=1080&q=75',
      alt: 'Monsoon',
      link: '/vehicles/swift-on-road-price-in-Anantapur',
    },
    {
      desktopImg:
        '/images/Nivya-Web-Banner-Victoris.webp',
      mobileImg:
        'https://www.skyautomobiles.in/_next/image?url=%2Fimages%2Fother%2Fmain_swift_mobile.webp&w=1080&q=75',
      alt: 'Monsoon',
      link: '/vehicles/victoris-on-road-price-in-Anantapur',
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
    <section className="relative bg-gray-200">
      <div className="mt-20 mb-10 ">
        <Banner sliders={sliders} /></div>
      <ClientHeroTabs />
    </section>
  );
}
