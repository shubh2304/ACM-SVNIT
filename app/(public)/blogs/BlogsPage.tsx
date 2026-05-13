"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, Clock, Tag, ArrowRight, BookOpen } from "lucide-react";
import { format } from "date-fns";

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  author: string;
  tags: string[];
  coverImage: string;
  publishedAt: string;
  readingTime: number;
  isPublished: boolean;
}

const mockPosts: BlogPost[] = [
  {
    _id: "1",
    title: "Building a RAG System with LangChain and MongoDB Atlas",
    slug: "rag-langchain-mongodb",
    author: "Arjun Patel",
    tags: ["AI/ML", "Tutorial"],
    coverImage: "",
    publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    readingTime: 12,
    isPublished: true,
  },
  {
    _id: "2",
    title: "HackNIT 2023 — A Recap of 24 Hours of Madness",
    slug: "hacknit-2023-recap",
    author: "Priya Mehta",
    tags: ["Events Recap"],
    coverImage: "",
    publishedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    readingTime: 7,
    isPublished: true,
  },
  {
    _id: "3",
    title: "Getting Started with Competitive Programming: A Roadmap",
    slug: "cp-roadmap-beginners",
    author: "Rahul Shah",
    tags: ["Technical", "Tutorial"],
    coverImage: "",
    publishedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    readingTime: 15,
    isPublished: true,
  },
  {
    _id: "4",
    title: "Why Every CS Student Should Contribute to Open Source",
    slug: "why-open-source-matters",
    author: "Dev Agarwal",
    tags: ["Open Source", "Career"],
    coverImage: "",
    publishedAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    readingTime: 8,
    isPublished: true,
  },
];

const tagColors: Record<string, string> = {
  "AI/ML": "from-violet-500 to-purple-500",
  "Tutorial": "from-cyan-500 to-blue-500",
  "Events Recap": "from-orange-500 to-amber-500",
  "Technical": "from-emerald-500 to-teal-500",
  "Open Source": "from-yellow-500 to-amber-400",
  "Career": "from-pink-500 to-rose-500",
};

export default function BlogsPage() {
  const [posts, setPosts] = useState<BlogPost[]>(mockPosts);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/blogs")
      .then((r) => r.json())
      .then((data) => {
        if (data.posts && data.posts.length > 0) setPosts(data.posts);
      })
      .catch(() => {});
  }, []);

  const allTags = [...new Set(posts.flatMap((p) => p.tags))];
  const filtered = activeTag ? posts.filter((p) => p.tags.includes(activeTag)) : posts;

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden noise-overlay grid-bg">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(123,47,255,0.06)_0%,transparent_60%)] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-tag inline-flex mb-6">
            Blog
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="font-syne font-black text-5xl md:text-7xl text-text-primary mb-4"
          >
            Ideas Worth <span className="gradient-text">Sharing</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-text-muted text-xl max-w-xl mx-auto"
          >
            Tutorials, event recaps, and tech insights from the SVNIT ACM community.
          </motion.p>
        </div>
      </section>

      {/* Tag filters */}
      <section className="sticky top-[64px] z-30 bg-[rgba(2,4,8,0.92)] backdrop-blur-xl border-b border-cyan-500/10 py-4">
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-2 overflow-x-auto hide-scrollbar">
          <button
            onClick={() => setActiveTag(null)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
              !activeTag ? "bg-cyan-500 text-background" : "text-text-muted hover:text-text-primary hover:bg-white/5"
            }`}
          >
            <Tag size={12} /> All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag === activeTag ? null : tag)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                activeTag === tag ? "bg-cyan-500 text-background" : "text-text-muted hover:text-text-primary hover:bg-white/5"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post, i) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="glass-card overflow-hidden group hover-lift"
              >
                {/* Cover */}
                <div className="h-48 bg-gradient-to-br from-violet-500/10 to-cyan-500/10 flex items-center justify-center relative overflow-hidden">
                  <BookOpen size={48} className="text-cyan-500/20" />
                  {/* Tags overlay */}
                  <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className={`px-2.5 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${tagColors[tag] || "from-cyan-500 to-violet-500"}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 text-text-muted text-xs mb-3">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={11} className="text-cyan-500" />
                      {format(new Date(post.publishedAt), "dd MMM yyyy")}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={11} className="text-cyan-500" />
                      {post.readingTime} min read
                    </span>
                  </div>

                  <h2 className="font-syne font-bold text-lg text-text-primary mb-2 group-hover:text-cyan-400 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-text-muted text-sm mb-4">by {post.author}</p>

                  <Link
                    href={`/blogs/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-cyan-500 text-sm font-semibold hover:gap-2.5 transition-all group/link"
                  >
                    Read Article <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
