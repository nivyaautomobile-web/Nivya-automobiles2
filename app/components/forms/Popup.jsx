"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function NumberPopup() {
  const [open, setOpen] = useState(false);
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);   // ✅ NEW

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("popupShown");
    if (alreadyShown) return;

    const timer = setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem("popupShown", "true");
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [open]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return; // avoid multiple clicks

    const phoneRegex = /^[6-9][0-9]{9}$/;
    if (!phoneRegex.test(number)) {
      toast.error("Enter a valid 10-digit mobile number starting with 6/7/8/9");
      return;
    }

    try {
      setLoading(true);   // ⏳ show loading
      const res = await fetch("/api/popup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ number }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to submit");

      toast.success("Number submitted successfully!");
      setNumber("");
      setOpen(false);
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
      console.log("Submit Error:", err);
    } finally {
      setLoading(false);  // ✅ reset button
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-[90%] max-w-md bg-white rounded-2xl shadow-xl p-6 relative">
        <button
          onClick={() => setOpen(false)}
          className="absolute text-gray-500 top-3 right-3 hover:text-black"
        >
          ✕
        </button>

        <div className="flex flex-col items-center mb-3">
          <img src="/nivya_logo.png" alt="Logo" className="object-contain h-24 mb-2" />
          <h2 className="text-xl font-bold text-gray-800">Stay Connected</h2>
          <p className="text-sm text-center text-gray-500">
            Enter your mobile number to get offers & updates
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="tel"
            maxLength={10}
            value={number}
            onChange={(e) => setNumber(e.target.value.replace(/\D/g, ""))}
            placeholder="Enter Mobile Number"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-600"
            required
          />

          <button
            type="submit"
            disabled={loading}   // ⛔ disable when loading
            className={`w-full py-3 mt-4 font-semibold text-white rounded-lg transition
              ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#283791] hover:bg-red-700"}
            `}
          >
            {loading ? "Submitting..." : "Submit"}   {/* ⏳ text change */}
          </button>
        </form>
      </div>
    </div>
  );
}
