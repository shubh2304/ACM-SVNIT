"use client";

import { useState, useEffect } from "react";
import { Users, Check, X, Download, Search } from "lucide-react";
import { format } from "date-fns";

interface Member {
  _id: string;
  name: string;
  email: string;
  rollNo: string;
  branch: string;
  year: number;
  domains: string[];
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export default function AdminMembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const fetchMembers = async () => {
    const res = await fetch("/api/members");
    const data = await res.json();
    setMembers(data.members || []);
    setLoading(false);
  };

  useEffect(() => { fetchMembers(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/members/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    fetchMembers();
  };

  const filtered = members.filter(m => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || m.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const exportCSV = () => {
    const header = "Name,Email,Roll No,Branch,Year,Domains,Status\n";
    const rows = members.map(m => `"${m.name}","${m.email}","${m.rollNo}","${m.branch}","${m.year}","${m.domains.join("; ")}","${m.status}"`).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "members.csv";
    a.click();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-syne font-black text-3xl text-text-primary mb-1">Members</h1>
          <p className="text-text-muted text-sm">{members.length} total registrations</p>
        </div>
        <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2.5 border border-cyan-500/25 text-cyan-400 rounded-xl text-sm hover:bg-cyan-500/8 transition-all">
          <Download size={15} /> Export CSV
        </button>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
          <input type="text" placeholder="Search by name or email..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-surface border border-cyan-500/15 text-text-primary text-sm placeholder-text-subtle" />
        </div>
        <div className="flex gap-2">
          {["all", "pending", "approved", "rejected"].map(s => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`px-4 py-2 rounded-lg text-sm capitalize transition-all ${statusFilter === s ? "bg-cyan-500 text-background" : "text-text-muted hover:text-text-primary hover:bg-white/5"}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-cyan-500/8">
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-text-muted">Member</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-text-muted">Details</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-text-muted">Domains</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-text-muted">Applied</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-text-muted">Status</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-text-muted">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyan-500/5">
              {loading ? (
                <tr><td colSpan={6} className="text-center py-12 text-text-muted">Loading...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-12 text-text-muted">No members found</td></tr>
              ) : filtered.map(member => (
                <tr key={member._id} className="hover:bg-white/2 transition-colors">
                  <td className="px-5 py-4">
                    <div className="font-medium text-text-primary text-sm">{member.name}</div>
                    <div className="text-text-muted text-xs mt-0.5">{member.email}</div>
                  </td>
                  <td className="px-5 py-4 text-text-muted text-sm">
                    <div>{member.rollNo}</div>
                    <div className="text-xs">{member.branch} · Year {member.year}</div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-1">
                      {member.domains?.slice(0, 2).map(d => (
                        <span key={d} className="px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-300 text-xs">{d}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-text-muted text-sm">{format(new Date(member.createdAt), "dd MMM yyyy")}</td>
                  <td className="px-5 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs capitalize ${
                      member.status === "approved" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                      member.status === "rejected" ? "bg-red-500/10 text-red-400 border border-red-500/20" :
                      "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                    }`}>{member.status}</span>
                  </td>
                  <td className="px-5 py-4">
                    {member.status === "pending" && (
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateStatus(member._id, "approved")} className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-all">
                          <Check size={13} />
                        </button>
                        <button onClick={() => updateStatus(member._id, "rejected")} className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all">
                          <X size={13} />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
