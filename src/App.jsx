import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const portraitUrl = "portrait.jpg";

const skillsData = [
  { name: "Power BI", group: "BI", summary: ["Executive scorecards (RLS)", "Governance & pipelines", "Performance tuning"] },
  { name: "Python", group: "Engineering", summary: ["APIs & data apps", "Forecasting (sklearn)", "Pandas/Polars transforms"] },
  { name: "Azure", group: "Cloud", summary: ["ADF orchestration", "Synapse, Event Hub", "Key Vault, IaC guardrails"] },
  { name: "SQL / PL/SQL", group: "Engineering", summary: ["Warehouse schemas", "PL/SQL optimization", "Quality & lineage"] },
  { name: "Terraform", group: "Cloud", summary: ["Reusable modules", "Drift control", "Env parity"] },
  { name: "Data Products", group: "BI", summary: ["Student 360", "Finance ops", "Adoption playbooks"] },
];

const projects = [
  { title: "All-in-One Student Analytics", metrics: ["50% faster insights", "60% less manual work"], blurb: "Unified SFTP/APIs/Lake into SQL Server; governed Power BI.", detail: ["ADF orchestration", "Snowflake schema & semantic model", "CI + lineage + access controls"] },
  { title: "Oracle → Cloud Warehouse", metrics: ["Cost ↓", "Latency ↓"], blurb: "Re-platformed PL/SQL to ELT pattern with observability.", detail: ["Dual-write validation", "Major query speedups", "Automated refresh windows"] },
  { title: "AI Forecasting in Production", metrics: ["Better decisions"], blurb: "Time-series models for enrollment & staffing, drift-aware.", detail: ["Scheduled retrains", "Champion/challenger", "Alerts to stakeholders"] },
];

const chip = "inline-flex items-center gap-2 rounded-full border border-white/10 dark:border-white/15 px-3 py-1 text-xs text-slate-700 dark:text-slate-300 bg-white/70 dark:bg-white/5 backdrop-blur";

function useCountUp(target, duration = 1200) {
  const [value, set] = useState(0);
  useEffect(() => {
    let raf; const start = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration);
      set(Math.floor(target * p));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value;
}

function Modal({ open, onClose, title, children }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
          <motion.div initial={{ y: 36, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 16, opacity: 0 }}
            className="relative z-10 w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl dark:bg-[#111317] border border-white/60 dark:border-white/10">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
              <button onClick={onClose} aria-label="close" className="rounded-lg px-3 py-1 text-sm border border-slate-300/60 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/5">Close</button>
            </div>
            <div className="mt-4 text-slate-600 dark:text-slate-300">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [filter, setFilter] = useState("All");
  const [openSkill, setOpenSkill] = useState(null);
  const [openProject, setOpenProject] = useState(null);
  const k1 = useCountUp(50); const k2 = useCountUp(60);

  return (
    <div className={theme==="dark"?"dark":""}>
      <style>{`
        :root{--ink:#0b0c10;--brand:#22d3ee}
        html,body,#root{height:100%}
        body{margin:0;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Inter,Arial,sans-serif}
      `}</style>

      <div className="min-h-screen bg-white text-slate-900 dark:bg-[var(--ink)] dark:text-slate-100">
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute left-0 top-0 h-full w-[35%] bg-gradient-to-b from-cyan-400/10 via-transparent to-fuchsia-400/10 blur-3xl" />
          <div className="absolute right-0 top-0 h-full w-[35%] bg-gradient-to-b from-fuchsia-400/10 via-transparent to-cyan-400/10 blur-3xl" />
        </div>

        <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-black/20">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <a href="/" className="font-semibold tracking-tight">Chanakya</a>
            <nav className="flex items-center gap-4 text-sm">
              <a href="#projects" className="opacity-80 hover:opacity-100">projects</a>
              <a href="#skills" className="opacity-80 hover:opacity-100">skills</a>
              <a href="#contact" className="opacity-80 hover:opacity-100">contact</a>
              <a href="/newsletters" className="opacity-80 hover:opacity-100">newsletters</a>
              <button onClick={()=>setTheme(t=>t==="dark"?"light":"dark")}
                className="rounded-xl border border-white/15 bg-white/60 px-3 py-1 text-xs text-slate-700 shadow hover:drop-shadow dark:bg-white/5 dark:text-slate-200">
                {theme==="dark"?"light":"dark"}
              </button>
            </nav>
          </div>
        </header>

        <section id="top" className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 pb-12 pt-16 md:grid-cols-2">
          <div>
            <motion.h1 initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.6}} className="text-5xl font-extrabold tracking-tight">I design intelligent data platforms</motion.h1>
            <motion.p initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{delay:.2,duration:.6}} className="mt-4 text-lg text-slate-600 dark:text-slate-300">From higher-ed to finance, I build decision-grade analytics systems: governed BI, real-time pipelines, and ML in production.</motion.p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className={chip}>{k1}% faster insights</span>
              <span className={chip}>{k2}% less manual work</span>
              <span className={chip}>AI forecasting in prod</span>
            </div>
            <div className="mt-7 flex gap-3">
              <a href="/resume.pdf" className="rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-black shadow hover:shadow-[0_8px_40px_rgba(34,211,238,.4)]" download>download resume</a>
              <a href="#contact" className="rounded-xl border border-white/20 px-5 py-3 font-semibold hover:bg-white/5">work with me</a>
            </div>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-md">
            <div className="absolute inset-0 rounded-[28%] bg-[conic-gradient(from_120deg,rgba(34,211,238,.30),rgba(167,139,250,.25),rgba(34,211,238,.30))] animate-[spin_20s_linear_infinite]" />
            <div className="absolute inset-10 rounded-[28%] bg-white/60 backdrop-blur md:bg-white/10" />
            <img src={portraitUrl} alt="portrait" className="absolute inset-16 rounded-[28%] object-cover shadow-2xl" />
            <div className="absolute -right-2 top-6 rounded-xl bg-white/80 px-3 py-1 text-xs text-slate-900 shadow dark:bg-white/10 dark:text-slate-100 border border-white/40 dark:border-white/15">already on the shortlist</div>
          </div>
        </section>

        <section id="skills" className="mx-auto max-w-6xl px-6 py-12">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">skills</h2>
            <div className="flex items-center gap-2 rounded-lg border border-white/15 bg-white/60 p-1 text-sm dark:bg-white/5">
              {['All','BI','Engineering','Cloud'].map(g=> (
                <button key={g} onClick={()=>setFilter(g)} className={`rounded-md px-3 py-1 ${filter===g? 'bg-cyan-400 text-black': 'text-slate-700 dark:text-slate-200'}`}>{g}</button>
              ))}
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {(filter==='All'?skillsData:skillsData.filter(s=>s.group===filter)).map((s)=> (
              <button key={s.name} onClick={()=>setOpenSkill(s)} className="flex items-center justify-between rounded-2xl border border-white/15 bg-white/70 p-4 text-left shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-lg dark:bg-white/5">
                <span className="text-slate-800 dark:text-slate-100">{s.name}</span>
                <span className="text-xs text-slate-500">{s.group}</span>
              </button>
            ))}
          </div>
        </section>

        <section id="projects" className="mx-auto max-w-6xl px-6 pb-16">
          <h2 className="mb-4 text-2xl font-bold tracking-tight">projects</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p)=> (
              <button key={p.title} onClick={()=>setOpenProject(p)} className="group rounded-2xl border border-white/15 bg-white/70 p-5 text-left shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-lg dark:bg-white/5">
                <div className="text-lg font-semibold tracking-tight">{p.title}</div>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{p.blurb}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.metrics.map(m=> <span key={m} className={chip}>{m}</span>)}
                </div>
                <div className="mt-4 text-sm text-cyan-300 opacity-0 transition group-hover:opacity-100">view case study →</div>
              </button>
            ))}
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-3xl px-6 pb-20">
          <div className="rounded-2xl border border-white/15 bg-white/70 p-6 backdrop-blur dark:bg-white/5">
            <h2 className="text-2xl font-bold tracking-tight">contact</h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300">Reach out directly or use the form below:</p>
            <div className="mt-4 text-sm text-slate-700 dark:text-slate-300 space-y-1">
              <p><strong>Phone:</strong> +1 (804) 610-8682</p>
              <p><strong>Email:</strong> <a href="mailto:chanakya.ft@gmail.com" className="text-cyan-400 hover:underline">chanakya.ft@gmail.com</a></p>
              <p><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/chanakya" className="text-cyan-400 hover:underline">linkedin.com/in/chanakya</a></p>
              <p><strong>GitHub:</strong> <a href="https://github.com/cmft-works" className="text-cyan-400 hover:underline">github.com/cmft-works</a></p>
            </div>

            {/* Fastest working form via Formspree: replace with your endpoint */}
            <form className="mt-4 grid gap-3 sm:grid-cols-2"
                  action="https://formspree.io/f/your-id" method="POST">
              <input name="email" type="email" required placeholder="your email"
                className="rounded-xl border border-white/20 bg-white/80 p-3 outline-none placeholder:text-slate-400 dark:bg-white/5" />
              <input name="company" placeholder="company"
                className="rounded-xl border border-white/20 bg-white/80 p-3 outline-none placeholder:text-slate-400 dark:bg-white/5" />
              <textarea name="message" rows={5} required placeholder="tell me about your project…"
                className="sm:col-span-2 rounded-xl border border-white/20 bg-white/80 p-3 outline-none placeholder:text-slate-400 dark:bg-white/5" />
              <input type="hidden" name="_subject" value="New portfolio inquiry" />
              <input type="hidden" name="_gotcha" />
              <div className="sm:col-span-2">
                <button className="rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-black hover:shadow-[0_8px_40px_rgba(34,211,238,.4)]" type="submit">send</button>
              </div>
            </form>
          </div>
        </section>

        <footer className="pb-10 text-center text-sm text-slate-500">© {new Date().getFullYear()} Chanakya Mudavath</footer>

        <Modal open={!!openSkill} onClose={()=>setOpenSkill(null)} title={openSkill?.name}>
          <ul className="list-disc pl-5 space-y-2">{openSkill?.summary?.map((li,i)=> <li key={i}>{li}</li>)}</ul>
        </Modal>
        <Modal open={!!openProject} onClose={()=>setOpenProject(null)} title={openProject?.title}>
          <p className="mb-3">{openProject?.blurb}</p>
          <ul className="list-disc pl-5 space-y-2">{openProject?.detail?.map((li,i)=> <li key={i}>{li}</li>)}</ul>
          <div className="mt-4 flex flex-wrap gap-2">{openProject?.metrics?.map((m)=> <span key={m} className={chip}>{m}</span>)}</div>
        </Modal>
      </div>
    </div>
  );
}
