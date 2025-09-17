'use client';
import { useState, useRef, useEffect } from 'react';

const POEM = `Dad, you're my first hero, my strongest guide,
With you by my side, I walk with pride.
At 52, your love shines even more bright,
Happy Birthday, Dad — my heart's pure light.`;

const FINAL = `Happy Birthday Dear Appa,

I love you a lot. You are my role model and will always be. I know you are gonna ask me to not make you as my role model cause of a lot of things that has happened, but I just see the positives and you are the most hardworking, disciplined and dedicated person I ever know. You aren't just my dad but also my best friend. You just make me always be so grateful to have a dad like you. I just love you a lot sundara. Many many happy returns of the day`;

export default function BirthdayPage() {
  const [idx, setIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [confetti, setConfetti] = useState<Array<{ id: number; color: string; left: number }>>([]);

  const go = (dir: number) => {
    const newIdx = Math.max(0, Math.min(2, idx + dir));
    setIdx(newIdx);
  };

  const triggerConfetti = () => {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'];
    const newConfetti = Array.from({ length: 15 }, (_, i) => ({
      id: Date.now() + i,
      color: colors[Math.floor(Math.random() * colors.length)],
      left: Math.random() * 80 + 10
    }));
    setConfetti(newConfetti);
    setTimeout(() => setConfetti([]), 3000);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (idx === 0) triggerConfetti();
    }, 1200);
    return () => clearTimeout(timer);
  }, [idx]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-blue-600">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-10 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-float-random"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Confetti */}
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="confetti"
          style={{
            backgroundColor: piece.color,
            left: `${piece.left}%`
          }}
        />
      ))}

      <div ref={containerRef} className="relative w-full h-full flex flex-col">
        {/* Main Content */}
        <div 
          className="flex-1 flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${idx * 100}%)` }}
        >
          {/* Slide 1 — Welcome */}
          <section className="w-screen max-w-md flex-shrink-0 flex items-center justify-center p-6">
            <div className="w-full h-full flex flex-col items-center justify-between py-8">
              <div className="text-center space-y-6">
                <div className="relative">
                  <h1 className="text-6xl font-black bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent animate-pulse-slow">
                    Happy Birthday
                  </h1>
                  <div className="absolute -top-4 -right-4 text-4xl animate-spin-slow">✨</div>
                </div>
                <h2 className="text-7xl font-black text-white drop-shadow-2xl animate-bounce-gentle">
                  HAPPY BIRTHDAY APPA
                </h2>
                <div className="text-5xl animate-wiggle">❣️</div>
              </div>

              <div className="relative w-full flex items-center justify-center my-8">
                <StickerCharacters />
              </div>

              <div className="w-full px-6">
                <div className="flex items-center justify-center gap-2">
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
                <h2 className="text-2xl font-bold text-white drop-shadow-lg">A little poem for Appa</h2>
                <div className="mt-2 p-6 rounded-2xl bg-white/90 backdrop-blur shadow-2xl border border-white/20">
                  <pre className="whitespace-pre-wrap text-center text-lg leading-relaxed text-gray-800 font-medium">{POEM}</pre>
                </div>
              </div>

              <div className="relative w-full flex items-center justify-center">
                <BalloonCluster />
              </div>

              <div className="w-full flex items-center justify-between px-6">
                <button
                  onClick={() => go(-1)}
                  className="px-4 py-2 rounded-full bg-white/80 backdrop-blur shadow-lg font-medium"
                >
                  ← Back
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={() => go(1)}
                    className="px-4 py-2 rounded-full bg-rose-500 text-white font-semibold shadow-lg"
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
                <h2 className="text-3xl font-bold text-white drop-shadow-lg">To my Appa —</h2>
                <div className="mt-2 p-6 rounded-2xl bg-white/95 backdrop-blur shadow-2xl max-h-[60vh] overflow-auto border border-white/20">
                  <p className="whitespace-pre-wrap leading-relaxed text-gray-800 font-medium">{FINAL}</p>
                </div>
              </div>

              <div className="relative w-full flex items-center justify-center my-4">
                <HeartAnimation />
              </div>

              <div className="w-full flex items-center justify-between px-6">
                <button
                  onClick={() => go(-1)}
                  className="px-4 py-2 rounded-full bg-white/80 backdrop-blur shadow-lg font-medium"
                >
                  ← Back
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      const node = containerRef.current;
                      if (!node) return;
                      node.classList.add("pulse-heart");
                      setTimeout(() => node.classList.remove("pulse-heart"), 900);
                      triggerConfetti();
                    }}
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold shadow-lg"
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
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === idx ? "bg-white scale-125" : "bg-white/50"
              } shadow-lg`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Styles */}
        <style jsx>{`
          .confetti {
            position: absolute;
            width: 10px;
            height: 14px;
            border-radius: 3px;
            opacity: 0.95;
            transform-origin: center;
            animation: confetti-fall 2.5s ease-out forwards;
            z-index: 60;
            left: 50%;
          }
          @keyframes confetti-fall {
            0% { transform: translateY(-20px) rotate(0deg); }
            100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
          }
          .pulse-heart::after {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: 24px;
            box-shadow: 0 0 40px 12px rgba(255,99,132,0.3);
            pointer-events: none;
            animation: pulse-effect 0.9s ease-out;
          }
          @keyframes pulse-effect {
            from { transform: scale(0.95); opacity: 0.8; }
            to { transform: scale(1.1); opacity: 0; }
          }
        `}</style>
      </div>
    </div>
  );
}

function StickerCharacters() {
  return (
    <div className="flex items-end gap-6 transform-gpu">
      <div className="flex flex-col items-center">
        <div className="w-32 h-36 rounded-3xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-end justify-center p-3 shadow-2xl animate-bob border-4 border-white/30">
          <DadSVG />
        </div>
        <div className="mt-3 text-lg font-bold text-white drop-shadow-lg">Appa</div>
      </div>

      <div className="flex flex-col items-center">
        <div className="w-24 h-28 rounded-3xl bg-gradient-to-br from-pink-100 to-pink-200 flex items-end justify-center p-2 shadow-2xl animate-bob animation-delay-300 border-4 border-white/30">
          <DaughterSVG />
        </div>
        <div className="mt-3 text-sm font-bold text-white drop-shadow-lg">Daughter</div>
      </div>
    </div>
  );
}

function DadSVG() {
  return (
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Head */}
      <circle cx="50" cy="32" r="22" fill="#FDBCB4" stroke="#E09F3E" strokeWidth="2"/>
      {/* Hair */}
      <path d="M28 20c0-8 10-12 22-12s22 4 22 12" fill="#8B4513" stroke="#654321" strokeWidth="1"/>
      {/* Body */}
      <rect x="20" y="54" width="60" height="35" rx="12" fill="#4F46E5" stroke="#3730A3" strokeWidth="2"/>
      {/* Eyes */}
      <circle cx="42" cy="30" r="3" fill="#2D3748"/>
      <circle cx="58" cy="30" r="3" fill="#2D3748"/>
      <circle cx="43" cy="29" r="1" fill="white"/>
      <circle cx="59" cy="29" r="1" fill="white"/>
      {/* Smile */}
      <path d="M40 40c3 4 8 4 11 0" stroke="#2D3748" strokeWidth="2" strokeLinecap="round"/>
      {/* Mustache */}
      <path d="M42 36c2-1 6-1 8 0" stroke="#654321" strokeWidth="3" strokeLinecap="round"/>
      {/* Arms */}
      <circle cx="15" cy="65" r="8" fill="#FDBCB4" stroke="#E09F3E" strokeWidth="1"/>
      <circle cx="85" cy="65" r="8" fill="#FDBCB4" stroke="#E09F3E" strokeWidth="1"/>
    </svg>
  );
}

function DaughterSVG() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Head */}
      <circle cx="40" cy="25" r="18" fill="#FDBCB4" stroke="#E09F3E" strokeWidth="2"/>
      {/* Hair */}
      <path d="M22 15c0-6 8-10 18-10s18 4 18 10" fill="#8B4513" stroke="#654321" strokeWidth="1"/>
      <circle cx="30" cy="12" r="4" fill="#FF69B4" stroke="#E91E63" strokeWidth="1"/>
      <circle cx="50" cy="12" r="4" fill="#FF69B4" stroke="#E91E63" strokeWidth="1"/>
      {/* Body */}
      <rect x="18" y="43" width="44" height="28" rx="10" fill="#EC4899" stroke="#BE185D" strokeWidth="2"/>
      {/* Eyes */}
      <circle cx="34" cy="23" r="2.5" fill="#2D3748"/>
      <circle cx="46" cy="23" r="2.5" fill="#2D3748"/>
      <circle cx="35" cy="22" r="0.8" fill="white"/>
      <circle cx="47" cy="22" r="0.8" fill="white"/>
      {/* Smile */}
      <path d="M34 30c2 3 6 3 8 0" stroke="#2D3748" strokeWidth="2" strokeLinecap="round"/>
      {/* Arms */}
      <circle cx="12" cy="52" r="6" fill="#FDBCB4" stroke="#E09F3E" strokeWidth="1"/>
      <circle cx="68" cy="52" r="6" fill="#FDBCB4" stroke="#E09F3E" strokeWidth="1"/>
    </svg>
  );
}

function BalloonCluster() {
  return (
    <div className="w-full flex items-center justify-center mt-4 relative">
      <div className="flex gap-4 items-end">
        <Balloon color="#FF6B6B" delay={0} />
        <Balloon color="#4ECDC4" delay={200} />
        <Balloon color="#45B7D1" delay={400} />
        <Balloon color="#96CEB4" delay={600} />
      </div>
    </div>
  );
}

function Balloon({ color, delay = 0 }: { color: string; delay?: number }) {
  return (
    <div className="flex flex-col items-center animate-float-balloon" style={{ animationDelay: `${delay}ms` }}>
      <svg width="50" height="70" viewBox="0 0 50 70" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id={`balloon-${color.replace('#','')}`} cx="0.3" cy="0.3">
            <stop offset="0%" stopColor="white" stopOpacity="0.8" />
            <stop offset="70%" stopColor={color} stopOpacity="0.9" />
            <stop offset="100%" stopColor={color} stopOpacity="1" />
          </radialGradient>
        </defs>
        <ellipse cx="25" cy="25" rx="18" ry="22" fill={`url(#balloon-${color.replace('#','')})`} stroke={color} strokeWidth="1"/>
        <path d="M25 47 L25 65" stroke="#666" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M22 47 Q25 50 28 47" stroke={color} strokeWidth="2" fill="none"/>
      </svg>
    </div>
  );
}

function HeartAnimation() {
  return (
    <div className="flex items-center justify-center gap-2">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="text-3xl animate-pulse-heart"
          style={{ animationDelay: `${i * 0.2}s` }}
        >
          ❤️
        </div>
      ))}
    </div>
  );
}