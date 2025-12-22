'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { Autoplay, Navigation } from 'swiper/modules';

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import 'swiper/css';
import 'swiper/css/navigation';

export default function Banner({ sliders = [] }) {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <SkeletonTheme
      baseColor="#e4e4e4"
      highlightColor="#f8f8f8"
      duration={1.2}
    >
      <div className="relative w-full">
        <Swiper
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          navigation={{
            nextEl: navigationNextRef.current,
            prevEl: navigationPrevRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = navigationPrevRef.current;
            swiper.params.navigation.nextEl = navigationNextRef.current;
          }}
          modules={[Navigation, Autoplay]}
          loop
          className="mySwiper"
        >
          {/* ⭐ SHIMMER SKELETON SLIDES */}
          {loading
            ? Array.from({ length: 2 }).map((_, i) => (
                <SwiperSlide key={i}>
                  <div className="relative w-full">
                    <Skeleton
                      height={500}
                      className="w-full rounded-none shimmer-effect"
                    />
                  </div>
                </SwiperSlide>
              ))
            : sliders.map((item, index) => (
                <SwiperSlide key={index}>
                  <Link href={item.link || "#"} className="select-none">
                    {/* Desktop */}
                    <div className="hidden md:block">
                      <Image
                        src={item.desktopImg}
                        alt={item.alt || "Banner"}
                        width={1920}
                        height={800}
                        className="object-cover w-full h-auto md:mt-20 md:mb-16 lg:mt-12 lg:mb-10 xl:mt-0 xl:mb-2 2xl:mt-0 2xl:mb-0"
                        priority={index === 0}
                      />
                    </div>

                    {/* Mobile */}
                    <div className="block mt-20 md:hidden">
                      <Image
                        src={item.mobileImg}
                        alt={item.alt || "Banner"}
                        width={800}
                        height={900}
                        className="object-cover w-full h-auto"
                      />
                    </div>
                  </Link>
                </SwiperSlide>
              ))}

          {/* Navigation Buttons — hide while loading */}
          {!loading && (
            <>
              <div
                ref={navigationPrevRef}
                className="absolute z-10 p-3 transition -translate-y-1/2 bg-white rounded-full shadow-md cursor-pointer left-4 md:left-10 top-1/2 hover:bg-gray-200"
              >
                <GrFormPrevious size={24} />
              </div>

              <div
                ref={navigationNextRef}
                className="absolute z-10 p-3 transition -translate-y-1/2 bg-white rounded-full shadow-md cursor-pointer right-4 md:right-10 top-1/2 hover:bg-gray-200"
              >
                <GrFormNext size={24} />
              </div>
            </>
          )}
        </Swiper>
      </div>
    </SkeletonTheme>
  );
}
