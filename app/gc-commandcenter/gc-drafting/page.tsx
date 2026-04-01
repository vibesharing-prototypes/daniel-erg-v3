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
/*  Workflow stages                                                     */
/* ------------------------------------------------------------------ */

const WORKFLOW_STAGES = [
  { id: "detect",      label: "Detect",         status: "completed" as const },
  { id: "review",      label: "Review Sources",  status: "current"   as const },
  { id: "assign",      label: "Assign Owners",   status: "pending"   as const },
  { id: "investigate", label: "Investigate",     status: "pending"   as const },
  { id: "draft",       label: "Draft 10-K",      status: "pending"   as const },
  { id: "notify",      label: "Notify Board",    status: "pending"   as const },
];

/* ------------------------------------------------------------------ */
/*  Sources data                                                        */
/* ------------------------------------------------------------------ */

type SourceType = "news" | "regulatory" | "vendor" | "internal" | "financial" | "credit";

type SourceScanned = {
  name: string;
  type: SourceType;
  itemsScanned: number;
  risksFound: number;
  lastScan: string;
  coverage: string;
  moodysOnly?: boolean;
};

const SOURCES_SCANNED: SourceScanned[] = [
  { name: "Global News & Media Feeds", type: "news", itemsScanned: 2847, risksFound: 1, lastScan: "8:47 AM", coverage: "Reuters, Bloomberg, WSJ, FT, AP, industry publications" },
  { name: "SEC EDGAR & Regulatory Filings", type: "regulatory", itemsScanned: 156, risksFound: 0, lastScan: "7:23 AM", coverage: "8-K, 10-K, 10-Q filings from peer companies" },
  { name: "EU Regulatory Database", type: "regulatory", itemsScanned: 89, risksFound: 1, lastScan: "7:23 AM", coverage: "EC enforcement actions, DMA/DSA decisions, GDPR fines" },
  { name: "Vendor Intelligence Network", type: "vendor", itemsScanned: 342, risksFound: 1, lastScan: "9:12 AM", coverage: "Third-party risk feeds, vendor news, cybersecurity advisories" },
  { name: "Current 10-K Risk Factors", type: "internal", itemsScanned: 47, risksFound: 3, lastScan: "8:50 AM", coverage: "Item 1A risk disclosures from most recent annual report" },
  { name: "Board Meeting Materials", type: "internal", itemsScanned: 28, risksFound: 0, lastScan: "8:55 AM", coverage: "Feb 28 board deck, committee reports, CEO presentation" },
  { name: "Supply Chain Data", type: "financial", itemsScanned: 186, risksFound: 1, lastScan: "8:47 AM", coverage: "Supplier contracts, concentration analysis, geographic exposure" },
  { name: "Moody's Credit & Industry Risk Intelligence", type: "credit", itemsScanned: 1247, risksFound: 2, lastScan: "8:30 AM", coverage: "Credit ratings, industry risk scores, probability of default models, supplier creditworthiness", moodysOnly: true },
];

const SOURCE_TYPE_STYLES: Record<SourceType, { icon: React.ReactNode; color: string }> = {
  news: {
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8M18 18h-8M18 10h-8"/></svg>,
    color: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40",
  },
  regulatory: {
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    color: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40",
  },
  vendor: {
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    color: "text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/40",
  },
  internal: {
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>,
    color: "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/40",
  },
  financial: {
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>,
    color: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40",
  },
  credit: {
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>,
    color: "text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/40",
  },
};

/* ------------------------------------------------------------------ */
/*  Detected risks data                                                 */
/* ------------------------------------------------------------------ */

type DetectedRisk = {
  name: string;
  severity: "critical" | "high";
  source: string;
  confidence: number;
  sources: string[];
  reasoning: string;
  disclosureGap: string;
};

const DETECTED_RISKS: DetectedRisk[] = [
  {
    name: "Taiwan Strait Geopolitical Tensions",
    severity: "critical",
    source: "News Feeds + Supply Chain Data",
    confidence: 94,
    sources: ["Reuters: Taiwan military exercises report (8:12 AM)", "Bloomberg: Semiconductor supply chain analysis (8:23 AM)", "Internal: Supplier geographic mapping (8:47 AM)"],
    reasoning: "Escalating tensions in the Taiwan Strait may disrupt semiconductor supply chain. Analysis of supplier contracts shows 47% of chip suppliers have Taiwan-based operations. Cross-referenced with current 10-K and prior board materials: Q3 minutes referenced Vietnam as diversification target under evaluation. Current 10-K mentions \u2018general supply chain risks\u2019 but does not specifically address semiconductor concentration or geopolitical exposure in Taiwan region.",
    disclosureGap: "No specific disclosure of semiconductor supply concentration or Taiwan geopolitical risk in Item 1A",
  },
  {
    name: "Critical Vendor Cybersecurity Breach",
    severity: "high",
    source: "Vendor Intelligence Network",
    confidence: 91,
    sources: ["CloudSecure Inc. 8-K filing (9:08 AM)", "Cybersecurity Advisory: Ransomware attack confirmed (9:10 AM)", "Internal: Data Processing Agreement inventory (9:12 AM)"],
    reasoning: "CloudSecure Inc. (our primary data processing vendor) disclosed a ransomware incident in their 8-K filing. They process customer PII under 3 of our data processing agreements affecting approximately 2.3M customer records. Current 10-K includes cybersecurity risks but focuses on direct company systems, not vendor/third-party exposure. May trigger state breach notification obligations in CA, NY, and TX.",
    disclosureGap: "Third-party data processor breach exposure not specifically disclosed; vendor concentration risk understated",
  },
  {
    name: "EU Digital Markets Act Enforcement Pattern",
    severity: "high",
    source: "EU Regulatory Database",
    confidence: 89,
    sources: ["EC Press Release: DMA enforcement actions (7:15 AM)", "FT: Analysis of tech sector DMA fines (7:20 AM)", "Internal: EU revenue exposure analysis (7:23 AM)"],
    reasoning: "European Commission initiated enforcement actions against 3 companies in our sector for DMA non-compliance. Pattern analysis suggests our EU operations (representing 23% of revenue) may face similar scrutiny. Current 10-K mentions EU regulatory environment generally but DMA-specific compliance risks and potential enforcement exposure are not detailed. Estimated compliance costs of \u20ac8\u201312M not budgeted.",
    disclosureGap: "DMA compliance risks and potential enforcement exposure not disclosed in risk factors",
  },
];

/* ------------------------------------------------------------------ */
/*  Activity log                                                        */
/* ------------------------------------------------------------------ */

const ACTIVITY_LOG = [
  { time: "7:15 AM", action: "Regulatory Watch initiated scan of EU regulatory databases" },
  { time: "7:23 AM", action: "Detected DMA enforcement pattern affecting 3 peer companies" },
  { time: "8:12 AM", action: "Risk Intelligence flagged Taiwan geopolitical news from Reuters" },
  { time: "8:47 AM", action: "Cross-referenced supplier data \u2014 47% Taiwan exposure identified" },
  { time: "8:49 AM", action: "Pulled prior board materials \u2014 Q3 minutes cited Vietnam as diversification target" },
  { time: "8:50 AM", action: "Compared against current 10-K Item 1A risk factors" },
  { time: "9:08 AM", action: "Vendor Intelligence detected CloudSecure 8-K filing (ransomware)" },
  { time: "9:12 AM", action: "Identified 3 affected data processing agreements" },
  { time: "9:15 AM", action: "Completed disclosure gap analysis \u2014 3 risks require review" },
];

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */

const INITIAL_VISIBLE = 3;

export default function ReviewerPage() {
  const [expandedRisk, setExpandedRisk] = useState<number | null>(null);
  const [expandedSource, setExpandedSource] = useState<number | null>(null);
  const [withMoodys, setWithMoodys] = useState(true);
  const [showAllSources, setShowAllSources] = useState(false);
  const [showAllRisks, setShowAllRisks] = useState(false);

  const activeSources = withMoodys ? SOURCES_SCANNED : SOURCES_SCANNED.filter((s) => !s.moodysOnly);
  const totalItems = activeSources.reduce((sum, s) => sum + s.itemsScanned, 0);
  const CONFIDENCE_DROP = withMoodys ? 0 : 12;

  const visibleSources = showAllSources ? activeSources : activeSources.slice(0, INITIAL_VISIBLE);
  const hiddenSourceCount = activeSources.length - INITIAL_VISIBLE;

  const visibleRisks = showAllRisks ? DETECTED_RISKS : DETECTED_RISKS.slice(0, INITIAL_VISIBLE);
  const hiddenRiskCount = DETECTED_RISKS.length - INITIAL_VISIBLE;

  return (
    <div className="min-h-screen bg-[#f0f0f1] dark:bg-zinc-950">
      <ProtoPanel description="Detection Source Analysis — F1" stateToggle={false}>
        <div className="pp-group">
          <span className="pp-group-label">MOODY&apos;S DATA</span>
          <div className="pp-pill pp-theme-pill">
            <button
              className={`pp-btn${withMoodys ? " pp-active" : ""}`}
              onClick={(e) => { e.stopPropagation(); setWithMoodys(true); }}
            >
              ON
            </button>
            <button
              className={`pp-btn${!withMoodys ? " pp-active" : ""}`}
              onClick={(e) => { e.stopPropagation(); setWithMoodys(false); }}
            >
              OFF
            </button>
          </div>
        </div>
      </ProtoPanel>

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
            <Link
              href="/gc-commandcenter"
              className="text-[12px] text-slate-400 dark:text-zinc-500 hover:text-slate-600 dark:hover:text-zinc-300 transition-colors"
            >
              ← Back to dashboard
            </Link>
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-zinc-700">
              <img src="https://randomuser.me/api/portraits/med/women/65.jpg" alt="General Counsel" className="w-7 h-7 rounded-full object-cover" />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero — centered layout */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 90% 100% at 50% 0%, rgba(239,68,68,0.04) 0%, transparent 100%)" }}
        />
        <div className="relative mx-auto max-w-2xl px-6 pt-12 pb-10 text-center">
          {/* Severity chip */}
          <div className="inline-flex items-center gap-2 rounded-full border border-red-200 dark:border-red-800 bg-white dark:bg-zinc-900 px-4 py-1.5 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
            </span>
            <span className="text-[13px] font-semibold text-red-700 dark:text-red-400">1 Critical · 2 High — 3 Disclosure Gaps</span>
          </div>

          <h1 className="text-[2.5rem] font-light tracking-[-0.02em] text-slate-800 dark:text-zinc-100 leading-[1.15] mb-4">
            Detection Source Analysis
          </h1>

          <p className="text-[13px] text-slate-500 dark:text-zinc-400 leading-relaxed max-w-xl mx-auto">
            Review what agents scanned and how emerging risks were identified.
          </p>

          {/* Metric widgets */}
          <div className="flex items-center justify-center gap-3 mt-8 flex-wrap">
            <div className="w-28 h-20 rounded-xl border border-black/[0.09] dark:border-zinc-700 bg-white dark:bg-zinc-900 flex flex-col items-center justify-center">
              <span className="text-[22px] font-semibold text-slate-800 dark:text-zinc-100">{activeSources.length}</span>
              <span className="text-[11px] text-slate-400 dark:text-zinc-500">Sources</span>
            </div>
            <div className="w-28 h-20 rounded-xl border border-black/[0.09] dark:border-zinc-700 bg-white dark:bg-zinc-900 flex flex-col items-center justify-center">
              <span className="text-[22px] font-semibold text-slate-800 dark:text-zinc-100">{totalItems.toLocaleString()}</span>
              <span className="text-[11px] text-slate-400 dark:text-zinc-500">Items Analyzed</span>
            </div>
            <div className="w-28 h-20 rounded-xl border border-red-200/60 dark:border-red-900/60 bg-white dark:bg-zinc-900 flex flex-col items-center justify-center">
              <span className="text-[22px] font-semibold text-red-600 dark:text-red-400">{DETECTED_RISKS.length}</span>
              <span className="text-[11px] text-slate-400 dark:text-zinc-500">Risks</span>
            </div>
            <div className="w-28 h-20 rounded-xl border border-amber-200/60 dark:border-amber-900/60 bg-white dark:bg-zinc-900 flex flex-col items-center justify-center">
              <span className="text-[22px] font-semibold text-amber-600 dark:text-amber-400">{DETECTED_RISKS.length}</span>
              <span className="text-[11px] text-slate-400 dark:text-zinc-500">Gaps</span>
            </div>
          </div>

          {/* Response Workflow stepper — circle + line */}
          <div className="mt-8 pt-6 border-t border-black/[0.05] dark:border-zinc-800">
            <p className="text-[11px] font-semibold text-slate-800 dark:text-zinc-100 uppercase tracking-wide mb-5">Response Workflow</p>
            <div className="flex items-center justify-center">
              {WORKFLOW_STAGES.map((stage, idx) => (
                <React.Fragment key={stage.id}>
                  <div className="flex flex-col items-center gap-1.5 min-w-0">
                    <div className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all",
                      stage.status === "completed" && "bg-emerald-500 border-emerald-500",
                      stage.status === "current"   && "bg-white dark:bg-zinc-900 border-amber-400 dark:border-amber-500 ring-4 ring-amber-100 dark:ring-amber-900/30",
                      stage.status === "pending"   && "bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-700",
                    )}>
                      {stage.status === "completed" && (
                        <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 6l3 3 5-5"/></svg>
                      )}
                      {stage.status === "current" && (
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-60" />
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
                        </span>
                      )}
                      {stage.status === "pending" && (
                        <span className="w-2 h-2 rounded-full bg-slate-200 dark:bg-zinc-700" />
                      )}
                    </div>
                    <span className={cn(
                      "text-[11px] font-semibold whitespace-nowrap",
                      stage.status === "completed" && "text-emerald-600 dark:text-emerald-400",
                      stage.status === "current"   && "text-amber-600 dark:text-amber-400",
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

      {/* Main content */}
      <div className="mx-auto max-w-6xl px-6 pb-10 space-y-6">

        {/* Two-panel layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

          {/* Left: Sources Scanned */}
          <div className="space-y-3">
            <div>
              <h2 className="text-[11px] font-semibold uppercase tracking-wide text-slate-800 dark:text-zinc-100">Sources Scanned</h2>
              <p className="text-[12px] text-slate-400 dark:text-zinc-500 mt-0.5">
                {totalItems.toLocaleString()} items across {activeSources.length} sources
              </p>
            </div>

            {visibleSources.map((source, idx) => {
              const typeConfig = SOURCE_TYPE_STYLES[source.type];
              const isExpanded = expandedSource === idx;
              return (
                <div
                  key={source.name}
                  className={cn(
                    "rounded-[20px] border bg-white dark:bg-zinc-900 overflow-hidden transition-all duration-200",
                    source.risksFound > 0
                      ? "border-amber-200/60 dark:border-amber-900/60"
                      : "border-black/[0.09] dark:border-zinc-700"
                  )}
                >
                  <div
                    className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors"
                    onClick={() => setExpandedSource(isExpanded ? null : idx)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg flex-shrink-0", typeConfig.color)}>
                        {typeConfig.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[13px] font-semibold text-slate-800 dark:text-zinc-100">{source.name}</span>
                          {source.moodysOnly && (
                            <span className="inline-flex items-center rounded-full border border-[#002B5C]/20 dark:border-sky-800 bg-[#002B5C]/5 dark:bg-sky-950/30 px-2 py-0.5 text-[10px] font-semibold text-[#002B5C] dark:text-sky-400">
                              Moody&apos;s
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 dark:text-zinc-500 mt-0.5">
                          {source.itemsScanned.toLocaleString()} items · Last: {source.lastScan}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {source.risksFound > 0 ? (
                        <span className="rounded-full border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 text-[10px] font-semibold text-amber-700 dark:text-amber-400">
                          {source.risksFound} risk{source.risksFound !== 1 ? "s" : ""}
                        </span>
                      ) : (
                        <span className="rounded-full border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:text-emerald-400">
                          Clear
                        </span>
                      )}
                      <svg
                        width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                        className={cn("text-slate-300 dark:text-zinc-600 transition-transform duration-200", isExpanded && "rotate-180")}
                      >
                        <path d="M4 6l4 4 4-4"/>
                      </svg>
                    </div>
                  </div>
                  {isExpanded && (
                    <div className="border-t border-black/[0.05] dark:border-zinc-800 bg-slate-50 dark:bg-zinc-800 px-4 py-3">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400 dark:text-zinc-500 mb-1.5">Coverage</p>
                      <p className="text-[12px] text-slate-500 dark:text-zinc-400 leading-relaxed">{source.coverage}</p>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Show more / Show less for sources */}
            {hiddenSourceCount > 0 && (
              <button
                onClick={() => { setShowAllSources(!showAllSources); if (showAllSources) setExpandedSource(null); }}
                className="w-full rounded-[20px] border border-dashed border-slate-200 dark:border-zinc-700 bg-white/50 dark:bg-zinc-900/50 py-2.5 text-[12px] font-semibold text-slate-400 dark:text-zinc-500 hover:text-slate-600 dark:hover:text-zinc-300 hover:border-slate-300 dark:hover:border-zinc-600 transition-colors"
              >
                {showAllSources ? "Show less" : `Show ${hiddenSourceCount} more sources`}
              </button>
            )}

            {/* 10-K Disclosure Gap Analysis */}
            <div className="rounded-[20px] border border-black/[0.09] dark:border-zinc-700 bg-white dark:bg-zinc-900 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400 dark:text-zinc-500 mb-3">
                10-K Disclosure Gap Analysis
              </p>
              <div className="flex items-center gap-3">
                <div className="flex-1 rounded-xl border border-black/[0.05] dark:border-zinc-800 bg-slate-50 dark:bg-zinc-800 p-3 text-center">
                  <p className="text-[20px] font-semibold text-emerald-600 dark:text-emerald-400">44</p>
                  <p className="text-[11px] text-slate-400 dark:text-zinc-500">Adequately disclosed</p>
                </div>
                <div className="flex-1 rounded-xl border border-red-200/60 dark:border-red-900/60 bg-red-50/40 dark:bg-red-950/10 p-3 text-center">
                  <p className="text-[20px] font-semibold text-red-600 dark:text-red-400">3</p>
                  <p className="text-[11px] text-slate-400 dark:text-zinc-500">Gaps found</p>
                </div>
                <div className="flex-1 rounded-xl border border-black/[0.05] dark:border-zinc-800 bg-slate-50 dark:bg-zinc-800 p-3 text-center">
                  <p className="text-[20px] font-semibold text-blue-600 dark:text-blue-400">47</p>
                  <p className="text-[11px] text-slate-400 dark:text-zinc-500">Total risk factors</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Detected Risks */}
          <div className="space-y-3">
            <div>
              <h2 className="text-[11px] font-semibold uppercase tracking-wide text-slate-800 dark:text-zinc-100">Detected Risks</h2>
              <p className="text-[12px] text-slate-400 dark:text-zinc-500 mt-0.5">3 risks with disclosure gaps</p>
            </div>

            {visibleRisks.map((risk, i) => (
              <div
                key={risk.name}
                className={cn(
                  "rounded-[20px] border bg-white dark:bg-zinc-900 overflow-hidden",
                  risk.severity === "critical" ? "border-red-200/60 dark:border-red-900/60" : "border-amber-200/60 dark:border-amber-900/60"
                )}
              >
                <div
                  className={cn(
                    "px-4 py-3.5 cursor-pointer hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors",
                    risk.severity === "critical" && "bg-gradient-to-r from-red-50/60 dark:from-red-950/10 to-transparent",
                    risk.severity === "high"     && "bg-gradient-to-r from-amber-50/60 dark:from-amber-950/10 to-transparent",
                  )}
                  onClick={() => setExpandedRisk(expandedRisk === i ? null : i)}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-lg flex-shrink-0",
                        risk.severity === "critical" ? "bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400" : "bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400"
                      )}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                          <path d="M12 9v4M12 17h.01"/>
                        </svg>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[13px] font-semibold text-slate-800 dark:text-zinc-100">{risk.name}</span>
                          <span className={cn(
                            "inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase",
                            risk.severity === "critical"
                              ? "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400"
                              : "border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400"
                          )}>
                            {risk.severity}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 dark:text-zinc-500 mt-0.5">
                          {risk.source} · {risk.confidence - CONFIDENCE_DROP}% confidence
                          {!withMoodys && <span className="text-red-500 dark:text-red-400"> (−{CONFIDENCE_DROP}%)</span>}
                        </p>
                      </div>
                    </div>
                    <svg
                      width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                      className={cn("text-slate-300 dark:text-zinc-600 flex-shrink-0 transition-transform duration-200", expandedRisk === i && "rotate-180")}
                    >
                      <path d="M4 6l4 4 4-4"/>
                    </svg>
                  </div>
                </div>

                {expandedRisk === i && (
                  <div className="border-t border-black/[0.05] dark:border-zinc-800">
                    <div className="px-4 py-3.5 bg-slate-50 dark:bg-zinc-800">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400 dark:text-zinc-500 mb-2">AI Reasoning</p>
                      <p className="text-[12px] text-slate-500 dark:text-zinc-400 leading-relaxed">{risk.reasoning}</p>
                    </div>
                    <div className="px-4 py-3.5 border-t border-black/[0.04] dark:border-zinc-700/50">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400 dark:text-zinc-500 mb-2">Detection Sources</p>
                      <div className="space-y-1.5">
                        {risk.sources.map((src) => (
                          <div key={src} className="flex items-start gap-2 text-[12px] text-slate-500 dark:text-zinc-400">
                            <span className="text-emerald-500 dark:text-emerald-400 mt-0.5 flex-shrink-0">•</span>
                            <span>{src}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className={cn(
                      "px-4 py-3.5 border-t border-black/[0.04] dark:border-zinc-700/50",
                      risk.severity === "critical" ? "bg-red-50/50 dark:bg-red-950/10" : "bg-amber-50/50 dark:bg-amber-950/10"
                    )}>
                      <div className="flex items-center gap-1.5 mb-2">
                        <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                          className={risk.severity === "critical" ? "text-red-500 dark:text-red-400" : "text-amber-500 dark:text-amber-400"}>
                          <circle cx="8" cy="8" r="6"/><path d="M8 5v3M8 11h.01"/>
                        </svg>
                        <p className={cn(
                          "text-[10px] font-semibold uppercase tracking-[0.12em]",
                          risk.severity === "critical" ? "text-red-600 dark:text-red-400" : "text-amber-600 dark:text-amber-400"
                        )}>
                          Disclosure Gap
                        </p>
                      </div>
                      <p className="text-[12px] text-slate-700 dark:text-zinc-200">{risk.disclosureGap}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Show more / Show less for risks */}
            {hiddenRiskCount > 0 && (
              <button
                onClick={() => { setShowAllRisks(!showAllRisks); if (showAllRisks) setExpandedRisk(null); }}
                className="w-full rounded-[20px] border border-dashed border-slate-200 dark:border-zinc-700 bg-white/50 dark:bg-zinc-900/50 py-2.5 text-[12px] font-semibold text-slate-400 dark:text-zinc-500 hover:text-slate-600 dark:hover:text-zinc-300 hover:border-slate-300 dark:hover:border-zinc-600 transition-colors"
              >
                {showAllRisks ? "Show less" : `Show ${hiddenRiskCount} more risks`}
              </button>
            )}
          </div>
        </div>

        {/* Detection Timeline */}
        <div className="space-y-3">
          <div>
            <h2 className="text-[11px] font-semibold uppercase tracking-wide text-slate-800 dark:text-zinc-100">Detection Timeline</h2>
            <p className="text-[12px] text-slate-400 dark:text-zinc-500 mt-0.5">How agents identified these risks</p>
          </div>
          <div className="rounded-[20px] border border-black/[0.09] dark:border-zinc-700 bg-white dark:bg-zinc-900 divide-y divide-black/[0.04] dark:divide-zinc-800">
            {ACTIVITY_LOG.map((item, i) => (
              <div key={i} className="flex items-start gap-3 px-5 py-3">
                <span className="text-[11px] text-slate-400 dark:text-zinc-500 whitespace-nowrap w-16 flex-shrink-0 mt-0.5 font-semibold">{item.time}</span>
                <div className="flex h-5 w-5 items-center justify-center rounded bg-slate-100 dark:bg-zinc-800 text-slate-400 dark:text-zinc-500 flex-shrink-0">
                  <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="3" width="14" height="11" rx="1.5"/><path d="M5 3V2M11 3V2M1 7h14"/>
                  </svg>
                </div>
                <span className="text-[12px] text-slate-500 dark:text-zinc-400">{item.action}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer nav */}
        <div className="flex items-center justify-between pt-2 pb-6">
          <Link
            href="/gc-commandcenter"
            className="text-[13px] text-slate-400 dark:text-zinc-500 hover:text-slate-600 dark:hover:text-zinc-300 transition-colors"
          >
            ← Back to dashboard
          </Link>
          <Link
            href="/gc-commandcenter/status"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-800 dark:bg-zinc-100 text-white dark:text-zinc-900 text-[13px] font-normal px-5 py-2.5 hover:bg-slate-900 dark:hover:bg-white transition-colors"
          >
            Assign owners for investigation
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3l5 5-5 5"/></svg>
          </Link>
        </div>

      </div>
    </div>
  );
}
