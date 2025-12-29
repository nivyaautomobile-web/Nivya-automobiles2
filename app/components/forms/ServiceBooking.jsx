'use client';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

export default function ServiceBooking() {

  const [formData, setFormData] = useState({
    name: '',
    number: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";

    if (!formData.number.trim()) {
      newErrors.number = "Mobile number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.number)) {
      newErrors.number = "Enter a valid 10-digit mobile number";
    }

    if (!formData.message.trim())
      newErrors.message = "Message is required";

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/service", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Submit failed");

      toast.success("✅ Submitted successfully!");
      setFormData({ name: "", number: "", message: "" });
    } catch (err) {
      console.error(err);
      toast.error("❌ Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-full p-10 mx-auto bg-white shadow-lg rounded-3xl">
      <h2 className="mb-8 text-3xl font-semibold text-center md:text-left">
        Book a Service Appointment
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-6 md:grid-cols-2"
        noValidate
      >
        {/* Name */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm">Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`py-2 border-b outline-none ${errors.name ? "border-red-500" : "border-gray-400"
              }`}
          />
          {errors.name && <span className="text-xs text-red-500">{errors.name}</span>}
        </div>

        {/* Mobile Number */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm">Mobile Number *</label>
          <input
            type="text"
            name="number"
            maxLength={10}
            value={formData.number}
            onChange={handleChange}
            className={`py-2 border-b outline-none ${errors.number ? "border-red-500" : "border-gray-400"
              }`}
          />
          {errors.number && <span className="text-xs text-red-500">{errors.number}</span>}
        </div>

        {/* Message */}
        <div className="flex flex-col space-y-2 md:col-span-2">
          <label className="text-sm">Message *</label>
          <textarea
            name="message"
            rows="2"
            value={formData.message}
            onChange={handleChange}
            className={`py-2 border-b outline-none resize-none ${errors.message ? "border-red-500" : "border-gray-400"
              }`}
          ></textarea>
          {errors.message && <span className="text-xs text-red-500">{errors.message}</span>}
        </div>

        {/* Submit */}
        <div className="flex items-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-2 font-semibold text-white transition-all bg-[#283791] rounded-full shadow-md hover:bg-red-700 disabled:opacity-60 "
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>

        </div>

      </form>
    </div>
  );
}
