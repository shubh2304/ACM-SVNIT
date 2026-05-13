"use client";

import { useState, useEffect } from "react";
import { Mail, Download, Trash2, Send } from "lucide-react";
import { format } from "date-fns";

export default function AdminNewsletterPage() {
  const [subscribers, setSubscribers] = useState<{ _id: string; email: string; subscribedAt: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchSubs = async () => {
    const res = await fetch("/api/newsletter");
    const data = await res.json();
    setSubscribers(data.subscribers || []);
    setLoading(false);
  };

  useEffect(() => { fetchSubs(); }, []);

  const exportCSV = () => {
    const content = "Email,Subscribed At\n" + subscribers.map(s => `"${s.email}","${s.subscribedAt}"`).join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([content], { type: "text/csv" }));
    a.download = "subscribers.csv";
    a.click();
  };

  const filtered = subscribers.filter(s => s.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-syne font-black text-3xl text-text-primary mb-1">Newsletter</h1>
          <p className="text-text-muted text-sm">{subscribers.length} subscribers</p>
        </div>
        <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2.5 border border-cyan-500/25 text-cyan-400 rounded-xl text-sm hover:bg-cyan-500/8">
          <Download size={15} /> Export CSV
        </button>
      </div>

      <div className="relative mb-6 max-w-sm">
        <input type="text" placeholder="Search emails..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full pl-4 pr-4 py-3 rounded-xl bg-surface border border-cyan-500/15 text-text-primary text-sm placeholder-text-subtle" />
      </div>

      <div className="glass-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-cyan-500/8">
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-text-muted">#</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-text-muted">Email</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-text-muted">Subscribed At</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cyan-500/5">
            {loading ? (
              <tr><td colSpan={3} className="text-center py-12 text-text-muted">Loading...</td></tr>
            ) : filtered.map((s, i) => (
              <tr key={s._id} className="hover:bg-white/2 transition-colors">
                <td className="px-5 py-4 text-text-muted text-sm">{i + 1}</td>
                <td className="px-5 py-4 text-text-primary text-sm">{s.email}</td>
                <td className="px-5 py-4 text-text-muted text-sm">{format(new Date(s.subscribedAt), "dd MMM yyyy")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
