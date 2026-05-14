"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function WordReveal({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      // Just make everything visible immediately
      if (containerRef.current) {
        gsap.set(containerRef.current.children, { opacity: 1, y: 0 });
      }
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && containerRef.current) {
            gsap.to(containerRef.current.children, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.07,
              ease: "power3.out",
            });
            observer.disconnect(); // only animate once
          }
        });
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef as any}
      className={`flex flex-wrap gap-x-[0.25em] gap-y-1 ${className}`}
    >
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block opacity-0 translate-y-5"
          style={{ willChange: "opacity, transform" }}
        >
          {word}
        </span>
      ))}
    </div>
  );
}
