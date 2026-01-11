"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import type { GenerationResult } from "@/lib/generator";

const fadeIn = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.25, ease: "easeOut" }
};

type GenerationViewProps = {
  data: GenerationResult | null;
};

const tabs = ["Architecture", "Milestones", "Code", "Checklist"] as const;

type TabKey = (typeof tabs)[number];

function CodeBlock({ filename, content }: { filename: string; content: string }) {
  return (
    <div className="space-y-2 rounded-xl border border-white/10 bg-black/60 p-4">
      <div className="flex items-center justify-between text-xs uppercase tracking-wide text-slate-400">
        <span>{filename}</span>
        <span>Scaffold</span>
      </div>
      <pre className="overflow-x-auto whitespace-pre text-sm text-slate-100">
        <code>{content}</code>
      </pre>
    </div>
  );
}

export function GenerationView({ data }: GenerationViewProps) {
  const [tab, setTab] = useState<TabKey>("Architecture");
  const counters = useMemo(() => ({
    architecture: data?.architecture.length ?? 0,
    milestones: data?.milestones.length ?? 0,
    code: data?.code.length ?? 0,
    checklist: data?.checklist.length ?? 0
  }), [data]);

  if (!data) {
    return (
      <div className="grid place-items-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-12 text-center text-slate-400">
        <p>Generate a workspace plan to see architecture, scaffolds, and execution guardrails.</p>
      </div>
    );
  }

  const tabMetrics: Record<TabKey, number> = {
    Architecture: counters.architecture,
    Milestones: counters.milestones,
    Code: counters.code,
    Checklist: counters.checklist
  };

  return (
    <div className="grid gap-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-lg">
      <div>
        <h2 className="text-2xl font-semibold text-white">{data.title}</h2>
        <p className="mt-2 text-sm text-slate-300">{data.summary}</p>
      </div>

      <div className="flex flex-wrap gap-3 text-sm">
        {tabs.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setTab(item)}
            className={`rounded-full border px-4 py-2 transition ${
              tab === item
                ? "border-ink-400 bg-ink-400/20 text-white"
                : "border-white/10 bg-black/40 text-slate-300 hover:border-white/20"
            }`}
          >
            {item}
            <span className="ml-2 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-black/50 px-2 text-xs text-slate-200">
              {tabMetrics[item]}
            </span>
          </button>
        ))}
      </div>

      <div className="relative min-h-[260px]">
        <AnimatePresence mode="wait">
          {tab === "Architecture" && (
            <motion.div key="architecture" {...fadeIn} className="space-y-4">
              {data.architecture.map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-slate-200"
                >
                  {item}
                </div>
              ))}
            </motion.div>
          )}

          {tab === "Milestones" && (
            <motion.div key="milestones" {...fadeIn} className="space-y-4">
              {data.milestones.map((item, index) => (
                <div
                  key={item}
                  className="flex gap-4 rounded-xl border border-white/10 bg-black/50 px-4 py-4 text-sm text-slate-200"
                >
                  <span className="text-ink-300">{String(index + 1).padStart(2, "0")}</span>
                  <span>{item}</span>
                </div>
              ))}
            </motion.div>
          )}

          {tab === "Code" && (
            <motion.div key="code" {...fadeIn} className="space-y-4">
              {data.code.map((snippet) => (
                <CodeBlock key={snippet.filename} filename={snippet.filename} content={snippet.content} />
              ))}
            </motion.div>
          )}

          {tab === "Checklist" && (
            <motion.div key="checklist" {...fadeIn} className="space-y-3">
              <div className="space-y-3 rounded-xl border border-white/10 bg-black/50 p-4 text-sm text-slate-200">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-200">Readiness checklist</h3>
                <ul className="space-y-2">
                  {data.checklist.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-[3px] h-2 w-2 rounded-full bg-ink-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3 rounded-xl border border-white/10 bg-black/40 p-4 text-sm text-slate-200">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-200">Operator tips</h3>
                <ul className="space-y-2">
                  {data.tips.map((tip) => (
                    <li key={tip}>{tip}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {data.tests && (
        <div className="space-y-3 rounded-xl border border-white/10 bg-black/60 p-4">
          <div className="flex items-center justify-between text-xs uppercase tracking-wide text-slate-400">
            <span>Testing strategy</span>
            <span>{data.code[0]?.language.toUpperCase()}</span>
          </div>
          <pre className="overflow-x-auto whitespace-pre text-sm text-slate-100">
            <code>{data.tests}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
