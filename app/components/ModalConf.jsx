"use client";

import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";

export default function ModalConf() {
  const [showConfetti, setShowConfetti] = useState(true);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateSize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    updateSize(); // set initial size
    window.addEventListener("resize", updateSize);

    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 6000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  if (!showConfetti) return null;

  return <Confetti width={size.width} height={size.height} />;
}
