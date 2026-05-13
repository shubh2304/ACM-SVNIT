"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Linkedin, Github, Crown, ChevronDown } from "lucide-react";
import Tilt from "react-parallax-tilt";

interface TeamMember {
  _id: string;
  name: string;
  role: string;
  photo: string;
  branch: string;
  linkedIn: string;
  github: string;
  academicYear: string;
  isCurrent: boolean;
  order: number;
}

const mockTeam: TeamMember[] = [
  { _id: "1", name: "Arjun Patel", role: "Chapter Chair", photo: "", branch: "CSE", linkedIn: "", github: "", academicYear: "2024-25", isCurrent: true, order: 0 },
  { _id: "2", name: "Priya Mehta", role: "Vice Chair", photo: "", branch: "IT", linkedIn: "", github: "", academicYear: "2024-25", isCurrent: true, order: 1 },
  { _id: "3", name: "Rahul Shah", role: "Technical Lead", photo: "", branch: "CSE", linkedIn: "", github: "", academicYear: "2024-25", isCurrent: true, order: 2 },
  { _id: "4", name: "Sneha Gupta", role: "Events Lead", photo: "", branch: "CE", linkedIn: "", github: "", academicYear: "2024-25", isCurrent: true, order: 3 },
  { _id: "5", name: "Dev Agarwal", role: "Design Lead", photo: "", branch: "IT", linkedIn: "", github: "", academicYear: "2024-25", isCurrent: true, order: 4 },
  { _id: "6", name: "Ananya Singh", role: "Marketing Lead", photo: "", branch: "CSE", linkedIn: "", github: "", academicYear: "2024-25", isCurrent: true, order: 5 },
  // Past year
  { _id: "7", name: "Vikram Nair", role: "Chapter Chair", photo: "", branch: "CSE", linkedIn: "", github: "", academicYear: "2023-24", isCurrent: false, order: 0 },
  { _id: "8", name: "Kiran Patel", role: "Vice Chair", photo: "", branch: "IT", linkedIn: "", github: "", academicYear: "2023-24", isCurrent: false, order: 1 },
  { _id: "9", name: "Aditya Sharma", role: "Technical Lead", photo: "", branch: "CSE", linkedIn: "", github: "", academicYear: "2023-24", isCurrent: false, order: 2 },
];

const roleOrder = ["Chapter Chair", "Vice Chair", "Technical Lead", "Events Lead", "Design Lead", "Marketing Lead", "Finance Lead"];
const isLeadership = (role: string) => ["Chapter Chair", "Vice Chair"].includes(role);

function MemberCard({ member, index }: { member: TeamMember; index: number }) {
  const initials = member.name.split(" ").map((n) => n[0]).join("").slice(0, 2);
  const gradients = [
    "from-cyan-500 to-violet-500",
    "from-violet-500 to-pink-500",
    "from-emerald-500 to-cyan-500",
    "from-orange-500 to-red-500",
    "from-pink-500 to-violet-500",
    "from-blue-500 to-cyan-500",
  ];
  const gradient = gradients[index % gradients.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >
      <Tilt
        tiltMaxAngleX={12}
        tiltMaxAngleY={12}
        perspective={1000}
        glareEnable={true}
        glareMaxOpacity={0.08}
        glareColor="#00D4FF"
        glarePosition="all"
        scale={1.02}
      >
        <div className="glass-card p-6 text-center group h-full">
          {isLeadership(member.role) && (
            <div className="flex justify-center mb-3">
              <Crown size={14} className="text-amber-400" />
            </div>
          )}

          {/* Avatar */}
          <div className="relative mx-auto w-20 h-20 mb-4">
            {member.photo ? (
              <img src={member.photo} alt={member.name} className="w-full h-full rounded-full object-cover border-2 border-cyan-500/30" />
            ) : (
              <div className={`w-full h-full rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-syne font-bold text-xl border-2 border-transparent`}>
                {initials}
              </div>
            )}
            <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-20 blur-md transition-opacity`} />
          </div>

          <h3 className="font-syne font-bold text-base text-text-primary mb-1 group-hover:text-cyan-400 transition-colors">
            {member.name}
          </h3>
          <p className="text-cyan-400 text-xs font-semibold mb-1">{member.role}</p>
          <p className="text-text-muted text-xs mb-4">{member.branch}</p>

          <div className="flex justify-center gap-3">
            {member.linkedIn && (
              <a href={member.linkedIn} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-cyan-500/20 flex items-center justify-center text-text-muted hover:text-cyan-500 hover:border-cyan-500/40 transition-all">
                <Linkedin size={14} />
              </a>
            )}
            {member.github && (
              <a href={member.github} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-cyan-500/20 flex items-center justify-center text-text-muted hover:text-cyan-500 hover:border-cyan-500/40 transition-all">
                <Github size={14} />
              </a>
            )}
            {!member.linkedIn && !member.github && (
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-lg border border-white/5 flex items-center justify-center text-text-subtle">
                  <Linkedin size={14} />
                </div>
                <div className="w-8 h-8 rounded-lg border border-white/5 flex items-center justify-center text-text-subtle">
                  <Github size={14} />
                </div>
              </div>
            )}
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
}

export default function TeamPage() {
  const [team, setTeam] = useState<TeamMember[]>(mockTeam);
  const [selectedYear, setSelectedYear] = useState("2024-25");

  useEffect(() => {
    fetch("/api/team")
      .then((r) => r.json())
      .then((data) => {
        if (data.members && data.members.length > 0) {
          setTeam(data.members);
        }
      })
      .catch(() => {});
  }, []);

  const years = [...new Set(team.map((m) => m.academicYear))].sort().reverse();
  const currentYearTeam = team
    .filter((m) => m.academicYear === selectedYear)
    .sort((a, b) => (roleOrder.indexOf(a.role) - roleOrder.indexOf(b.role)) || a.order - b.order);

  const leadership = currentYearTeam.filter((m) => isLeadership(m.role));
  const core = currentYearTeam.filter((m) => !isLeadership(m.role));

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden noise-overlay grid-bg">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(123,47,255,0.06)_0%,transparent_60%)] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-tag inline-flex mb-6">
            The Team
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="font-syne font-black text-5xl md:text-7xl text-text-primary mb-4"
          >
            The Minds{" "}
            <span className="gradient-text">Behind It All</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-text-muted text-xl max-w-xl mx-auto"
          >
            Meet the people who plan, build, and run everything you see.
          </motion.p>
        </div>
      </section>

      {/* Year Tabs */}
      <section className="sticky top-[64px] z-30 bg-[rgba(2,4,8,0.92)] backdrop-blur-xl border-b border-cyan-500/10 py-4">
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-2 overflow-x-auto hide-scrollbar">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`px-5 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                selectedYear === year
                  ? "bg-cyan-500 text-background"
                  : "text-text-muted hover:text-text-primary hover:bg-white/5"
              }`}
            >
              {year}
            </button>
          ))}
        </div>
      </section>

      {/* Leadership */}
      {leadership.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="font-syne font-bold text-2xl text-text-primary mb-8 text-center">
              Leadership
            </h2>
            <div className="flex flex-wrap justify-center gap-6 max-w-2xl mx-auto">
              {leadership.map((member, i) => (
                <div key={member._id} className="w-64">
                  <MemberCard member={member} index={i} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Core Team */}
      {core.length > 0 && (
        <section className="pb-24">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="font-syne font-bold text-2xl text-text-primary mb-8 text-center">
              Core Team
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
              {core.map((member, i) => (
                <MemberCard key={member._id} member={member} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {currentYearTeam.length === 0 && (
        <div className="text-center py-24 text-text-muted">
          <p>No team data for {selectedYear} yet.</p>
        </div>
      )}
    </>
  );
}
