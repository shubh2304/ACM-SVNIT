"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Save, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Achievement {
  _id?: string;
  title: string;
  description: string;
  year: number;
  category: string;
  image: string;
}

const defaultAch: Achievement = { title: "", description: "", year: new Date().getFullYear(), category: "Award", image: "" };

export default function AdminAchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Achievement>(defaultAch);
  const [saving, setSaving] = useState(false);

  const fetch_ = async () => {
    const res = await fetch("/api/achievements");
    const data = await res.json();
    setAchievements(data.achievements || []);
  };

  useEffect(() => { fetch_(); }, []);

  const handleSave = async () => {
    setSaving(true);
    const method = editing._id ? "PUT" : "POST";
    const url = editing._id ? `/api/achievements/${editing._id}` : "/api/achievements";
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing) });
    setShowModal(false);
    fetch_();
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this achievement?")) return;
    await fetch(`/api/achievements/${id}`, { method: "DELETE" });
    fetch_();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-syne font-black text-3xl text-text-primary">Achievements</h1>
        <button onClick={() => { setEditing(defaultAch); setShowModal(true); }}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-semibold rounded-xl text-sm">
          <Plus size={16} /> Add Achievement
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {achievements.map((ach, i) => (
          <motion.div key={ach._id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="glass-card p-5 relative group">
            <div className="text-xs font-mono text-cyan-500 mb-1">{ach.year}</div>
            <div className="text-xs text-text-muted mb-2">{ach.category}</div>
            <h3 className="font-syne font-bold text-base text-text-primary mb-2">{ach.title}</h3>
            <p className="text-text-muted text-sm leading-relaxed line-clamp-2">{ach.description}</p>
            <div className="absolute top-4 right-4 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => { setEditing(ach); setShowModal(true); }} className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400"><Edit2 size={12} /></button>
              <button onClick={() => handleDelete(ach._id!)} className="p-1.5 rounded-lg bg-red-500/10 text-red-400"><Trash2 size={12} /></button>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              className="glass-card w-full max-w-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-syne font-bold text-xl text-text-primary">{editing._id ? "Edit Achievement" : "Add Achievement"}</h2>
                <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-white/5 text-text-muted"><X size={18} /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-text-muted mb-2">Title *</label>
                  <input type="text" value={editing.title} onChange={e => setEditing({ ...editing, title: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-cyan-500/15 text-text-primary text-sm" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-text-muted mb-2">Year</label>
                    <input type="number" value={editing.year} onChange={e => setEditing({ ...editing, year: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-cyan-500/15 text-text-primary text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-text-muted mb-2">Category</label>
                    <select value={editing.category} onChange={e => setEditing({ ...editing, category: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-cyan-500/15 text-text-primary text-sm">
                      {["Award", "Competition", "Recognition", "Milestone"].map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-text-muted mb-2">Description</label>
                  <textarea rows={3} value={editing.description} onChange={e => setEditing({ ...editing, description: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-cyan-500/15 text-text-primary text-sm resize-none" />
                </div>
              </div>
              <div className="flex items-center gap-3 mt-6 pt-6 border-t border-cyan-500/8">
                <button onClick={() => setShowModal(false)} className="px-5 py-2.5 rounded-xl border border-cyan-500/20 text-text-muted text-sm">Cancel</button>
                <button onClick={handleSave} disabled={saving}
                  className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-semibold rounded-xl text-sm disabled:opacity-60">
                  <Save size={15} /> {saving ? "Saving..." : "Save"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
