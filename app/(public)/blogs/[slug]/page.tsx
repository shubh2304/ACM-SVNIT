import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  return {
    title: `Blog — ${params.slug}`,
    description: `Read this article from SVNIT ACM`,
  };
}

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-screen pt-24">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <Link href="/blogs" className="inline-flex items-center gap-2 text-text-muted hover:text-cyan-500 transition-colors mb-8 text-sm">
          <ArrowLeft size={14} /> Back to Blog
        </Link>

        <div className="glass-card overflow-hidden">
          <div className="h-56 bg-gradient-to-br from-violet-500/10 to-cyan-500/10 flex items-center justify-center">
            <div className="text-6xl">📝</div>
          </div>
          <div className="p-8">
            <div className="flex items-center gap-4 text-text-muted text-xs mb-4">
              <span className="flex items-center gap-1.5"><Calendar size={11} className="text-cyan-500" /> Date</span>
              <span className="flex items-center gap-1.5"><Clock size={11} className="text-cyan-500" /> 5 min read</span>
            </div>

            <h1 className="font-syne font-black text-3xl md:text-4xl text-text-primary mb-4">
              {params.slug.replace(/-/g, " ")}
            </h1>

            <div className="tiptap-content mt-8">
              <p>Article content is fetched from the database. Add blog posts via the Admin Panel to see them here.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
