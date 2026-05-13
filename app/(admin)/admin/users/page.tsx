"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import bcrypt from "bcryptjs";

interface AdminUser {
  _id: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [form, setForm] = useState({ email: "", password: "", role: "editor" });
  const [saving, setSaving] = useState(false);

  const fetchUsers = async () => {
    const res = await fetch("/api/admin/users");
    const data = await res.json();
    setUsers(data.users || []);
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ email: "", password: "", role: "editor" });
    fetchUsers();
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this admin user?")) return;
    await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
    fetchUsers();
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-syne font-black text-3xl text-text-primary mb-1">Admin Users</h1>
        <p className="text-text-muted text-sm">Manage who has access to the admin panel.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Add User */}
        <div className="glass-card p-6">
          <h2 className="font-syne font-bold text-lg text-text-primary mb-5">Add Admin User</h2>
          <form onSubmit={handleAdd} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-text-muted mb-2">Email</label>
              <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-background border border-cyan-500/15 text-text-primary text-sm" placeholder="admin@svnitacm.in" />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-muted mb-2">Password</label>
              <input type="password" required value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-background border border-cyan-500/15 text-text-primary text-sm" placeholder="••••••••" />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-muted mb-2">Role</label>
              <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-background border border-cyan-500/15 text-text-primary text-sm">
                <option value="editor">Editor</option>
                <option value="superadmin">Superadmin</option>
              </select>
            </div>
            <button type="submit" disabled={saving}
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-semibold rounded-xl text-sm flex items-center justify-center gap-2 disabled:opacity-60">
              <Plus size={16} /> {saving ? "Adding..." : "Add User"}
            </button>
          </form>
        </div>

        {/* Users List */}
        <div className="glass-card overflow-hidden">
          <div className="px-5 py-4 border-b border-cyan-500/8">
            <h2 className="font-syne font-bold text-base text-text-primary">Current Admin Users</h2>
          </div>
          <div className="divide-y divide-cyan-500/5">
            {users.map(user => (
              <div key={user._id} className="px-5 py-4 flex items-center justify-between">
                <div>
                  <div className="text-text-primary text-sm font-medium">{user.email}</div>
                  <div className={`text-xs mt-0.5 capitalize ${user.role === "superadmin" ? "text-amber-400" : "text-cyan-400"}`}>{user.role}</div>
                </div>
                <button onClick={() => handleDelete(user._id)} className="p-2 rounded-lg hover:bg-red-500/10 text-text-muted hover:text-red-400 transition-all">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
            {users.length === 0 && <div className="px-5 py-8 text-center text-text-muted text-sm">No admin users found</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
