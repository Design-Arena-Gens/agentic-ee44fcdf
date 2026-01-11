"use client";

import { useState, KeyboardEvent, FormEvent } from "react";
import type { GenerationRequest } from "@/lib/generator";

type PromptFormProps = {
  initial?: Partial<GenerationRequest>;
  loading: boolean;
  onSubmit: (payload: GenerationRequest) => void;
};

const featurePlaceholders = [
  "Authentication flow",
  "Realtime collaboration",
  "Offline persistence",
  "Telemetry dashboard"
];

export function PromptForm({ initial, loading, onSubmit }: PromptFormProps) {
  const [title, setTitle] = useState(initial?.title ?? "Solo Dev Studio");
  const [problem, setProblem] = useState(
    initial?.problem ??
      "I want a personal coding assistant that plans milestones, suggests scaffolds, and keeps me focused."
  );
  const [targetStack, setTargetStack] = useState(initial?.targetStack ?? "Next.js + TypeScript");
  const [focus, setFocus] = useState(initial?.focus ?? "Balance speed with maintainability");
  const [includeTests, setIncludeTests] = useState(initial?.includeTests ?? true);
  const [featureInput, setFeatureInput] = useState("");
  const [features, setFeatures] = useState(initial?.features ?? ["Composable UI", "AI-assisted helpers"]);

  const handleAddFeature = () => {
    const value = featureInput.trim();
    if (!value || features.includes(value)) return;
    setFeatures([...features, value]);
    setFeatureInput("");
  };

  const handleFeatureKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddFeature();
    }
  };

  const handleRemoveFeature = (value: string) => {
    setFeatures(features.filter((item) => item !== value));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({
      title,
      problem,
      targetStack,
      features,
      focus,
      includeTests
    });
  };

  const placeholder = featurePlaceholders[Math.floor(Math.random() * featurePlaceholders.length)];

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-lg shadow-glow"
    >
      <header>
        <h1 className="text-3xl font-semibold">Personal Coder Studio</h1>
        <p className="mt-1 text-sm text-slate-300">
          Describe what you are building and generate architecture, scaffolding, and execution guardrails.
        </p>
      </header>

      <label className="grid gap-2">
        <span className="text-sm font-medium text-slate-200">Project title</span>
        <input
          className="rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-slate-100 outline-none focus:border-ink-400 focus:ring-2 focus:ring-ink-500/40"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="My next big idea"
        />
      </label>

      <label className="grid gap-2">
        <span className="text-sm font-medium text-slate-200">What are you trying to build?</span>
        <textarea
          className="min-h-[120px] rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-slate-100 outline-none focus:border-ink-400 focus:ring-2 focus:ring-ink-500/40"
          value={problem}
          onChange={(event) => setProblem(event.target.value)}
          placeholder="Explain the user problem, constraints, and success metrics"
        />
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm font-medium text-slate-200">Preferred stack</span>
          <input
            className="rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-slate-100 outline-none focus:border-ink-400 focus:ring-2 focus:ring-ink-500/40"
            value={targetStack}
            onChange={(event) => setTargetStack(event.target.value)}
            placeholder="Next.js, FastAPI, Flutter..."
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-slate-200">Guiding principle</span>
          <input
            className="rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-slate-100 outline-none focus:border-ink-400 focus:ring-2 focus:ring-ink-500/40"
            value={focus}
            onChange={(event) => setFocus(event.target.value)}
            placeholder="What should the assistant optimize for?"
          />
        </label>
      </div>

      <div className="grid gap-3">
        <span className="text-sm font-medium text-slate-200">Key capabilities</span>
        <div className="flex flex-wrap gap-2">
          {features.map((feature) => (
            <button
              key={feature}
              type="button"
              onClick={() => handleRemoveFeature(feature)}
              className="group flex items-center gap-2 rounded-full bg-ink-500/20 px-3 py-1.5 text-sm text-ink-100 transition hover:bg-ink-400/40"
            >
              <span>{feature}</span>
              <span className="rounded-full bg-ink-500/40 px-2 text-xs text-ink-900 transition group-hover:bg-ink-200 group-hover:text-ink-800">
                ×
              </span>
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            className="flex-1 rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-slate-100 outline-none focus:border-ink-400 focus:ring-2 focus:ring-ink-500/40"
            value={featureInput}
            onKeyDown={handleFeatureKey}
            onChange={(event) => setFeatureInput(event.target.value)}
            placeholder={placeholder}
          />
          <button
            type="button"
            onClick={handleAddFeature}
            className="rounded-lg bg-ink-500/90 px-4 py-2 text-sm font-semibold text-white transition hover:bg-ink-400"
          >
            Add
          </button>
        </div>
      </div>

      <label className="flex items-center gap-3 text-sm text-slate-200">
        <input
          type="checkbox"
          checked={includeTests}
          onChange={(event) => setIncludeTests(event.target.checked)}
          className="h-4 w-4 rounded border border-white/20 bg-black/40 text-ink-400 focus:ring-ink-500"
        />
        Include testing strategy
      </label>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-ink-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-ink-500/30 transition hover:bg-ink-400 disabled:cursor-not-allowed disabled:bg-ink-400/50"
      >
        {loading ? "Synthesizing..." : "Generate workspace"}
      </button>
    </form>
  );
}
