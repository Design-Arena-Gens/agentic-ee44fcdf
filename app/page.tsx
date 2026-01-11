"use client";

import { useCallback, useState } from "react";
import { PromptForm } from "@/components/PromptForm";
import { GenerationView } from "@/components/GenerationView";
import { HistoryPanel } from "@/components/HistoryPanel";
import type { GenerationRequest, GenerationResult } from "@/lib/generator";

export default function HomePage() {
  const [current, setCurrent] = useState<GenerationResult | null>(null);
  const [history, setHistory] = useState<GenerationResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async (payload: GenerationRequest) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Unable to generate plan right now.");
      }

      const data = (await response.json()) as { ok: boolean; payload: GenerationResult };
      if (!data.ok) {
        throw new Error("Generation failed");
      }

      setCurrent(data.payload);
      setHistory((prev) => [data.payload, ...prev].slice(0, 12));
    } catch (cause) {
      console.error(cause);
      setError(cause instanceof Error ? cause.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSelectHistory = (item: GenerationResult) => {
    setCurrent(item);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] xl:grid-cols-[minmax(0,2fr)_minmax(0,3fr)_minmax(280px,1fr)]">
      <section className="lg:col-span-1 xl:col-span-1">
        <PromptForm onSubmit={handleSubmit} loading={loading} />
        {error && (
          <p className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </p>
        )}
      </section>

      <section className="lg:col-span-1 xl:col-span-1">
        <GenerationView data={current} />
      </section>

      <aside className="xl:col-span-1 space-y-4">
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur">
          <h3 className="text-lg font-semibold text-white">Blueprint history</h3>
          <p className="mt-1 text-xs text-slate-400">Click a previous generation to load it back into the workspace.</p>
          <div className="mt-4 max-h-[420px] space-y-4 overflow-y-auto pr-1">
            <HistoryPanel items={history} onSelect={handleSelectHistory} />
          </div>
        </div>
      </aside>
    </div>
  );
}
