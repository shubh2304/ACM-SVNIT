"use client";

import { Image as ImageIcon, Upload } from "lucide-react";

export default function AdminGalleryPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-syne font-black text-3xl text-text-primary">Gallery</h1>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-semibold rounded-xl text-sm">
          <Upload size={16} /> Upload Photos
        </button>
      </div>
      <div className="glass-card p-12 text-center">
        <ImageIcon size={48} className="mx-auto mb-4 text-cyan-500/30" />
        <h2 className="font-syne font-bold text-xl text-text-primary mb-2">Gallery Management</h2>
        <p className="text-text-muted">Upload images to Cloudinary and they will appear on your events and about pages.</p>
        <p className="text-text-muted text-sm mt-2">Connect Cloudinary credentials in .env.local to enable uploads.</p>
      </div>
    </div>
  );
}
