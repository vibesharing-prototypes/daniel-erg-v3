"use client";

import React from "react";

/* ------------------------------------------------------------------ */
/*  Types & data                                                       */
/* ------------------------------------------------------------------ */

type ScanPhase = "init" | "scanning" | "analyzing" | "detected" | "ready";

const SCAN_AGENTS = [
  { id: "risk", label: "Risk Intelligence", detail: "Scanning global news feeds and media sources…" },
  { id: "vendor", label: "Vendor Intelligence", detail: "Monitoring third-party risk networks…" },
  { id: "reg", label: "Regulatory Watch", detail: "Reviewing SEC filings, EU regulatory databases…" },
  { id: "board", label: "Board Materials Agent", detail: "Comparing board decks against regulatory findings…" },
  { id: "supply", label: "Supply Chain Data", detail: "Analyzing supplier contracts and geographic exposure…" },
];

/* ------------------------------------------------------------------ */
/*  Toast                                                              */
/* ------------------------------------------------------------------ */

export function ScanToast({ visible, onDismiss }: { visible: boolean; onDismiss: () => void }) {
  if (!visible) return null;
  return (
    <div className="fixed bottom-6 right-6 z-[210] animate-[fadeSlideUp_0.4s_ease-out_both]">
      <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 dark:border-emerald-800 bg-white dark:bg-zinc-900 px-5 py-3 shadow-[0_8px_28px_rgba(0,0,0,0.12)]">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex-shrink-0">
          <svg className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 6l3 3 5-5"/>
          </svg>
        </div>
        <div>
          <p className="text-[13px] font-semibold text-slate-800 dark:text-zinc-100">Scan complete</p>
          <p className="text-[11px] text-slate-400 dark:text-zinc-500">3 emerging risks detected</p>
        </div>
        <button onClick={onDismiss} className="ml-3 text-slate-300 dark:text-zinc-600 hover:text-slate-500 dark:hover:text-zinc-400 transition-colors">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 4l8 8M12 4l-8 8" /></svg>
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Minimized pill                                                     */
/* ------------------------------------------------------------------ */

function MinimizedPill({ phase, completedCount, onClick }: { phase: ScanPhase; completedCount: number; onClick: () => void }) {
  const done = phase === "ready";
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 left-6 z-[210] flex items-center gap-2.5 rounded-full border border-black/[0.09] dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2 shadow-[0_8px_28px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.18)] transition-shadow cursor-pointer"
    >
      {done ? (
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500">
          <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 6l3 3 5-5"/></svg>
        </div>
      ) : (
        <div className="w-5 h-5 border-2 border-slate-400 dark:border-zinc-500 border-t-transparent rounded-full animate-spin" />
      )}
      <span className="text-[12px] font-semibold text-slate-600 dark:text-zinc-300">
        {done ? "3 risks detected" : `Scanning… ${completedCount}/${SCAN_AGENTS.length}`}
      </span>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  ScanModal                                                          */
/* ------------------------------------------------------------------ */

export function ScanModal({
  open,
  onOpenChange,
  onComplete,
  triggerRestart,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: () => void;
  triggerRestart: number;
}) {
  const [phase, setPhase] = React.useState<ScanPhase>("init");
  const [visibleAgents, setVisibleAgents] = React.useState(0);
  const [completedAgents, setCompletedAgents] = React.useState(0);
  const [anomalyCount, setAnomalyCount] = React.useState(0);
  const [minimized, setMinimized] = React.useState(false);

  // Restart scan when trigger changes
  React.useEffect(() => {
    setPhase("init");
    setVisibleAgents(0);
    setCompletedAgents(0);
    setAnomalyCount(0);
    setMinimized(false);
    onOpenChange(true);
  }, [triggerRestart]);

  // Phase: init → scanning
  React.useEffect(() => {
    if (phase !== "init") return;
    const t = setTimeout(() => setPhase("scanning"), 800);
    return () => clearTimeout(t);
  }, [phase]);

  // Phase: scanning — reveal agents one by one
  React.useEffect(() => {
    if (phase !== "scanning") return;
    if (visibleAgents < SCAN_AGENTS.length) {
      const t = setTimeout(() => setVisibleAgents((v) => v + 1), 700);
      return () => clearTimeout(t);
    }
  }, [phase, visibleAgents]);

  // Phase: scanning — complete agents
  React.useEffect(() => {
    if (phase !== "scanning") return;
    if (visibleAgents > 0 && completedAgents < visibleAgents) {
      const t = setTimeout(() => setCompletedAgents((v) => v + 1), 1100);
      return () => clearTimeout(t);
    }
    if (completedAgents === SCAN_AGENTS.length) {
      const t = setTimeout(() => setPhase("analyzing"), 500);
      return () => clearTimeout(t);
    }
  }, [phase, visibleAgents, completedAgents]);

  // Phase: analyzing → detected
  React.useEffect(() => {
    if (phase !== "analyzing") return;
    const t = setTimeout(() => setPhase("detected"), 1000);
    return () => clearTimeout(t);
  }, [phase]);

  // Phase: detected — count up anomalies, then ready
  React.useEffect(() => {
    if (phase !== "detected") return;
    const steps = [1, 2, 3];
    const timers = steps.map((n, i) => setTimeout(() => setAnomalyCount(n), (i + 1) * 350));
    const final = setTimeout(() => {
      setPhase("ready");
      onComplete();
    }, steps.length * 350 + 600);
    return () => { timers.forEach(clearTimeout); clearTimeout(final); };
  }, [phase, onComplete]);

  // Handle minimize
  const handleMinimize = () => {
    setMinimized(true);
    onOpenChange(false);
  };

  // Handle restore from pill
  const handleRestore = () => {
    setMinimized(false);
    onOpenChange(true);
  };

  // Show minimized pill when not open but scan is running
  if (minimized && phase !== "ready") {
    return <MinimizedPill phase={phase} completedCount={completedAgents} onClick={handleRestore} />;
  }

  // Don't render modal if not open
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/50 dark:bg-black/70 backdrop-blur-[3px]" />

      {/* Modal */}
      <div
        className="relative w-full max-w-md mx-4 rounded-3xl border border-black/[0.09] dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-[0_32px_80px_-16px_rgba(0,0,0,0.25)] overflow-hidden"
        style={{ animation: "confirmModalIn 220ms cubic-bezier(0.22,1,0.36,1) both" }}
      >
        <div className="p-6">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-[22px] font-semibold text-slate-800 dark:text-zinc-100">Initializing agents</h2>
            <p className="text-[13px] text-slate-500 dark:text-zinc-400 mt-1">
              {phase === "init" && "Preparing GRC monitoring agents…"}
              {phase === "scanning" && "Scanning enterprise sources…"}
              {phase === "analyzing" && "Cross-referencing findings…"}
              {phase === "detected" && `${anomalyCount} risk${anomalyCount !== 1 ? "s" : ""} detected`}
              {phase === "ready" && "Scan complete — 3 risks detected"}
            </p>
          </div>

          {/* Agent list */}
          <div className="space-y-2">
            {phase === "init" ? (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="w-6 h-6 border-2 border-slate-300 dark:border-zinc-600 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              SCAN_AGENTS.slice(0, visibleAgents).map((agent, i) => {
                const done = i < completedAgents;
                const active = i === completedAgents && phase === "scanning";
                return (
                  <div
                    key={agent.id}
                    className="flex items-center gap-3 rounded-xl border border-black/[0.05] dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-800/50 px-4 py-3 transition-all duration-300"
                    style={{ animation: "fadeSlideUp 0.35s ease-out both", animationDelay: `${i * 80}ms` }}
                  >
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg flex-shrink-0">
                      {done ? (
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/40">
                          <svg className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 6l3 3 5-5"/></svg>
                        </div>
                      ) : active ? (
                        <div className="w-5 h-5 border-2 border-slate-400 dark:border-zinc-500 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-slate-200 dark:bg-zinc-700" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold text-slate-700 dark:text-zinc-200">{agent.label}</p>
                      <p className="text-[11px] text-slate-400 dark:text-zinc-500">{agent.detail}</p>
                    </div>
                  </div>
                );
              })
            )}

            {/* Analyzing step */}
            {phase === "analyzing" && (
              <div className="flex items-center gap-3 rounded-xl border border-violet-200 dark:border-violet-900/40 bg-violet-50/50 dark:bg-violet-950/10 px-4 py-3">
                <div className="w-5 h-5 border-2 border-violet-400 dark:border-violet-500 border-t-transparent rounded-full animate-spin flex-shrink-0" />
                <p className="text-[13px] font-semibold text-violet-600 dark:text-violet-400">Cross-referencing board materials…</p>
              </div>
            )}

            {/* Detection result */}
            {(phase === "detected" || phase === "ready") && anomalyCount > 0 && (
              <div className="rounded-xl border border-red-200 dark:border-red-900/40 bg-red-50/60 dark:bg-red-950/10 px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/40 flex-shrink-0">
                    <svg className="w-3.5 h-3.5 text-red-600 dark:text-red-400" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M8 1.5L1 14h14L8 1.5Z" /><path d="M8 6v3.5" /><circle cx="8" cy="11.5" r="0.5" fill="currentColor" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-red-700 dark:text-red-400">{anomalyCount} emerging risk{anomalyCount !== 1 ? "s" : ""} detected</p>
                    <p className="text-[11px] text-red-500/70 dark:text-red-400/50">Not captured in current filings or board materials</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-black/[0.05] dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-800/30 px-6 py-4 flex items-center justify-between">
          {phase === "ready" ? (
            <button
              onClick={() => onOpenChange(false)}
              className="w-full text-[14px] font-semibold bg-slate-800 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl py-[11px] px-4 hover:bg-slate-900 dark:hover:bg-white active:bg-slate-950 transition-colors"
            >
              View Command Center
            </button>
          ) : (
            <>
              <p className="text-[11px] text-slate-400 dark:text-zinc-500">
                {completedAgents}/{SCAN_AGENTS.length} agents complete
              </p>
              <button
                onClick={handleMinimize}
                className="text-[13px] font-normal text-slate-500 dark:text-zinc-400 bg-white dark:bg-zinc-800 border border-black/[0.09] dark:border-zinc-700 rounded-xl py-[7px] px-4 hover:bg-slate-50 dark:hover:bg-zinc-700 transition-colors"
              >
                Minimize
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
