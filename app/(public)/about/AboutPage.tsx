"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, Target, Eye, Award, Users, Globe } from "lucide-react";

const timeline = [
  { year: "2016", title: "Chapter Founded", desc: "ACM SVNIT Student Chapter was established as an ACM India certified chapter." },
  { year: "2017", title: "First Hackathon", desc: "Organized HackNIT, our flagship 24-hour hackathon with 200+ participants." },
  { year: "2018", title: "ICPC Debut", desc: "SVNIT teams qualified for ICPC Asia Regional Contest for the first time." },
  { year: "2019", title: "Workshop Series", desc: "Launched our annual 'CodeCraft' workshop series spanning 8 technical domains." },
  { year: "2020", title: "Going Virtual", desc: "Pivoted to online events during pandemic — reached 500+ participants nationwide." },
  { year: "2021", title: "Open Source Initiative", desc: "Launched ACM SVNIT Open Source Program, contributing to 15+ global projects." },
  { year: "2022", title: "SIH Winners", desc: "ACM SVNIT members won Smart India Hackathon, recognized by MoE." },
  { year: "2023", title: "Best Chapter Award", desc: "Received ACM India 'Outstanding Chapter' award at the national summit." },
  { year: "2024", title: "200+ Members", desc: "Crossed 200 active members milestone — the largest chapter at SVNIT." },
];

const advisors = [
  { name: "Dr. Rajesh Kumar", role: "Faculty Advisor", dept: "CSE Department", img: "" },
  { name: "Dr. Priya Sharma", role: "Co-Advisor", dept: "IT Department", img: "" },
];

export default function AboutPage() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const isTimelineInView = useInView(timelineRef, { once: true, margin: "-50px" });

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden noise-overlay grid-bg pt-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,212,255,0.06)_0%,transparent_70%)] pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center py-24">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="section-tag inline-flex mb-6"
          >
            About ACM SVNIT
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8 }}
            className="font-syne font-black text-5xl md:text-7xl text-text-primary mb-6 leading-tight"
          >
            Powered by Passion,
            <br />
            <span className="gradient-text">Driven by Code.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-text-muted text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Since 2016, we&apos;ve been building the most vibrant tech community at 
            SVNIT — one hackathon, one workshop, one line of code at a time.
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-5 border border-cyan-500/20">
                <Target size={22} className="text-cyan-500" />
              </div>
              <h2 className="font-syne font-bold text-2xl text-text-primary mb-3">Our Mission</h2>
              <p className="text-text-muted leading-relaxed">
                To advance computing as a science and profession by fostering a collaborative 
                environment where students can learn, experiment, and innovate. We connect 
                SVNIT students to global opportunities through ACM&apos;s worldwide network.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-card p-8"
            >
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center mb-5 border border-violet-500/20">
                <Eye size={22} className="text-violet-400" />
              </div>
              <h2 className="font-syne font-bold text-2xl text-text-primary mb-3">Our Vision</h2>
              <p className="text-text-muted leading-relaxed">
                To be the most impactful ACM chapter in India — a launchpad for future tech 
                leaders, a hub of innovation, and a community that transforms the way engineers 
                think, build, and collaborate.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section ref={timelineRef} className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="section-tag">Our Journey</span>
            <h2 className="font-syne font-black text-4xl md:text-5xl mt-6 text-text-primary">
              8 Years of <span className="gradient-text">Impact</span>
            </h2>
          </div>

          <div className="relative">
            {/* Center line */}
            <div className="absolute left-8 top-0 bottom-0 w-px timeline-line" />

            <div className="space-y-8">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isTimelineInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.08, duration: 0.6 }}
                  className="relative pl-20"
                >
                  {/* Dot */}
                  <div className="absolute left-5 top-3 w-6 h-6 rounded-full border-2 border-cyan-500 bg-background flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-cyan-500" />
                  </div>

                  <div className="glass-card p-5">
                    <span className="font-mono text-xs text-cyan-500 mb-1 block">{item.year}</span>
                    <h3 className="font-syne font-bold text-lg text-text-primary mb-1">{item.title}</h3>
                    <p className="text-text-muted text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Advisors */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="section-tag">Faculty</span>
            <h2 className="font-syne font-black text-4xl mt-6 text-text-primary">
              Our <span className="gradient-text">Advisors</span>
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {advisors.map((advisor) => (
              <motion.div
                key={advisor.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-card p-8 text-center w-72"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-cyan-500/20 mx-auto mb-4 flex items-center justify-center">
                  <Users size={28} className="text-cyan-500/60" />
                </div>
                <h3 className="font-syne font-bold text-lg text-text-primary mb-1">{advisor.name}</h3>
                <p className="text-cyan-400 text-sm mb-1">{advisor.role}</p>
                <p className="text-text-muted text-xs">{advisor.dept}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Affiliations */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex flex-wrap justify-center items-center gap-8">
            {[
              { icon: Globe, label: "ACM Global Member", sub: "acm.org" },
              { icon: Award, label: "ACM India Chapter", sub: "india.acm.org" },
              { icon: Heart, label: "SVNIT Surat", sub: "svnit.ac.in" },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="glass-card px-8 py-6 text-center">
                <Icon size={24} className="text-cyan-500 mx-auto mb-2" />
                <div className="font-semibold text-text-primary text-sm">{label}</div>
                <div className="text-text-muted text-xs mt-1 font-mono">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
