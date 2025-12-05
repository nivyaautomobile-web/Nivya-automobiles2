"use client";

import React, { useState, memo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { FaGasPump, FaCarSide } from "react-icons/fa";
import { GiGearStickPattern } from "react-icons/gi";

import ColorSelector from "../ColorSelector";

const HighlightCard = memo(({ label, value, icon: Icon, loading }) => {
  if (loading) {
    return (
      <div className="p-4 border border-white/20 bg-white/5 rounded-xl backdrop-blur-md animate-pulse">
        <Skeleton height={20} width={80} />
        <Skeleton height={28} width={120} className="mt-2" />
      </div>
    );
  }

  return (
    <div className="flex items-center w-full max-w-xs gap-3 p-3 transition-all duration-500 border shadow-md sm:gap-4 sm:p-4 md:p-5 bg-white/10 backdrop-blur-lg border-white/20 rounded-xl sm:rounded-2xl hover:shadow-xl hover:-translate-y-1 sm:max-w-sm md:max-w-md">
      {Icon && <Icon className="text-[#d4af37] text-2xl sm:text-3xl md:text-4xl" />}

      <div className="flex flex-col">
        <p className="text-[10px] sm:text-xs md:text-sm font-medium tracking-wider text-gray-300 uppercase">
          {label}
        </p>
        <h3 className="mt-1 text-lg font-semibold text-white sm:text-xl md:text-2xl">
          {value}
        </h3>
      </div>
    </div>
  );
});

export default function CarPromoBanner({
  carName,
  price,
  type,
  fuelType,
  engine,
  imageUrl,
  brochure,
  colors = [],
  seatingCapacity,
  mileage,
}) {
  const [selectedColor, setSelectedColor] = useState(
    colors[0] || { image: imageUrl, name: "Default", id: 0 }
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <SkeletonTheme baseColor="#2b2b2b" highlightColor="#3a3a3a">
      <section className="relative w-full text-gray-100 bg-gradient-to-b from-[#1b1b1b] via-[#222] to-[#111] overflow-hidden">
        {/* Background glows */}
        <div className="absolute inset-0 z-0">
          <div className="absolute w-[700px] h-[700px] bg-[#d4af37]/10 rounded-full blur-[180px] top-[-200px] left-[-200px]" />
          <div className="absolute w-[600px] h-[600px] bg-[#c1121f]/10 rounded-full blur-[180px] bottom-[-200px] right-[-200px]" />
        </div>

        <div className="relative z-10 flex flex-col-reverse items-center justify-between gap-16 px-6 py-24 mx-auto md:flex-row max-w-7xl">
          {/* LEFT – TEXT INFO */}
          <div className="flex-1 space-y-10">
            {/* Title */}
            {loading ? (
              <div>
                <Skeleton height={40} width={260} />
                <Skeleton height={10} width={120} className="mt-4" />
              </div>
            ) : (
              <div className="space-y-4">
                <h2 className="text-4xl font-extrabold tracking-tight uppercase md:text-6xl bg-gradient-to-r from-[#f7e7ce] to-[#d4af37] bg-clip-text text-transparent drop-shadow-sm">
                  {carName}
                </h2>
                <div className="w-40 h-1 bg-gradient-to-r from-[#d4af37] to-[#f7e7ce] rounded-full"></div>
              </div>
            )}

            {/* Highlight Cards */}
            <div className="grid grid-cols-2 gap-6 md:gap-8">
              <HighlightCard label="Starts From" value={price} loading={loading} />
              <HighlightCard label="Body Type" value={type} icon={FaCarSide} loading={loading} />
              <HighlightCard label="Fuel Type" value={fuelType} icon={FaGasPump} loading={loading} />
              <HighlightCard label="Engine" value={engine} icon={GiGearStickPattern} loading={loading} />
              <HighlightCard label="Seating Capacity" value={seatingCapacity} icon={FaCarSide} loading={loading} />
              <HighlightCard label="Mileage" value={mileage} icon={FaGasPump} loading={loading} />
            </div>
          </div>

          {/* RIGHT – IMAGE & COLORS */}
          <div className="flex flex-col items-center flex-1 space-y-6">
            {loading ? (
              <Skeleton height={280} width={400} className="rounded-xl" />
            ) : (
              <ColorSelector
                colors={colors.length ? colors : [{ id: 0, name: "Default", image: imageUrl }]}
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
              />
            )}
          </div>
        </div>

        {/* CTA BUTTONS */}
        <div className="flex flex-col items-center justify-center gap-4 py-12 md:flex-row md:gap-6">
          {loading ? (
            <>
              <Skeleton width={180} height={50} className="rounded-xl" />
              <Skeleton width={180} height={50} className="rounded-xl" />
            </>
          ) : (
            <>
              <Link
                href={`/book-test-drive/${encodeURIComponent(carName)}`}
                className="px-8 py-3 font-semibold text-white transition-all duration-300 border-2 border-[#d4af37] rounded-xl shadow hover:bg-[#d4af37] hover:text-black hover:scale-105"
              >
                Book a Test Drive
              </Link>

              <Link
                href="#vehicleForm"
                scroll={true}
                className="px-8 py-3 font-semibold text-white transition-all duration-300 bg-[#c1121f] rounded-xl shadow hover:bg-[#d73326] hover:scale-105"
              >
                Get On-Road Price
              </Link>
            </>
          )}
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent"></div>
      </section>
    </SkeletonTheme>
  );
}
