'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function VehicleForm({ Vehicle }) {
  const [formData, setFormData] = useState({ name: '', number: '', model: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/vehicle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success('✅ Inquiry submitted successfully!');
        setFormData({ name: '', number: '', model: '' });
      } else {
        toast.error('❌ Submission failed. Try again.');
      }
    } catch (error) {
      console.error(error);
      toast.error('⚠️ Server error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sticky top-6 w-full max-w-md mx-auto bg-gray-800/90 p-8 rounded-3xl shadow-[0_0_30px_rgba(255,215,0,0.1)] border border-yellow-400/40 backdrop-blur-md">
      <h2 className="mb-6 text-2xl font-bold text-center text-yellow-400">
        Vehicle Enquiry
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          name="name"
          type="text"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 text-gray-200 placeholder-gray-400 border border-gray-600 rounded-lg bg-black/40 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
        />

        <input
          name="number"
          type="tel"
          maxLength={10}
          placeholder="Mobile Number"
          value={formData.number}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 text-gray-200 placeholder-gray-400 border border-gray-600 rounded-lg bg-black/40 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
        />

        <select
          name="model"
          value={formData.model}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 text-gray-200 border border-gray-600 rounded-lg bg-black/40 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
        >
          <option value="" disabled>
            Select Model
          </option>
          {Vehicle}
        </select>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 font-semibold rounded-lg transition-all ${
            loading
              ? 'bg-yellow-600/60 cursor-not-allowed'
              : 'bg-yellow-400 text-black hover:bg-yellow-500'
          }`}
        >
          {loading ? 'Submitting...' : 'Submit Inquiry'}
        </button>
      </form>

      <p className="mt-5 text-xs text-center text-gray-400">
        By submitting, you agree to our{' '}
        <span className="text-yellow-400 underline cursor-pointer">
          Terms & Conditions
        </span>
      </p>
    </div>
  );
}
