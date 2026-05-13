"use client";

import { Save, Settings } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-syne font-black text-3xl text-text-primary mb-1">Settings</h1>
        <p className="text-text-muted text-sm">Manage site-wide content and configuration.</p>
      </div>

      <div className="space-y-6 max-w-2xl">
        {[
          { label: "Hero Headline", id: "hero-headline", placeholder: "Where Engineers Become Innovators", type: "text" },
          { label: "Hero Subtext", id: "hero-subtext", placeholder: "SVNIT's premier computing society...", type: "textarea" },
          { label: "Contact Email", id: "contact-email", placeholder: "acm@svnit.ac.in", type: "email" },
          { label: "Instagram URL", id: "instagram-url", placeholder: "https://instagram.com/svnitacm", type: "url" },
          { label: "LinkedIn URL", id: "linkedin-url", placeholder: "https://linkedin.com/company/svnitacm", type: "url" },
          { label: "GitHub URL", id: "github-url", placeholder: "https://github.com/svnitacm", type: "url" },
        ].map((field) => (
          <div key={field.id} className="glass-card p-5">
            <label htmlFor={field.id} className="block text-sm font-medium text-text-primary mb-3">{field.label}</label>
            {field.type === "textarea" ? (
              <textarea id={field.id} rows={3} placeholder={field.placeholder}
                className="w-full px-4 py-3 rounded-xl bg-background border border-cyan-500/15 text-text-primary text-sm placeholder-text-subtle resize-none" />
            ) : (
              <input id={field.id} type={field.type} placeholder={field.placeholder}
                className="w-full px-4 py-3 rounded-xl bg-background border border-cyan-500/15 text-text-primary text-sm placeholder-text-subtle" />
            )}
          </div>
        ))}

        <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-semibold rounded-xl text-sm hover:opacity-90 transition-all">
          <Save size={16} /> Save Settings
        </button>
      </div>
    </div>
  );
}
