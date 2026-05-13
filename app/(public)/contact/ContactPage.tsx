"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Instagram, Linkedin, Github, Twitter, ChevronDown, Send } from "lucide-react";

const faqs = [
  { q: "How do I join SVNIT ACM?", a: "Visit our /join page and fill out the membership form. Our team reviews applications and we get back to you within 3-5 working days." },
  { q: "When are events held?", a: "We host events year-round — workshops during weekends, and major events like hackathons during semester breaks. Follow our Instagram for real-time updates." },
  { q: "Do I need to pay to join?", a: "There's a nominal annual membership fee that covers ACM global membership benefits. Details are on the Join page." },
  { q: "Can non-SVNIT students participate in events?", a: "Yes! Most of our events are open to all students. Some events may be SVNIT-exclusive — check individual event details." },
  { q: "How can I collaborate or sponsor?", a: "Email us at acm@svnit.ac.in with your collaboration proposal or sponsorship interest. We'd love to hear from you." },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07 }}
      className="glass-card overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-6 py-5 flex items-center justify-between text-left"
      >
        <span className="font-medium text-text-primary text-sm pr-4">{q}</span>
        <ChevronDown
          size={16}
          className={`text-text-muted flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="px-6 pb-5 text-text-muted text-sm leading-relaxed">{a}</p>
      </motion.div>
    </motion.div>
  );
}

export default function ContactPage() {
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });
      setSent(true);
    } catch {
      alert("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden noise-overlay grid-bg">
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-tag inline-flex mb-6">
            Contact
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="font-syne font-black text-5xl md:text-7xl text-text-primary mb-4"
          >
            Let&apos;s <span className="gradient-text">Connect</span>
          </motion.h1>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-syne font-bold text-2xl text-text-primary mb-6">Send a Message</h2>

            {sent ? (
              <div className="glass-card p-8 text-center">
                <div className="text-4xl mb-4">✅</div>
                <h3 className="font-syne font-bold text-xl text-text-primary mb-2">Message Sent!</h3>
                <p className="text-text-muted">We&apos;ll get back to you within 24-48 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-medium text-text-muted mb-2">Name *</label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-surface border border-cyan-500/15 text-text-primary text-sm placeholder-text-subtle"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-medium text-text-muted mb-2">Email *</label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-surface border border-cyan-500/15 text-text-primary text-sm placeholder-text-subtle"
                      placeholder="you@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-medium text-text-muted mb-2">Subject *</label>
                  <input
                    id="contact-subject"
                    type="text"
                    required
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-surface border border-cyan-500/15 text-text-primary text-sm placeholder-text-subtle"
                    placeholder="What's this about?"
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-xs font-medium text-text-muted mb-2">Message *</label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-surface border border-cyan-500/15 text-text-primary text-sm placeholder-text-subtle resize-none"
                    placeholder="Tell us what you have in mind..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-semibold rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-60"
                >
                  <Send size={16} />
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-syne font-bold text-2xl text-text-primary mb-6">Find Us</h2>

            <div className="space-y-4 mb-8">
              <div className="glass-card p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                  <Mail size={18} className="text-cyan-500" />
                </div>
                <div>
                  <div className="text-xs text-text-muted mb-1">Email</div>
                  <a href="mailto:acm@svnit.ac.in" className="text-text-primary text-sm hover:text-cyan-500 transition-colors">acm@svnit.ac.in</a>
                </div>
              </div>
              <div className="glass-card p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-violet-400" />
                </div>
                <div>
                  <div className="text-xs text-text-muted mb-1">Location</div>
                  <div className="text-text-primary text-sm">Sardar Vallabhbhai National Institute of Technology, Ichchhanath, Surat, Gujarat — 395007</div>
                </div>
              </div>
            </div>

            {/* Socials */}
            <h3 className="font-syne font-semibold text-base text-text-primary mb-4">Follow Us</h3>
            <div className="grid grid-cols-2 gap-3 mb-10">
              {[
                { icon: Instagram, label: "Instagram", handle: "@svnitacm", href: "https://instagram.com/svnitacm", color: "text-pink-400" },
                { icon: Linkedin, label: "LinkedIn", handle: "SVNIT ACM", href: "https://linkedin.com/company/svnitacm", color: "text-blue-400" },
                { icon: Github, label: "GitHub", handle: "svnitacm", href: "https://github.com/svnitacm", color: "text-text-primary" },
                { icon: Twitter, label: "Twitter/X", handle: "@svnitacm", href: "https://twitter.com/svnitacm", color: "text-sky-400" },
              ].map(({ icon: Icon, label, handle, href, color }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="glass-card p-4 flex items-center gap-3 hover-lift group">
                  <Icon size={18} className={`${color} flex-shrink-0`} />
                  <div>
                    <div className="text-xs text-text-muted">{label}</div>
                    <div className="text-text-primary text-sm group-hover:text-cyan-400 transition-colors">{handle}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* Map embed placeholder */}
            <div className="rounded-2xl overflow-hidden border border-cyan-500/10 h-48 bg-surface flex items-center justify-center">
              <div className="text-center text-text-muted">
                <MapPin size={28} className="mx-auto mb-2 text-cyan-500/40" />
                <p className="text-sm">NIT Surat, Gujarat</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-surface">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="section-tag inline-flex mb-4">FAQs</span>
            <h2 className="font-syne font-bold text-3xl text-text-primary">Common Questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
