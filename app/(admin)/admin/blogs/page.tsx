"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Save, X, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";

interface BlogPost {
  _id?: string;
  title: string;
  slug: string;
  content: string;
  author: string;
  tags: string[];
  coverImage: string;
  isPublished: boolean;
  publishedAt?: string;
  readingTime: number;
}

const defaultPost: BlogPost = { title: "", slug: "", content: "", author: "", tags: [], coverImage: "", isPublished: false, readingTime: 5 };
const availableTags = ["Technical", "Events Recap", "Tutorial", "Announcement", "Open Source", "AI/ML", "Career"];

function slugify(s: string) { return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""); }

export default function AdminBlogsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<BlogPost>(defaultPost);
  const [saving, setSaving] = useState(false);

  const fetch_ = async () => {
    const res = await fetch("/api/blogs");
    const data = await res.json();
    setPosts(data.posts || []);
  };

  useEffect(() => { fetch_(); }, []);

  const handleSave = async () => {
    setSaving(true);
    const method = editing._id ? "PUT" : "POST";
    const url = editing._id ? `/api/blogs/${editing._id}` : "/api/blogs";
    const body = { ...editing, publishedAt: editing.isPublished ? new Date().toISOString() : undefined };
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    setShowModal(false);
    fetch_();
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    await fetch(`/api/blogs/${id}`, { method: "DELETE" });
    fetch_();
  };

  const toggleTag = (tag: string) => {
    setEditing(prev => ({
      ...prev,
      tags: prev.tags.includes(tag) ? prev.tags.filter(t => t !== tag) : [...prev.tags, tag]
    }));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-syne font-black text-3xl text-text-primary">Blog Posts</h1>
        <button onClick={() => { setEditing(defaultPost); setShowModal(true); }}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-semibold rounded-xl text-sm">
          <Plus size={16} /> New Post
        </button>
      </div>

      <div className="glass-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-cyan-500/8">
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-text-muted">Title</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-text-muted">Author</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-text-muted">Tags</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-text-muted">Status</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-text-muted">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cyan-500/5">
            {posts.length === 0 ? (
              <tr><td colSpan={5} className="text-center py-12 text-text-muted">No posts yet</td></tr>
            ) : posts.map(post => (
              <tr key={post._id} className="hover:bg-white/2 transition-colors">
                <td className="px-5 py-4">
                  <div className="font-medium text-text-primary text-sm">{post.title}</div>
                  <div className="text-text-muted text-xs font-mono mt-0.5">{post.slug}</div>
                </td>
                <td className="px-5 py-4 text-text-muted text-sm">{post.author}</td>
                <td className="px-5 py-4">
                  <div className="flex flex-wrap gap-1">
                    {post.tags?.slice(0, 2).map(t => (
                      <span key={t} className="px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-300 text-xs">{t}</span>
                    ))}
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs ${post.isPublished ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-surface text-text-muted border border-white/10"}`}>
                    {post.isPublished ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <button onClick={() => { setEditing(post); setShowModal(true); }} className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400"><Edit2 size={13} /></button>
                    <button onClick={() => handleDelete(post._id!)} className="p-2 rounded-lg bg-red-500/10 text-red-400"><Trash2 size={13} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              className="glass-card w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-syne font-bold text-xl text-text-primary">{editing._id ? "Edit Post" : "New Post"}</h2>
                <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-white/5 text-text-muted"><X size={18} /></button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-text-muted mb-2">Title *</label>
                  <input type="text" value={editing.title} onChange={e => setEditing({ ...editing, title: e.target.value, slug: slugify(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-cyan-500/15 text-text-primary text-sm" placeholder="Article title" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-text-muted mb-2">Author *</label>
                    <input type="text" value={editing.author} onChange={e => setEditing({ ...editing, author: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-cyan-500/15 text-text-primary text-sm" placeholder="Author name" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-text-muted mb-2">Reading Time (min)</label>
                    <input type="number" value={editing.readingTime} onChange={e => setEditing({ ...editing, readingTime: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-cyan-500/15 text-text-primary text-sm" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-text-muted mb-2">Tags</label>
                  <div className="flex flex-wrap gap-2">
                    {availableTags.map(tag => (
                      <button key={tag} type="button" onClick={() => toggleTag(tag)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${editing.tags.includes(tag) ? "bg-cyan-500 text-background border-cyan-500" : "border-cyan-500/20 text-text-muted hover:border-cyan-500/40"}`}>
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-text-muted mb-2">Content (HTML/Markdown)</label>
                  <textarea rows={8} value={editing.content} onChange={e => setEditing({ ...editing, content: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-cyan-500/15 text-text-primary text-sm resize-none font-mono" placeholder="Write your article content here..." />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="isPublished" checked={editing.isPublished} onChange={e => setEditing({ ...editing, isPublished: e.target.checked })} className="w-4 h-4 accent-cyan-500" />
                  <label htmlFor="isPublished" className="text-sm text-text-muted">Publish immediately</label>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-6 pt-6 border-t border-cyan-500/8">
                <button onClick={() => setShowModal(false)} className="px-5 py-2.5 rounded-xl border border-cyan-500/20 text-text-muted text-sm">Cancel</button>
                <button onClick={handleSave} disabled={saving}
                  className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-semibold rounded-xl text-sm disabled:opacity-60">
                  <Save size={15} /> {saving ? "Saving..." : "Save Post"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
