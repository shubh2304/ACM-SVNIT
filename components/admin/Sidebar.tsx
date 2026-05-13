"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard, Calendar, Users, FileText, Trophy, Image, Mail,
  Settings, UserCog, LogOut, ChevronLeft, ChevronRight, Zap
} from "lucide-react";

const navItems = [
  { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/events", icon: Calendar, label: "Events" },
  { href: "/admin/team", icon: Users, label: "Team" },
  { href: "/admin/blogs", icon: FileText, label: "Blogs" },
  { href: "/admin/members", icon: UserCog, label: "Members" },
  { href: "/admin/achievements", icon: Trophy, label: "Achievements" },
  { href: "/admin/gallery", icon: Image, label: "Gallery" },
  { href: "/admin/newsletter", icon: Mail, label: "Newsletter" },
  { href: "/admin/settings", icon: Settings, label: "Settings" },
  { href: "/admin/users", icon: Users, label: "Admin Users" },
];

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside className={`admin-sidebar flex flex-col transition-all duration-300 ${collapsed ? "w-16" : "w-64"} min-h-screen flex-shrink-0`}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-cyan-500/8">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center font-syne font-black text-xs text-white flex-shrink-0">
          ACM
        </div>
        {!collapsed && (
          <div>
            <div className="font-syne font-bold text-sm text-text-primary">SVNIT ACM</div>
            <div className="text-[10px] font-mono text-cyan-500">Admin Panel</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                active
                  ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/20"
                  : "text-text-muted hover:text-text-primary hover:bg-white/4"
              }`}
            >
              <Icon size={17} className="flex-shrink-0" />
              {!collapsed && <span>{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-2 pb-4 space-y-1 border-t border-cyan-500/8 pt-3">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-text-muted hover:text-text-primary hover:bg-white/4 transition-all"
        >
          <Zap size={17} className="flex-shrink-0" />
          {!collapsed && <span>View Site</span>}
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-text-muted hover:text-red-400 hover:bg-red-500/5 transition-all"
        >
          <LogOut size={17} className="flex-shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-text-muted hover:text-text-primary hover:bg-white/4 transition-all"
        >
          {collapsed ? <ChevronRight size={17} /> : <ChevronLeft size={17} />}
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
