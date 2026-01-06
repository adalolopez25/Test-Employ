'use client';

import { useRef, useEffect, useCallback } from 'react';

type CarouselProps = {
  children: React.ReactNode[];
  speed?: number;
  gap?: string;
};

export default function Carousel({ 
  children, 
  speed = 0.7, 
  gap = '3rem' 
}: CarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const isHovered = useRef(false);

  const scroll = useCallback(() => {
    if (!carouselRef.current || isHovered.current) return;

    const carousel = carouselRef.current;
    carousel.scrollLeft += speed;

    const halfWidth = carousel.scrollWidth / 2;
    if (carousel.scrollLeft >= halfWidth) {
      carousel.scrollLeft -= halfWidth;
    }

    animationRef.current = requestAnimationFrame(scroll);
  }, [speed]);

  const startScrolling = useCallback(() => {
    if (animationRef.current || isHovered.current) return;
    animationRef.current = requestAnimationFrame(scroll);
  }, [scroll]);

  const stopScrolling = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    isHovered.current = true;
    stopScrolling();
  }, [stopScrolling]);

  const handleMouseLeave = useCallback(() => {
    isHovered.current = false;
    startScrolling();
  }, [startScrolling]);

  useEffect(() => {
    if (children.length === 0) return;
    startScrolling();
    return stopScrolling;
  }, [children, startScrolling, stopScrolling]);

  if (!children || children.length === 0) return null;

  return (
    <div className="relative w-full overflow-hidden py-12">
      {/* Fondo sutil que respeta tu bg-slate-900 */}
      <div className="absolute inset-0 bg-linear-to-b from-slate-900 via-slate-950/50 to-slate-900 pointer-events-none" />

      {/* lineares laterales suaves en slate para fade elegante */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-64 bg-linear-to-r from-slate-900 via-slate-900/80 to-transparent z-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-64 bg-linear-to-l from-slate-900 via-slate-900/80 to-transparent z-20" />

      {/* Luz central mágica en tonos cyan/plateado sutil */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 h-48 bg-linear-to-r from-transparent via-cyan-400/15 to-transparent blur-3xl z-10 animate-pulse-slow" />

      {/* Partículas mágicas en tonos plateados/cyan muy sutiles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-300/60 rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${5 + Math.random() * 8}s`,
            }}
          />
        ))}
      </div>

      <div
        ref={carouselRef}
        className="w-full overflow-hidden select-none cursor-grab active:cursor-grabbing"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex w-max items-center" style={{ gap }}>
          {[...children, ...children].map((child, i) => (
            <div
              key={i}
              className="shrink-0 relative group"
            >
              {/* Reflejo sutil plateado debajo */}
              <div className="absolute inset-x-6 -bottom-10 h-32 bg-linear-to-t from-white/8 to-transparent blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-1000" />

              <div
                className="relative transition-all duration-1000 ease-out"
                style={{
                  animation: `parallaxFloat ${20 + (i % 6)}s ease-in-out infinite`,
                  animationDelay: `${i * 0.5}s`,
                }}
              >
                {child}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Animaciones CSS adaptadas al tema slate */}
      <style jsx>{`
        @keyframes parallaxFloat {
          0%, 100% {
            transform: translateY(0px) scale(0.94);
            filter: brightness(0.85) blur(0.5px);
          }
          50% {
            transform: translateY(-18px) scale(1.04);
            filter: brightness(1.25) drop-shadow(0 20px 40px rgba(103, 232, 249, 0.15));
          }
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 0.7; transform: scale(1); }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.7; }
        }

        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }

        /* Boost extra al hover directo en la tarjeta */
        div.group:hover > div {
          transform: translateY(-35px) scale(1.1) !important;
          filter: brightness(1.35) drop-shadow(0 30px 60px rgba(103, 232, 249, 0.25)) !important;
          z-index: 50;
        }
      `}</style>
    </div>
  );
}