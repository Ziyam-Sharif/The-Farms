import React, { useMemo } from 'react';

interface Star {
  id: number;
  top: string;
  left: string;
  size: number;
  opacity: number;
  animDuration: string;
  animDelay: string;
  type: 'point' | 'cross' | 'four-star' | 'diamond';
  color: string;
}

export const StarfieldBackground: React.FC = () => {
  // Generate deterministic array of glowing stars and cosmic sparkles
  const stars: Star[] = useMemo(() => {
    const starTypes: Star['type'][] = ['point', 'point', 'point', 'cross', 'four-star', 'diamond'];
    const colors = [
      'text-amber-600 dark:text-turmeric-400',
      'text-turmeric-600 dark:text-amber-300',
      'text-yellow-600 dark:text-yellow-300',
      'text-amber-700 dark:text-turmeric-300',
    ];

    return Array.from({ length: 36 }, (_, i) => {
      const top = `${(i * 2.7 + (i % 5) * 4) % 96}%`;
      const left = `${(i * 3.9 + (i % 7) * 6) % 96}%`;
      const size = 3 + (i % 4) * 2.2;
      const opacity = 0.35 + (i % 5) * 0.12;
      const animDuration = `${3.5 + (i % 6) * 1.2}s`;
      const animDelay = `${(i * 0.35) % 4}s`;
      const type = starTypes[i % starTypes.length];
      const color = colors[i % colors.length];

      return {
        id: i,
        top,
        left,
        size,
        opacity,
        animDuration,
        animDelay,
        type,
        color,
      };
    });
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* ── 1. AMBIENT LUXURY SPICE MESH GRADIENTS ── */}
      <div className="absolute top-[10%] left-[5%] w-[36rem] sm:w-[46rem] h-[36rem] sm:h-[46rem] rounded-full bg-amber-600/10 dark:bg-turmeric-500/10 blur-[130px] animate-float-continuous" />
      <div className="absolute top-[48%] right-[4%] w-[38rem] sm:w-[50rem] h-[38rem] sm:h-[50rem] rounded-full bg-emerald-700/08 dark:bg-emerald-500/08 blur-[140px] animate-float-reverse" />
      <div className="absolute top-[80%] left-[10%] w-[36rem] sm:w-[48rem] h-[36rem] sm:h-[48rem] rounded-full bg-orange-700/08 dark:bg-amber-600/08 blur-[130px] animate-float-continuous" />

      {/* ── 2. BESPOKE ORGANIC TOPOGRAPHY ELEVATION CONTOURS (CHANGA MANGA SOIL LINES) ── */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.22] dark:opacity-[0.14]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 2400"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          d="M-100,200 C300,350 500,100 900,250 C1200,350 1400,150 1600,300"
          fill="none"
          stroke="currentColor"
          className="text-amber-800/30 dark:text-turmeric-500/30"
          strokeWidth="1.5"
          strokeDasharray="8 12"
        />
        <path
          d="M-100,650 C250,550 600,800 1000,600 C1300,450 1500,700 1650,600"
          fill="none"
          stroke="currentColor"
          className="text-emerald-900/25 dark:text-emerald-400/25"
          strokeWidth="1.2"
        />
        <path
          d="M-50,1150 C350,1300 750,1050 1150,1250 C1350,1350 1550,1200 1700,1300"
          fill="none"
          stroke="currentColor"
          className="text-amber-800/25 dark:text-turmeric-400/25"
          strokeWidth="1.5"
          strokeDasharray="6 10"
        />
        <path
          d="M-100,1650 C400,1500 800,1800 1200,1600 C1400,1500 1600,1750 1750,1650"
          fill="none"
          stroke="currentColor"
          className="text-emerald-900/25 dark:text-emerald-500/25"
          strokeWidth="1.2"
        />
        <path
          d="M-50,2100 C300,2250 700,1950 1100,2200 C1350,2350 1550,2100 1700,2250"
          fill="none"
          stroke="currentColor"
          className="text-amber-900/25 dark:text-turmeric-500/25"
          strokeWidth="1.5"
          strokeDasharray="10 14"
        />
      </svg>

      {/* ── 3. ONLY 2 FAINT, BOLD URDU WATERMARK WORDS (Deep down page, NEVER in front/hero) ── */}
      <div
        className="absolute top-[52%] left-[4%] font-serif font-extrabold text-7xl sm:text-9xl md:text-[11rem] text-amber-950/[0.04] dark:text-turmeric-400/[0.04] -rotate-6 select-none pointer-events-none tracking-widest leading-none"
        aria-hidden="true"
      >
        خالص
      </div>
      <div
        className="absolute top-[78%] right-[4%] font-serif font-extrabold text-7xl sm:text-9xl md:text-[11rem] text-amber-950/[0.04] dark:text-turmeric-400/[0.04] rotate-6 select-none pointer-events-none tracking-widest leading-none"
        aria-hidden="true"
      >
        قدرتی
      </div>

      {/* ── 4. TWINKLING GLOWING STARS & CELESTIAL SPARKLES ── */}
      {stars.map((star) => (
        <div
          key={star.id}
          className={`absolute ${star.color} flex items-center justify-center`}
          style={{
            top: star.top,
            left: star.left,
            animation: `twinkleStar ${star.animDuration} ease-in-out ${star.animDelay} infinite alternate`,
          }}
        >
          {star.type === 'point' ? (
            <div
              className="rounded-full bg-current shadow-[0_0_8px_currentColor]"
              style={{
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: star.opacity,
              }}
            />
          ) : star.type === 'cross' ? (
            <svg
              width={star.size * 2}
              height={star.size * 2}
              viewBox="0 0 24 24"
              fill="currentColor"
              className="drop-shadow-[0_0_6px_rgba(217,119,6,0.6)]"
              style={{ opacity: star.opacity }}
            >
              <path d="M12 0L14 9L23 12L14 15L12 24L10 15L1 12L10 9L12 0Z" />
            </svg>
          ) : star.type === 'diamond' ? (
            <div
              className="rotate-45 bg-current shadow-[0_0_8px_currentColor]"
              style={{
                width: `${star.size * 1.2}px`,
                height: `${star.size * 1.2}px`,
                opacity: star.opacity,
              }}
            />
          ) : (
            <svg
              width={star.size * 2.2}
              height={star.size * 2.2}
              viewBox="0 0 24 24"
              fill="currentColor"
              className="drop-shadow-[0_0_8px_rgba(217,119,6,0.7)]"
              style={{ opacity: star.opacity }}
            >
              <polygon points="12,2 15,9 22,12 15,15 12,22 9,15 2,12 9,9" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
};
