"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ProtoPanel } from "../../components/ProtoPanel";

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

function AISparkle() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-amber-400 dark:text-amber-500">
      <path d="M12 2L13.09 8.26L18 6L14.74 10.91L21 12L14.74 13.09L18 18L13.09 15.74L12 22L10.91 15.74L6 18L9.26 13.09L3 12L9.26 10.91L6 6L10.91 8.26L12 2Z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

type Severity = "Critical" | "High" | "Medium";

type RiskItem = {
  id: string;
  title: string;
  source: string;
  category: string;
  severity: Severity;
  description: string;
  isNew: boolean;
  aiGenerated: boolean;
  reviewUrl?: string;
};

const RISKS: RiskItem[] = [
  {
    id: "taiwan",
    title: "Taiwan Strait Geopolitical Tensions — Semiconductor Supply Chain Disruption",
    source: "Reuters, TSMC filings, defense intelligence",
    category: "Supply Chain",
    severity: "Critical",
    description: "Escalating military posturing in the Taiwan Strait creates material risk to semiconductor supply chains. Approximately 47% of critical chip suppliers operate in Taiwan. Disruption could impact $1.8B in annual product revenue across two major product lines.",
    isNew: true,
    aiGenerated: true,
    reviewUrl: "/gc-commandcenter/cro-review/review?risk=taiwan&owner=diana-reyes",
  },
  {
    id: "vendor",
    title: "Critical Vendor Cybersecurity Breach — CloudSecure Inc. Ransomware Incident",
    source: "CloudSecure Inc. disclosure, internal vendor monitoring",
    category: "Cybersecurity",
    severity: "High",
    description: "CloudSecure Inc. (primary data processing vendor) disclosed a ransomware incident affecting customer data pipelines. They process customer PII under 3 of our data processing agreements. Elevated per CRO assessment; added to Top 5 risk register.",
    isNew: true,
    aiGenerated: true,
    reviewUrl: "/gc-commandcenter/cro-review/review?risk=cyber&owner=marcus-webb",
  },
  {
    id: "dma",
    title: "EU Digital Markets Act Enforcement — Regulatory Compliance Exposure",
    source: "EC enforcement filings, peer 10-K analysis",
    category: "Regulatory",
    severity: "High",
    description: "EC initiated enforcement actions against 3 companies in our sector for DMA non-compliance. Pattern analysis suggests our EU operations may face similar scrutiny. Potential fines up to 10% of global turnover.",
    isNew: true,
    aiGenerated: true,
    reviewUrl: "/gc-commandcenter/cro-review/review?risk=dma&owner=james-park",
  },
  {
    id: "ai-reg",
    title: "AI Regulatory Compliance — EU AI Act Implementation Uncertainty",
    source: "EU regulatory filings, peer disclosures",
    category: "Regulatory",
    severity: "Medium",
    description: "EU AI Act enforcement timeline creates uncertainty for AI product launches. Compliance assessment is incomplete. Peer companies have begun disclosing AI regulatory risk in 10-K filings.",
    isNew: false,
    aiGenerated: true,
  },
  {
    id: "climate",
    title: "SEC Climate Disclosure Requirements — Reporting Readiness Gap",
    source: "SEC rule filings, internal readiness audit",
    category: "ESG",
    severity: "Medium",
    description: "New SEC climate disclosure rules require Scope 1 and 2 emissions reporting. Internal audit identified gaps in data collection and assurance processes. Compliance deadline within 18 months.",
    isNew: false,
    aiGenerated: true,
  },
  {
    id: "rates",
    title: "Interest Rate Sensitivity — Refinancing Exposure",
    source: "Fed minutes, internal treasury analysis",
    category: "Financial",
    severity: "Medium",
    description: "Current rate environment increases refinancing costs for $2.3B in maturing debt instruments. Treasury analysis indicates 40bps spread widening may impact capital allocation strategy.",
    isNew: false,
    aiGenerated: false,
  },
];

const SEVERITY_BADGE: Record<Severity, string> = {
  Critical: "bg-red-50 border-red-200 text-red-700 dark:bg-red-950/40 dark:border-red-800 dark:text-red-400",
  High:     "bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-400",
  Medium:   "bg-slate-100 border-slate-300 text-slate-600 dark:bg-zinc-800 dark:border-zinc-600 dark:text-zinc-400",
};

/* ------------------------------------------------------------------ */
/*  Risk card                                                          */
/* ------------------------------------------------------------------ */

function RiskCard({ risk }: { risk: RiskItem }) {
  return (
    <div className="suggestion-card rounded-[20px] border border-black/[0.09] dark:border-zinc-700 bg-white dark:bg-zinc-900 p-[22px_24px] flex flex-col transition-all duration-[250ms] ease-out hover:bg-slate-50 dark:hover:bg-zinc-800 hover:border-slate-200 dark:hover:border-zinc-600 hover:shadow-[0_8px_28px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 [will-change:transform] [backface-visibility:hidden]">
      {/* Header row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          {risk.isNew && (
            <span className="inline-flex items-center rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-semibold text-white uppercase tracking-wide">
              New
            </span>
          )}
          <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold", SEVERITY_BADGE[risk.severity])}>
            {risk.severity}
          </span>
          <span className="inline-flex items-center rounded-full border border-black/[0.07] dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 px-2.5 py-0.5 text-[11px] font-semibold text-slate-500 dark:text-zinc-400">
            {risk.category}
          </span>
        </div>
        {risk.aiGenerated && (
          <div className="flex-shrink-0 flex items-center gap-1 text-[11px] text-slate-400 dark:text-zinc-500">
            <AISparkle />
            <span>AI</span>
          </div>
        )}
      </div>

      {/* Title */}
      <h3 className="text-[14px] font-semibold text-slate-800 dark:text-zinc-100 leading-snug mb-1">
        {risk.title}
      </h3>

      {/* Source */}
      <p className="text-[11px] text-slate-400 dark:text-zinc-500 mb-2">{risk.source}</p>

      {/* Description */}
      <p className="text-[13px] text-slate-500 dark:text-zinc-400 leading-relaxed flex-1 mb-4">
        {risk.description.length > 200 ? risk.description.slice(0, 200) + "…" : risk.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-black/[0.05] dark:border-zinc-800">
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1 text-[12px] text-slate-400 dark:text-zinc-500 hover:text-slate-600 dark:hover:text-zinc-300 transition-colors">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 2H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V5l-2-3z"/><path d="M11 2v3h2"/><path d="M5 9h6M5 11h4"/></svg>
            Edit details
          </button>
          <button className="flex items-center gap-1 text-[12px] text-slate-400 dark:text-zinc-500 hover:text-slate-600 dark:hover:text-zinc-300 transition-colors">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3v10M3 8h10"/></svg>
            Quick add
          </button>
        </div>
        {risk.reviewUrl && (
          <Link
            href={risk.reviewUrl}
            className="text-[12px] font-semibold text-slate-600 dark:text-zinc-300 hover:text-slate-800 dark:hover:text-zinc-100 transition-colors flex items-center gap-1"
          >
            Review
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3l5 5-5 5"/></svg>
          </Link>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Toast notification                                                 */
/* ------------------------------------------------------------------ */

function InvestigationToast({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div style={{ position: "fixed", top: "60px", right: "16px", zIndex: 50 }}
      className="animate-[fadeSlideUp_0.4s_ease-out_both] w-[360px]"
    >
      <Link
        href="/gc-commandcenter/cro-review/review?risk=taiwan&owner=diana-reyes"
        className="flex items-start gap-3 rounded-[20px] border border-black/[0.09] dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-3.5 shadow-[0_8px_28px_rgba(0,0,0,0.10)] dark:shadow-[0_8px_28px_rgba(0,0,0,0.40)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.14)] dark:hover:shadow-[0_12px_36px_rgba(0,0,0,0.50)] hover:border-slate-200 dark:hover:border-zinc-600 transition-all block"
      >
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 mt-0.5">
          <svg width="14" height="14" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600 dark:text-emerald-400">
            <path d="M2 6l3 3 5-5" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-semibold text-slate-800 dark:text-zinc-100 mb-0.5">Interview submitted</p>
          <p className="text-[12px] text-slate-500 dark:text-zinc-400 leading-relaxed">
            Diana Reyes completed her investigation on{" "}
            <span className="font-medium text-slate-700 dark:text-zinc-200">Taiwan Strait Geopolitical Tensions</span>.
            Ready for your review.
          </p>
        </div>
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDismiss(); }}
          className="flex-shrink-0 text-slate-300 dark:text-zinc-600 hover:text-slate-500 dark:hover:text-zinc-400 transition-colors mt-0.5"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M4 4l8 8M12 4l-8 8" />
          </svg>
        </button>
      </Link>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function RiskEssentialsPage() {
  const [filter, setFilter]       = useState<"all" | "new">("all");
  const [toastVisible, setToastVisible] = useState(true);

  const displayed = filter === "new" ? RISKS.filter((r) => r.isNew) : RISKS;

  return (
    <div className="min-h-screen bg-[#f0f0f1] dark:bg-zinc-950">
      <ProtoPanel description="Viewing as: Chief Risk Officer" stateToggle={false} />

      {/* Toast */}
      {toastVisible && <InvestigationToast onDismiss={() => setToastVisible(false)} />}

      {/* Nav */}
      <nav className="border-b border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-3.5">
          <div className="flex items-center gap-2.5">
            <DiligentLogoFull />
            <span className="text-xs font-semibold tracking-tight text-slate-800 dark:text-zinc-100">GRC Command Center</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-700 transition-colors">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2a4 4 0 0 1 4 4c0 2.667 1.333 4 1.333 4H2.667S4 8.667 4 6a4 4 0 0 1 4-4Z"/><path d="M6.87 13a1.333 1.333 0 0 0 2.26 0"/></svg>
            </button>
            <div className="h-5 w-px bg-slate-200 dark:bg-zinc-700" />
            <div className="flex items-center gap-2">
              <img src="https://i.pravatar.cc/150?u=ryan-torres" alt="Ryan Torres" className="h-7 w-7 rounded-full object-cover" />
              <div>
                <p className="text-xs font-semibold text-slate-800 dark:text-zinc-100">Ryan Torres</p>
                <p className="text-[10px] text-slate-400 dark:text-zinc-500">Chief Risk Officer</p>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Open hero — matches HUC 2 Subsidiary Governance pattern */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 90% 100% at 50% 0%, rgba(245,158,11,0.05) 0%, transparent 100%)" }}
        />
        <div className="relative mx-auto max-w-2xl px-6 pt-12 pb-10 text-center">
          {/* Status pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 dark:border-amber-800 bg-white dark:bg-zinc-900 px-4 py-1.5 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
            </span>
            <span className="text-[13px] font-semibold text-amber-700 dark:text-amber-400">3 New Risks Identified</span>
          </div>

          {/* Headline */}
          <h1 className="text-[2.5rem] font-light tracking-[-0.02em] text-slate-800 dark:text-zinc-100 leading-[1.15] mb-4">
            AI risk discovery
          </h1>

          {/* Subtitle */}
          <p className="text-[13px] text-slate-500 dark:text-zinc-400 leading-relaxed max-w-xl mx-auto">
            Risks identified from company filings, news, and regulatory sources that may require disclosure review.
          </p>

          {/* Metric boxes */}
          <div className="flex items-center justify-center gap-3 mt-8 flex-wrap">
            {[
              { value: "41,200", label: "Discovered Risks" },
              { value: "1,180",  label: "Companies" },
              { value: "64",     label: "Industries" },
              { value: "18 Feb", label: "Last Updated" },
            ].map(({ value, label }) => (
              <div key={label} className="w-28 h-20 rounded-xl border border-black/[0.09] dark:border-zinc-700 bg-white dark:bg-zinc-900 flex flex-col items-center justify-center">
                <span className="text-[18px] font-semibold text-slate-800 dark:text-zinc-100 leading-tight">{value}</span>
                <span className="text-[11px] text-slate-400 dark:text-zinc-500 mt-0.5">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto w-full max-w-6xl px-6 pb-10 space-y-6">

        {/* Risk list header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-[11px] font-semibold text-slate-800 dark:text-zinc-100 uppercase tracking-wide">
              Risk suggestions
            </h2>
            <span className="text-[11px] text-slate-400 dark:text-zinc-500">({displayed.length})</span>
          </div>
          {/* Filter toggle */}
          <div className="flex items-center overflow-hidden rounded-lg border border-black/[0.09] dark:border-zinc-700">
            {(["all", "new"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-3 py-1.5 text-[12px] font-semibold transition-colors",
                  f !== "all" && "border-l border-black/[0.09] dark:border-zinc-700",
                  filter === f
                    ? "bg-slate-800 dark:bg-zinc-100 text-white dark:text-zinc-900"
                    : "bg-white dark:bg-zinc-900 text-slate-500 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-800"
                )}
              >
                {f === "all" ? "All" : "New"}
              </button>
            ))}
          </div>
        </div>

        {/* Risk cards grid */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {displayed.map((risk, i) => (
            <div key={risk.id} style={{ animationDelay: `${i * 80}ms` }}>
              <RiskCard risk={risk} />
            </div>
          ))}
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-zinc-700 to-transparent" />
        <div className="flex items-center justify-between">
          <Link href="/gc-commandcenter/status" className="text-[13px] text-slate-400 dark:text-zinc-500 hover:text-slate-600 dark:hover:text-zinc-300 transition-colors">
            ← Back to status
          </Link>
          <Link href="/gc-commandcenter/cro-review/review?risk=taiwan&owner=diana-reyes" className="text-[13px] text-slate-400 dark:text-zinc-500 hover:text-slate-600 dark:hover:text-zinc-300 transition-colors">
            Review Taiwan Strait risk →
          </Link>
        </div>
      </div>
    </div>
  );
}
