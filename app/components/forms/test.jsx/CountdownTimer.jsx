"use client";
import { useEffect, useState } from "react";

export default function CountdownTimer({ target }) {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const targetTime = new Date(target).getTime();

    const interval = setInterval(() => {
      const now = Date.now();
      const diff = Math.floor((targetTime - now) / 1000); // ✅ FIXED LINE

      if (diff <= 0) {
        setTimeLeft(0);
        clearInterval(interval);
        return;
      }

      setTimeLeft(diff);
    }, 1000);

    return () => clearInterval(interval);
  }, [target]);

  // 🧮 Convert seconds → HH:MM:SS
  const hours = String(Math.floor(timeLeft / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((timeLeft % 3600) / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  if (timeLeft === 0) return null;

  return (
    <div className="fixed px-3 py-2 font-bold bg-gray-900 shadow-2xl z-9999 rounded-xl bottom-4 right-4 sm:bottom-6 sm:right-6 sm:px-4 sm:py-3 animate-bounce">
      {/* Title */}
      <span className="block font-sans text-base text-red-600 capitalize sm:text-xl md:text-2xl">
        NEW YEAR COUNTDOWN
      </span>

      {/* Time */}
      <span className="block mt-1 font-sans text-3xl text-yellow-300 sm:text-5xl md:text-6xl lg:text-7xl">
        <span className="">{hours}</span>:{minutes}:{seconds}
      </span>
    </div>
  );
}
