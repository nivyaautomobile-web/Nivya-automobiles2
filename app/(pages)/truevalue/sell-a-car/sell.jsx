"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import ResponsiveBanner from "@/app/components/ResponsiveBanner";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Link from "next/link";
export default function TrueValueSell() {
  const [openIndex, setOpenIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    name: "",
    email: "",
    number: "",
    authorize: false,
    formType: "Sell",
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const faqs = [
    {
      q: "Where can I get my car evaluated?",
      a: "You can easily book an online or doorstep evaluation using the Maruti Suzuki True Value website or app.",
    },
    {
      q: "How will you ensure I get the right price?",
      a: "Our AI-based pricing engine uses market data and 376 inspection checkpoints to give you the most accurate value for your car.",
    },
    {
      q: "Is there any fee or commission?",
      a: "No additional charges or commissions apply when selling your car to Maruti Suzuki True Value.",
    },
    {
      q: "How soon will I get my payment?",
      a: "Payments are made in full after successful RTO verification of your documents.",
    },
  ];

  const toggleFAQ = (i) => setOpenIndex(openIndex === i ? null : i);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim() || form.name.trim().length < 3)
      newErrors.name = "Name must be at least 3 characters.";

    if (form.email && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email))
      newErrors.email = "Enter a valid email address.";

    if (!/^[6-9]\d{9}$/.test(form.number))
      newErrors.number = "Enter a valid 10-digit mobile number.";

    if (!form.authorize)
      newErrors.authorize = "You must authorize contact before submitting.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix form errors before submitting.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        toast.success("Thank you! Your details have been submitted.");
        setForm({
          name: "",
          email: "",
          number: "",
          authorize: false,
        });
        setErrors({});
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (err) {
      toast.error("Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <div className="min-h-screen bg-gray-50">
        {/* Banner Section */}
        <div className="relative w-full mt-20">
          {loading ? (
            <Skeleton height={300} className="w-full rounded-none" />
          ) : (
            <ResponsiveBanner
              desktopSrc="https://www.skyautomobiles.in/_next/image?url=%2Fimages%2Fother%2Fsell_car.webp&w=3840&q=75"
              mobileSrc="https://www.skyautomobiles.in/_next/image?url=%2Fimages%2Fother%2Fsell_car_mobile.webp&w=1080&q=75"
              altText="Sky Automobiles Contact Us Banner"
            />
          )}
        </div>

        {/* Form Section */}
        <section className="p-6 mx-auto my-16 bg-white border border-gray-100 shadow-2xl max-w-7xl sm:p-10 rounded-3xl">
          {loading ? (
            <>
              <Skeleton height={30} width={300} className="mx-auto mb-10" />

              {/* Form Skeleton */}
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} height={90} />
                ))}
                <Skeleton height={40} width={250} />
                <Skeleton height={55} className="sm:col-span-3" />
              </div>
            </>
          ) : (
            <>
              <h2 className="mb-10 text-2xl font-bold text-center text-gray-800 sm:text-3xl">
                Enter Your Car Details for a Hassle-Free Experience
              </h2>

              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 gap-8 sm:grid-cols-3"
              >
                {/* Name */}
                <div className="flex flex-col">
                  <label className="mb-2 font-medium text-gray-600">Name*</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className={`px-4 py-2 border rounded-lg ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col">
                  <label className="mb-2 font-medium text-gray-600">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className={`px-4 py-2 border rounded-lg ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                {/* Number */}
                <div className="flex flex-col">
                  <label className="mb-2 font-medium text-gray-600">Mobile*</label>
                  <input
                    type="tel"
                    name="number"
                    value={form.number}
                    onChange={handleChange}
                    className={`px-4 py-2 border rounded-lg ${
                      errors.number ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.number && (
                    <p className="mt-1 text-sm text-red-500">{errors.number}</p>
                  )}
                </div>

                {/* Authorization */}
                <div className="flex items-start gap-3 sm:col-span-3">
                  <input
                    type="checkbox"
                    name="authorize"
                    checked={form.authorize}
                    onChange={handleChange}
                    className="w-5 h-5"
                  />
                  <p className="text-xs leading-relaxed text-gray-500 ">
          *By clicking <span className="font-semibold text-gray-700">Submit</span>, I agree to the{" "}
          <Link href='/terms-and-conditions' className="text-blue-600 cursor-pointer hover:text-blue-700">
            Terms & Conditions
          </Link>
          and
          <Link href='/privacy-policy' className="text-blue-600 cursor-pointer hover:text-blue-700">
            Privacy Policy
          </Link>{" "}
          and I give my consent to receive updates via{" "}
          <span className="font-medium text-gray-700">SMS</span> /{" "}
          <span className="font-medium text-gray-700">Email</span>.
        </p>

                </div>
                {errors.authorize && (
                  <p className="text-sm text-red-500 sm:col-span-3">
                    {errors.authorize}
                  </p>
                )}

                {/* Submit */}
                <div className="flex justify-center sm:col-span-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 text-lg font-bold text-white bg-[#283791]  sm:w-1/2 rounded-xl hover:bg-red-700"
                  >
                    {loading ? "Submitting..." : "SUBMIT"}
                  </button>
                </div>
              </form>
            </>
          )}
        </section>

        {/* FAQ Section */}
        <section className="px-6 mx-auto my-20 max-w-7xl sm:px-12">
          <h2 className="mb-10 text-3xl font-bold text-center text-gray-800">
            Frequently Asked Questions
          </h2>

          {loading ? (
            <div className="space-y-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} height={90} className="rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {faqs.map((f, i) => (
                <div key={i} className="overflow-hidden border border-gray-200 rounded-2xl">
                  <button
                    onClick={() => toggleFAQ(i)}
                    className="flex items-center justify-between w-full p-5 text-left bg-white"
                  >
                    <span className="font-medium text-gray-800">{f.q}</span>
                    <span className="text-xl text-blue-800">
                      {openIndex === i ? "−" : "+"}
                    </span>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 bg-gray-50 ${
                      openIndex === i ? "max-h-96 p-5" : "max-h-0"
                    }`}
                  >
                    <p className="leading-relaxed text-gray-600">{f.a}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </SkeletonTheme>
  );
}
