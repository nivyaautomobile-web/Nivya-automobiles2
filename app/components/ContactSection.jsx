'use client';

import React, { useState, useEffect } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
} from 'react-icons/fa';

import ContactForm from './forms/ContactForm';
import ResponsiveBanner from './ResponsiveBanner';

export default function Contact() {
  const [loading, setLoading] = useState(true);

  // Smooth shimmer loading
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <SkeletonTheme baseColor="#dcdcdc" highlightColor="#f5f5f5">
      <>
        {/* ---------------------------------------------------
            Banner Section (Skeleton Added)
        ---------------------------------------------------- */}
        <div>
          {loading ? (
            <Skeleton height={250} borderRadius={0} />
          ) : (
            <ResponsiveBanner
              desktopSrc="https://www.skyautomobiles.in/_next/image?url=%2Fimages%2Fother%2Fcontact%20us%20banner.webp&w=3840&q=75"
              mobileSrc="https://www.skyautomobiles.in/_next/image?url=%2Fimages%2Fother%2Foffer_mobile.webp&w=1080&q=75"
              altText="Sky Automobiles Contact Us Banner"
            />
          )}
        </div>

        <div className="bg-[#0E1224] text-white">

          {/* ---------------------------------------------------
              CONTACT INFO CARDS (Skeleton Added)
          ---------------------------------------------------- */}
          <section className="bg-[#E9F0FF] py-16">
            <div className="px-6 mx-auto text-center max-w-7xl">
              {loading ? (
                <Skeleton width={240} height={35} className="mx-auto mb-10" />
              ) : (
                <h2 className="mb-10 text-3xl font-bold text-gray-800">
                  Get in Touch with Us
                </h2>
              )}

              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {[1, 2, 3, 4].map((_, i) =>
                  loading ? (
                    <div
                      key={i}
                      className="p-8 bg-white shadow-md rounded-2xl"
                    >
                      <Skeleton height={40} width={40} circle />
                      <Skeleton height={20} width={120} className="mt-4" />
                      <Skeleton height={15} className="mt-2" count={2} />
                    </div>
                  ) : null
                )}

                {!loading && (
                  <>
                    {/* Location */}
                    <div className="flex flex-col items-center justify-center p-8 bg-white shadow-md rounded-2xl hover:shadow-lg">
                      <FaMapMarkerAlt className="mb-4 text-4xl text-[#b97200]" />
                      <h3 className="text-lg font-semibold text-gray-800">
                        Location
                      </h3>
                      <p className="mt-2 leading-relaxed text-gray-500">
                        Maruti Suzuki ARENA
                        <br />
                        (Nivya Automobiles, Anantapur, Shilparamam)
                      </p>
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col items-center justify-center p-8 bg-white shadow-md rounded-2xl hover:shadow-lg">
                      <FaPhoneAlt className="mb-4 text-4xl text-[#b97200]" />
                      <h3 className="text-lg font-semibold text-gray-800">
                        Contact
                      </h3>
                      <p className="mt-2 text-gray-500">
                        <a
                          href="tel:+919977499499"
                          className="font-medium hover:text-blue-600"
                        >
                         +91 9977499499
                        </a>
                      </p>
                    </div>

                    {/* Email */}
                    <div className="flex flex-col items-center justify-center p-8 bg-white shadow-md rounded-2xl hover:shadow-lg">
                      <FaEnvelope className="mb-4 text-4xl text-[#b97200]" />
                      <h3 className="text-lg font-semibold text-gray-800">
                        Email
                      </h3>
                      <p className="mt-2 text-gray-500">
                        <a
                          href="mailto:nivya.atp.sm@marutidealers.com"
                          className="font-medium hover:text-blue-600"
                        >
                        nivya.atp.sm@marutidealers.com
                        </a>
                      </p>
                    </div>

                    {/* Time */}
                    <div className="flex flex-col items-center justify-center p-8 bg-white shadow-md rounded-2xl hover:shadow-lg">
                      <FaClock className="mb-4 text-4xl text-[#b97200]" />
                      <h3 className="text-lg font-semibold text-gray-800">
                        Visit Between
                      </h3>
                      <p className="mt-2 leading-relaxed text-gray-500">
                        Mon–Sat: 9:00 AM – 5:00 PM <br />
                        Sunday: Closed
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>

          {/* ---------------------------------------------------
              CONTACT FORM + MAP (Skeleton Added)
          ---------------------------------------------------- */}
          <section className="bg-[#E9F0FF] py-20">
            <div className="grid grid-cols-1 gap-10 px-6 mx-auto max-w-7xl lg:grid-cols-2">

              {/* ================== FORM ================== */}
              {loading ? (
                <div className="w-full p-6 bg-white shadow-md rounded-2xl">
                  <Skeleton height={40} className="mb-4" />
                  <Skeleton height={40} className="mb-4" />
                  <Skeleton height={40} className="mb-4" />
                  <Skeleton height={100} className="mb-4" />
                  <Skeleton height={48} />
                </div>
              ) : (
                <ContactForm />
              )}

              {/* ================== MAP ================== */}
              {loading ? (
                <Skeleton height={450} borderRadius={16} />
              ) : (
                <div className="w-full h-[450px] overflow-hidden rounded-2xl shadow-md">
                  <iframe
                    title="Nivya Automobiles - Maruti Suzuki ARENA Anantapur"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3858.949012928539!2d77.5992824!3d14.7131694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb6b5005fa23e0f%3A0x82f61324536d3575!2sMaruti%20Suzuki%20ARENA%20(Nivya%20Automobiles%2C%20Anantapur%2C%20Shilparamam)!5e0!3m2!1sen!2sin!4v1731225600000!5m2!1sen!2sin"
                    className="w-full h-full border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              )}
            </div>
          </section>
        </div>
      </>
    </SkeletonTheme>
  );
}
