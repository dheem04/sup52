'use client';
import { useState, useRef, useEffect } from 'react';

const MESSAGES = {
  poem: `Dad, you're my first hero, my strongest guide,
With you by my side, I walk with pride.
At 52, your love shines even more bright,
Happy Birthday, Dad — my heart's pure light.`,
  
  final: `Happy Birthday Dear Appa,

I love you a lot. You are my role model and will always be. I know you are gonna ask me to not make you as my role model cause of a lot of things that has happened, but I just see the positives and you are the most hardworking, disciplined and dedicated person I ever know. You aren't just my dad but also my best friend. You just make me always be so grateful to have a dad like you. I just love you a lot sundara. Many many happy returns of the day`
};

export default function BirthdayPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, color: string}>>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoaded(true);
    createParticles();
  }, []);

  const createParticles = () => {
    const colors = ['#ff6b9d', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff'];
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
    setParticles(newParticles);
  };

  const nextSlide = () => setCurrentSlide(prev => (prev + 1) % 4);
  const prevSlide = () => setCurrentSlide(prev => (prev - 1 + 4) % 4);
  const goToSlide = (index: number) => setCurrentSlide(index);

  const triggerCelebration = () => {
    const celebration = document.createElement('div');
    celebration.className = 'celebration-burst';
    document.body.appendChild(celebration);
    setTimeout(() => celebration.remove(), 3000);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-blue-600/20 animate-gradient-shift" />
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 rounded-full animate-float-particle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              backgroundColor: particle.color,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Main Container */}
      <div 
        ref={containerRef}
        className={`relative z-10 transition-all duration-1000 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
      >
        {/* Slides Container */}
        <div 
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {/* Slide 1: Welcome */}
          <div className="w-full min-h-screen flex-shrink-0 flex items-center justify-center p-4">
            <div className="max-w-md mx-auto text-center space-y-8">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-lg opacity-30 animate-pulse" />
                <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                  <div className="text-6xl mb-4 animate-bounce-slow">🎉</div>
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-text-glow">
                    Happy 52nd Birthday
                  </h1>
                  <h2 className="text-2xl md:text-3xl font-semibold text-pink-300 animate-fade-in-up">
                    Dear Appa!
                  </h2>
                </div>
              </div>
              
              <div className="flex justify-center">
                <BirthdayCake />
              </div>
              
              <button
                onClick={nextSlide}
                className="group relative px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-white font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <span className="relative z-10">Let's Celebrate! 🎊</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </div>
          </div>

          {/* Slide 2: 3D Card */}
          <div className="w-full min-h-screen flex-shrink-0 flex items-center justify-center p-4">
            <div className="max-w-md mx-auto space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">You're Amazing!</h2>
                <p className="text-pink-300">A special message for you</p>
              </div>
              
              <div className="perspective-1000">
                <div className="relative transform-style-3d hover:rotate-y-12 transition-transform duration-700">
                  <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-2xl">
                    <div className="text-center space-y-4">
                      <div className="text-5xl animate-bounce-gentle">👨👧</div>
                      <pre className="text-white/90 leading-relaxed text-sm whitespace-pre-wrap font-medium">
                        {MESSAGES.poem}
                      </pre>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-2xl blur-xl -z-10 animate-pulse" />
                </div>
              </div>
              
              <div className="flex justify-between">
                <button
                  onClick={prevSlide}
                  className="px-6 py-3 bg-white/20 backdrop-blur rounded-full text-white font-medium hover:bg-white/30 transition-all duration-300"
                >
                  ← Back
                </button>
                <button
                  onClick={nextSlide}
                  className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-white font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Continue →
                </button>
              </div>
            </div>
          </div>

          {/* Slide 3: Interactive Elements */}
          <div className="w-full min-h-screen flex-shrink-0 flex items-center justify-center p-4">
            <div className="max-w-md mx-auto space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-4">Special Wishes</h2>
                <div className="flex justify-center space-x-4 mb-6">
                  <FloatingBalloon color="#ff6b9d" delay={0} />
                  <FloatingBalloon color="#45b7d1" delay={0.5} />
                  <FloatingBalloon color="#96ceb4" delay={1} />
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 max-h-96 overflow-y-auto custom-scrollbar">
                <p className="text-white/90 leading-relaxed whitespace-pre-wrap text-sm">
                  {MESSAGES.final}
                </p>
              </div>
              
              <div className="flex justify-between">
                <button
                  onClick={prevSlide}
                  className="px-6 py-3 bg-white/20 backdrop-blur rounded-full text-white font-medium hover:bg-white/30 transition-all duration-300"
                >
                  ← Back
                </button>
                <button
                  onClick={nextSlide}
                  className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-white font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Finale →
                </button>
              </div>
            </div>
          </div>

          {/* Slide 4: Grand Finale */}
          <div className="w-full min-h-screen flex-shrink-0 flex items-center justify-center p-4">
            <div className="max-w-md mx-auto text-center space-y-8">
              <div className="relative">
                <div className="absolute -inset-8 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full blur-2xl opacity-40 animate-pulse" />
                <div className="relative">
                  <div className="text-8xl mb-6 animate-bounce-celebration">🎂</div>
                  <h1 className="text-4xl font-bold text-white mb-4 animate-text-rainbow">
                    Many Happy Returns!
                  </h1>
                  <p className="text-xl text-pink-300 mb-8">With all my love ❤️</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-8">
                {['🎈', '🎁', '🌟', '💝', '🎊', '✨'].map((emoji, i) => (
                  <div
                    key={i}
                    className="text-4xl animate-bounce-random"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  >
                    {emoji}
                  </div>
                ))}
              </div>
              
              <div className="space-y-4">
                <button
                  onClick={() => {
                    triggerCelebration();
                    createParticles();
                  }}
                  className="w-full py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full text-white font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 animate-pulse-glow"
                >
                  🎉 Celebrate! 🎉
                </button>
                
                <button
                  onClick={() => goToSlide(0)}
                  className="px-6 py-3 bg-white/20 backdrop-blur rounded-full text-white font-medium hover:bg-white/30 transition-all duration-300"
                >
                  ← Start Over
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {[0, 1, 2, 3].map((index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index 
                  ? 'bg-white scale-125 shadow-lg' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>

      <style jsx global>{`
        .celebration-burst {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          z-index: 9999;
        }
        .celebration-burst::before {
          content: '🎊🎉✨🎈🎁💖';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 4rem;
          animation: celebration-explode 3s ease-out;
        }
        @keyframes celebration-explode {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
          50% { transform: translate(-50%, -50%) scale(2); opacity: 0.8; }
          100% { transform: translate(-50%, -50%) scale(4); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

function BirthdayCake() {
  return (
    <div className="relative animate-bounce-gentle">
      <svg width="120" height="120" viewBox="0 0 120 120" className="drop-shadow-2xl">
        <defs>
          <linearGradient id="cakeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffeaa7" />
            <stop offset="100%" stopColor="#fdcb6e" />
          </linearGradient>
          <linearGradient id="frostingGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ff7675" />
            <stop offset="100%" stopColor="#e84393" />
          </linearGradient>
        </defs>
        
        {/* Cake Base */}
        <rect x="20" y="60" width="80" height="40" rx="8" fill="url(#cakeGradient)" stroke="#e17055" strokeWidth="2" />
        
        {/* Frosting */}
        <ellipse cx="60" cy="60" rx="40" ry="12" fill="url(#frostingGradient)" />
        
        {/* Candles */}
        <rect x="45" y="35" width="3" height="25" fill="#ffeaa7" />
        <rect x="55" y="35" width="3" height="25" fill="#ffeaa7" />
        <rect x="65" y="35" width="3" height="25" fill="#ffeaa7" />
        
        {/* Flames */}
        <ellipse cx="46.5" cy="32" rx="2" ry="4" fill="#ff6b6b" className="animate-flicker" />
        <ellipse cx="56.5" cy="32" rx="2" ry="4" fill="#ff6b6b" className="animate-flicker" style={{animationDelay: '0.2s'}} />
        <ellipse cx="66.5" cy="32" rx="2" ry="4" fill="#ff6b6b" className="animate-flicker" style={{animationDelay: '0.4s'}} />
        
        {/* Decorations */}
        <circle cx="35" cy="75" r="3" fill="#00b894" />
        <circle cx="60" cy="85" r="3" fill="#0984e3" />
        <circle cx="85" cy="75" r="3" fill="#e84393" />
      </svg>
    </div>
  );
}

function FloatingBalloon({ color, delay }: { color: string; delay: number }) {
  return (
    <div 
      className="animate-float-balloon"
      style={{ animationDelay: `${delay}s` }}
    >
      <svg width="40" height="60" viewBox="0 0 40 60">
        <defs>
          <radialGradient id={`balloon-${color.replace('#', '')}`} cx="0.3" cy="0.3">
            <stop offset="0%" stopColor="white" stopOpacity="0.8" />
            <stop offset="70%" stopColor={color} />
            <stop offset="100%" stopColor={color} />
          </radialGradient>
        </defs>
        <ellipse cx="20" cy="20" rx="15" ry="18" fill={`url(#balloon-${color.replace('#', '')})`} stroke={color} strokeWidth="1" />
        <path d="M20 38 Q20 42 18 45 Q20 48 22 45 Q20 42 20 38" fill={color} />
        <line x1="20" y1="45" x2="20" y2="55" stroke="#666" strokeWidth="1" />
      </svg>
    </div>
  );
}