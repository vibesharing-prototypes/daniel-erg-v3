"use client";

import React, { useState, useEffect } from "react";
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
/*  Workflow stepper                                                    */
/* ------------------------------------------------------------------ */

const WORKFLOW_STAGES = [
  { id: "detect",      label: "Detect",       status: "completed" as const },
  { id: "assign",      label: "Assign",        status: "completed" as const },
  { id: "investigate", label: "Investigate",   status: "completed" as const },
  { id: "cro",         label: "CRO Review",    status: "completed" as const },
  { id: "draft",       label: "GC Draft",      status: "completed" as const },
  { id: "review",      label: "GC Review",     status: "current"   as const },
  { id: "approve",     label: "CEO Approval",  status: "pending"   as const },
  { id: "file",        label: "Board & Filing", status: "pending"  as const },
];

/* ------------------------------------------------------------------ */
/*  Feedback data                                                       */
/* ------------------------------------------------------------------ */

type FeedbackItem = {
  id: string;
  from: string;
  role: string;
  avatarUrl: string;
  originalText: string;
  replacementText: string;
  suggestion: string;
  highlightColor: string;
  borderColor: string;
  status: "pending" | "accepted" | "declined";
};

type ErmFeedbackItem = {
  id: string;
  from: string;
  role: string;
  avatarUrl: string;
  slideOrSection: string;
  suggestion: string;
  accentColor: string;
  status: "pending" | "accepted" | "declined";
};

const TEAM_FEEDBACK: FeedbackItem[] = [
  {
    id: "1",
    from: "Diana Reyes",
    role: "VP Supply Chain",
    avatarUrl: "https://randomuser.me/api/portraits/med/women/44.jpg",
    originalText: "evaluation of alternative sourcing regions as discussed at the board level",
    replacementText: "evaluation of alternative sourcing regions as discussed at the board level (Vietnam noted in Q3 materials)",
    suggestion: "Add explicit mention of Vietnam as diversification target from Q3 board materials.",
    highlightColor: "bg-amber-100/70 border-b-2 border-amber-400 dark:bg-amber-900/20 dark:border-amber-500",
    borderColor: "border-l-amber-400 dark:border-l-amber-500",
    status: "pending",
  },
  {
    id: "2",
    from: "Rachel Green",
    role: "VP Risk Management",
    avatarUrl: "https://randomuser.me/api/portraits/med/women/32.jpg",
    originalText: "impact",
    replacementText: "materially impact",
    suggestion: "Consider adding 'materially' before 'impact' to align with CRO assessment severity.",
    highlightColor: "bg-blue-100/70 border-b-2 border-blue-400 dark:bg-blue-900/20 dark:border-blue-500",
    borderColor: "border-l-blue-400 dark:border-l-blue-500",
    status: "pending",
  },
  {
    id: "3",
    from: "Davis Polk",
    role: "Outside Counsel",
    avatarUrl: "https://randomuser.me/api/portraits/med/men/52.jpg",
    originalText: "qualification of alternative suppliers",
    replacementText: "qualification of alternative suppliers typically requires 12-18 months",
    suggestion: "We recommend including the 12–18 month qualification timeline for alternative suppliers.",
    highlightColor: "bg-violet-100/70 border-b-2 border-violet-400 dark:bg-violet-900/20 dark:border-violet-500",
    borderColor: "border-l-violet-400 dark:border-l-violet-500",
    status: "pending",
  },
];

const ERM_FEEDBACK: ErmFeedbackItem[] = [
  {
    id: "e1",
    from: "Rachel Green",
    role: "VP Risk Management",
    avatarUrl: "https://randomuser.me/api/portraits/med/women/32.jpg",
    slideOrSection: "Slide 2: Top 5 Risks",
    suggestion: "Add vendor breach to Top 5 — CloudSecure incident qualifies per CRO assessment.",
    accentColor: "border-l-blue-400 dark:border-l-blue-500",
    status: "pending",
  },
  {
    id: "e2",
    from: "Marcus Webb",
    role: "CISO",
    avatarUrl: "https://i.pravatar.cc/150?u=marcus-webb",
    slideOrSection: "Slide 3: Risk Trends (YoY)",
    suggestion: "Include year-over-year cyber risk trend (up 23%) from vendor intelligence.",
    accentColor: "border-l-orange-400 dark:border-l-orange-500",
    status: "pending",
  },
];

type DocPart = { type: "text"; content: string } | { type: "highlight"; commentId: string };

const DOC_PARTS: DocPart[] = [
  { type: "text", content: "Semiconductor Supply Chain and Geopolitical Risks\n\nWe face risks related to semiconductor supply chain concentration and geopolitical exposure. Approximately 47% of our chip suppliers have Taiwan-based operations. Escalating tensions in the Taiwan Strait may disrupt our semiconductor supply chain, extend lead times, and " },
  { type: "highlight", commentId: "2" },
  { type: "text", content: " our ability to source critical components.\n\nWe are pursuing supplier diversification initiatives, including " },
  { type: "highlight", commentId: "1" },
  { type: "text", content: "; however, " },
  { type: "highlight", commentId: "3" },
  { type: "text", content: "." },
];

/* ------------------------------------------------------------------ */
/*  Context Packet data                                                 */
/* ------------------------------------------------------------------ */

const BUILD_STEPS = [
  "Gathering peer 10-K filings",
  "Processing earnings call transcripts",
  "Collecting related news and analysis",
  "Preparing Q&A and suggested responses",
  "Drafting press release for review",
];

type PacketSection = {
  label: string;
  icon: React.ReactNode;
  items: string[];
  color: string;
};

const PACKET_SECTIONS: PacketSection[] = [
  {
    label: "Peer 10-K Filings",
    icon: (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V5l-3-4z"/><path d="M9 1v4h4"/>
      </svg>
    ),
    color: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40",
    items: [
      "Intel Corp. 10-K (2025) — Item 1A: Geopolitical risk in Taiwan",
      "TSMC 20-F (2025) — Supply chain concentration disclosures",
      "Qualcomm 10-K (2025) — Semiconductor sourcing risk factors",
    ],
  },
  {
    label: "Earnings Call Transcripts",
    icon: (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 1a3 3 0 0 1 3 3v4a3 3 0 0 1-6 0V4a3 3 0 0 1 3-3z"/><path d="M1 9a7 7 0 0 0 14 0M8 15v1M5 16h6"/>
      </svg>
    ),
    color: "text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/40",
    items: [
      "Intel Q4 2025 earnings — \"Taiwan supply concentration remains a top 3 risk\"",
      "Broadcom Q3 2025 — \"We've begun qualification of Malaysian suppliers\"",
    ],
  },
  {
    label: "Related News & Analysis",
    icon: (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 12V6a2 2 0 0 1 2-2h6M2 14h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H5L2 5v8a1 1 0 0 0 1 1z"/>
      </svg>
    ),
    color: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40",
    items: [
      "Reuters: Taiwan military exercises escalate — semiconductor stocks drop 4%",
      "Bloomberg: Supply chain stress index reaches 5-year high amid Taiwan tensions",
      "FT: US semiconductor firms accelerate Vietnam/Malaysia diversification programs",
    ],
  },
  {
    label: "Suggested Q&A Prep",
    icon: (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="8" cy="8" r="6"/><path d="M8 12v.5M8 5a1.5 1.5 0 0 1 1.5 1.5c0 1.5-1.5 2-1.5 3"/>
      </svg>
    ),
    color: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40",
    items: [
      "Q: What percentage of your chip suppliers are Taiwan-based? A: Approximately 47% of critical chip volume flows through Taiwan-based facilities.",
      "Q: What is your diversification timeline? A: Vietnam and Malaysia qualification programs are underway; 12–18 months from meaningful volume.",
      "Q: How does this compare to peers? A: Intel and Broadcom have disclosed similar concentration; both cite 12–18 month diversification timelines.",
    ],
  },
  {
    label: "Press Release Draft",
    icon: (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 4h12M2 8h8M2 12h5"/>
      </svg>
    ),
    color: "text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-zinc-800",
    items: [
      "Draft for CMO/IRO review — Taiwan supply chain disclosure statement ready for press release integration.",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                      */
/* ------------------------------------------------------------------ */

function WorkflowStepper({ view }: { view: "feedback" | "context-packet" }) {
  const stages = view === "context-packet"
    ? WORKFLOW_STAGES.map((s) => s.id === "review" ? { ...s, status: "completed" as const } : s)
    : WORKFLOW_STAGES;

  return (
    <div className="bg-white dark:bg-zinc-900 border-b border-slate-200 dark:border-zinc-800">
      <div className="mx-auto w-full max-w-6xl px-6 py-4">
        <div className="flex items-center justify-center">
          {stages.map((stage, idx) => (
            <React.Fragment key={stage.id}>
              <div className="flex flex-col items-center gap-1.5 min-w-0">
                <div className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all",
                  stage.status === "completed" && "bg-emerald-500 border-emerald-500",
                  stage.status === "current" && "bg-white dark:bg-zinc-900 border-amber-400 dark:border-amber-500 ring-4 ring-amber-100 dark:ring-amber-900/30",
                  stage.status === "pending" && "bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-700",
                )}>
                  {stage.status === "completed" && (
                    <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 6l3 3 5-5"/>
                    </svg>
                  )}
                  {stage.status === "current" && (
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-60" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
                    </span>
                  )}
                  {stage.status === "pending" && (
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-zinc-700" />
                  )}
                </div>
                <span className={cn(
                  "text-[10px] font-semibold whitespace-nowrap",
                  stage.status === "completed" && "text-emerald-600 dark:text-emerald-400",
                  stage.status === "current" && "text-amber-600 dark:text-amber-400",
                  stage.status === "pending" && "text-slate-400 dark:text-zinc-500",
                )}>
                  {stage.label}
                </span>
              </div>
              {idx < stages.length - 1 && (
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
  );
}

/* ------------------------------------------------------------------ */
/*  Document viewer                                                     */
/* ------------------------------------------------------------------ */

function DocumentViewer({ feedback, onHighlightClick }: {
  feedback: FeedbackItem[];
  onHighlightClick: (id: string) => void;
}) {
  return (
    <div className="rounded-xl border border-black/[0.07] dark:border-zinc-800 bg-white dark:bg-zinc-950 p-5">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400 dark:text-zinc-500 mb-3">
        10-K Draft — Item 1A Risk Factors
      </p>
      <p className="text-[13px] text-slate-700 dark:text-zinc-200 leading-relaxed">
        {DOC_PARTS.map((part, i) => {
          if (part.type === "text") {
            return <span key={i} className="whitespace-pre-wrap">{part.content}</span>;
          }
          const item = feedback.find((f) => f.id === part.commentId)!;
          const displayText = item.status === "accepted" ? item.replacementText : item.originalText;
          const isPending = item.status === "pending";
          return (
            <span
              key={i}
              onClick={() => isPending && onHighlightClick(item.id)}
              className={cn(
                "rounded-sm px-0.5 cursor-pointer",
                isPending && item.highlightColor,
                item.status === "accepted" && "bg-emerald-100/70 border-b-2 border-emerald-500 dark:bg-emerald-900/20 dark:border-emerald-400",
                item.status === "declined" && "opacity-60 line-through",
              )}
              title={isPending ? `${item.from}: ${item.suggestion}` : undefined}
            >
              {displayText}
            </span>
          );
        })}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  ERM Slides                                                          */
/* ------------------------------------------------------------------ */

function ErmSlideViewer() {
  return (
    <div className="space-y-4">
      <p className="text-[12px] text-slate-400 dark:text-zinc-500">
        Generated by AI from validated risk owner context and CRO approvals.
      </p>

      {/* Slide 1 */}
      <div className="w-full aspect-video rounded-xl border border-black/[0.07] dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden p-5 flex flex-col justify-center">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400 dark:text-zinc-500 mb-2">Slide 1</p>
        <h3 className="text-[16px] font-semibold text-slate-800 dark:text-zinc-100">Enterprise Risk Management</h3>
        <p className="text-[13px] text-slate-500 dark:text-zinc-400 mt-1">Q1 2026 Board Briefing</p>
        <p className="text-[12px] text-slate-400 dark:text-zinc-500 mt-1.5">Prepared for Feb 28 Board Meeting</p>
      </div>

      {/* Slide 2 */}
      <div className="w-full aspect-video rounded-xl border border-black/[0.07] dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden p-5 flex flex-col">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400 dark:text-zinc-500 mb-3">Slide 2 — Top 5 Risks</p>
        <div className="space-y-2 flex-1">
          {[
            { name: "Taiwan Strait / Supply Chain", score: 94, sev: "Critical" as const },
            { name: "Vendor Cybersecurity Breach",  score: 91, sev: "High"     as const },
            { name: "EU Digital Markets Act",        score: 87, sev: "High"     as const },
            { name: "Regulatory Compliance",         score: 72, sev: "Medium"   as const },
            { name: "Geopolitical Instability",      score: 68, sev: "Medium"   as const },
          ].map((r, i) => (
            <div key={i} className="flex items-center justify-between gap-3">
              <span className="text-[12px] text-slate-700 dark:text-zinc-200 truncate">{r.name}</span>
              <span className={cn(
                "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold border",
                r.sev === "Critical" && "bg-red-50 border-red-200 text-red-700 dark:bg-red-950/40 dark:border-red-800 dark:text-red-400",
                r.sev === "High"     && "bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-400",
                r.sev === "Medium"   && "bg-slate-100 border-slate-300 text-slate-600 dark:bg-zinc-800 dark:border-zinc-600 dark:text-zinc-400",
              )}>{r.sev}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Slide 3 */}
      <div className="w-full aspect-video rounded-xl border border-black/[0.07] dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden p-5 flex flex-col">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400 dark:text-zinc-500 mb-3">Slide 3 — Risk Trends (YoY)</p>
        <div className="space-y-3 flex-1">
          {[
            { label: "Geopolitical", curr: 91, prev: 62, chg: "+29%" },
            { label: "Cybersecurity", curr: 78, prev: 55, chg: "+23%" },
            { label: "Supply Chain",  curr: 82, prev: 71, chg: "+11%" },
            { label: "Regulatory",    curr: 65, prev: 58, chg: "+7%"  },
          ].map((t, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="w-20 text-[11px] text-slate-500 dark:text-zinc-400 shrink-0">{t.label}</span>
              <div className="flex-1 flex gap-1.5">
                <div className="flex-1 h-3.5 bg-slate-100 dark:bg-zinc-800 rounded overflow-hidden">
                  <div className="h-full bg-slate-300 dark:bg-zinc-600 rounded" style={{ width: `${t.prev}%` }} />
                </div>
                <div className="flex-1 h-3.5 bg-slate-100 dark:bg-zinc-800 rounded overflow-hidden">
                  <div className="h-full bg-blue-400 dark:bg-blue-500 rounded" style={{ width: `${t.curr}%` }} />
                </div>
              </div>
              <span className="text-[11px] font-semibold text-red-600 dark:text-red-400 w-8 shrink-0 text-right">{t.chg}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-4 mt-2">
          <span className="text-[10px] text-slate-400 dark:text-zinc-500 flex items-center gap-1">
            <span className="inline-block w-2.5 h-2.5 rounded-sm bg-slate-300 dark:bg-zinc-600" />Prior
          </span>
          <span className="text-[10px] text-slate-400 dark:text-zinc-500 flex items-center gap-1">
            <span className="inline-block w-2.5 h-2.5 rounded-sm bg-blue-400 dark:bg-blue-500" />Current
          </span>
        </div>
      </div>

      {/* Slide 4 */}
      <div className="w-full aspect-video rounded-xl border border-black/[0.07] dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden p-5 flex flex-col">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400 dark:text-zinc-500 mb-3">Slide 4 — Changes from Prior Cycle</p>
        <ul className="text-[13px] text-slate-700 dark:text-zinc-200 space-y-2 list-disc list-inside flex-1">
          <li>Taiwan Strait elevated to Critical (new)</li>
          <li>CloudSecure vendor breach — added to Top 5</li>
          <li>EU DMA enforcement — increased scrutiny</li>
          <li>Supply chain diversification (Vietnam) — in progress</li>
        </ul>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Comment card                                                        */
/* ------------------------------------------------------------------ */

function CommentCard({
  from, role, avatarUrl, label, body, accentColor, status,
  onAccept, onDecline,
}: {
  from: string; role: string; avatarUrl: string;
  label: string; body: string; accentColor: string;
  status: "pending" | "accepted" | "declined";
  onAccept: () => void; onDecline: () => void;
}) {
  return (
    <div className={cn(
      "rounded-xl border border-l-4 p-3.5 transition-all",
      accentColor,
      status === "pending"  && "border-black/[0.07] dark:border-zinc-800 bg-white dark:bg-zinc-900",
      status === "accepted" && "border-emerald-200 dark:border-emerald-800 bg-emerald-50/60 dark:bg-emerald-950/20 border-l-emerald-500",
      status === "declined" && "border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/50 opacity-60 border-l-slate-300 dark:border-l-zinc-600",
    )}>
      <div className="flex items-center gap-2 mb-1.5">
        <img src={avatarUrl} alt="" className="h-6 w-6 rounded-full object-cover shrink-0" />
        <div className="min-w-0">
          <p className="text-[12px] font-semibold text-slate-800 dark:text-zinc-100 truncate">{from}</p>
          <p className="text-[10px] text-slate-400 dark:text-zinc-500">{role}</p>
        </div>
      </div>
      {label && (
        <p className="text-[11px] font-mono text-slate-400 dark:text-zinc-500 mb-1 truncate">"{label}"</p>
      )}
      <p className="text-[12px] text-slate-600 dark:text-zinc-300 leading-relaxed mb-2.5">{body}</p>

      {status === "pending" ? (
        <div className="flex gap-1.5">
          <button
            onClick={onAccept}
            className="flex-1 text-[11px] font-semibold text-white bg-slate-800 dark:bg-zinc-100 dark:text-zinc-900 rounded-lg py-1.5 hover:bg-slate-900 dark:hover:bg-white transition-colors"
          >
            Accept
          </button>
          <button
            onClick={onDecline}
            className="flex-1 text-[11px] font-semibold text-slate-400 dark:text-zinc-500 border border-black/[0.09] dark:border-zinc-700 rounded-lg py-1.5 hover:text-slate-600 dark:hover:text-zinc-300 transition-colors"
          >
            Decline
          </button>
        </div>
      ) : (
        <p className={cn(
          "text-[11px] font-semibold",
          status === "accepted" ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400 dark:text-zinc-500",
        )}>
          {status === "accepted" ? "✓ Accepted" : "Declined"}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Context Packet modal                                                */
/* ------------------------------------------------------------------ */

function ContextPacketModal({
  onAccept,
  onSkip,
}: {
  onAccept: () => void;
  onSkip: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/60 p-4">
      <div
        className="w-full max-w-lg rounded-3xl border border-black/[0.09] dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-[0_24px_80px_rgba(0,0,0,0.18)] p-7"
        style={{ animation: "confirmModalIn 220ms cubic-bezier(0.22,1,0.36,1) both" }}
      >
        <div className="flex items-start gap-4 mb-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-black/[0.09] dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800">
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600 dark:text-zinc-300">
              <path d="M4 6h8M4 9h5M3 1h10a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/>
            </svg>
          </div>
          <div>
            <h3 className="text-[16px] font-semibold text-slate-800 dark:text-zinc-100">Create Context Packet</h3>
            <p className="text-[12px] text-slate-400 dark:text-zinc-500 mt-0.5">Recommended before sending to Disclosure Committee</p>
          </div>
        </div>

        <p className="text-[13px] text-slate-600 dark:text-zinc-300 leading-relaxed mb-3">
          You've reviewed the 10-K and ERM deck. Before routing to the Disclosure Committee, Diligent recommends building a Context Packet:
        </p>
        <ul className="text-[13px] text-slate-600 dark:text-zinc-300 space-y-1.5 mb-4">
          {[
            "Peer 10-K filings",
            "Earnings call transcripts from peers on similar risks",
            "Related news and analyst commentary",
            "Suggested Q&A to prepare for disclosure discussion",
            "Press release draft for CMO and IRO review",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-slate-400 dark:bg-zinc-500 mt-2 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <p className="text-[12px] text-slate-400 dark:text-zinc-500 leading-relaxed mb-5">
          If you accept, next time we'll do this automatically and you can just review the packet.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onSkip}
            className="flex-1 text-[13px] font-normal text-slate-500 dark:text-zinc-400 bg-white dark:bg-zinc-800 border border-black/[0.09] dark:border-zinc-700 rounded-xl py-[10px] hover:bg-slate-50 dark:hover:bg-zinc-700 transition-colors"
          >
            Skip for now
          </button>
          <button
            onClick={onAccept}
            className="flex-1 text-[13px] font-normal text-white dark:text-zinc-900 bg-slate-800 dark:bg-zinc-100 rounded-xl py-[10px] hover:bg-slate-900 dark:hover:bg-white transition-colors"
          >
            Create Context Packet
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Context Packet view                                                 */
/* ------------------------------------------------------------------ */

function ContextPacketView({ onContinue }: { onContinue: () => void }) {
  const [buildStep, setBuildStep] = useState(0);
  const [isBuilding, setIsBuilding] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setBuildStep((prev) => {
        if (prev >= BUILD_STEPS.length - 1) {
          clearInterval(interval);
          setTimeout(() => setIsBuilding(false), 500);
          return prev;
        }
        return prev + 1;
      });
    }, 750);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mx-auto w-full max-w-6xl px-6 pb-6 pt-6">
      {/* Header card */}
      <div className="rounded-[20px] border border-black/[0.09] dark:border-zinc-700 bg-white dark:bg-zinc-900 p-[22px_24px] mb-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-1">
              {isBuilding ? (
                <div className="w-4 h-4 border-2 border-slate-400 dark:border-zinc-500 border-t-transparent rounded-full animate-spin" />
              ) : (
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              )}
              <h2 className="text-[16px] font-semibold text-slate-800 dark:text-zinc-100">
                {isBuilding ? "Building Context Packet…" : "Context Packet ready"}
              </h2>
            </div>
            <p className="text-[13px] text-slate-500 dark:text-zinc-400">
              Peer filings, transcripts, news, Q&A prep, and press release draft
            </p>
          </div>
          {!isBuilding && (
            <button
              onClick={onContinue}
              className="flex items-center gap-2 text-[13px] font-normal text-white dark:text-zinc-900 bg-slate-800 dark:bg-zinc-100 rounded-xl py-[9px] px-4 hover:bg-slate-900 dark:hover:bg-white transition-colors"
            >
              Send to CEO
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 8h10M9 4l4 4-4 4"/>
              </svg>
            </button>
          )}
        </div>

        {isBuilding && (
          <div className="mt-4 space-y-2">
            {BUILD_STEPS.map((step, i) => (
              <div key={step} className="flex items-center gap-2.5">
                {i < buildStep ? (
                  <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                    <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 6l3 3 5-5"/>
                    </svg>
                  </div>
                ) : i === buildStep ? (
                  <div className="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-slate-200 dark:border-zinc-700 shrink-0" />
                )}
                <span className={cn(
                  "text-[12px]",
                  i < buildStep && "text-emerald-600 dark:text-emerald-400",
                  i === buildStep && "text-amber-600 dark:text-amber-400 font-semibold",
                  i > buildStep && "text-slate-400 dark:text-zinc-500",
                )}>
                  {step}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Packet sections */}
      {!isBuilding && (
        <div className="space-y-3">
          {PACKET_SECTIONS.map((section, idx) => (
            <div
              key={section.label}
              className="suggestion-card rounded-[20px] border border-black/[0.09] dark:border-zinc-700 bg-white dark:bg-zinc-900 p-[22px_24px]"
              style={{ animationDelay: `${idx * 80}ms` }}
            >
              <div className="flex items-center gap-2.5 mb-3">
                <div className={cn("flex h-7 w-7 items-center justify-center rounded-lg", section.color)}>
                  {section.icon}
                </div>
                <h3 className="text-[13px] font-semibold text-slate-800 dark:text-zinc-100">{section.label}</h3>
              </div>
              <ul className="space-y-2">
                {section.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-zinc-600 mt-2 shrink-0" />
                    <p className="text-[12px] text-slate-500 dark:text-zinc-400 leading-relaxed">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function GcReviewPage() {
  const [view, setView] = useState<"feedback" | "context-packet">("feedback");
  const [activeTab, setActiveTab] = useState<"10k" | "erm">("10k");
  const [feedback, setFeedback] = useState<FeedbackItem[]>(TEAM_FEEDBACK);
  const [ermFeedback, setErmFeedback] = useState<ErmFeedbackItem[]>(ERM_FEEDBACK);
  const [showPacketModal, setShowPacketModal] = useState(false);
  const [focusedCommentId, setFocusedCommentId] = useState<string | null>(null);

  const pending10k = feedback.filter((f) => f.status === "pending").length;
  const pendingErm = ermFeedback.filter((f) => f.status === "pending").length;
  const allResolved = pending10k === 0 && pendingErm === 0;

  const handleAccept = (id: string) =>
    setFeedback((prev) => prev.map((f) => f.id === id ? { ...f, status: "accepted" as const } : f));
  const handleDecline = (id: string) =>
    setFeedback((prev) => prev.map((f) => f.id === id ? { ...f, status: "declined" as const } : f));
  const handleErmAccept = (id: string) =>
    setErmFeedback((prev) => prev.map((f) => f.id === id ? { ...f, status: "accepted" as const } : f));
  const handleErmDecline = (id: string) =>
    setErmFeedback((prev) => prev.map((f) => f.id === id ? { ...f, status: "declined" as const } : f));

  return (
    <div className="min-h-screen bg-[#f0f0f1] dark:bg-zinc-950">
      <ProtoPanel description="F2 — GC Review & Context Packet" stateToggle={false} />

      {/* Nav */}
      <nav className="border-b border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-3.5">
          <div className="flex items-center gap-2.5">
            <DiligentLogoFull />
            <span className="text-xs font-semibold tracking-tight text-slate-800 dark:text-zinc-100">GRC Command Center</span>
            <span className="text-slate-300 dark:text-zinc-700 mx-1">·</span>
            <span className="text-xs text-slate-500 dark:text-zinc-400">GC Review</span>
          </div>
          <div className="flex items-center gap-3">
            <img src="https://randomuser.me/api/portraits/med/women/65.jpg" alt="" className="h-7 w-7 rounded-full object-cover" />
            <div className="leading-none">
              <p className="text-[12px] font-semibold text-slate-800 dark:text-zinc-100">Sarah Mitchell</p>
              <p className="text-[11px] text-slate-400 dark:text-zinc-500">General Counsel</p>
            </div>
          </div>
        </div>
      </nav>

      {/* Workflow stepper */}
      <WorkflowStepper view={view} />

      {view === "feedback" ? (
        <>
          {/* Tab bar + CTA */}
          <div className="bg-white dark:bg-zinc-900 border-b border-slate-200 dark:border-zinc-800">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-0">
              {/* Tabs */}
              <div className="flex">
                {[
                  { id: "10k", label: "Review 10-K", count: pending10k },
                  { id: "erm", label: "Review ERM Slides", count: pendingErm },
                ] .map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as "10k" | "erm")}
                    className={cn(
                      "flex items-center gap-2 px-4 py-3.5 text-[13px] font-semibold border-b-2 -mb-px transition-colors",
                      activeTab === tab.id
                        ? "border-slate-800 dark:border-zinc-100 text-slate-800 dark:text-zinc-100"
                        : "border-transparent text-slate-400 dark:text-zinc-500 hover:text-slate-600 dark:hover:text-zinc-300",
                    )}
                  >
                    {tab.label}
                    {tab.count > 0 && (
                      <span className="rounded-full bg-amber-100 dark:bg-amber-900/40 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400 px-1.5 py-0.5 text-[10px] font-semibold">
                        {tab.count}
                      </span>
                    )}
                    {tab.count === 0 && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    )}
                  </button>
                ))}
              </div>

              {/* CTA */}
              <button
                onClick={() => allResolved && setShowPacketModal(true)}
                disabled={!allResolved}
                className={cn(
                  "flex items-center gap-2 text-[13px] font-normal rounded-xl py-[7px] px-4 transition-colors",
                  allResolved
                    ? "text-white dark:text-zinc-900 bg-slate-800 dark:bg-zinc-100 hover:bg-slate-900 dark:hover:bg-white"
                    : "text-slate-300 dark:text-zinc-600 bg-slate-100 dark:bg-zinc-800 cursor-not-allowed",
                )}
              >
                {allResolved ? "Approve edits" : `Resolve ${pending10k + pendingErm} remaining`}
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8h10M9 4l4 4-4 4"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Split content */}
          <div className="mx-auto w-full max-w-6xl px-6 pt-5 pb-8">
            <div className="flex gap-4 items-start">
              {/* Left: document / slides */}
              <div className="flex-1 min-w-0">
                {activeTab === "10k" ? (
                  <DocumentViewer
                    feedback={feedback}
                    onHighlightClick={(id) => setFocusedCommentId(id)}
                  />
                ) : (
                  <ErmSlideViewer />
                )}
              </div>

              {/* Right: comments */}
              <div className="w-[280px] shrink-0 space-y-2.5">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400 dark:text-zinc-500">
                  Comments{" "}
                  ({activeTab === "10k" ? pending10k : pendingErm} pending)
                </p>

                {activeTab === "10k"
                  ? feedback.map((item) => (
                    <div
                      key={item.id}
                      className={cn(focusedCommentId === item.id && "ring-2 ring-slate-800/20 dark:ring-zinc-100/20 rounded-xl")}
                    >
                      <CommentCard
                        from={item.from}
                        role={item.role}
                        avatarUrl={item.avatarUrl}
                        label={item.originalText}
                        body={item.suggestion}
                        accentColor={item.borderColor}
                        status={item.status}
                        onAccept={() => handleAccept(item.id)}
                        onDecline={() => handleDecline(item.id)}
                      />
                    </div>
                  ))
                  : ermFeedback.map((item) => (
                    <CommentCard
                      key={item.id}
                      from={item.from}
                      role={item.role}
                      avatarUrl={item.avatarUrl}
                      label={item.slideOrSection}
                      body={item.suggestion}
                      accentColor={item.accentColor}
                      status={item.status}
                      onAccept={() => handleErmAccept(item.id)}
                      onDecline={() => handleErmDecline(item.id)}
                    />
                  ))
                }
              </div>
            </div>
          </div>
        </>
      ) : (
        <ContextPacketView onContinue={() => {}} />
      )}

      {/* Context Packet modal */}
      {showPacketModal && (
        <ContextPacketModal
          onAccept={() => {
            setShowPacketModal(false);
            setView("context-packet");
          }}
          onSkip={() => {
            setShowPacketModal(false);
            // In a full flow this would navigate to CEO notification
          }}
        />
      )}
    </div>
  );
}
