"use client";

import { motion } from "framer-motion";
import type { GenerationResult } from "@/lib/generator";

type HistoryPanelProps = {
  items: GenerationResult[];
  onSelect: (item: GenerationResult) => void;
};

export function HistoryPanel({ items, onSelect }: HistoryPanelProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-6 text-sm text-slate-400">
        No saved blueprints yet. Each generation will appear here so you can revisit it later.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <motion.button
          layout
          key={[item.title, item.summary].join("-")}
          onClick={() => onSelect(item)}
          className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-left text-sm text-slate-200 transition hover:border-ink-400 hover:bg-ink-500/10"
        >
          <div className="flex items-center justify-between text-xs uppercase tracking-wide text-ink-200">
            <span>{item.title}</span>
            <span>{item.code[0]?.language.toUpperCase()}</span>
          </div>
          <p className="mt-2 text-slate-300 line-clamp-2">{item.summary}</p>
        </motion.button>
      ))}
    </div>
  );
}
