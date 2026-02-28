'use client';

import { useState, useEffect } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Footer() {
  const [loading, setLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <footer className="relative bg-linear-to-b from-[#0E1224] to-[#121736] text-gray-300">
        <div className="px-6 py-12 mx-auto max-w-7xl md:px-12">

          {/* FOOTER LINKS */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4">
            {(loading ? Array(4).fill(null) : [
              {
                title: 'CARS',
                links: [
                  { name: 'Vehicles', href: '/vehicles' },
                  { name: 'Certified Pre-Owned', href: '/truevalue/buy-a-car' },
                  { name: 'Sell Car', href: '/truevalue/sell-a-car' },
                ],
              },
              {
                title: 'SERVICES',
                links: [
                  { name: 'Finance', href: '/finance' },
                  { name: 'Book a Service', href: '/book-a-service' },
                  { name: 'Insurance', href: '/insurance' },
                ],
              },
              {
                title: 'DISCOVER',
                links: [
                  { name: 'Accessories', href: '/accessories' },
                  { name: 'Careers', href: '/career' },
                  { name: 'Offers', href: '/offers' },
                ],
              },
              {
                title: 'CONTACT',
                links: [
                  { name: 'Contact Us', href: '/contact-us' },
                  { name: 'Locate Us', href: '/locations' },
                  { name: 'Support', href: '/support' },
                ],
              },
            ]).map((section, i) => (
              <div key={i}>
                {loading ? (
                  <>
                    <Skeleton width={120} height={18} className="mb-4" />
                    <Skeleton count={4} height={14} className="mb-2" />
                  </>
                ) : (
                  <>
                    <h3 className="mb-4 font-semibold text-white">
                      {section.title}
                    </h3>
                    <ul className="space-y-2 text-sm">
                      {section.links.map((link, j) => (
                        <li key={j}>
                          <Link
                            href={link.href}
                            className="transition hover:text-white"
                          >
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* SOCIAL ICONS */}
          <div className="flex justify-center gap-5 py-8 mt-10 border-t border-gray-700">
            {loading
              ? Array(4).fill(null).map((_, i) => (
                <Skeleton key={i} width={40} height={40} circle />
              ))
              : [
                { icon: FaFacebookF, href: 'https://www.facebook.com/nivyaautomobilesofficial' },
                { icon: FaInstagram, href: 'https://www.instagram.com/nivyamarutiofficial/' },
                { icon: FaTwitter, href: 'https://x.com/NivyaAutomobile' },
                { icon: FaYoutube, href: 'https://www.youtube.com/channel/UC0s6iElSlQu2n8SzVGTH2Qw' },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  className="p-3 transition rounded-full bg-white/10 hover:bg-white hover:text-black"
                >
                  <Icon size={18} />
                </a>
              ))}
          </div>

          {/* LOGO & POLICY */}
          <div className="flex flex-col items-center justify-between gap-6 pt-6 text-sm text-gray-400 border-t border-gray-700 md:flex-row">
            <div className="flex gap-4">
              <Link href="/privacy-policy" className="hover:text-white">
                Privacy Policy
              </Link>
              <span>|</span>
              <Link href="/terms-and-conditions" className="hover:text-white">
                Terms & Conditions
              </Link>
            </div>

            <div className="flex flex-col items-center">
              <Image
                src="/nivya_logo2.png"
                alt="Nivya Automobiles"
                width={180}
                height={60}
              />
              <p className="mt-2 text-xs">
                ©{ new Date().getFullYear()} Nivya Automobiles. All Rights Reserved.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span>Developed by</span>
              <Link href="https://www.broaddcast.com" target="_blank">
                <Image
                  src="https://www.broaddcast.com/assets/images/logo-white.svg"
                  alt="BroaddCast"
                  width={120}
                  height={40}
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll to Top */}
        {showScrollTop && (
          <button
            onClick={() =>
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }
            className="fixed p-3 text-white transition bg-indigo-600 rounded-full shadow-lg bottom-6 right-6 hover:bg-indigo-700"
          >
            ↑
          </button>
        )}
      </footer>
    </SkeletonTheme>
  );
}
