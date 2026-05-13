"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, Award, Star, Zap, Medal } from "lucide-react";

interface Achievement {
  _id: string;
  title: string;
  description: string;
  year: number;
  category: string;
}

const mockAchievements: Achievement[] = [
  { _id: "1", title: "Best Chapter Award", description: "Recognized as the best ACM Student Chapter in India at the national summit.", year: 2024, category: "Award" },
  { _id: "2", title: "Outstanding Chapter Website", description: "Won the ACM India 'Outstanding Chapter Website' award.", year: 2023, category: "Award" },
  { _id: "3", title: "ICPC Asia Regional Qualifier", description: "3 teams from SVNIT ACM qualified for the ICPC Asia Regional Contest.", year: 2023, category: "Competition" },
  { _id: "4", title: "Smart India Hackathon Winner", description: "SVNIT ACM members won Smart India Hackathon 2022, recognized by MoE.", year: 2022, category: "Competition" },
  { _id: "5", title: "ACM India Distinguished Chapter", description: "Named as ACM India Distinguished Chapter for 2021-22.", year: 2022, category: "Recognition" },
  { _id: "6", title: "CodeChef SnackDown Regional Champions", description: "SVNIT ACM team reached the final round of CodeChef SnackDown.", year: 2021, category: "Competition" },
  { _id: "7", title: "Codeforces Round Organizers", description: "Successfully organized an official Codeforces round with 3000+ participants.", year: 2020, category: "Recognition" },
  { _id: "8", title: "Top 10 ACM Chapters — ACM India", description: "Ranked in Top 10 ACM Student Chapters across India.", year: 2019, category: "Award" },
];

const categoryIcons: Record<string, typeof Trophy> = {
  Award: Trophy,
  Competition: Medal,
  Recognition: Star,
};

const categoryColors: Record<string, string> = {
  Award: "from-amber-500 to-yellow-400",
  Competition: "from-cyan-500 to-blue-500",
  Recognition: "from-violet-500 to-purple-500",
};

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>(mockAchievements);

  useEffect(() => {
    fetch("/api/achievements")
      .then((r) => r.json())
      .then((data) => {
        if (data.achievements && data.achievements.length > 0) setAchievements(data.achievements);
      })
      .catch(() => {});
  }, []);

  const years = [...new Set(achievements.map((a) => a.year))].sort().reverse();

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden noise-overlay grid-bg">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.05)_0%,transparent_60%)] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-tag inline-flex mb-6">
            Achievements
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="font-syne font-black text-5xl md:text-7xl text-text-primary mb-4"
          >
            Our Trophy <span className="gradient-text">Cabinet</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-text-muted text-xl max-w-xl mx-auto"
          >
            Awards, recognition, and competition victories that define our legacy.
          </motion.p>
        </div>
      </section>

      {/* Timeline by year */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          {years.map((year, yi) => {
            const yearAchievements = achievements.filter((a) => a.year === year);
            return (
              <div key={year} className="mb-16">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: yi * 0.05 }}
                  className="flex items-center gap-4 mb-8"
                >
                  <div className="font-syne font-black text-3xl gradient-text">{year}</div>
                  <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/30 to-transparent" />
                </motion.div>

                <div className="grid sm:grid-cols-2 gap-5">
                  {yearAchievements.map((ach, i) => {
                    const Icon = categoryIcons[ach.category] || Award;
                    const gradient = categoryColors[ach.category] || "from-cyan-500 to-violet-500";
                    return (
                      <motion.div
                        key={ach._id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card p-6 hover-lift"
                      >
                        <div className={`inline-flex w-11 h-11 rounded-xl bg-gradient-to-br ${gradient} bg-opacity-20 items-center justify-center mb-4 p-0.5`}>
                          <div className="w-full h-full rounded-[9px] bg-background flex items-center justify-center">
                            <Icon size={18} className="text-amber-400" />
                          </div>
                        </div>
                        <div className="text-xs font-mono text-text-muted mb-2">{ach.category}</div>
                        <h3 className="font-syne font-bold text-base text-text-primary mb-2">{ach.title}</h3>
                        <p className="text-text-muted text-sm leading-relaxed">{ach.description}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
