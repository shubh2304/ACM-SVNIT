"use client";
import { useEffect, useLayoutEffect, RefObject } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

gsap.registerPlugin(ScrollTrigger);

export function useCardSweep(containerRef: RefObject<HTMLElement>, wrapperRef: RefObject<HTMLElement>) {
  useIsomorphicLayoutEffect(() => {
    if (!containerRef.current || !wrapperRef.current) return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const cards = Array.from(containerRef.current.children) as HTMLElement[];
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      if (window.innerWidth < 768) {
         gsap.fromTo(cards, 
           { y: 50, opacity: 0 }, 
           { 
             y: 0, 
             opacity: 1, 
             stagger: 0.1, 
             duration: 0.8, 
             ease: "power2.out", 
             scrollTrigger: { 
               trigger: wrapperRef.current, 
               start: "top 80%" 
             } 
           }
         );
         return;
      }

      const padding = parseInt(window.getComputedStyle(containerRef.current!).paddingLeft) || 0;
      const scrollDistance = containerRef.current!.scrollWidth - window.innerWidth + padding * 2;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top center",
        }
      });

      tl.fromTo(cards, 
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
      );

      ScrollTrigger.create({
        trigger: wrapperRef.current,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        start: "top top",
        end: () => `+=${scrollDistance}`,
        animation: gsap.to(containerRef.current, {
          x: () => -scrollDistance,
          ease: "none"
        })
      });
    }, wrapperRef);

    return () => {
      ctx.revert();
    };
  }, [containerRef, wrapperRef]);
}
