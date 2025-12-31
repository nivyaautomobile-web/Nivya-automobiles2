"use client";
import { useEffect, useState, useRef } from "react";
import { GiFireworkRocket } from "react-icons/gi";
import { Lobster_Two } from "next/font/google";

const lobster = Lobster_Two({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function NewYearMidnightBlast() {

  const [blast, setBlast] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [timeLeft, setTimeLeft] = useState("00:00:00");
  const [fading, setFading] = useState(false);

  const audioRef = useRef(null);
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);

  const randColor = () =>
    `hsl(${Math.floor(Math.random() * 360)}, 90%, 60%)`;

  const fireNumber = 12;
  const range = 60;

  function makeCircleFirework(fire) {
    const color = randColor();
    const velocity = Math.random() * 2 + 6;
    const max = fireNumber * 20;
    const fireworks = [];

    for (let i = 0; i < max; i++) {
      const rad = (i * Math.PI * 2) / max;

      fireworks.push({
        x: fire.x,
        y: fire.y,
        size: Math.random() + 1.5,
        color,
        vx: Math.cos(rad) * velocity,
        vy: Math.sin(rad) * velocity,
        ay: 0.04,
        life: Math.round((Math.random() * range) / 2) + range / 2
      });
    }

    return fireworks;
  }

  /* 🎆 Fireworks Render */
  useEffect(() => {
    if (!blast) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    particlesRef.current.push(
      ...makeCircleFirework({
        x: window.innerWidth - 120,
        y: window.innerHeight - 120
      })
    );

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p, i) => {
        p.vy += p.ay;
        p.x += p.vx;
        p.y += p.vy;
        p.life--;

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        if (p.life <= 0) particlesRef.current.splice(i, 1);
      });

      if (particlesRef.current.length) requestAnimationFrame(draw);
    }

    draw();
  }, [blast]);

  /* 🕛 Countdown to Midnight */
  useEffect(() => {
    // const target = new Date();
    // target.setHours(24, 0, 0, 0); // midnight today
    // 🚀 TEST MODE — blast after 5 seconds
    const target = new Date(Date.now() + 1000);

    const tick = setInterval(() => {
      const now = new Date();
      const diff = target - now;

      if (diff <= 0) {
        clearInterval(tick);

        setBlast(true);
        setShowPopup(true);
        setTimeLeft("00:00:00");
        audioRef.current?.play();

        // ⏳ Auto-hide after 5s with fade-out
        setTimeout(() => {
          setFading(true);          // start fade
          setTimeout(() => setShowPopup(false), 800); // remove after fade
        }, 5000);


        return;
      }

      const h = String(Math.floor(diff / 3600000)).padStart(2, "0");
      const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0");
      const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");

      setTimeLeft(`${h}:${m}:${s}`);
    }, 1000);

    return () => clearInterval(tick);
  }, []);

  if (!showPopup) return null; // 👈 hide when finished

  return (
    <div className="fixed inset-0 z-999 bg-black/80 backdrop-blur-xl">

      <video className="absolute inset-0 object-cover w-full h-full opacity-30"
        src="/19732710-uhd_2160_3840_60fps.mp4"
        autoPlay loop muted playsInline />

      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
      <audio ref={audioRef} src="/preview.mp3" preload="auto" />

      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div className={`text-center w-full max-w-5xl ${blast ? "scale-blast" : "scale-in"} ${fading ? "fade-out" : ""}`}>
          <h1
            className="text-4xl font-extrabold leading-tight text-center gold-text sm:text-5xl md:text-6xl lg:text-7xl"
          >
            <span className={`${lobster.className} block`}>Happy</span>

            <span className={`${lobster.className} block text-5xl sm:text-6xl md:text-7xl lg:text-8xl`}>
              New Year
            </span>
            <span className={`${lobster.className} block mt-1 text-4xl sm:text-5xl md:text-6xl`}>
              2026
            </span>
          </h1>




          {blast && (
            <p className={`${lobster.className} mt-3 text-lg text-white/90 sm:text-xl md:text-2xl`}>
              Wishing you joy, success & new beginnings ✨
            </p>
          )}
        </div>
      </div>

      <style jsx>
        {`
        .scale-in{animation:pop .6s ease-out forwards;transform:scale(.6);opacity:0}
        @keyframes pop{to{transform:scale(1);opacity:1}}

        .scale-blast{animation:blast .9s ease-out forwards}
        @keyframes blast{
          0%{transform:scale(.8)}
          40%{transform:scale(1.25)}
          70%{transform:scale(.95)}
          100%{transform:scale(1)}
        }

        .gold-text{
          background:linear-gradient(90deg,#ffe27a,#fff,#ffd34d,#fff,#ffe27a);
          -webkit-background-clip:text;
          color:transparent;
          background-size:300%;
          animation:shine 2s linear infinite;
        }
        @keyframes shine{to{background-position:300%}}
        .fade-out {
  animation: fadeOut .2s ease forwards;
}

@keyframes fadeOut {
  to {
    opacity: 0;
    transform: scale(.9);
  }
}

      `}</style>

    </div>
  );
}
