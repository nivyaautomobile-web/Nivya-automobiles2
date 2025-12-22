import ClientHeroTabs from '../ClientHeroTabs';
import Banner from './Banner';


export default function HeroSection() {
  const sliders = [
    {
      desktopImg:
        'https://www.skyautomobiles.in/_next/image?url=%2Fimages%2Fother%2Fmain_page_swift.webp&w=3840&q=75',
      mobileImg:
        'https://www.skyautomobiles.in/_next/image?url=%2Fimages%2Fother%2Fmain_swift_mobile.webp&w=1080&q=75',
      alt: 'Monsoon',
      link: '/',
    },
    {
      desktopImg:
        '/images/marutisuzuki-yearend-carnivals-web-banner_(1).jpg',
      mobileImg:
        'https://www.skyautomobiles.in/_next/image?url=%2Fimages%2Fother%2Fmain_swift_mobile.webp&w=1080&q=75',
      alt: 'Monsoon',
      link: '/',
    },
        {
      desktopImg:
        '/images/maruti-suzuki-arena-victoris-web-banner2.jpg',
      mobileImg:
        'https://www.skyautomobiles.in/_next/image?url=%2Fimages%2Fother%2Fmain_swift_mobile.webp&w=1080&q=75',
      alt: 'Monsoon',
      link: '/',
    },
    //       {
    //   desktopImg:
    //     '/images/banner.png',
    //   mobileImg:
    //     'https://www.skyautomobiles.in/_next/image?url=%2Fimages%2Fother%2Fmain_swift_mobile.webp&w=1080&q=75',
    //   alt: 'Monsoon',
    //   link: '/',
    // },
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
      <Banner sliders={sliders} />
      <ClientHeroTabs />
    </section>
  );
}
