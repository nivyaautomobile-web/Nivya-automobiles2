'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { Download } from 'lucide-react';
import { useState, useEffect } from 'react';

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Lazy-load form
const BookNowForm = dynamic(() => import('./forms/Booknowform'), {
  ssr: false,
  loading: () => <div className="p-4 text-center">Loading form...</div>,
});

export default function CarGridClient({ cars }) {
  const [formOpen, setFormOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate slight load delay
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  const handleBookNow = (car) => {
    setSelectedCar(car);
    setFormOpen(true);
  };

  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">

        {/* ⭐ If loading → show shimmer skeleton cards */}
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="overflow-hidden border shadow-md rounded-2xl bg-[#e7e7e7] border-neutral-700 animate-pulse"
            >
              <div className="flex items-center justify-between px-5 pt-4">
                <Skeleton width={60} height={14} />
                <Skeleton width={70} height={16} />
              </div>

              <div className="flex items-center justify-center w-full px-4 py-6">
                <Skeleton height={160} width="100%" className="rounded-lg" />
              </div>

              <div className="p-6 text-center">
                <Skeleton height={20} width="70%" className="mx-auto mb-2" />
                <Skeleton height={24} width="40%" className="mx-auto mb-1" />
                <Skeleton height={12} width="50%" className="mx-auto mb-6" />

                <div className="flex justify-center gap-3">
                  <Skeleton height={36} width={100} className="rounded-full" />
                  <Skeleton height={36} width={100} className="rounded-full" />
                </div>
              </div>
            </div>
          ))

          : cars.map((car, index) => (
            <div
              key={index}
              className="overflow-hidden transition-all duration-300 border shadow-md group bg-[#e7e7e7] border-neutral-700 rounded-2xl hover:shadow-xl hover:border-neutral-500 hover:scale-105 hover:duration-100"
            >
              {/* Top Bar */}
              <div className="flex items-center justify-between px-5 pt-4">
                <span className="text-xs font-medium tracking-wide text-gray-400"></span>

                <Link
                  href={car.brochure}
                  target="_blank"
                  className="flex items-center gap-1 text-xs text-black hover:text-blue-600"
                >
                  <Download className="w-4 h-4" />
                  Brochure
                </Link>
              </div>

              {/* Car Image */}
              <div className="flex items-center justify-center w-full px-4 py-4 mt-4 bg-[#e7e7e7]">
                <Link href={car.link}>
                  <Image
                    src={car.image}
                    alt={car.name}
                    width={400}
                    height={220}
                    className="object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                    loading="lazy"
                    quality={75}
                  />
                </Link>
              </div>

              {/* Details */}
              <div className="p-6 text-center">
                <h3 className="text-lg font-semibold text-black">{car.name}</h3>
                <p className="text-xl font-bold text-black">{car.price}</p>
                <p className="mb-6 text-xs text-gray-600">ex-showroom</p>

                {/* Buttons */}
                <div className="flex justify-center gap-3">
                  <Link href={car.link}>
                    <button className="px-6 py-2 text-xs font-semibold text-black transition-all border rounded-full hover:bg-black hover:text-white">
                      EXPLORE
                    </button>
                  </Link>

                  <button
                    onClick={() => handleBookNow(car)}
                    className="px-6 py-2 text-xs font-semibold text-white transition-all bg-[#283791] rounded-full hover:bg-red-700"
                  >
                    BOOK NOW
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Lazy-loaded Form */}
      {formOpen && selectedCar && (
        <BookNowForm
          open={formOpen}
          setOpen={setFormOpen}
          carName={selectedCar.name}
        />
      )}
    </SkeletonTheme>
  );
}
