"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function NumberPopup() {
  const [open, setOpen] = useState(false);
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [successAnim, setSuccessAnim] = useState(false);

  useEffect(() => {
    // 💾 Don't show popup again if number already saved
    const saved = localStorage.getItem("popupNumberSaved");
    const alreadyShown = sessionStorage.getItem("popupShown");

    if (saved || alreadyShown) return;

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
    if (loading) return;

    const phoneRegex = /^[6-9][0-9]{9}$/;
    if (!phoneRegex.test(number)) {
      toast.error("Enter a valid 10-digit mobile number starting with 6/7/8/9");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/popup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ number }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to submit");

      // 💾 Save so popup won't show next time
      localStorage.setItem("popupNumberSaved", number);

      toast.success("Number submitted successfully!");

      // ✔ Play success animation
      setSuccessAnim(true);

      // 🕒 Delay closing popup
      setTimeout(() => {
        setOpen(false);
        setSuccessAnim(false);
        setNumber("");
      }, 1200);

    } catch (err) {
      toast.error("Something went wrong. Please try again.");
      console.log(err);
    } finally {
      setLoading(false);
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
            disabled={loading || successAnim}
          />

          <button
            type="submit"
            disabled={loading || successAnim}
            className={`w-full py-3 mt-4 font-semibold text-white rounded-lg flex items-center justify-center gap-2
              transition-all duration-300
              ${
                successAnim
                  ? "bg-green-600"
                  : loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#283791] hover:bg-red-700"
              }
            `}
          >
            {/* ⏳ Spinner */}
            {loading && (
              <span className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></span>
            )}

            {/* ✔ Success Check */}
            {successAnim && (
              <span className="text-xl animate-bounce">✔</span>
            )}

            {/* Button Text */}
            {!loading && !successAnim && "Submit"}
            {loading && "Submitting..."}
            {successAnim && "Submitted"}
          </button>
        </form>
      </div>
    </div>
  );
}
