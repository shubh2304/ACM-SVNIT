"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#events", label: "Events" },
  { href: "#team", label: "Team" },
  { href: "#blogs", label: "Blog" },
  { href: "#achievements", label: "Achievements" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [activeSection, setActiveSection] = useState("#home");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Track active section
    const observer = new IntersectionObserver((entries) => {
      // Find the intersecting entry that takes up the most space or just use the first one
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection("#" + entry.target.id);
        }
      });
    }, { rootMargin: "-30% 0px -70% 0px" });

    navLinks.forEach(link => {
      const el = document.querySelector(link.href);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed z-50 transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
          scrolled
            ? "top-0 w-full left-0 right-0 bg-[rgba(2,4,8,0.92)] backdrop-blur-xl border-b border-cyan-500/10 py-3 md:top-4 md:w-[75%] md:left-[12.5%] md:right-auto md:rounded-full md:border md:border-white/10 md:shadow-2xl md:bg-[#060B14]/80 md:px-2"
            : "top-0 w-full left-0 right-0 bg-transparent border-transparent py-5 px-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Image
                src="/acm-logo.png"
                alt="ACM SVNIT Logo"
                width={32}
                height={32}
                className="w-8 h-8 object-contain"
              />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-cyan-500 to-violet-500 opacity-0 group-hover:opacity-50 blur-md transition-opacity" />
            </div>
            <div>
              <span className="font-syne font-bold text-lg text-text-primary">
                <span className="gradient-text">ACM</span> SVNIT
              </span>
              <div className="text-text-muted text-[10px] font-mono leading-none mt-0.5">
                Student Chapter
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={`/${link.href}`}
                className={`nav-link px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  activeSection === link.href
                    ? "text-cyan-500 bg-cyan-500/8"
                    : "text-text-muted hover:text-text-primary hover:bg-white/5"
                }`}
              >
                {link.label}
                {activeSection === link.href && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* CTA */}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-white/5 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {/* Scroll Progress Bar */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 to-violet-500 origin-left"
          style={{ scaleX }}
        />
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-[64px] left-0 right-0 z-40 mobile-menu border-b border-cyan-500/10 px-6 py-4"
          >
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={`/${link.href}`}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === link.href
                      ? "text-cyan-500 bg-cyan-500/10"
                      : "text-text-muted hover:text-text-primary hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
