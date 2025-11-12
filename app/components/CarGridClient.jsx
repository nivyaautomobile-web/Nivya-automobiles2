'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { Download } from 'lucide-react';
import { useState } from 'react';

// ✅ Lazy-load the form to reduce initial JS
const BookNowForm = dynamic(() => import('./forms/Booknowform'), {
  ssr: false,
  loading: () => <div className="p-4 text-center">Loading form...</div>,
});

export default function CarGridClient({ cars }) {
  const [formOpen, setFormOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  const handleBookNow = (car) => {
    setSelectedCar(car);
    setFormOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {cars.map((car, index) => (
          <div
            key={index}
            className="overflow-hidden transition-all duration-300 border shadow-md group bg-[#e7e7e7] border-neutral-700 rounded-2xl hover:shadow-lg hover:border-neutral-500"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between px-5 pt-4">
              <span className="text-xs font-medium tracking-wide text-gray-400"></span>
              <Link
                href={car.brochure}
                className="flex items-center gap-1 text-xs text-black transition hover:text-blue-600"
                target="_blank"
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
                  loading="lazy" // ✅ lazy-load all car images
                  quality={75}
                />
              </Link>
            </div>

            {/* Details */}
            <div className="p-6 text-center">
              <h3 className="text-lg font-semibold tracking-tight text-black">
                {car.name}
              </h3>
              <p className="text-xl font-bold text-black">{car.price}</p>
              <p className="mb-6 text-xs text-gray-600">ex-showroom</p>

              {/* Buttons */}
              <div className="flex justify-center gap-3">
                <Link href={car.link}>
                  <button className="px-6 py-2 text-xs font-semibold text-black transition-all duration-200 border rounded-full border-white/30 hover:bg-black hover:text-white">
                    EXPLORE
                  </button>
                </Link>
                <button
                  onClick={() => handleBookNow(car)}
                  className="px-6 py-2 text-xs font-semibold text-black transition-all duration-200 bg-white rounded-full hover:bg-gray-200"
                >
                  BOOK NOW
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Lazy-loaded form only when opened */}
      {formOpen && selectedCar && (
        <BookNowForm open={formOpen} setOpen={setFormOpen} carName={selectedCar.name} />
      )}
    </>
  );
}
