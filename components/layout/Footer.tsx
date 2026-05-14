"use client";

import Link from "next/link";
import Image from "next/image";
import { Link2, AtSign, Globe, X as TwitterX, Mail, MapPin, ExternalLink } from "lucide-react";
const Github = Link2;
const Instagram = AtSign;
const Linkedin = Globe;
const Twitter = TwitterX;

const footerLinks = {
  Pages: [
    { label: "Home", href: "/#home" },
    { label: "About", href: "/#about" },
    { label: "Events", href: "/#events" },
    { label: "Team", href: "/#team" },
  ],
  Resources: [
    { label: "Blog", href: "/#blogs" },
    { label: "Achievements", href: "/#achievements" },
    { label: "Contact", href: "/#contact" },
  ],
};

const socials = [
  { icon: Instagram, href: "https://instagram.com/svnitacm", label: "Instagram" },
  { icon: Linkedin, href: "https://linkedin.com/company/svnitacm", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/svnitacm", label: "GitHub" },
  { icon: Twitter, href: "https://twitter.com/svnitacm", label: "Twitter" },
];

export default function Footer() {
  return (
    <footer className="relative bg-surface border-t border-cyan-500/10 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-96 h-48 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-32 bg-violet-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/acm-logo.png"
                alt="ACM SVNIT Logo"
                width={40}
                height={40}
                className="w-10 h-10 object-contain"
              />
              <div>
                <div className="font-syne font-bold text-xl text-text-primary">
                  <span className="gradient-text">ACM</span> SVNIT
                </div>
                <div className="text-text-muted text-xs font-mono">Student Chapter</div>
              </div>
            </div>
            <p className="text-text-muted text-sm leading-relaxed max-w-xs mb-6">
              ACM SVNIT&apos;s premier computing society. Where engineers 
              become innovators through code, collaboration, and community.
            </p>
            <div className="flex items-center gap-2 text-text-muted text-sm mb-2">
              <MapPin size={14} className="text-cyan-500" />
              <span>NIT Surat, Surat, Gujarat — 395007</span>
            </div>
            <div className="flex items-center gap-2 text-text-muted text-sm">
              <Mail size={14} className="text-cyan-500" />
              <a href="mailto:acm@svnit.ac.in" className="hover:text-cyan-500 transition-colors">
                acm@svnit.ac.in
              </a>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3 mt-6">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg border border-cyan-500/15 flex items-center justify-center text-text-muted hover:text-cyan-500 hover:border-cyan-500/40 hover:bg-cyan-500/8 transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-syne font-semibold text-text-primary text-sm mb-4">
                {category}
              </h3>
              <ul className="space-y-2">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-text-muted text-sm hover:text-cyan-500 transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-cyan-500/8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-subtle text-sm font-mono">
            Built with ❤️ by ACM SVNIT · © {new Date().getFullYear()}
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://acm.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-text-subtle hover:text-text-muted transition-colors flex items-center gap-1"
            >
              ACM Global <ExternalLink size={10} />
            </a>
            <span className="text-text-subtle text-xs">·</span>
            <a
              href="https://india.acm.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-text-subtle hover:text-text-muted transition-colors flex items-center gap-1"
            >
              ACM India <ExternalLink size={10} />
            </a>
            <span className="text-text-subtle text-xs">·</span>
            <Link href="/admin/login" className="text-xs text-text-subtle hover:text-text-muted transition-colors">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
