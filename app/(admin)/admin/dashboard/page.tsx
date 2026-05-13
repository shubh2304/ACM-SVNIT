"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Users, FileText, Mail, Trophy, TrendingUp, Plus, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Stats {
  events: number;
  members: number;
  blogs: number;
  subscribers: number;
  achievements: number;
  teamMembers: number;
}

const quickActions = [
  { label: "Add Event", href: "/admin/events?new=1", icon: Calendar, color: "from-cyan-500 to-blue-500" },
  { label: "Add Team Member", href: "/admin/team?new=1", icon: Users, color: "from-violet-500 to-purple-500" },
  { label: "New Blog Post", href: "/admin/blogs?new=1", icon: FileText, color: "from-emerald-500 to-teal-500" },
  { label: "Add Achievement", href: "/admin/achievements?new=1", icon: Trophy, color: "from-amber-500 to-orange-500" },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ events: 0, members: 0, blogs: 0, subscribers: 0, achievements: 0, teamMembers: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [eventsRes, membersRes, blogsRes, subRes, achRes, teamRes] = await Promise.allSettled([
          fetch("/api/events").then(r => r.json()),
          fetch("/api/members").then(r => r.json()),
          fetch("/api/blogs").then(r => r.json()),
          fetch("/api/newsletter").then(r => r.json()),
          fetch("/api/achievements").then(r => r.json()),
          fetch("/api/team").then(r => r.json()),
        ]);
        setStats({
          events: eventsRes.status === "fulfilled" ? (eventsRes.value.events?.length || 0) : 0,
          members: membersRes.status === "fulfilled" ? (membersRes.value.members?.length || 0) : 0,
          blogs: blogsRes.status === "fulfilled" ? (blogsRes.value.posts?.length || 0) : 0,
          subscribers: subRes.status === "fulfilled" ? (subRes.value.subscribers?.length || 0) : 0,
          achievements: achRes.status === "fulfilled" ? (achRes.value.achievements?.length || 0) : 0,
          teamMembers: teamRes.status === "fulfilled" ? (teamRes.value.members?.length || 0) : 0,
        });
      } catch {}
    };
    fetchStats();
  }, []);

  const statCards = [
    { label: "Total Events", value: stats.events, icon: Calendar, color: "text-cyan-500", bg: "bg-cyan-500/10 border-cyan-500/20" },
    { label: "Members", value: stats.members, icon: Users, color: "text-violet-400", bg: "bg-violet-500/10 border-violet-500/20" },
    { label: "Blog Posts", value: stats.blogs, icon: FileText, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
    { label: "Subscribers", value: stats.subscribers, icon: Mail, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
    { label: "Achievements", value: stats.achievements, icon: Trophy, color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20" },
    { label: "Team Members", value: stats.teamMembers, icon: Users, color: "text-pink-400", bg: "bg-pink-500/10 border-pink-500/20" },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-syne font-black text-3xl text-text-primary mb-1">Dashboard</h1>
        <p className="text-text-muted text-sm">Welcome back. Here&apos;s an overview of your chapter.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
        {statCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className={`stat-card glass-card p-4 border ${card.bg} transition-all`}
          >
            <card.icon size={18} className={`${card.color} mb-3`} />
            <div className="font-syne font-bold text-2xl text-text-primary">{card.value}</div>
            <div className="text-text-muted text-xs mt-0.5">{card.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-10">
        <h2 className="font-syne font-bold text-lg text-text-primary mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, i) => (
            <motion.div
              key={action.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.07 }}
            >
              <Link href={action.href} className="glass-card p-5 flex items-center gap-3 hover-lift group">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center flex-shrink-0`}>
                  <action.icon size={18} className="text-white" />
                </div>
                <span className="text-text-primary text-sm font-medium group-hover:text-cyan-400 transition-colors">{action.label}</span>
                <ArrowRight size={14} className="ml-auto text-text-muted group-hover:text-cyan-500 transition-colors" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Links to sections */}
      <div>
        <h2 className="font-syne font-bold text-lg text-text-primary mb-4">Manage Content</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            { label: "Events", href: "/admin/events" },
            { label: "Team", href: "/admin/team" },
            { label: "Blogs", href: "/admin/blogs" },
            { label: "Members", href: "/admin/members" },
            { label: "Settings", href: "/admin/settings" },
          ].map((link) => (
            <Link key={link.href} href={link.href} className="glass-card px-4 py-3 text-sm text-text-muted hover:text-cyan-400 transition-colors text-center rounded-xl">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
