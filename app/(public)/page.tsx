"use client";

import { useRef, useEffect, Suspense, lazy } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronDown, Award, Users, Calendar, Code2, Brain, Globe, Shield, Palette, Github, Zap, Trophy, Mail, Star } from "lucide-react";
import CounterAnimation from "@/components/animations/CounterAnimation";
import MagneticButton from "@/components/ui/MagneticButton";

// Lazy load Three.js sphere
const HeroSphere = lazy(() => import("@/components/three/HeroSphere"));

const domains = [
  {
    icon: Code2,
    title: "Competitive Programming",
    description: "Master algorithms, crack coding contests, and compete globally.",
    color: "from-cyan-500 to-blue-500",
    glow: "rgba(0,212,255,0.15)",
  },
  {
    icon: Brain,
    title: "AI & Machine Learning",
    description: "Build intelligent systems that learn, adapt, and create.",
    color: "from-violet-500 to-purple-500",
    glow: "rgba(123,47,255,0.15)",
  },
  {
    icon: Globe,
    title: "Web & App Development",
    description: "Engineer beautiful products from concept to deployment.",
    color: "from-emerald-500 to-cyan-500",
    glow: "rgba(16,185,129,0.15)",
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    description: "Capture flags, ethical hacking, and digital defense systems.",
    color: "from-red-500 to-orange-500",
    glow: "rgba(239,68,68,0.15)",
  },
  {
    icon: Github,
    title: "Open Source",
    description: "Contribute to global projects. Build your public profile.",
    color: "from-amber-500 to-yellow-400",
    glow: "rgba(245,158,11,0.15)",
  },
  {
    icon: Palette,
    title: "Design & UI/UX",
    description: "Craft experiences that delight users through design thinking.",
    color: "from-pink-500 to-rose-500",
    glow: "rgba(236,72,153,0.15)",
  },
];

const achievements = [
  { year: "2024", title: "Best Chapter Award", org: "ACM India Summit", icon: Trophy },
  { year: "2023", title: "Outstanding Website", org: "ACM India", icon: Star },
  { year: "2023", title: "ICPC Regionals Qualifier", org: "ICPC Foundation", icon: Award },
  { year: "2022", title: "Smart India Hackathon Winner", org: "MoE, Govt. of India", icon: Zap },
];

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden noise-overlay grid-bg"
    >
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[400px] bg-cyan-500/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[300px] bg-violet-500/8 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: Text content */}
        <div>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-8"
          >
            <span className="section-tag">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
              ACM India Certified Chapter
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-syne font-black text-5xl md:text-6xl xl:text-7xl leading-[1.05] text-text-primary mb-6"
          >
            Where Engineers{" "}
            <span className="gradient-text">Become</span>{" "}
            Innovators
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-text-muted text-lg md:text-xl leading-relaxed mb-10 max-w-lg"
          >
            SVNIT&apos;s premier computing society — powered by ACM. 
            Hackathons, workshops, open source, and a community that 
            pushes the boundaries of technology.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <MagneticButton
              as="a"
              href="/events"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-semibold rounded-xl hover:opacity-90 transition-all hover:shadow-lg hover:shadow-cyan-500/20 text-sm"
            >
              Explore Events <ArrowRight size={16} />
            </MagneticButton>
            <MagneticButton
              as="a"
              href="/join"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-transparent border border-cyan-500/30 text-text-primary font-semibold rounded-xl hover:border-cyan-500/60 hover:bg-cyan-500/5 transition-all text-sm"
            >
              Join the Chapter
            </MagneticButton>
          </motion.div>

          {/* Stats mini row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex items-center gap-6 mt-12 pt-8 border-t border-white/5"
          >
            {[
              { value: "200+", label: "Members" },
              { value: "50+", label: "Events" },
              { value: "8+", label: "Years" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-syne font-bold text-xl gradient-text">{stat.value}</div>
                <div className="text-text-subtle text-xs">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: 3D Sphere */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-[500px] lg:h-[600px]"
        >
          <div className="absolute inset-0 rounded-full bg-cyan-500/5 blur-3xl" />
          <Suspense fallback={
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-64 h-64 rounded-full border border-cyan-500/20 animate-spin-slow" />
            </div>
          }>
            <HeroSphere />
          </Suspense>
          {/* Floating label */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-text-muted text-xs font-mono text-center">
            ↕ drag to explore
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-cyan-500/30 flex items-start justify-center p-1">
          <motion.div
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-1 rounded-full bg-cyan-500"
          />
        </div>
        <span className="text-text-subtle text-[10px] font-mono">scroll</span>
      </motion.div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="relative py-24 border-y border-cyan-500/8 overflow-hidden">
      <div className="absolute inset-0 bg-surface" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <CounterAnimation end={200} suffix="+" label="Active Members" />
          <CounterAnimation end={50} suffix="+" label="Events Hosted" />
          <CounterAnimation end={8} suffix="+" label="Years Active" />
          <CounterAnimation end={10} suffix="+" label="SIG Groups" />
        </div>

        {/* Ticker */}
        <div className="mt-16 ticker-wrapper">
          <div className="ticker-inner gap-12">
            {[...Array(2)].map((_, i) =>
              ["ACM", "SVNIT", "IEEE", "IIT Bombay", "IIT Delhi", "NIT Trichy", "VIT", "BITS Pilani", "IIIT Hyderabad"].map((org) => (
                <span key={`${i}-${org}`} className="inline-flex items-center gap-3 mr-12">
                  <span className="text-cyan-500/40 text-xs font-mono">◆</span>
                  <span className="text-text-subtle text-sm font-medium whitespace-nowrap">{org}</span>
                </span>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function DomainsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-violet-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="section-tag"
          >
            What We Do
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="font-syne font-black text-4xl md:text-5xl mt-6 mb-4 text-text-primary"
          >
            Six Domains.{" "}
            <span className="gradient-text">One Community.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="text-text-muted text-lg max-w-xl mx-auto"
          >
            From competitive programming to AI, we cover the full spectrum of 
            computer science — all under one roof.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {domains.map((domain, i) => (
            <motion.div
              key={domain.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * i, duration: 0.6 }}
              className="glass-card p-6 group hover-lift cursor-pointer"
            >
              <div
                className={`inline-flex w-12 h-12 rounded-xl bg-gradient-to-br ${domain.color} p-0.5 mb-5`}
              >
                <div className="w-full h-full rounded-[10px] bg-background flex items-center justify-center">
                  <domain.icon size={22} className={`bg-gradient-to-br ${domain.color} bg-clip-text`} style={{ color: "transparent", backgroundClip: "text", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }} />
                </div>
              </div>
              <h3 className="font-syne font-bold text-lg text-text-primary mb-2 group-hover:text-cyan-400 transition-colors">
                {domain.title}
              </h3>
              <p className="text-text-muted text-sm leading-relaxed">
                {domain.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutTeaser() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-32 overflow-hidden bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="section-tag mb-6 inline-flex">About Us</span>
            <h2 className="font-syne font-black text-4xl md:text-5xl leading-tight text-text-primary mb-6">
              More Than a Club.{" "}
              <br />
              <span className="gradient-text">A Movement.</span>
            </h2>
            <p className="text-text-muted text-lg leading-relaxed mb-4">
              Founded in 2016, SVNIT ACM Student Chapter is the largest and most active 
              tech community at Sardar Vallabhbhai National Institute of Technology, Surat.
            </p>
            <p className="text-text-muted text-base leading-relaxed mb-8">
              We are an ACM India Certified Chapter, affiliated with the Association for 
              Computing Machinery — the world&apos;s largest computing society. Our mission: 
              to advance computing as a science and profession while nurturing the next 
              generation of tech leaders.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-cyan-500 font-semibold hover:gap-3 transition-all group"
            >
              Read Our Story <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Image collage */}
            <div className="relative h-[400px]">
              <div className="absolute top-0 left-0 w-[60%] h-[55%] rounded-2xl overflow-hidden border border-cyan-500/15 shadow-2xl">
                <div className="w-full h-full bg-gradient-to-br from-cyan-500/20 to-violet-500/20 flex items-center justify-center">
                  <Users size={48} className="text-cyan-500/40" />
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-[55%] h-[55%] rounded-2xl overflow-hidden border border-violet-500/15 shadow-2xl">
                <div className="w-full h-full bg-gradient-to-br from-violet-500/20 to-pink-500/20 flex items-center justify-center">
                  <Code2 size={48} className="text-violet-500/40" />
                </div>
              </div>
              <div className="absolute top-[30%] right-[15%] w-[35%] h-[35%] rounded-2xl overflow-hidden border border-cyan-500/20 shadow-2xl z-10">
                <div className="w-full h-full bg-gradient-to-br from-cyan-500/30 to-emerald-500/20 flex items-center justify-center">
                  <Trophy size={36} className="text-cyan-500/50" />
                </div>
              </div>
              {/* Decorative glow */}
              <div className="absolute inset-0 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function AchievementsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="section-tag">Recognition</span>
          <h2 className="font-syne font-black text-4xl md:text-5xl mt-6 mb-4 text-text-primary">
            Built to <span className="gradient-text">Win.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((ach, i) => (
            <motion.div
              key={ach.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="glass-card p-6 text-center hover-lift"
            >
              <div className="inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 items-center justify-center mb-4">
                <ach.icon size={24} className="text-cyan-500" />
              </div>
              <div className="font-mono text-xs text-cyan-500 mb-2">{ach.year}</div>
              <h3 className="font-syne font-bold text-base text-text-primary mb-1">
                {ach.title}
              </h3>
              <p className="text-text-muted text-xs">{ach.org}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/achievements"
            className="inline-flex items-center gap-2 text-text-muted text-sm hover:text-cyan-500 transition-colors"
          >
            View all achievements <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function NewsletterSection() {
  return (
    <section className="relative py-32 overflow-hidden bg-surface border-y border-cyan-500/8">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,212,255,0.06)_0%,transparent_70%)]" />
      </div>

      <div className="relative max-w-2xl mx-auto px-6 text-center">
        <span className="section-tag">Stay Connected</span>
        <h2 className="font-syne font-black text-4xl md:text-5xl mt-6 mb-4 text-text-primary">
          Never Miss an{" "}
          <span className="gradient-text">Event.</span>
        </h2>
        <p className="text-text-muted text-lg mb-10">
          Get notified about upcoming hackathons, workshops, and opportunities. 
          No spam, just the good stuff.
        </p>

        <form
          id="newsletter-form"
          onSubmit={async (e) => {
            e.preventDefault();
            const email = (e.target as HTMLFormElement).email.value;
            try {
              await fetch("/api/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
              });
              alert("You're subscribed! 🎉");
            } catch {
              alert("Something went wrong. Please try again.");
            }
          }}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            name="email"
            id="newsletter-email"
            required
            placeholder="your@email.com"
            className="flex-1 px-5 py-3.5 rounded-xl bg-background border border-cyan-500/20 text-text-primary placeholder-text-subtle text-sm focus:outline-none focus:border-cyan-500/50 transition-colors"
          />
          <button
            type="submit"
            className="px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-semibold rounded-xl hover:opacity-90 transition-all text-sm flex items-center gap-2"
          >
            <Mail size={16} />
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <DomainsSection />
      <AboutTeaser />
      <AchievementsSection />
      <NewsletterSection />
    </>
  );
}
