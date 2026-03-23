"use client";

import React, { Suspense } from "react";
import { ProtoPanel } from "../components/ProtoPanel";
import { ScanModal, ScanToast } from "../components/ScanModal";

/* ------------------------------------------------------------------ */
/*  Shared UI                                                          */
/* ------------------------------------------------------------------ */

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function DiligentLogoFull() {
  return (
    <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-auto">
      <path d="M20.1006 15.6877C20.0186 15.8056 19.9338 15.9211 19.8467 16.0364C19.5697 16.4006 19.2675 16.7474 18.9443 17.0706C17.5077 18.5072 15.6393 19.5107 13.5459 19.8596L6.03223 12.345L8.3877 9.98755H8.38965L8.39258 9.98462L20.1006 15.6877Z" fill="#D3222A"/>
      <path d="M20.0259 4.21263C21.1905 5.84672 21.8735 7.84495 21.8735 9.99974C21.8735 12.116 21.2194 14.0737 20.1011 15.6872L8.39209 9.98412L20.0259 4.21263Z" fill="#EE312E"/>
      <path d="M13.5454 19.8581C13.0018 19.9504 12.4428 19.9997 11.8735 19.9997H3.69971L4.89307 13.4802L6.03174 12.3445L13.5454 19.8581Z" fill="#AF292E"/>
      <path d="M7.40379 10.0005L4.93727 11.2296L3.69979 13.7003L2.46653 11.2296L0 10.0005L2.46653 8.76302L3.69979 6.29649L3.71242 6.31754L4.93727 8.76302L7.40379 10.0005Z" fill="#1E1E1E"/>
      <path d="M13.5435 0.141312C16.0395 0.559546 18.2228 1.90387 19.7261 3.80733C19.8311 3.94057 19.9311 4.07423 20.0259 4.2126L8.39209 9.98409H8.38623L6.04443 7.63936L13.5435 0.141312Z" fill="#D3222A"/>
      <path d="M11.8735 0C12.4429 2.15682e-05 12.9997 0.0482901 13.5435 0.140625L6.04443 7.63965L4.88232 6.47754L3.69971 0H11.8735Z" fill="#AF292E"/>
      <path d="M9.65975 9.99958L4.55273 4.89256V6.5949L7.53183 9.99958L4.55273 12.9787V15.1066L9.65975 9.99958Z" fill="#F8F8FA"/>
      <path d="M9.66016 9.99998L4.55273 15.1064V12.9785L7.53223 9.99998L4.55273 6.59471V4.89256L9.66016 9.99998Z" fill="#F8F8FA"/>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Risk data                                                          */
/* ------------------------------------------------------------------ */

const DETECTED_RISKS = [
  {
    id: "taiwan",
    name: "Taiwan Strait Geopolitical Tensions",
    severity: "Critical" as const,
    description: "Escalating tensions could disrupt semiconductor supply chain. 3 supplier contracts at risk.",
    source: "Risk Intelligence + Supply Chain Data",
    suggestedOwner: "Diana Reyes",
    suggestedOwnerTitle: "VP, Supply Chain",
  },
  {
    id: "cyber",
    name: "Critical Vendor Cybersecurity Breach",
    severity: "High" as const,
    description: "CloudSecure breach confirmed. Vendor handles PII for 2.3M customers.",
    source: "Vendor Intelligence",
    suggestedOwner: "Marcus Webb",
    suggestedOwnerTitle: "CISO",
  },
  {
    id: "dma",
    name: "EU Digital Markets Act Enforcement",
    severity: "High" as const,
    description: "First enforcement actions expected Q2. Company's EU operations may require disclosure.",
    source: "Regulatory Watch",
    suggestedOwner: "James Park",
    suggestedOwnerTitle: "Chief Compliance Officer",
  },
];

function SeverityBadge({ severity }: { severity: "Critical" | "High" }) {
  const classes = severity === "Critical"
    ? "bg-red-50 border-red-200 text-red-700 dark:bg-red-950/40 dark:border-red-800 dark:text-red-400"
    : "bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-400";
  return (
    <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold", classes)}>
      {severity}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Workflow stepper data                                               */
/* ------------------------------------------------------------------ */

const WORKFLOW_STAGES = [
  { id: "detect", label: "Risk Detected", status: "completed" as const },
  { id: "assess", label: "Assess & Prioritize", status: "current" as const },
  { id: "draft", label: "Draft Updates", status: "pending" as const },
  { id: "review", label: "Legal Review", status: "pending" as const },
  { id: "notify", label: "Notify Board", status: "pending" as const },
  { id: "file", label: "File / Disclose", status: "pending" as const },
];

/* ------------------------------------------------------------------ */
/*  Agent ticker data                                                  */
/* ------------------------------------------------------------------ */

const MONITORING_AGENTS = [
  { name: "Risk Intelligence", lastRun: "8 min ago", nextRun: "in 7 min", state: "ALERT" as const, note: "3 emerging risks detected" },
  { name: "Regulatory Watch", lastRun: "15 min ago", nextRun: "in 15 min", state: "ALERT" as const, note: "EU DMA enforcement pattern" },
  { name: "Vendor Intelligence", lastRun: "32 min ago", nextRun: "in 28 min", state: "ALERT" as const, note: "CloudSecure incident" },
  { name: "Board Materials Monitor", lastRun: "1 hr ago", nextRun: "in 30 min", state: "WARN" as const, note: "Gap: materials don\u2019t reflect risks" },
  { name: "10K Disclosure Tracker", lastRun: "2 hr ago", nextRun: "in 1 hr", state: "WARN" as const, note: "Risk factors may be incomplete" },
];

/* ------------------------------------------------------------------ */
/*  Pick up where you left off                                         */
/* ------------------------------------------------------------------ */

const RECENT_APPS = [
  { name: "Boards", description: "Finalized Q1 board meeting agenda and uploaded supporting materials.", lastUsed: "Jan 16" },
  { name: "Entities", description: "Verified annual report filings for 3 subsidiaries; all jurisdictions current.", lastUsed: "Jan 15" },
  { name: "Policy Manager", description: "Reviewed attestation status for updated Code of Conduct; 94% completion.", lastUsed: "Jan 14" },
  { name: "AI Reporting", description: "Generated executive summary of legal department KPIs for leadership review.", lastUsed: "Jan 12" },
];

/* ------------------------------------------------------------------ */
/*  Dashboard content                                                  */
/* ------------------------------------------------------------------ */

function Dashboard({ onAssign }: { onAssign: () => void }) {
  return (
    <>
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 90% 100% at 50% 0%, rgba(239,68,68,0.04) 0%, transparent 100%)" }}
        />
        <div className="relative mx-auto max-w-2xl px-6 pt-12 pb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-200 dark:border-red-800 bg-white dark:bg-zinc-900 px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[13px] font-semibold text-red-700 dark:text-red-400">3 Emerging Risks Detected</span>
          </div>

          <h1 className="text-[2.5rem] font-light tracking-[-0.02em] text-slate-800 dark:text-zinc-100 leading-[1.15] mb-4">
            Risks detected that may need disclosure.
          </h1>

          <p className="text-[13px] text-slate-500 dark:text-zinc-400 leading-relaxed max-w-xl mx-auto">
            Your monitoring agents found 3 emerging risks not captured in current SEC filings or board materials.
            Assign risk owners to begin AI-guided investigations.
          </p>

          <div className="flex items-center justify-center gap-3 mt-8">
            {[
              { value: "3", label: "Risks Detected" },
              { value: "1", label: "Critical" },
              { value: "5", label: "Sources Scanned" },
            ].map((metric) => (
              <div key={metric.label} className="w-28 h-20 rounded-xl border border-black/[0.09] dark:border-zinc-700 bg-white dark:bg-zinc-900 flex flex-col items-center justify-center">
                <span className="text-[22px] font-semibold text-slate-800 dark:text-zinc-100">{metric.value}</span>
                <span className="text-[11px] text-slate-400 dark:text-zinc-500">{metric.label}</span>
              </div>
            ))}
          </div>

          {/* Response Workflow stepper */}
          <div className="mt-8 pt-6 border-t border-black/[0.05] dark:border-zinc-800">
            <p className="text-[11px] font-semibold text-slate-800 dark:text-zinc-100 uppercase tracking-wide mb-4">Response Workflow</p>
            <div className="flex items-center justify-center gap-1">
              {WORKFLOW_STAGES.map((stage, idx) => (
                <React.Fragment key={stage.id}>
                  <div className={cn(
                    "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold border transition-all",
                    stage.status === "completed" && "bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-400",
                    stage.status === "current" && "bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-400 ring-2 ring-amber-300/50 dark:ring-amber-700/50",
                    stage.status === "pending" && "bg-slate-50 border-black/[0.05] text-slate-400 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-500",
                  )}>
                    {stage.status === "completed" && (
                      <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 6l3 3 5-5"/></svg>
                    )}
                    {stage.status === "current" && (
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500" />
                      </span>
                    )}
                    {stage.label}
                  </div>
                  {idx < WORKFLOW_STAGES.length - 1 && (
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={cn(
                      stage.status === "completed" ? "text-emerald-400 dark:text-emerald-600" : "text-slate-200 dark:text-zinc-700"
                    )}>
                      <path d="M6 12l4-4-4-4" stroke="currentColor" />
                    </svg>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Agent monitoring ticker */}
      <div className="mx-auto w-full max-w-6xl px-6 mb-6">
        <div className="ticker-strip rounded-2xl border border-black/[0.09] dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2.5 overflow-hidden">
          <div className="flex items-center gap-3">
            <span className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-zinc-500">
              Monitoring Agents
            </span>
            <div className="relative flex-1 overflow-hidden">
              <div className="ticker-track flex w-max items-center gap-8">
                {[...MONITORING_AGENTS, ...MONITORING_AGENTS].map((agent, idx) => (
                  <div key={`${agent.name}-${idx}`} className="whitespace-nowrap text-[13px]">
                    <span className={cn(
                      "inline-flex items-center gap-1",
                      agent.state === "ALERT" ? "text-red-600 dark:text-red-400" : "text-amber-600 dark:text-amber-400",
                    )}>
                      <span className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        agent.state === "ALERT" ? "bg-red-500" : "bg-amber-500",
                      )} />
                      <span className="font-semibold text-slate-800 dark:text-zinc-100">{agent.name}</span>
                    </span>
                    <span className="text-slate-300 dark:text-zinc-600 mx-1.5">·</span>
                    <span className="text-slate-400 dark:text-zinc-500">{agent.note}</span>
                    <span className="text-slate-300 dark:text-zinc-600 mx-1.5">·</span>
                    <span className="text-slate-400 dark:text-zinc-500">Last {agent.lastRun}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <style>{`
            .ticker-track { animation: ticker 60s linear infinite; }
            .ticker-strip:hover .ticker-track { animation-play-state: paused; }
            @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
            @media (prefers-reduced-motion: reduce) { .ticker-track { animation: none; } }
          `}</style>
        </div>
      </div>

      {/* Content area */}
      <div className="mx-auto w-full max-w-6xl px-6 pb-6 space-y-6">
        {/* Detected risks */}
        <div>
          <h3 className="text-[11px] font-semibold text-slate-800 dark:text-zinc-100 uppercase tracking-wide mb-3">Detected risks</h3>
          <div className="space-y-3">
            {DETECTED_RISKS.map((risk, i) => (
              <div
                key={risk.id}
                className="suggestion-card rounded-[20px] border border-black/[0.09] dark:border-zinc-700 bg-white dark:bg-zinc-900 p-[22px_24px] transition-all duration-[250ms] ease-out hover:bg-slate-50 dark:hover:bg-zinc-800 hover:border-slate-200 dark:hover:border-zinc-600 hover:shadow-[0_8px_28px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 [will-change:transform] [backface-visibility:hidden]"
                style={{ animationDelay: `${i * 120}ms` }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <SeverityBadge severity={risk.severity} />
                      <span className="text-[11px] text-slate-400 dark:text-zinc-500">{risk.source}</span>
                    </div>
                    <p className="text-[16px] font-semibold leading-[1.35] text-slate-800 dark:text-zinc-100">{risk.name}</p>
                    <p className="text-[13px] text-slate-500 dark:text-zinc-400 leading-relaxed mt-1">{risk.description}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-black/[0.05] dark:border-zinc-800">
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 dark:bg-zinc-800">
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 dark:text-zinc-500">
                        <circle cx="8" cy="6" r="3" /><path d="M2 14c0-3.3 2.7-5 6-5s6 1.7 6 5" />
                      </svg>
                    </div>
                    <span className="text-[12px] text-slate-400 dark:text-zinc-500">
                      Suggested: <span className="font-semibold text-slate-600 dark:text-zinc-300">{risk.suggestedOwner}</span> · {risk.suggestedOwnerTitle}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pick up where you left off */}
        <div>
          <h3 className="text-[11px] font-semibold text-slate-800 dark:text-zinc-100 uppercase tracking-wide mb-1">Pick up where you left off</h3>
          <p className="text-[12px] text-slate-400 dark:text-zinc-500 mb-3">Recent activity across your Diligent tools.</p>
          <div className="grid grid-cols-2 gap-3">
            {RECENT_APPS.map((app) => (
              <div
                key={app.name}
                className="rounded-[20px] border border-black/[0.09] dark:border-zinc-700 bg-white dark:bg-zinc-900 p-[18px_20px] cursor-pointer transition-all duration-[250ms] ease-out hover:bg-slate-50 dark:hover:bg-zinc-800 hover:border-slate-200 dark:hover:border-zinc-600 hover:shadow-[0_8px_28px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 [will-change:transform] [backface-visibility:hidden]"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[14px] font-semibold text-slate-800 dark:text-zinc-100">{app.name}</span>
                  <span className="text-[11px] text-slate-400 dark:text-zinc-500">{app.lastUsed}</span>
                </div>
                <p className="text-[13px] text-slate-500 dark:text-zinc-400 leading-relaxed">{app.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-zinc-700 to-transparent" />
        <div className="rounded-2xl border border-black/[0.09] dark:border-zinc-700 bg-white dark:bg-zinc-900 p-2 shadow-[0_8px_28px_rgba(0,0,0,0.06)]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 dark:bg-zinc-800 border border-black/[0.05] dark:border-zinc-700 flex-shrink-0 p-1.5">
              <DiligentLogoFull />
            </div>
            <button
              onClick={onAssign}
              className="flex-1 text-left text-[14px] text-slate-400 dark:text-zinc-500"
            >
              Assign recommended risk owners…
            </button>
            <button
              onClick={onAssign}
              className="flex h-10 items-center gap-2 rounded-xl bg-slate-800 dark:bg-zinc-100 text-white dark:text-zinc-900 px-5 text-[14px] font-normal hover:bg-slate-900 dark:hover:bg-white active:bg-slate-950 transition-colors flex-shrink-0"
            >
              Assign owners
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

function PageContent() {
  const [scanModalOpen, setScanModalOpen] = React.useState(true);
  const [scanDone, setScanDone] = React.useState(false);
  const [showToast, setShowToast] = React.useState(false);
  const [restartTrigger, setRestartTrigger] = React.useState(0);

  const handleScanComplete = React.useCallback(() => {
    setScanDone(true);
  }, []);

  // Show toast when scan completes and modal is not open
  React.useEffect(() => {
    if (scanDone && !scanModalOpen) {
      setShowToast(true);
      const t = setTimeout(() => setShowToast(false), 4000);
      return () => clearTimeout(t);
    }
  }, [scanDone, scanModalOpen]);

  const handleRestart = () => {
    setScanDone(false);
    setShowToast(false);
    setRestartTrigger((v) => v + 1);
  };

  const handleAssign = () => {
    window.location.href = "/gc-commandcenter/status";
  };

  return (
    <div className="min-h-screen bg-[#f0f0f1] dark:bg-zinc-950">
      <ProtoPanel
        description="Viewing as: General Counsel — Sarah Mitchell"
        stateToggle={false}
      />

      {/* Nav */}
      <nav className="border-b border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-3.5">
          <div className="flex items-center gap-2.5">
            <DiligentLogoFull />
            <span className="text-xs font-semibold tracking-tight text-slate-800 dark:text-zinc-100">GRC Command Center</span>
          </div>
          <div className="flex items-center gap-3">
            {/* Restart scan button */}
            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-1.5 rounded-lg border border-black/[0.09] dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-1.5 text-[12px] font-semibold text-slate-500 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-700 transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 8a6 6 0 0 1 10.3-4.2" /><path d="M14 8a6 6 0 0 1-10.3 4.2" /><polyline points="2 2 2 6 6 6" /><polyline points="14 14 14 10 10 10" />
              </svg>
              Restart scan
            </button>
            <div className="h-5 w-px bg-slate-200 dark:bg-zinc-700" />
            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-700 transition-colors relative">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2a4 4 0 0 1 4 4c0 2.667 1.333 4 1.333 4H2.667S4 8.667 4 6a4 4 0 0 1 4-4Z"/><path d="M6.87 13a1.333 1.333 0 0 0 2.26 0"/></svg>
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full ring-1 ring-white dark:ring-zinc-900" />
            </button>
            <div className="h-5 w-px bg-slate-200 dark:bg-zinc-700" />
            <div className="flex items-center gap-2">
              <img src="https://randomuser.me/api/portraits/med/women/65.jpg" alt="Sarah Mitchell" className="h-7 w-7 rounded-full object-cover" />
              <div>
                <p className="text-xs font-semibold text-slate-800 dark:text-zinc-100">Sarah Mitchell</p>
                <p className="text-[10px] text-slate-400 dark:text-zinc-500">General Counsel</p>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Dashboard — visible once scan has completed at least once */}
      {scanDone && (
        <div className="animate-[fadeSlideUp_0.5s_ease-out_both]">
          <Dashboard onAssign={handleAssign} />
        </div>
      )}

      {/* Empty state while scanning */}
      {!scanDone && !scanModalOpen && (
        <div className="flex items-center justify-center py-24">
          <p className="text-[13px] text-slate-400 dark:text-zinc-500">Agents are scanning…</p>
        </div>
      )}

      {/* Scan modal */}
      <ScanModal
        open={scanModalOpen}
        onOpenChange={setScanModalOpen}
        onComplete={handleScanComplete}
        triggerRestart={restartTrigger}
      />

      {/* Toast */}
      <ScanToast visible={showToast} onDismiss={() => setShowToast(false)} />
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#f0f0f1] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-slate-300 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <PageContent />
    </Suspense>
  );
}
