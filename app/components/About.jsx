"use client";


import Link from "next/link";
import React, { useState, useEffect } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function About() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <section className="px-6 py-16 bg-white md:px-12 lg:px-20">
        <div className="grid items-center gap-10 mx-auto max-w-7xl md:grid-cols-2">

          {/* LEFT TEXT SECTION */}
          <div>
            {loading ? (
              <>
                <Skeleton width={120} height={20} className="mb-3" />
                <Skeleton width={"80%"} height={34} className="mb-3" />
                <Skeleton width={"90%"} height={34} className="mb-4" />
                <Skeleton count={3} height={14} className="mb-2" />
                <Skeleton width={160} height={45} className="mt-6 rounded-sm" />
              </>
            ) : (
              <>
                <h3 className="text-[#0a0a1a] font-semibold text-lg mb-2">
                  About Us
                </h3>

                <h2 className="text-3xl md:text-4xl font-bold text-[#0a0a1a] mb-4 leading-snug">
                  Welcome to Nivya Automobiles – <br />
                  <span className="text-[#0a0a1a] font-semibold">
                    Where Your Passion Meets Our Excellence
                  </span>
                </h2>

                <p className="mb-8 leading-relaxed text-gray-600">
                  Built on the values of trust, transparency and values of our leaders, Mr Mallu Reddy Niveditha and Mr Mallu Venkata Siva Prasad Reddy, Nivya Automobiles promises a seamless car-purchasing journey. Through this Arena showroom located at NH-44, Rajeev Colony, Near Shilparamam, Anantapur, Andhra Pradesh, we offer modern facilities, end-to-end assistance and the spirit for improvement. At Nivya Automobiles, we aim to redefine what customers expect and deliver more than that. Visit us today!
                </p>

                <Link href={"/about"}><button className="bg-[#283791]  text-white px-8 py-4 font-medium rounded-sm hover:bg-red-700 transition">
                  More About Us
                </button></Link>
              </>
            )}
          </div>

          {/* RIGHT VIDEO SECTION */}
          <div className="flex justify-center">
            {loading ? (
              <Skeleton height={350} width={"100%"} className="rounded-lg" />
            ) : (
              <div className="w-full overflow-hidden rounded-lg shadow-md">
                <img src="/images/About_us.png" />

              </div>
            )}
          </div>
        </div>
      </section>
    </SkeletonTheme>
  );
}
