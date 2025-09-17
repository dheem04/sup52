"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * Mobile-first Birthday single-page app (3 slides) — replace your app/page.tsx
 * Works great in a Next.js + Tailwind project (create-next-app with Tailwind recommended).
 * No real photos — all stickers / SVG cartoons / CSS confetti.
 */

const POEM = `Dad, you’re my first hero, my strongest guide,
With you by my side, I walk with pride.
At 52, your love shines even more bright,
Happy Birthday, Dad — my heart’s pure light.`;

const FINAL = `Happy Birthday Dear Appa,
I love you a lot. You are my role model and will always be. I know you are gonna ask me to not make you as my role model cause of a lot of things that has happened, but I just see the positives and you are the most hardworking, disciplined and dedicated person I ever know. You aren't just my dad but also my best friend. You just make me always be soo grateful to have a dad like you. I just love you a lot sundara. Many many happy returns of the day.`;

export default function BirthdayApp() {
  const [idx, setIdx] = useState(0); // current slide
  const containerRef = useRef<HTMLDivElement | null>(null);

  // touch handling for swipe
  const startX = useRef<number | null>(null);
  const deltaX = useRef<number>(0);

  useEffect(() => {
    // subtle entrance animation for first slide
    document.body.style.background = "linear-gradient(180deg, #FFF7ED 0%, #FFE4F0 100%)";
    return () => {
      document.body.style.background = "";
    };
  }, []);

  function go(n: number) {
    setIdx((v) => {
      const next = Math.max(0, Math.min(2, v + n));
      return next;
    });
  }

  function onTouchStart(e: React.TouchEvent) {
    startX.current = e.touches[0].clientX;
    deltaX.current = 0;
  }
  function onTouchMove(e: React.TouchEvent) {
    if (startX.current === null) return;
    deltaX.current = e.touches[0].clientX - startX.current;
    // optional: we could move the slides slightly while dragging (omitted for simplicity)
  }
  function onTouchEnd() {
    if (deltaX.current > 60) go(-1);
    else if (deltaX.current < -60) go(1);
    startX.current = null;
    deltaX.current = 0;
  }

  // click anywhere on first slide to reveal confetti burst
  function triggerConfetti() {
    const root = containerRef.current;
    if (!root) return;
    // create simple confetti pieces
    for (let i = 0; i < 22; i++) {
      const el = document.createElement("div");
      el.className = "confetti";
      el.style.left = `${30 + Math.random() * 40}%`;
      el.style.background = ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF"][
        Math.floor(Math.random() * 4)
      ];
      el.style.top = `35%`;
      root.appendChild(el);
      // remove after animation
      setTimeout(() => el.remove(), 2500);
    }
  }

  return (
    <div className="w-screen h-screen bg-gradient-to-b from-rose-50 via-amber-50 to-pink-50 flex items-center justify-center">
      <div
        ref={containerRef}
        className="relative w-full max-w-md h-full overflow-hidden rounded-3xl shadow-2xl bg-white/40 backdrop-blur-md mx-auto"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Sliding wrapper */}
        <div
          className="flex h-full w-[300%] transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${idx * 100}%)` }}
        >
          {/* Slide 1 — Cover */}
          <section className="w-screen max-w-md flex-shrink-0 flex items-center justify-center p-6">
            <div className="w-full h-full flex flex-col items-center justify-between py-8">
              <div className="mt-2 text-center space-y-4">
                <div className="inline-block px-4 py-2 rounded-full bg-white/70 shadow-sm">
                  <h1 className="text-3xl font-extrabold tracking-tight">Happy Birthday</h1>
                  <div className="text-2xl mt-1 font-medium">Appa — 52 🎉</div>
                </div>
              </div>

              {/* Cartoon sticker: Dad + Daughter */}
              <div className="relative w-full flex items-center justify-center">
                <StickerCharacters />
              </div>

              <div className="w-full flex items-center justify-between px-6">
                <button
                  onClick={() => go(-1)}
                  className="opacity-60 disabled:opacity-30 text-sm"
                  disabled={idx === 0}
                >
                  {/* invisible but present for layout */}
                </button>

                <div className="text-center">
                  <p className="text-sm opacity-80">Tap the card for a surprise ✨</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => triggerConfetti()}
                    className="px-3 py-2 rounded-full bg-white/80 backdrop-blur text-sm font-medium shadow"
                    aria-label="Celebrate now"
                  >
                    Celebrate
                  </button>
                  <button
                    onClick={() => go(1)}
                    className="px-3 py-2 rounded-full bg-rose-500 text-white font-semibold shadow"
                  >
                    Dive in →
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Slide 2 — Poem */}
          <section className="w-screen max-w-md flex-shrink-0 flex items-center justify-center p-6">
            <div className="w-full h-full flex flex-col items-center justify-between py-8">
              <div className="mt-2 text-center space-y-4">
                <h2 className="text-2xl font-bold">A little poem for Appa</h2>
                <div className="mt-2 p-4 rounded-2xl bg-white/80 shadow">
                  <pre className="whitespace-pre-wrap text-center text-lg leading-relaxed">{POEM}</pre>
                </div>
              </div>

              <div className="relative w-full flex items-center justify-center">
                <BalloonCluster />
              </div>

              <div className="w-full flex items-center justify-between px-6">
                <button
                  onClick={() => go(-1)}
                  className="px-3 py-2 rounded-full bg-white/80 shadow"
                >
                  ← Back
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={() => go(1)}
                    className="px-3 py-2 rounded-full bg-rose-500 text-white font-semibold shadow"
                  >
                    Next →
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Slide 3 — Final message */}
          <section className="w-screen max-w-md flex-shrink-0 flex items-center justify-center p-6">
            <div className="w-full h-full flex flex-col items-center justify-between py-8">
              <div className="space-y-4 text-center">
                <h2 className="text-2xl font-bold">To my Appa —</h2>
                <div className="mt-2 p-4 rounded-2xl bg-white/90 shadow-lg max-h-[52%] overflow-auto text-justify">
                  <p className="whitespace-pre-wrap leading-relaxed">{FINAL}</p>
                </div>
              </div>

              <div className="w-full flex items-center justify-between px-6">
                <button
                  onClick={() => go(-1)}
                  className="px-3 py-2 rounded-full bg-white/80 shadow"
                >
                  ← Back
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      // small sparkle by toggling a class
                      const node = containerRef.current;
                      if (!node) return;
                      node.classList.add("pulse-heart");
                      setTimeout(() => node.classList.remove("pulse-heart"), 900);
                    }}
                    className="px-3 py-2 rounded-full bg-amber-400 text-white font-semibold shadow"
                  >
                    Love ❤️
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Dots */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`w-3 h-3 rounded-full ${i === idx ? "bg-rose-500" : "bg-white/70"} shadow`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Confetti styles (inlined) */}
        <style>{`
          .confetti{
            position: absolute;
            width: 10px;
            height: 14px;
            border-radius: 3px;
            opacity: 0.95;
            transform-origin: center;
            animation: confetti-fall 2s ease-out forwards;
            z-index: 60;
            left: 50%;
          }
          @keyframes confetti-fall{
            0%{ transform: translateY(0) rotate(0) }
            100%{ transform: translateY(280px) rotate(520deg); opacity: 0 }
          }

          /* pulse-heart used when "Love" clicked */
          .pulse-heart::after{
            content: '';
            position: absolute;
            inset: 0;
            border-radius: 24px;
            box-shadow: 0 0 30px 8px rgba(255,99,132,0.12);
            pointer-events: none;
            animation: pulse 0.9s ease-out;
          }
          @keyframes pulse{ from{ transform: scale(0.96); opacity: 0.9 } to { transform: scale(1.05); opacity: 0 } }
        `}</style>
      </div>
    </div>
  );
}


/** Simple inline SVG characters — lightweight, cute and customizable */
function StickerCharacters() {
  return (
    <div className="flex items-end gap-4 transform-gpu">
      <div className="flex flex-col items-center">
        <div className="w-28 h-32 rounded-2xl bg-gradient-to-br from-yellow-50 to-yellow-200 flex items-end justify-center p-2 shadow-lg animate-bob">
          <DadSVG />
        </div>
        <div className="mt-2 text-sm font-medium">Appa</div>
      </div>

      <div className="flex flex-col items-center">
        <div className="w-20 h-24 rounded-2xl bg-gradient-to-br from-pink-50 to-pink-100 flex items-end justify-center p-2 shadow-lg animate-bob animation-delay-200">
          <DaughterSVG />
        </div>
        <div className="mt-2 text-sm font-medium">Daughter</div>
      </div>

      <style>{`
        .animate-bob{ animation: bob 2.6s ease-in-out infinite }
        .animation-delay-200{ animation-delay: 0.15s }
        @keyframes bob{ 0%{ transform: translateY(0) } 50%{ transform: translateY(-8px) } 100%{ transform: translateY(0) } }
      `}</style>
    </div>
  );
}

function DadSVG() {
  return (
    <svg width="84" height="84" viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="42" cy="26" r="18" fill="#FFE9C9" />
      <rect x="16" y="44" width="52" height="28" rx="8" fill="#6B46C1" />
      <circle cx="35" cy="24" r="2.5" fill="#3A3A3A" />
      <circle cx="49" cy="24" r="2.5" fill="#3A3A3A" />
      <path d="M33 31c2 2.5 6.5 2.5 8.5 0" stroke="#3A3A3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M30 38c5 3 18 3 24 0" stroke="#E6C07C" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
    </svg>
  );
}

function DaughterSVG() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="20" r="12" fill="#FFE9C9" />
      <rect x="14" y="32" width="36" height="22" rx="6" fill="#FF7AB6" />
      <circle cx="27" cy="19" r="1.8" fill="#3A3A3A" />
      <circle cx="37" cy="19" r="1.8" fill="#3A3A3A" />
      <path d="M27 26c1.5 1.7 4.9 1.7 6.4 0" stroke="#3A3A3A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M24 14c2-1 6-1 8 0" stroke="#FF4DA6" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

function BalloonCluster() {
  return (
    <div className="w-full flex items-center justify-center mt-4 relative">
      <div className="flex gap-3 items-end">
        <Balloon color="#FF6B6B" delay={0} />
        <Balloon color="#FFD93D" delay={120} />
        <Balloon color="#6BCB77" delay={240} />
      </div>
    </div>
  );
}

function Balloon({ color, delay = 0 }: { color: string; delay?: number }) {
  // inlined style to keep bundle tiny
  const style = {
    animationDelay: `${delay}ms`,
  } as React.CSSProperties;
  return (
    <div className="flex flex-col items-center" style={{ transform: "translateY(0)" }}>
      <svg width="64" height="84" viewBox="0 0 64 84" fill="none" xmlns="http://www.w3.org/2000/svg" style={style} className="animate-float">
        <defs>
          <linearGradient id={`g-${color.replace('#','')}`} x1="0" x2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.95" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <ellipse cx="32" cy="28" rx="20" ry="24" fill={`url(#g-${color.replace('#','')})`} />
        <path d="M32 52v20" stroke="#111827" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
      <style>{`
        .animate-float{ animation: floaty 3.2s ease-in-out infinite }
        @keyframes floaty{ 0%{ transform: translateY(0) } 50%{ transform: translateY(-10px) } 100%{ transform: translateY(0) } }
      `}</style>
    </div>
  );
}
