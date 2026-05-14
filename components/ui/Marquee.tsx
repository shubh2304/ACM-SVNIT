"use client";

import { useEffect, useState } from "react";

export function Marquee({
  items,
  speed = 20,
  direction = "left",
}: {
  items: string[];
  speed?: number;
  direction?: "left" | "right";
}) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const content = items.join(" • ");

  return (
    <div className="relative w-full overflow-hidden bg-[rgba(2,4,8,0.5)] border-y border-white/5 py-3 group">
      {/* CSS Keyframes injected here specifically for this instance to avoid global stylesheet clashes */}
      <style suppressHydrationWarning>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.3333%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-33.3333%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: marquee-left ${speed}s linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right ${speed}s linear infinite;
        }
      `}</style>
      
      <div 
        className={`flex whitespace-nowrap group-hover:[animation-play-state:paused] ${
          prefersReducedMotion ? "" : direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        }`}
        style={{ width: "fit-content" }}
      >
        <div className="font-syne font-bold text-lg tracking-[0.2em] text-text-subtle uppercase px-8">
          {content}
        </div>
        {!prefersReducedMotion && (
          <>
            <div className="font-syne font-bold text-lg tracking-[0.2em] text-text-subtle uppercase px-8">
              {content}
            </div>
            <div className="font-syne font-bold text-lg tracking-[0.2em] text-text-subtle uppercase px-8">
              {content}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
