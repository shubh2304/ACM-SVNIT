"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, MapPin, Users, ArrowRight, Filter, Tag } from "lucide-react";
import { format } from "date-fns";

interface Event {
  _id: string;
  title: string;
  slug: string;
  description: string;
  date: string;
  location: string;
  type: string;
  domains: string[];
  coverImage: string;
  isPast: boolean;
  isRegistrationOpen: boolean;
}

const mockEvents: Event[] = [
  {
    _id: "1",
    title: "HackNIT 2024 — 24-Hour Hackathon",
    slug: "hacknit-2024",
    description: "SVNIT's flagship 24-hour hackathon with cash prizes worth ₹2,00,000. Build something extraordinary.",
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    location: "SVNIT Main Campus, Surat",
    type: "Hackathon",
    domains: ["Web Dev", "AI/ML", "Open Source"],
    coverImage: "",
    isPast: false,
    isRegistrationOpen: true,
  },
  {
    _id: "2",
    title: "Deep Learning Workshop Series",
    slug: "deep-learning-workshop-2024",
    description: "A 3-day intensive workshop on neural networks, transformers, and practical deep learning applications.",
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    location: "CS Seminar Hall, SVNIT",
    type: "Workshop",
    domains: ["AI/ML"],
    coverImage: "",
    isPast: false,
    isRegistrationOpen: true,
  },
  {
    _id: "3",
    title: "CTF Challenge — CipherHunt",
    slug: "cipherhunt-2024",
    description: "Capture The Flag competition testing cybersecurity skills. Individual and team categories.",
    date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    location: "Online",
    type: "Competition",
    domains: ["Cybersecurity"],
    coverImage: "",
    isPast: true,
    isRegistrationOpen: false,
  },
  {
    _id: "4",
    title: "Open Source Day 2024",
    slug: "open-source-day-2024",
    description: "A full day of contributing to open source projects, guided by maintainers and senior developers.",
    date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    location: "Innovation Hub, SVNIT",
    type: "Workshop",
    domains: ["Open Source"],
    coverImage: "",
    isPast: true,
    isRegistrationOpen: false,
  },
];

const typeColors: Record<string, string> = {
  Hackathon: "from-cyan-500 to-blue-500",
  Workshop: "from-violet-500 to-purple-500",
  Talk: "from-emerald-500 to-teal-500",
  Competition: "from-orange-500 to-red-500",
  Social: "from-pink-500 to-rose-500",
};

function EventCard({ event }: { event: Event }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-card overflow-hidden group hover-lift"
    >
      {/* Cover image / gradient */}
      <div className="h-48 bg-gradient-to-br from-cyan-500/10 to-violet-500/10 relative overflow-hidden flex items-center justify-center">
        <div className="text-6xl opacity-20">
          {event.type === "Hackathon" ? "⚡" : event.type === "Workshop" ? "🔬" : event.type === "Competition" ? "🏆" : "📡"}
        </div>
        <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${typeColors[event.type] || "from-cyan-500 to-violet-500"}`}>
          {event.type}
        </div>
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-mono ${event.isPast ? "bg-surface text-text-muted border border-white/10" : "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"}`}>
          {event.isPast ? "Past" : "Upcoming"}
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-4 text-text-muted text-xs mb-3">
          <span className="flex items-center gap-1.5">
            <Calendar size={12} className="text-cyan-500" />
            {format(new Date(event.date), "dd MMM yyyy")}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin size={12} className="text-cyan-500" />
            {event.location}
          </span>
        </div>

        <h3 className="font-syne font-bold text-lg text-text-primary mb-2 group-hover:text-cyan-400 transition-colors line-clamp-2">
          {event.title}
        </h3>
        <p className="text-text-muted text-sm leading-relaxed mb-4 line-clamp-2">
          {event.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {event.domains.map((domain) => (
            <span key={domain} className="px-2.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs">
              {domain}
            </span>
          ))}
        </div>

        <Link
          href={`/events/${event.slug}`}
          className="inline-flex items-center gap-1.5 text-cyan-500 text-sm font-semibold hover:gap-2.5 transition-all group"
        >
          {event.isPast ? "View Details" : event.isRegistrationOpen ? "Register Now" : "Learn More"}
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}

export default function EventsPage() {
  const [tab, setTab] = useState<"all" | "upcoming" | "past">("all");
  const [events, setEvents] = useState<Event[]>(mockEvents);

  useEffect(() => {
    fetch("/api/events")
      .then((r) => r.json())
      .then((data) => {
        if (data.events && data.events.length > 0) setEvents(data.events);
      })
      .catch(() => {});
  }, []);

  const filtered = events.filter((e) => {
    if (tab === "upcoming") return !e.isPast;
    if (tab === "past") return e.isPast;
    return true;
  });

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden noise-overlay grid-bg">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,212,255,0.06)_0%,transparent_60%)] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="section-tag inline-flex mb-6"
          >
            Events
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="font-syne font-black text-5xl md:text-7xl text-text-primary mb-4"
          >
            Where Ideas <span className="gradient-text">Come Alive</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-text-muted text-xl max-w-xl mx-auto"
          >
            Hackathons, workshops, talks, and competitions — all year round.
          </motion.p>
        </div>
      </section>

      {/* Tabs & Filters */}
      <section className="sticky top-[64px] z-30 bg-[rgba(2,4,8,0.92)] backdrop-blur-xl border-b border-cyan-500/10 py-4">
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-3">
          {(["all", "upcoming", "past"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                tab === t
                  ? "bg-cyan-500 text-background"
                  : "text-text-muted hover:text-text-primary hover:bg-white/5"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          {filtered.length === 0 ? (
            <div className="text-center py-24 text-text-muted">
              <Calendar size={48} className="mx-auto mb-4 opacity-30" />
              <p>No events found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
