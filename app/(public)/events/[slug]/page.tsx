import { Metadata } from "next";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { Calendar, MapPin, Users, Tag, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Event {
  _id: string;
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
  speakers: Array<{ name: string; bio: string; designation: string }>;
}

async function getEvent(slug: string): Promise<Event | null> {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/events?slug=${slug}`, { cache: "no-store" });
    const data = await res.json();
    return data.events?.[0] || null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  return {
    title: `Event — ${params.slug}`,
    description: `Event details for ${params.slug}`,
  };
}

export default async function EventDetailPage({ params }: { params: { slug: string } }) {
  // For now show a placeholder; full implementation fetches from DB
  return (
    <div className="min-h-screen pt-24">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link href="/events" className="inline-flex items-center gap-2 text-text-muted hover:text-cyan-500 transition-colors mb-8 text-sm">
          <ArrowLeft size={14} /> Back to Events
        </Link>

        <div className="glass-card overflow-hidden">
          <div className="h-64 bg-gradient-to-br from-cyan-500/10 to-violet-500/10 flex items-center justify-center">
            <div className="text-6xl">⚡</div>
          </div>
          <div className="p-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-400 text-xs font-semibold border border-cyan-500/25">
                Event
              </span>
            </div>

            <h1 className="font-syne font-black text-3xl md:text-4xl text-text-primary mb-4">
              Event: {params.slug}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-text-muted text-sm mb-8">
              <span className="flex items-center gap-2"><Calendar size={14} className="text-cyan-500" /> Date TBD</span>
              <span className="flex items-center gap-2"><MapPin size={14} className="text-cyan-500" /> Location TBD</span>
            </div>

            <p className="text-text-muted leading-relaxed">
              Event details are fetched from the database. Connect your MongoDB URI and add events via the Admin Panel to see full event details here.
            </p>

            <div className="mt-8">
              <Link href="/join" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-semibold rounded-xl text-sm hover:opacity-90 transition-all">
                Register Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
