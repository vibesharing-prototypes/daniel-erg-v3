"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ProtoPanel } from "../../components/ProtoPanel";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/* ------------------------------------------------------------------ */
/*  Logo                                                               */
/* ------------------------------------------------------------------ */

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
/*  Data                                                               */
/* ------------------------------------------------------------------ */

type Severity = "Critical" | "High" | "Medium";
type DraftStatus = "Ready for review" | "Awaiting input" | "Under revision";

type DisclosureDraft = {
  id: string;
  riskTitle: string;
  category: string;
  severity: Severity;
  owner: string;
  ownerTitle: string;
  draftStatus: DraftStatus;
  filingSection: string;
  excerpt: string;
  reviewedByCRO: boolean;
};

const DRAFTS: DisclosureDraft[] = [
  {
    id: "taiwan",
    riskTitle: "Taiwan Strait Geopolitical Tensions",
    category: "Supply Chain",
    severity: "Critical",
    owner: "Diana Reyes",
    ownerTitle: "VP Supply Chain",
    draftStatus: "Ready for review",
    filingSection: "Item 1A — Risk Factors",
    excerpt: "Geopolitical instability in the Taiwan Strait region may materially affect the Company's supply chain. Approximately 47% of critical component suppliers operate in Taiwan. A significant disruption could impact an estimated $1.8B in annual product revenue across two major product lines.",
  reviewedByCRO: true,
  },
  {
    id: "cyber",
    riskTitle: "Critical Vendor Cybersecurity Breach — CloudSecure Inc.",
    category: "Cybersecurity",
    severity: "High",
    owner: "Marcus Webb",
    ownerTitle: "CISO",
    draftStatus: "Ready for review",
    filingSection: "Item 1A — Risk Factors",
    excerpt: "The Company is assessing the potential impact of a cybersecurity incident disclosed by CloudSecure Inc., a critical third-party vendor. CloudSecure processes certain customer data under three data processing agreements. The full scope of affected data and downstream obligations is being investigated.",
    reviewedByCRO: true,
  },
  {
    id: "dma",
    riskTitle: "EU Digital Markets Act Enforcement Exposure",
    category: "Regulatory",
    severity: "High",
    owner: "James Park",
    ownerTitle: "Head of Compliance",
    draftStatus: "Awaiting input",
    filingSection: "Item 1A — Risk Factors",
    excerpt: "The Company's European operations may be subject to enforcement scrutiny under the EU Digital Markets Act. Recent enforcement precedent against companies in the Company's sector suggests material compliance risk. Potential penalties may reach up to 10% of global annual turnover.",
    reviewedByCRO: true,
  },
];

const SEVERITY_BADGE: Record<Severity, string> = {
  Critical: "bg-red-50 border-red-200 text-red-700 dark:bg-red-950/40 dark:border-red-800 dark:text-red-400",
  High:     "bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-400",
  Medium:   "bg-slate-100 border-slate-300 text-slate-600 dark:bg-zinc-800 dark:border-zinc-600 dark:text-zinc-400",
};

const DRAFT_STATUS_BADGE: Record<DraftStatus, string> = {
  "Ready for review": "bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-950/40 dark:border-blue-800 dark:text-blue-400",
  "Awaiting input":   "bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-400",
  "Under revision":   "bg-slate-100 border-slate-300 text-slate-600 dark:bg-zinc-800 dark:border-zinc-600 dark:text-zinc-400",
};

const WORKFLOW_STAGES = [
  { id: "detect",   label: "Risk Detected",   status: "completed" as const },
  { id: "assign",   label: "Assign Owners",   status: "completed" as const },
  { id: "invest",   label: "Investigate",     status: "completed" as const },
  { id: "cro",      label: "CRO Review",      status: "completed" as const },
  { id: "draft",    label: "GC Drafting",     status: "current"   as const },
  { id: "approve",  label: "CEO Approval",    status: "pending"   as const },
  { id: "file",     label: "File / Disclose", status: "pending"   as const },
];

const LEGAL_AGENTS = [
  { name: "10-K Disclosure Tracker",   lastRun: "2 hr ago",    nextRun: "in 1 hr",   note: "Peers disclosing Taiwan supply chain risk" },
  { name: "Regulatory Watch",          lastRun: "15 min ago",  nextRun: "in 15 min", note: "EU DMA enforcement precedent updated" },
  { name: "Vendor Intelligence",       lastRun: "32 min ago",  nextRun: "in 28 min", note: "CloudSecure investigation ongoing" },
  { name: "Board Materials Monitor",   lastRun: "1 hr ago",    nextRun: "in 30 min", note: "Board slot reserved: Feb 28" },
  { name: "Outside Counsel Sync",      lastRun: "4 hr ago",    nextRun: "in 2 hr",   note: "Davis Polk review scheduled" },
];

const RECENT_APPS = [
  { name: "Boards",          description: "Q1 board agenda finalized — risk briefing slot confirmed for Feb 28.",  lastUsed: "Jan 16" },
  { name: "Entities",        description: "Annual report filings verified for 3 subsidiaries; all jurisdictions current.", lastUsed: "Jan 15" },
  { name: "Policy Manager",  description: "Code of Conduct attestation status: 94% completion across the organisation.", lastUsed: "Jan 14" },
];

/* ------------------------------------------------------------------ */
/*  Disclosure draft card                                              */
/* ------------------------------------------------------------------ */

function DraftCard({ draft, index }: { draft: DisclosureDraft; index: number }) {
  return (
    <div
      className="suggestion-card rounded-[20px] border border-black/[0.09] dark:border-zinc-700 bg-white dark:bg-zinc-900 overflow-hidden"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Header */}
      <div className="p-[22px_24px] pb-0">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold", SEVERITY_BADGE[draft.severity])}>
              {draft.severity}
            </span>
            <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold", DRAFT_STATUS_BADGE[draft.draftStatus])}>
              {draft.draftStatus}
            </span>
            <span className="inline-flex items-center rounded-full border border-black/[0.07] dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 px-2.5 py-0.5 text-[11px] font-semibold text-slate-500 dark:text-zinc-400">
              {draft.category}
            </span>
          </div>
          {draft.reviewedByCRO && (
            <div className="flex-shrink-0 flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400">
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 6l3 3 5-5"/></svg>
              <span>CRO reviewed</span>
            </div>
          )}
        </div>

        <h3 className="text-[14px] font-semibold text-slate-800 dark:text-zinc-100 leading-snug mb-1">
          {draft.riskTitle}
        </h3>
        <p className="text-[11px] text-slate-400 dark:text-zinc-500 mb-3">
          {draft.filingSection} · Owner: {draft.owner}, {draft.ownerTitle}
        </p>
      </div>

      {/* Disclosure excerpt */}
      <div className="mx-[24px] mb-[22px] rounded-xl bg-slate-50 dark:bg-zinc-800 border border-black/[0.05] dark:border-zinc-700 p-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400 dark:text-zinc-500 mb-2">
          Draft disclosure language
        </p>
        <p className="text-[13px] text-slate-600 dark:text-zinc-300 leading-relaxed">
          {draft.excerpt}
        </p>
      </div>

      {/* Footer */}
      <div className="px-[24px] pb-[22px] flex items-center justify-between border-t border-black/[0.05] dark:border-zinc-800 pt-3">
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1 text-[12px] text-slate-400 dark:text-zinc-500 hover:text-slate-600 dark:hover:text-zinc-300 transition-colors">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 2H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V5l-2-3z"/>
              <path d="M11 2v3h2"/><path d="M5 9h6M5 11h4"/>
            </svg>
            Add context
          </button>
          <button className="flex items-center gap-1 text-[12px] text-slate-400 dark:text-zinc-500 hover:text-slate-600 dark:hover:text-zinc-300 transition-colors">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="8" cy="8" r="6"/><path d="M8 5v3l2 2"/>
            </svg>
            Request update
          </button>
        </div>
        <Link
          href={`/gc-commandcenter/gc-drafting/review?risk=${draft.id}`}
          className="text-[12px] font-semibold text-slate-600 dark:text-zinc-300 hover:text-slate-800 dark:hover:text-zinc-100 transition-colors flex items-center gap-1"
        >
          Review draft
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3l5 5-5 5"/></svg>
        </Link>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function GcDraftingPage() {
  const [activityOpen, setActivityOpen] = useState(false);

  const criticalCount = DRAFTS.filter(d => d.severity === "Critical").length;
  const highCount = DRAFTS.filter(d => d.severity === "High").length;
  const readyCount = DRAFTS.filter(d => d.draftStatus === "Ready for review").length;

  return (
    <div className="min-h-screen bg-[#f0f0f1] dark:bg-zinc-950">
      <ProtoPanel description="GC Drafting — F1" stateToggle={false} />

      {/* Nav */}
      <nav className="bg-white dark:bg-zinc-900 border-b border-slate-200 dark:border-zinc-800 px-6 py-3.5">
        <div className="mx-auto max-w-6xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <DiligentLogoFull />
              <span className="text-xs font-semibold tracking-tight text-slate-800 dark:text-zinc-100">GRC Command Center</span>
            </div>
            <span className="h-4 w-px bg-slate-200 dark:bg-zinc-700" />
            <span className="inline-flex items-center rounded-full border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-0.5 text-[11px] font-semibold text-blue-700 dark:text-blue-400">
              General Counsel
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActivityOpen(!activityOpen)}
              className={cn(
                "inline-flex items-center gap-2 rounded-lg border bg-white dark:bg-zinc-800 px-3 py-1.5 text-[13px] text-slate-500 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-700 transition-colors",
                activityOpen ? "border-blue-300 dark:border-blue-700" : "border-black/[0.09] dark:border-zinc-700"
              )}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 4h12M2 8h8M2 12h10"/>
              </svg>
              Recent activity
            </button>
            <button className="relative w-8 h-8 rounded-lg border border-black/[0.09] dark:border-zinc-700 bg-white dark:bg-zinc-800 flex items-center justify-center text-slate-500 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-700 transition-colors">
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-red-500 ring-1 ring-white dark:ring-zinc-900" />
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 5a5 5 0 10-10 0c0 5.5-2 6-2 6h14s-2-.5-2-6"/><path d="M9.1 14a1.5 1.5 0 01-2.2 0"/>
              </svg>
            </button>
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-zinc-700">
              <img src="https://i.pravatar.cc/150?u=victoria-chen" alt="Victoria Chen" className="w-7 h-7 rounded-full object-cover" />
              <span className="text-[12px] font-semibold text-slate-700 dark:text-zinc-300">Victoria Chen</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Activity panel */}
      {activityOpen && (
        <div className="bg-white dark:bg-zinc-900 border-b border-slate-200 dark:border-zinc-800">
          <div className="mx-auto max-w-6xl px-6 py-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400 dark:text-zinc-500">Recent activity</p>
              <button onClick={() => setActivityOpen(false)} className="text-[12px] text-slate-400 dark:text-zinc-500 hover:text-slate-600 dark:hover:text-zinc-300">Close</button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                "GC Review Feedback — team suggestions from Diana, Rachel, Davis Polk ready",
                "10-K Disclosure Tracker — drafts submitted for GC finalization",
                "Board Materials Monitor — risk briefing slot reserved for Feb 28",
                "Risk Intelligence — 3 emerging risks cleared CRO review stage",
              ].map((entry) => (
                <div key={entry} className="flex items-start gap-2 rounded-xl border border-black/[0.05] dark:border-zinc-800 bg-slate-50 dark:bg-zinc-800 px-3 py-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 dark:bg-blue-500 flex-shrink-0" />
                  <p className="text-[12px] text-slate-500 dark:text-zinc-400">{entry}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 90% 100% at 50% 0%, rgba(59,130,246,0.05) 0%, transparent 100%)" }}
        />
        <div className="relative mx-auto max-w-2xl px-6 pt-12 pb-20 text-center">
          {/* Status pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 dark:border-blue-800 bg-white dark:bg-zinc-900 px-4 py-1.5 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
            </span>
            <span className="text-[13px] font-semibold text-blue-700 dark:text-blue-400">Disclosure in Legal Review</span>
          </div>

          <h1 className="text-[2.5rem] font-light tracking-[-0.02em] text-slate-800 dark:text-zinc-100 leading-[1.15] mb-4">
            3 disclosures pending GC review
          </h1>

          <p className="text-[13px] text-slate-500 dark:text-zinc-400 leading-relaxed max-w-xl mx-auto">
            AI-drafted disclosure language is ready for your review. Finalize the 10-K risk factors, incorporate team feedback, and route to the CEO for approval.
          </p>

          {/* Metrics */}
          <div className="flex items-center justify-center gap-3 mt-8 flex-wrap">
            {[
              { value: String(criticalCount), label: "Critical", color: "text-red-600 dark:text-red-400" },
              { value: String(highCount),     label: "High",     color: "text-amber-600 dark:text-amber-400" },
              { value: String(readyCount),    label: "Ready to review", color: "text-blue-600 dark:text-blue-400" },
              { value: "3",                   label: "Filings Affected", color: "text-slate-700 dark:text-zinc-300" },
            ].map((m) => (
              <div key={m.label} className="w-28 h-20 rounded-xl border border-black/[0.09] dark:border-zinc-700 bg-white dark:bg-zinc-900 flex flex-col items-center justify-center">
                <span className={cn("text-[22px] font-semibold", m.color)}>{m.value}</span>
                <span className="text-[11px] text-slate-400 dark:text-zinc-500 text-center px-1 leading-tight">{m.label}</span>
              </div>
            ))}
          </div>

          {/* Workflow stepper */}
          <div className="mt-8 pt-6 border-t border-black/[0.05] dark:border-zinc-800">
            <p className="text-[11px] font-semibold text-slate-800 dark:text-zinc-100 uppercase tracking-wide mb-5">Response Workflow</p>
            <div className="flex items-center justify-center">
              {WORKFLOW_STAGES.map((stage, idx) => (
                <React.Fragment key={stage.id}>
                  <div className="flex flex-col items-center gap-1.5 min-w-0">
                    <div className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all",
                      stage.status === "completed" && "bg-emerald-500 border-emerald-500",
                      stage.status === "current"   && "bg-white dark:bg-zinc-900 border-blue-400 dark:border-blue-500 ring-4 ring-blue-100 dark:ring-blue-900/30",
                      stage.status === "pending"   && "bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-700",
                    )}>
                      {stage.status === "completed" && (
                        <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 6l3 3 5-5"/></svg>
                      )}
                      {stage.status === "current" && (
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-60" />
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500" />
                        </span>
                      )}
                      {stage.status === "pending" && (
                        <span className="w-2 h-2 rounded-full bg-slate-200 dark:bg-zinc-700" />
                      )}
                    </div>
                    <span className={cn(
                      "text-[11px] font-semibold whitespace-nowrap",
                      stage.status === "completed" && "text-emerald-600 dark:text-emerald-400",
                      stage.status === "current"   && "text-blue-600 dark:text-blue-400",
                      stage.status === "pending"   && "text-slate-400 dark:text-zinc-500",
                    )}>
                      {stage.label}
                    </span>
                  </div>
                  {idx < WORKFLOW_STAGES.length - 1 && (
                    <div className={cn(
                      "flex-1 h-0.5 rounded-full mx-1 mt-[-18px]",
                      stage.status === "completed" ? "bg-emerald-400 dark:bg-emerald-600" : "bg-slate-200 dark:bg-zinc-700",
                    )} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Agent ticker */}
      <div className="mx-auto max-w-6xl px-6 mb-6">
        <div className="rounded-[20px] border border-black/[0.09] dark:border-zinc-700 bg-white dark:bg-zinc-900 px-5 py-3">
          <div className="flex items-center gap-4 overflow-x-auto">
            <span className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400 dark:text-zinc-500">
              Legal Monitoring Agents
            </span>
            <div className="h-3 w-px bg-slate-200 dark:bg-zinc-700 shrink-0" />
            {LEGAL_AGENTS.map((agent, i) => (
              <React.Fragment key={agent.name}>
                {i > 0 && <span className="text-slate-200 dark:text-zinc-700 shrink-0">·</span>}
                <span className="whitespace-nowrap text-[12px] text-slate-500 dark:text-zinc-400">
                  <span className="font-semibold text-slate-700 dark:text-zinc-200">{agent.name}</span>
                  {" "}<span className="text-slate-400 dark:text-zinc-500">— {agent.note}</span>
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto w-full max-w-6xl px-6 pb-32 space-y-6">

        {/* Disclosure drafts section header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[11px] font-semibold text-slate-800 dark:text-zinc-100 uppercase tracking-wide">
              Disclosure Drafts
            </h2>
            <p className="text-[12px] text-slate-500 dark:text-zinc-400 mt-0.5">
              AI-drafted 10-K risk factor language, ready for GC review and refinement
            </p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-xl border border-black/[0.09] dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-2 text-[13px] font-normal text-slate-500 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-700 transition-colors">
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 2H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V5l-2-3z"/>
              <path d="M11 2v3h2"/><path d="M5 9h6M5 11h4"/>
            </svg>
            Download all drafts
          </button>
        </div>

        {/* Draft cards */}
        {DRAFTS.map((draft, i) => (
          <DraftCard key={draft.id} draft={draft} index={i} />
        ))}

        <div className="h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-zinc-700 to-transparent" />

        {/* Cross-sell card */}
        <div className="rounded-[20px] border border-blue-200/60 dark:border-blue-900/60 bg-blue-50/30 dark:bg-blue-950/10 p-[22px_24px]">
          <div className="flex items-start gap-4">
            <div className="w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 1v14M1 8h14"/>
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-[14px] font-semibold text-slate-800 dark:text-zinc-100 mb-1">
                Map your subsidiary and leadership structure before filing
              </h3>
              <p className="text-[13px] text-slate-500 dark:text-zinc-400 leading-relaxed mb-3">
                With Diligent Entities, automatically sync your Vietnamese subsidiary org structure with Policy Manager — verify who's accountable, confirm attestations are current, and keep regulatory filings aligned.
              </p>
              <button className="inline-flex items-center gap-2 rounded-xl bg-slate-800 dark:bg-zinc-100 text-white dark:text-zinc-900 text-[13px] font-normal px-4 py-2 hover:bg-slate-900 dark:hover:bg-white transition-colors">
                Start your 90-day trial
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3l5 5-5 5"/></svg>
              </button>
            </div>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-zinc-700 to-transparent" />

        {/* Pick up where you left off */}
        <div>
          <h2 className="text-[11px] font-semibold text-slate-800 dark:text-zinc-100 uppercase tracking-wide mb-1">
            Pick up where you left off
          </h2>
          <p className="text-[12px] text-slate-500 dark:text-zinc-400 mb-4">
            Continue working across your Diligent applications
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {RECENT_APPS.map((app) => (
              <a
                key={app.name}
                href="#"
                className="suggestion-card rounded-[20px] border border-black/[0.09] dark:border-zinc-700 bg-white dark:bg-zinc-900 p-[18px_20px] flex flex-col gap-1 transition-all duration-[250ms] ease-out hover:bg-slate-50 dark:hover:bg-zinc-800 hover:border-slate-200 dark:hover:border-zinc-600 hover:shadow-[0_8px_28px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 [will-change:transform] [backface-visibility:hidden]"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[13px] font-semibold text-slate-800 dark:text-zinc-100">{app.name}</span>
                  <span className="text-[11px] text-slate-400 dark:text-zinc-500">{app.lastUsed}</span>
                </div>
                <p className="text-[12px] text-slate-500 dark:text-zinc-400 leading-relaxed">{app.description}</p>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Floating prompt */}
      <div
        className="bg-gradient-to-t from-[#f0f0f1] dark:from-zinc-950 via-[#f0f0f1]/90 dark:via-zinc-950/90 to-transparent pb-4 pt-8"
        style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 40 }}
      >
        <div className="mx-auto max-w-4xl px-6">
          {/* Quick advance links */}
          <div className="flex items-center gap-2 mb-3 justify-center flex-wrap">
            <span className="text-[10px] text-slate-400 dark:text-zinc-500">Advance:</span>
            <Link
              href="/gc-commandcenter/cro-review"
              className="rounded-full border border-black/[0.09] dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-1 text-[12px] text-slate-500 dark:text-zinc-400 hover:text-slate-700 dark:hover:text-zinc-200 transition-colors"
            >
              ← Back to CRO Review
            </Link>
            <Link
              href="/gc-commandcenter/gc-drafting/review?risk=taiwan"
              className="rounded-full border border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/30 px-3 py-1 text-[12px] font-semibold text-blue-700 dark:text-blue-400 hover:bg-blue-100/50 dark:hover:bg-blue-950/50 transition-colors"
            >
              Review first draft →
            </Link>
            <button className="rounded-full border border-black/[0.09] dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-1 text-[12px] text-slate-500 dark:text-zinc-400 hover:text-slate-700 dark:hover:text-zinc-200 transition-colors">
              Finalize & send to CEO
            </button>
          </div>

          {/* Prompt input */}
          <div className="rounded-[20px] border border-black/[0.09] dark:border-zinc-700 bg-white dark:bg-zinc-900 p-2 shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white dark:bg-zinc-800 border border-black/[0.09] dark:border-zinc-700 flex-shrink-0 p-1.5">
                <DiligentLogoFull />
              </div>
              <input
                type="text"
                placeholder="Ask about disclosure language, precedent filings, or legal obligations…"
                className="flex-1 bg-transparent text-[13px] text-slate-800 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none"
              />
              <button className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-800 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-slate-900 dark:hover:bg-white transition-colors flex-shrink-0">
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2L7 9M14 2l-4 12-3-5-5-3 12-4z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
