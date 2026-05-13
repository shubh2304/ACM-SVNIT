"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Plus, Edit2, Trash2, Search, X, Calendar, Save } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Event {
  _id?: string;
  title: string;
  slug: string;
  description: string;
  date: string;
  location: string;
  type: string;
  domains: string[];
  coverImage: string;
  isPast: boolean;
  isRegistrationOpen: boolean;
}

const defaultEvent: Event = {
  title: "", slug: "", description: "", date: new Date().toISOString().slice(0, 16),
  location: "", type: "Workshop", domains: [], coverImage: "", isPast: false, isRegistrationOpen: true,
};

const eventTypes = ["Hackathon", "Workshop", "Talk", "Competition", "Social"];
const domainOptions = ["Web Dev", "AI/ML", "Competitive Programming", "Cybersecurity", "Open Source", "Design"];

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Event>(defaultEvent);
  const [saving, setSaving] = useState(false);

  const fetchEvents = async () => {
    try {
      const res = await fetch("/api/events");
      const data = await res.json();
      setEvents(data.events || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEvents(); }, []);

  const filtered = events.filter(e =>
    e.title.toLowerCase().includes(search.toLowerCase()) ||
    e.type.toLowerCase().includes(search.toLowerCase())
  );

  const openCreate = () => { setEditing(defaultEvent); setShowModal(true); };
  const openEdit = (e: Event) => { setEditing(e); setShowModal(true); };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editing._id) {
        await fetch(`/api/events/${editing._id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing) });
      } else {
        await fetch("/api/events", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing) });
      }
      setShowModal(false);
      fetchEvents();
    } catch { alert("Failed to save. Check console."); }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this event?")) return;
    await fetch(`/api/events/${id}`, { method: "DELETE" });
    fetchEvents();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-syne font-black text-3xl text-text-primary mb-1">Events</h1>
          <p className="text-text-muted text-sm">{events.length} total events</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-semibold rounded-xl text-sm hover:opacity-90 transition-all">
          <Plus size={16} /> Add Event
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-xl bg-surface border border-cyan-500/15 text-text-primary text-sm placeholder-text-subtle max-w-md"
        />
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-cyan-500/8">
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-text-muted">Title</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-text-muted">Type</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-text-muted">Date</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-text-muted">Status</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-text-muted">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyan-500/5">
              {loading ? (
                <tr><td colSpan={5} className="text-center py-12 text-text-muted text-sm">Loading...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-12 text-text-muted text-sm">No events found</td></tr>
              ) : filtered.map((event) => (
                <tr key={event._id} className="hover:bg-white/2 transition-colors">
                  <td className="px-5 py-4">
                    <div className="font-medium text-text-primary text-sm">{event.title}</div>
                    <div className="text-text-muted text-xs mt-0.5 font-mono">{event.slug}</div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs">{event.type}</span>
                  </td>
                  <td className="px-5 py-4 text-text-muted text-sm">{format(new Date(event.date), "dd MMM yyyy")}</td>
                  <td className="px-5 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs ${event.isPast ? "bg-surface text-text-muted border border-white/10" : "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"}`}>
                      {event.isPast ? "Past" : "Upcoming"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(event)} className="p-2 rounded-lg hover:bg-cyan-500/10 text-text-muted hover:text-cyan-400 transition-all">
                        <Edit2 size={14} />
                      </button>
                      <button onClick={() => handleDelete(event._id!)} className="p-2 rounded-lg hover:bg-red-500/10 text-text-muted hover:text-red-400 transition-all">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="glass-card w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-syne font-bold text-xl text-text-primary">
                  {editing._id ? "Edit Event" : "Create Event"}
                </h2>
                <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-white/5 text-text-muted hover:text-text-primary transition-all">
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-text-muted mb-2">Title *</label>
                  <input
                    type="text"
                    value={editing.title}
                    onChange={(e) => setEditing({ ...editing, title: e.target.value, slug: slugify(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-cyan-500/15 text-text-primary text-sm"
                    placeholder="Event title"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-text-muted mb-2">Slug</label>
                  <input type="text" value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-cyan-500/15 text-text-primary text-sm font-mono" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-text-muted mb-2">Date & Time</label>
                    <input type="datetime-local" value={editing.date?.slice(0, 16)} onChange={(e) => setEditing({ ...editing, date: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-cyan-500/15 text-text-primary text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-text-muted mb-2">Type</label>
                    <select value={editing.type} onChange={(e) => setEditing({ ...editing, type: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-cyan-500/15 text-text-primary text-sm">
                      {eventTypes.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-text-muted mb-2">Location</label>
                  <input type="text" value={editing.location} onChange={(e) => setEditing({ ...editing, location: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-cyan-500/15 text-text-primary text-sm" placeholder="e.g. SVNIT Seminar Hall" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-text-muted mb-2">Description</label>
                  <textarea rows={4} value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-cyan-500/15 text-text-primary text-sm resize-none" placeholder="Event description..." />
                </div>
                <div>
                  <label className="block text-xs font-medium text-text-muted mb-2">Cover Image URL</label>
                  <input type="url" value={editing.coverImage} onChange={(e) => setEditing({ ...editing, coverImage: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-cyan-500/15 text-text-primary text-sm" placeholder="https://res.cloudinary.com/..." />
                </div>
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={editing.isPast} onChange={(e) => setEditing({ ...editing, isPast: e.target.checked })} className="w-4 h-4 accent-cyan-500" />
                    <span className="text-sm text-text-muted">Mark as Past</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={editing.isRegistrationOpen} onChange={(e) => setEditing({ ...editing, isRegistrationOpen: e.target.checked })} className="w-4 h-4 accent-cyan-500" />
                    <span className="text-sm text-text-muted">Registration Open</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-6 pt-6 border-t border-cyan-500/8">
                <button onClick={() => setShowModal(false)} className="px-5 py-2.5 rounded-xl border border-cyan-500/20 text-text-muted hover:text-text-primary transition-colors text-sm">
                  Cancel
                </button>
                <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-semibold rounded-xl text-sm hover:opacity-90 transition-all disabled:opacity-60">
                  <Save size={15} /> {saving ? "Saving..." : "Save Event"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
