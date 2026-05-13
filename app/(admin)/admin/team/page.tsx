"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Save, X, Crown, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface TeamMember {
  _id?: string;
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

const defaultMember: TeamMember = {
  name: "", role: "", photo: "", branch: "", linkedIn: "", github: "", academicYear: "2024-25", isCurrent: true, order: 0,
};

const branches = ["CSE", "IT", "CE", "ME", "EE", "ECE", "Chemical", "Other"];

export default function AdminTeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [years, setYears] = useState<string[]>(["2024-25"]);
  const [selectedYear, setSelectedYear] = useState("2024-25");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<TeamMember>(defaultMember);
  const [saving, setSaving] = useState(false);

  const fetchMembers = async () => {
    const res = await fetch("/api/team");
    const data = await res.json();
    const all = data.members || [];
    setMembers(all);
    const ys = [...new Set(all.map((m: TeamMember) => m.academicYear))].sort().reverse() as string[];
    if (ys.length > 0) { setYears(ys); setSelectedYear(ys[0]); }
  };

  useEffect(() => { fetchMembers(); }, []);

  const currentMembers = members.filter(m => m.academicYear === selectedYear).sort((a, b) => a.order - b.order);

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editing._id) {
        await fetch(`/api/team/${editing._id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing) });
      } else {
        await fetch("/api/team", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...editing, academicYear: selectedYear }) });
      }
      setShowModal(false);
      fetchMembers();
    } catch {}
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this team member?")) return;
    await fetch(`/api/team/${id}`, { method: "DELETE" });
    fetchMembers();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-syne font-black text-3xl text-text-primary mb-1">Team</h1>
          <p className="text-text-muted text-sm">{currentMembers.length} members in {selectedYear}</p>
        </div>
        <button onClick={() => { setEditing({ ...defaultMember, academicYear: selectedYear }); setShowModal(true); }}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-semibold rounded-xl text-sm hover:opacity-90 transition-all">
          <Plus size={16} /> Add Member
        </button>
      </div>

      {/* Year Tabs */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto hide-scrollbar">
        {years.map(y => (
          <button key={y} onClick={() => setSelectedYear(y)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${selectedYear === y ? "bg-cyan-500 text-background" : "text-text-muted hover:text-text-primary hover:bg-white/5"}`}>
            {y}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {currentMembers.map((member, i) => {
          const initials = member.name.split(" ").map(n => n[0]).join("").slice(0, 2);
          return (
            <motion.div key={member._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
              className="glass-card p-4 text-center relative group">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center font-bold text-white mx-auto mb-3 text-sm">
                {initials}
              </div>
              <div className="font-medium text-text-primary text-sm truncate">{member.name}</div>
              <div className="text-cyan-400 text-xs mt-0.5 truncate">{member.role}</div>
              <div className="text-text-muted text-xs mt-0.5">{member.branch}</div>
              <div className="flex justify-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => { setEditing(member); setShowModal(true); }} className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 transition-all">
                  <Edit2 size={12} />
                </button>
                <button onClick={() => handleDelete(member._id!)} className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all">
                  <Trash2 size={12} />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {currentMembers.length === 0 && (
        <div className="text-center py-16 text-text-muted">
          <Users size={40} className="mx-auto mb-4 opacity-30" />
          <p>No team members for {selectedYear}. Add some!</p>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              className="glass-card w-full max-w-lg max-h-[90vh] overflow-y-auto p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-syne font-bold text-xl text-text-primary">{editing._id ? "Edit Member" : "Add Member"}</h2>
                <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-white/5 text-text-muted hover:text-text-primary transition-all"><X size={18} /></button>
              </div>

              <div className="space-y-4">
                {[
                  { label: "Full Name *", key: "name", placeholder: "Arjun Patel" },
                  { label: "Role *", key: "role", placeholder: "Technical Lead" },
                  { label: "Photo URL", key: "photo", placeholder: "https://res.cloudinary.com/..." },
                  { label: "LinkedIn URL", key: "linkedIn", placeholder: "linkedin.com/in/..." },
                  { label: "GitHub URL", key: "github", placeholder: "github.com/..." },
                ].map(({ label, key, placeholder }) => (
                  <div key={key}>
                    <label className="block text-xs font-medium text-text-muted mb-2">{label}</label>
                    <input type="text" value={(editing as Record<string, string>)[key]} onChange={(e) => setEditing({ ...editing, [key]: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-cyan-500/15 text-text-primary text-sm" placeholder={placeholder} />
                  </div>
                ))}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-text-muted mb-2">Branch</label>
                    <select value={editing.branch} onChange={(e) => setEditing({ ...editing, branch: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-cyan-500/15 text-text-primary text-sm">
                      <option value="">Select</option>
                      {branches.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-text-muted mb-2">Academic Year</label>
                    <input type="text" value={editing.academicYear} onChange={(e) => setEditing({ ...editing, academicYear: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-cyan-500/15 text-text-primary text-sm" placeholder="2024-25" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="isCurrent" checked={editing.isCurrent} onChange={(e) => setEditing({ ...editing, isCurrent: e.target.checked })} className="w-4 h-4 accent-cyan-500" />
                  <label htmlFor="isCurrent" className="text-sm text-text-muted">Current Member</label>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-6 pt-6 border-t border-cyan-500/8">
                <button onClick={() => setShowModal(false)} className="px-5 py-2.5 rounded-xl border border-cyan-500/20 text-text-muted hover:text-text-primary transition-colors text-sm">Cancel</button>
                <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-semibold rounded-xl text-sm hover:opacity-90 transition-all disabled:opacity-60">
                  <Save size={15} /> {saving ? "Saving..." : "Save Member"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
