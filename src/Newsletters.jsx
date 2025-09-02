import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Newsletters() {
  const [posts, setPosts] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch("/api/newsletters");
        const json = await r.json();
        if (r.ok) setPosts(json.items || []);
        else setErr(json.error || "Failed to load");
      } catch {
        setErr("Network error");
      }
    })();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0b0c10] text-slate-900 dark:text-slate-100 px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold tracking-tight mb-6">Newsletters</h1>
        <p className="text-slate-600 dark:text-slate-300 mb-8">
          Essays on data strategy, analytics leadership, and AI in production.
        </p>

        {err && <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 mb-6 text-rose-300">{err}</div>}

        <div className="space-y-6">
          {posts.map((post, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-white/15 bg-white/70 dark:bg-white/5 p-6 shadow-sm hover:shadow-md"
            >
              <h2 className="text-2xl font-semibold mb-1">
                <a href={post.link} target="_blank" rel="noreferrer" className="hover:underline">
                  {post.title}
                </a>
              </h2>
              {post.date && <p className="text-sm text-slate-500 mb-3">{new Date(post.date).toDateString()}</p>}
              <p className="text-slate-700 dark:text-slate-300 line-clamp-4" dangerouslySetInnerHTML={{__html: post.description}} />
              <div className="mt-3">
                <a href={post.link} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline font-medium">
                  Read more →
                </a>
              </div>
            </motion.article>
          ))}

          {!err && posts.length === 0 && (
            <div className="text-slate-500">No posts yet — add one in your newsletter platform and it will appear here.</div>
          )}
        </div>
      </div>
    </div>
  );
}
