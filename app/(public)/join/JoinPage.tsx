"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Code2, Brain, Globe, Shield, Palette, Users, Zap, Award } from "lucide-react";
import { FaGithub as GitIcon } from "react-icons/fa";

const benefits = [
  { icon: Users, title: "Network with 200+ Members", desc: "Connect with the brightest minds at SVNIT and beyond." },
  { icon: Zap, title: "Priority Event Access", desc: "First access to workshops, hackathons, and speaker sessions." },
  { icon: Award, title: "ACM Global Membership", desc: "Access to ACM Digital Library, certifications, and global resources." },
  { icon: Code2, title: "SIG-based Learning", desc: "Join Special Interest Groups and develop deep expertise in your domain." },
];

const domains = [
  "Competitive Programming", "AI & Machine Learning", "Web & App Development",
  "Cybersecurity", "Open Source", "Design & UI/UX",
];

const branches = ["CSE", "IT", "CE", "ME", "EE", "ECE", "Chemical", "Other"];

export default function JoinPage() {
  const [form, setForm] = useState({
    name: "", email: "", rollNo: "", branch: "", year: "1",
    domains: [] as string[], linkedin: "", github: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toggleDomain = (d: string) => {
    setForm((prev) => ({
      ...prev,
      domains: prev.domains.includes(d) ? prev.domains.filter((x) => x !== d) : [...prev.domains, d],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setSubmitted(true);
    } catch {
      alert("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden noise-overlay grid-bg">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,212,255,0.06)_0%,transparent_60%)] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-tag inline-flex mb-6">
            Membership
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="font-syne font-black text-5xl md:text-7xl text-text-primary mb-4"
          >
            Join the <span className="gradient-text">Chapter</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-text-muted text-xl max-w-xl mx-auto"
          >
            Become part of SVNIT&apos;s most impactful tech community.
          </motion.p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-syne font-bold text-2xl text-text-primary mb-8 text-center">Why Join?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-card p-6"
              >
                <b.icon size={22} className="text-cyan-500 mb-4" />
                <h3 className="font-syne font-bold text-base text-text-primary mb-2">{b.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-6">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-12 text-center"
            >
              <CheckCircle2 size={56} className="text-cyan-500 mx-auto mb-6" />
              <h2 className="font-syne font-black text-3xl text-text-primary mb-3">Application Submitted!</h2>
              <p className="text-text-muted text-lg">
                Thanks for applying! We&apos;ll review your application and get back to you 
                within 3-5 working days.
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8"
            >
              <h2 className="font-syne font-bold text-2xl text-text-primary mb-6">Membership Application</h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="join-name" className="block text-xs font-medium text-text-muted mb-2">Full Name *</label>
                    <input id="join-name" type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-cyan-500/15 text-text-primary text-sm placeholder-text-subtle" placeholder="Your full name" />
                  </div>
                  <div>
                    <label htmlFor="join-email" className="block text-xs font-medium text-text-muted mb-2">Email *</label>
                    <input id="join-email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-cyan-500/15 text-text-primary text-sm placeholder-text-subtle" placeholder="you@svnit.ac.in" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="join-roll" className="block text-xs font-medium text-text-muted mb-2">Roll Number *</label>
                    <input id="join-roll" type="text" required value={form.rollNo} onChange={(e) => setForm({ ...form, rollNo: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-cyan-500/15 text-text-primary text-sm placeholder-text-subtle" placeholder="e.g. U21CS001" />
                  </div>
                  <div>
                    <label htmlFor="join-year" className="block text-xs font-medium text-text-muted mb-2">Year *</label>
                    <select id="join-year" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-cyan-500/15 text-text-primary text-sm">
                      {["1", "2", "3", "4", "5"].map((y) => <option key={y} value={y}>Year {y}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="join-branch" className="block text-xs font-medium text-text-muted mb-2">Branch *</label>
                  <select id="join-branch" required value={form.branch} onChange={(e) => setForm({ ...form, branch: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-cyan-500/15 text-text-primary text-sm">
                    <option value="">Select branch</option>
                    {branches.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-text-muted mb-3">Domains of Interest</label>
                  <div className="flex flex-wrap gap-2">
                    {domains.map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => toggleDomain(d)}
                        className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-all border ${
                          form.domains.includes(d)
                            ? "bg-cyan-500 text-background border-cyan-500"
                            : "border-cyan-500/20 text-text-muted hover:border-cyan-500/40 hover:text-text-primary"
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="join-linkedin" className="block text-xs font-medium text-text-muted mb-2">LinkedIn URL</label>
                    <input id="join-linkedin" type="url" value={form.linkedin} onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-cyan-500/15 text-text-primary text-sm placeholder-text-subtle" placeholder="linkedin.com/in/..." />
                  </div>
                  <div>
                    <label htmlFor="join-github" className="block text-xs font-medium text-text-muted mb-2">GitHub URL</label>
                    <input id="join-github" type="url" value={form.github} onChange={(e) => setForm({ ...form, github: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-cyan-500/15 text-text-primary text-sm placeholder-text-subtle" placeholder="github.com/..." />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-bold rounded-xl hover:opacity-90 transition-all text-sm disabled:opacity-60"
                >
                  {loading ? "Submitting..." : "Submit Application →"}
                </button>
              </form>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
