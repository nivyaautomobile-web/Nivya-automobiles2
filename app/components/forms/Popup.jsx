"use client";
import { useEffect, useState } from "react";

export default function NumberPopup() {
  const [open, setOpen] = useState(false);
  const [number, setNumber] = useState("");

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("popupShown");
    if (alreadyShown) return;

    const timer = setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem("popupShown", "true");
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // 🔒 Disable background scroll when popup is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [open]);

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
          <img
            src="/nivya_logo.png"
            alt="Logo"
            className="object-contain h-24 mb-2"
          />
          <h2 className="text-xl font-bold text-gray-800">Stay Connected</h2>
          <p className="text-sm text-center text-gray-500">
            Enter your mobile number to get offers & updates
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Number submitted: " + number);
            setOpen(false);
          }}
        >
          <input
            type="tel"
            maxLength={10}
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="Enter Mobile Number"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-600"
            required
          />

          <button
            type="submit"
            className="w-full py-3 mt-4 font-semibold text-white transition bg-[#283791] rounded-lg hover:bg-red-700"
          >
            Submit
          </button>
        </form>

      </div>
    </div>
  );
}
