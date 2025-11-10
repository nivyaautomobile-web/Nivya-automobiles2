'use client';
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
} from 'react-icons/fa';
import ContactForm from './forms/ContactForm';
import ResponsiveBanner from './ResponsiveBanner';

export default function Contact() {
  return (
    <>
      <div className=''>
        <ResponsiveBanner
          desktopSrc='https://www.skyautomobiles.in/_next/image?url=%2Fimages%2Fother%2Fcontact%20us%20banner.webp&w=3840&q=75'
          mobileSrc='https://www.skyautomobiles.in/_next/image?url=%2Fimages%2Fother%2Foffer_mobile.webp&w=1080&q=75'
          altText='Sky Automobiles Contact Us Banner'
        />
      </div>
      <div className='bg-[#0E1224] text-white '>
        {/* Header */}
        {/* <div className="text-center py-16 bg-[url('/bg-pattern.svg')] bg-cover bg-center">
          <h2 className='font-semibold tracking-wide text-[#e1951a] uppercase'>
            Contact Us
          </h2>
          <h1 className='mt-4 text-4xl font-bold md:text-5xl'>Get In Touch</h1>
        </div> */}

        {/* Contact Info Section */}
        <section className='bg-[#E9F0FF] py-16'>
          <div className='px-6 mx-auto text-center max-w-7xl'>
            <h2 className='mb-10 text-3xl font-bold text-gray-800'>
              Get in Touch with Us
            </h2>

            <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4'>
              {/* Location */}
              <div className='flex flex-col items-center justify-center p-8 transition bg-white shadow-md rounded-2xl hover:shadow-lg'>
                <FaMapMarkerAlt className='mb-4 text-4xl text-[#b97200]' />
                <h3 className='text-lg font-semibold text-gray-800'>
                  Location
                </h3>
                <p className='mt-2 leading-relaxed text-gray-500'>
                  Maruti Suzuki ARENA
                  <br />
                  (Nivya Automobiles, Anantapur, Shilparamam)
                </p>
              </div>

              {/* Contact */}
              <div className='flex flex-col items-center justify-center p-8 transition bg-white shadow-md rounded-2xl hover:shadow-lg'>
                <FaPhoneAlt className='mb-4 text-4xl text-[#b97200]' />
                <h3 className='text-lg font-semibold text-gray-800'>Contact</h3>
                <p className='mt-2 text-gray-500'>
                  <a
                    href='tel:9977499499'
                    className='font-medium transition hover:text-blue-600'
                  >
                    9977499499
                  </a>
                </p>
              </div>

              {/* Email */}
              <div className='flex flex-col items-center justify-center p-8 transition bg-white shadow-md rounded-2xl hover:shadow-lg'>
                <FaEnvelope className='mb-4 text-4xl text-[#b97200]' />
                <h3 className='text-lg font-semibold text-gray-800'>Email</h3>
                <p className='mt-2 text-gray-500'>
                  <a
                    href='mailto:nivyaautomobile@gmail.com'
                    className='font-medium transition hover:text-blue-600'
                  >
                    nivyaautomobile@gmail.com
                  </a>
                </p>
              </div>

              {/* Timing */}
              <div className='flex flex-col items-center justify-center p-8 transition bg-white shadow-md rounded-2xl hover:shadow-lg'>
                <FaClock className='mb-4 text-4xl text-[#b97200]' />
                <h3 className='text-lg font-semibold text-gray-800'>
                  Visit Between
                </h3>
                <p className='mt-2 leading-relaxed text-gray-500'>
                  Mon–Sat: 9:00 AM – 5:00 PM
                  <br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form & Map Section */}
        <section className='bg-[#E9F0FF] py-20'>
          <div className='grid grid-cols-1 gap-10 px-6 mx-auto max-w-7xl lg:grid-cols-2'>
            <ContactForm />

            <div className='w-full h-[450px] overflow-hidden rounded-2xl shadow-md'>
              <iframe
                title='Nivya Automobiles - Maruti Suzuki ARENA Anantapur'
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3858.949012928539!2d77.5992824!3d14.7131694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb6b5005fa23e0f%3A0x82f61324536d3575!2sMaruti%20Suzuki%20ARENA%20(Nivya%20Automobiles%2C%20Anantapur%2C%20Shilparamam)!5e0!3m2!1sen!2sin!4v1731225600000!5m2!1sen!2sin'
                className='w-full h-full border-0'
                allowFullScreen
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'
              ></iframe>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
