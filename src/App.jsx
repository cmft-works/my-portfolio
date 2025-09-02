import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Apple‑aura portfolio with animated modals and hero
// Put your real photo into /public/portrait.jpg
const portraitUrl = "portrait.jpg";

const skillsData = [
  {
    name: "Power BI",
    group: "BI",
    summary: [
      "Executive scorecards with row‑level security",
      "Governance: workspaces, deployment pipelines, DAX standards",
      "Performance tuning with aggregations & composite models",
    ],
  },
  {
    name: "Python",
    group: "Engineering",
    summary: [
      "Data apps & APIs, notebooks for rapid analysis",
      "scikit‑learn forecasting and model monitoring",
      "Pandas + Polars for fast transforms",
    ],
  },
  {
    name: "Azure",
    group: "Cloud",
    summary: [
      "ADF orchestration, Synapse, Event Hub",
      "Key Vault, Managed Identities, cost guardrails",
      "Terraform IaC for repeatable infra",
    ],
  },
  {
    name: "SQL / PL/SQL",
    group: "Engineering",
    summary: [
      "Warehouse modeling (star/snowflake)",
      "PL/SQL optimization & job scheduling",
      "Data quality checks and lineage",
    ],
  },
  {
    name: "Terraform",
    group: "Cloud",
    summary: [
      "Azure resources codified and versioned",
      "Environment parity & drift control",
      "Reusable modules for analytics stacks",
    ],
  },
  {
    name: "Data Products",
    group: "BI",
    summary: [
      "Student 360, finance ops, enrollment forecasting",
      "Service‑level metrics, ownership, and SLAs",
      "Adoption playbooks & stakeholder training",
    ],
  },
];

const projects = [
  {
    title: "All‑in‑One Student Analytics",
    metrics: ["50% faster insights", "60% less manual work"],
    blurb:
      "Unified SFTP, APIs, and lake feeds into SQL Server; surfaced through governed Power BI.",
    detail: [
      "Orchestrated with Azure Data Factory and Event Hub",
      "Snowflake schema modeling; semantic layer for reuse",
      "Access controls, lineage, and CI for dataset quality",
    ],
  },
  {
    title: "Oracle → Cloud Warehouse",
    metrics: ["Cost ↓", "Latency ↓"],
    blurb:
      "Re‑platformed PL/SQL workloads to a warehouse ELT pattern with observability.",
    detail: [
      "Stepwise migration with dual‑write validation",
      "Improved heavy query performance by orders of magnitude",
      "Automated refresh windows & alerts",
    ],
  },
  {
    title: "AI Forecasting in Production",
    metrics: ["Better decisions"],
    blurb:
      "Time‑series models for enrollment & staffing; dashboards show uncertainty & drift.",
    detail: [
      "Feature store with scheduled retrains",
      "Champion/challenger monitoring",
      "Actionable alerts piped to stakeholders",
    ],
  },
];

const chip =
  "inline-flex items-center gap-2 rounded-full border border-white/10 dark:border-white/15 px-3 py-1 text-xs text-slate-600 dark:text-slate-300 bg-white/60 dark:bg-white/5 backdrop-blur";

function useCountUp(target, duration = 1400) {
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
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-modal={true}
          role="dialog"
        >
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="relative z-10 w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl dark:bg-[#111317] border border-slate-200/80 dark:border-white/10"
          >
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
              <button onClick={onClose} aria-label="Close" className="rounded-lg px-3 py-1 text-sm border border-slate-300/60 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/5">Close</button>
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

  const filteredSkills = useMemo(() =>
    filter === "All" ? skillsData : skillsData.filter(s => s.group === filter),
    [filter]
  );

  const k1 = useCountUp(50); // % faster insights
  const k2 = useCountUp(60); // % less manual

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <style>{`
        :root{--ink:#0b0c10;--card:#111317;--brand:#22d3ee}
        html,body,#root{height:100%}
        body{margin:0;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Inter,Arial,sans-serif}
      `}</style>

      <div className="min-h-screen bg-white text-slate-900 dark:bg-[var(--ink)] dark:text-slate-100">
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 opacity-70">
          <div className="absolute -top-40 -left-40 h-[420px] w-[420px] rounded-full bg-cyan-400/30 blur-3xl" />
          <div className="absolute top-0 right-0 h-[520px] w-[520px] rounded-full bg-fuchsia-400/20 blur-3xl" />
        </div>

        <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-black/20">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <a href="#top" className="font-semibold tracking-tight">Chanakya</a>
            <nav className="flex items-center gap-4 text-sm">
              <a href="#projects" className="opacity-80 hover:opacity-100">projects</a>
              <a href="#skills" className="opacity-80 hover:opacity-100">skills</a>
              <a href="#contact" className="opacity-80 hover:opacity-100">contact</a>
              <button onClick={()=>setTheme(t=>t==="dark"?"light":"dark")} className="rounded-xl border border-white/15 bg-white/60 px-3 py-1 text-xs text-slate-700 shadow hover:drop-shadow dark:bg-white/5 dark:text-slate-200">{theme==="dark"?"light":"dark"}</button>
            </nav>
          </div>
        </header>

        <section id="top" className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 pb-10 pt-16 md:grid-cols-2">
          <div>
            <motion.h1 initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.6}} className="text-5xl font-extrabold tracking-tight">I design intelligent data platforms</motion.h1>
            <motion.p initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{delay:.2,duration:.6}} className="mt-4 text-lg text-slate-600 dark:text-slate-300">From higher‑ed to finance, I build decision‑grade analytics systems: governed BI, real‑time pipelines, and ML in production.</motion.p>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className={chip}>{k1}% faster insights</span>
              <span className={chip}>{k2}% less manual work</span>
              <span className={chip}>AI forecasting in prod</span>
            </div>

            <div className="mt-7 flex gap-3">
              <a href="#contact" className="rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-black shadow hover:shadow-[0_8px_40px_rgba(34,211,238,.4)]">work with me</a>
              <a href="/resume.pdf" className="rounded-xl border border-white/20 px-5 py-3 font-semibold hover:bg-white/5" download>download resume</a>
            </div>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-md">
            <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_45deg,rgba(34,211,238,.35),rgba(167,139,250,.35),rgba(34,211,238,.35))] animate-[spin_18s_linear_infinite]" />
            <div className="absolute inset-8 rounded-full bg-white/60 backdrop-blur md:bg-white/10" />
            <img src={portraitUrl} alt="portrait" className="absolute inset-12 rounded-full object-cover shadow-2xl" />
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
            {filteredSkills.map((s)=> (
              <button key={s.name} onClick={()=>setOpenSkill(s)} className="flex items-center justify-between rounded-2xl border border-white/15 bg-white/60 p-4 text-left shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-lg dark:bg-white/5">
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
              <button key={p.title} onClick={()=>setOpenProject(p)} className="group rounded-2xl border border-white/15 bg-white/60 p-5 text-left shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-lg dark:bg-white/5">
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
          <div className="rounded-2xl border border-white/15 bg-white/60 p-6 backdrop-blur dark:bg-white/5">
            <h2 className="text-2xl font-bold tracking-tight">contact</h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300">Tell me about your project. I’ll reply within 24 hours.</p>
            <form className="mt-4 grid gap-3 sm:grid-cols-2" action="https://formspree.io/f/your-id" method="POST">
              <input className="rounded-xl border border-white/20 bg-white/80 p-3 outline-none placeholder:text-slate-400 dark:bg-white/5" placeholder="your email" type="email" name="email" required />
              <input className="rounded-xl border border-white/20 bg-white/80 p-3 outline-none placeholder:text-slate-400 dark:bg-white/5" placeholder="company" name="company" />
              <textarea className="sm:col-span-2 rounded-xl border border-white/20 bg-white/80 p-3 outline-none placeholder:text-slate-400 dark:bg-white/5" rows={5} placeholder="message" name="message" />
              <div className="sm:col-span-2">
                <button className="rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-black shadow hover:shadow-[0_8px_40px_rgba(34,211,238,.4)]" type="submit">send</button>
              </div>
            </form>
          </div>
        </section>

        <footer className="pb-10 text-center text-sm text-slate-500">© {new Date().getFullYear()} Chanakya Mudavath</footer>

        <Modal open={!!openSkill} onClose={()=>setOpenSkill(null)} title={openSkill?.name}>
          <ul className="list-disc pl-5 space-y-2">
            {openSkill?.summary?.map((li,i)=> <li key={i}>{li}</li>)}
          </ul>
        </Modal>

        <Modal open={!!openProject} onClose={()=>setOpenProject(null)} title={openProject?.title}>
          <p className="mb-3">{openProject?.blurb}</p>
          <ul className="list-disc pl-5 space-y-2">
            {openProject?.detail?.map((li,i)=> <li key={i}>{li}</li>)}
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            {openProject?.metrics?.map((m)=> <span key={m} className={chip}>{m}</span>)}
          </div>
        </Modal>
      </div>
    </div>
  );
}
