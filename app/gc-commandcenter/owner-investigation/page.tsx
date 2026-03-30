"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ProtoPanel } from "../../components/ProtoPanel";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/* ------------------------------------------------------------------ */
/*  SVG assets                                                         */
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
/*  Blurred dashboard background                                       */
/* ------------------------------------------------------------------ */

function DashboardBackground() {
  const STEPS = [
    { label: "Detect",      done: true },
    { label: "Assign",      done: true },
    { label: "Investigate", current: true },
    { label: "Draft",       done: false },
    { label: "Review",      done: false },
    { label: "File",        done: false },
  ];

  const CARDS = [
    { severity: "Critical", width: "w-60", color: "bg-red-50 dark:bg-red-950/20" },
    { severity: "High",     width: "w-52", color: "bg-amber-50 dark:bg-amber-950/20" },
    { severity: "High",     width: "w-48", color: "bg-amber-50 dark:bg-amber-950/20" },
  ];

  return (
    <div className="min-h-screen bg-[#f0f0f1] dark:bg-zinc-950" aria-hidden="true">
      {/* Nav */}
      <nav className="border-b border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-3.5">
          <div className="flex items-center gap-2.5">
            <DiligentLogoFull />
            <span className="text-xs font-semibold tracking-tight text-slate-800 dark:text-zinc-100">GRC Command Center</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800" />
            <div className="h-5 w-px bg-slate-200 dark:bg-zinc-700" />
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-slate-200 dark:bg-zinc-700" />
              <div className="space-y-1">
                <div className="h-2.5 w-20 rounded bg-slate-200 dark:bg-zinc-700" />
                <div className="h-2 w-14 rounded bg-slate-100 dark:bg-zinc-800" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative overflow-hidden border-b border-slate-200 dark:border-zinc-800">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 90% 100% at 50% 0%, rgba(245,158,11,0.04) 0%, transparent 100%)" }} />
        <div className="relative mx-auto max-w-2xl px-6 pt-10 pb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 dark:border-amber-800 bg-white dark:bg-zinc-900 px-4 py-1.5 mb-5">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="text-[13px] font-semibold text-amber-700 dark:text-amber-400">3 Risks Detected</span>
          </div>
          <h1 className="text-[2.5rem] font-light tracking-[-0.02em] text-slate-800 dark:text-zinc-100 leading-[1.15] mb-3">
            Risks detected that may need disclosure.
          </h1>
          <p className="text-[13px] text-slate-500 dark:text-zinc-400 leading-relaxed mb-7 max-w-md mx-auto">
            3 emerging risks requiring owner assignment and investigation before disclosure review.
          </p>
          <div className="flex items-center justify-center gap-3">
            {[["3", "Risks Detected"], ["3", "Owners Needed"], ["2", "Days to Review"]].map(([n, label]) => (
              <div key={label} className="w-28 h-20 rounded-xl border border-black/[0.09] dark:border-zinc-700 bg-white dark:bg-zinc-900 flex flex-col items-center justify-center">
                <span className="text-[22px] font-semibold text-slate-800 dark:text-zinc-100">{n}</span>
                <span className="text-[11px] text-slate-400 dark:text-zinc-500">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="mx-auto w-full max-w-6xl px-6 pt-6 space-y-4">
        {/* Workflow stepper */}
        <div className="rounded-[20px] border border-black/[0.09] dark:border-zinc-700 bg-white dark:bg-zinc-900 p-[22px_24px]">
          <div className="flex items-center justify-center">
            {STEPS.map((s, i) => (
              <React.Fragment key={s.label}>
                <div className="flex flex-col items-center gap-1.5">
                  <div className={cn(
                    "h-7 w-7 rounded-full border-2",
                    s.done    && "bg-emerald-500 border-emerald-500",
                    s.current && "border-amber-400 bg-white dark:bg-zinc-900",
                    !s.done && !s.current && "border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900"
                  )} />
                  <span className={cn(
                    "text-[10px] font-semibold",
                    s.done    && "text-emerald-600 dark:text-emerald-400",
                    s.current && "text-amber-600 dark:text-amber-400",
                    !s.done && !s.current && "text-slate-400 dark:text-zinc-500"
                  )}>{s.label}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={cn("flex-1 h-0.5 mx-1 mb-4 rounded-full", s.done ? "bg-emerald-400 dark:bg-emerald-600" : "bg-slate-200 dark:bg-zinc-700")} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Risk card skeletons */}
        {CARDS.map((card, i) => (
          <div key={i} className="rounded-[20px] border border-black/[0.09] dark:border-zinc-700 bg-white dark:bg-zinc-900 p-[22px_24px]">
            <div className="flex gap-4">
              <div className="flex-1 space-y-2.5">
                <div className="flex items-center gap-2">
                  <div className={cn("h-5 w-14 rounded-full border", card.color,
                    card.severity === "Critical" ? "border-red-200 dark:border-red-800" : "border-amber-200 dark:border-amber-800")} />
                  <div className="h-3 w-28 rounded bg-slate-100 dark:bg-zinc-800" />
                </div>
                <div className={cn("h-4 rounded bg-slate-100 dark:bg-zinc-800", card.width)} />
                <div className="h-3 w-40 rounded bg-slate-50 dark:bg-zinc-800/60" />
                <div className="mt-2 h-14 rounded-xl border border-blue-100 dark:border-blue-900/30 bg-blue-50/40 dark:bg-blue-950/10" />
              </div>
              <div className="w-[200px] flex-shrink-0 border-l border-black/[0.05] dark:border-zinc-800 pl-5 flex flex-col items-center justify-center gap-2">
                <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-zinc-700" />
                <div className="h-3 w-20 rounded bg-slate-100 dark:bg-zinc-800" />
                <div className="h-2.5 w-16 rounded bg-slate-50 dark:bg-zinc-800/60" />
                <div className="mt-1 flex gap-1.5 w-full">
                  <div className="flex-1 h-6 rounded-lg bg-slate-800/10 dark:bg-zinc-600/30" />
                  <div className="flex-1 h-6 rounded-lg bg-slate-100 dark:bg-zinc-800 border border-black/[0.09] dark:border-zinc-700" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Risk + owner data                                                  */
/* ------------------------------------------------------------------ */

const RISK_DATA: Record<string, { name: string; severity: string; summary: string; aiAnalysis: string; disclosureRec: string }> = {
  "taiwan": {
    name: "Taiwan Strait Geopolitical Tensions",
    severity: "Critical",
    summary: "Escalating tensions in the Taiwan Strait may disrupt semiconductor supply chain. 47% of chip suppliers have Taiwan-based operations.",
    aiAnalysis: `CURRENT STATE
• 47% of semiconductor suppliers have Taiwan-based manufacturing
• 23% of annual chip procurement flows through Taiwan facilities
• Current 10-K mentions "general supply chain risks" — no geographic specificity

PRIOR BOARD CONTEXT (Q3 2025)
• Board discussed geographic diversification; Vietnam flagged as potential target
• Supply chain resilience initiative referenced in August board materials
• Strategic planning committee noted Southeast Asia diversification in pipeline

RISK FACTORS
• Recent military exercises increased shipping disruption risk by 340%
• Insurance costs for Taiwan-sourced components up 67% YoY
• Lead times extended 2–4 weeks for Taiwan-manufactured chips`,
    disclosureRec: "Add specific language to 10-K Item 1A Risk Factors addressing semiconductor supply concentration in Taiwan region and potential impact of geopolitical disruption on operations.",
  },
  "cyber": {
    name: "Critical Vendor Cybersecurity Breach",
    severity: "High",
    summary: "CloudSecure Inc. ransomware incident affects 3 data processing agreements with 2.3M customer records.",
    aiAnalysis: `CURRENT STATE
• CloudSecure Inc. reported ransomware incident affecting 3 of our DPAs
• 2.3M customer records potentially exposed
• Current 10-K has general cybersecurity risk factors only

RISK FACTORS
• Vendor holds PII under 3 active data processing agreements
• Breach scope not yet fully determined by CloudSecure
• Regulatory notification windows may be triggered under GDPR / CCPA`,
    disclosureRec: "Assess materiality for potential 8-K filing; update 10-K Risk Factors with vendor concentration and third-party breach exposure.",
  },
  "dma": {
    name: "EU Digital Markets Act Enforcement",
    severity: "High",
    summary: "EC enforcement actions against 3 peer companies. EU operations (23% of revenue) may face similar scrutiny.",
    aiAnalysis: `CURRENT STATE
• EC enforcement actions against 3 peer companies in our sector
• EU operations represent 23% of annual revenue
• Current 10-K has general regulatory risk factors only

RISK FACTORS
• Enforcement accelerating — 12 actions in 6 months vs. 4 prior year
• 3 peer companies downgraded on DMA exposure
• Potential fines up to 10% of global annual turnover`,
    disclosureRec: "Add EU Digital Markets Act-specific risk factor to 10-K Item 1A; consider updating geographic revenue disclosure.",
  },
};

const OWNER_DATA: Record<string, { name: string; title: string; avatarUrl: string }> = {
  "diana-reyes": { name: "Diana Reyes", title: "VP, Supply Chain",           avatarUrl: "https://randomuser.me/api/portraits/med/women/44.jpg" },
  "marcus-webb":  { name: "Marcus Webb",  title: "CISO",                      avatarUrl: "https://i.pravatar.cc/150?u=marcus-webb" },
  "james-park":   { name: "James Park",   title: "Chief Compliance Officer",  avatarUrl: "https://i.pravatar.cc/150?u=james-park" },
};

/* ------------------------------------------------------------------ */
/*  Chat types                                                         */
/* ------------------------------------------------------------------ */

type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  content: string;
  component?: React.ReactNode;
};

type Step = "welcome" | "context" | "severity" | "disclosure" | "complete";

/* ------------------------------------------------------------------ */
/*  Investigation content                                              */
/* ------------------------------------------------------------------ */

function InvestigationContent() {
  const searchParams = useSearchParams();
  const riskId  = searchParams?.get("risk")  || "taiwan";
  const ownerId = searchParams?.get("owner") || "diana-reyes";

  const risk  = RISK_DATA[riskId]  ?? RISK_DATA["taiwan"];
  const owner = OWNER_DATA[ownerId] ?? OWNER_DATA["diana-reyes"];

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input,    setInput]    = useState("");
  const [step,     setStep]     = useState<Step>("welcome");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef       = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  // Step 1 — initial greeting
  useEffect(() => {
    if (messages.length > 0) return;
    const t = setTimeout(() => {
      setMessages([{
        id: "1",
        role: "assistant",
        content: `Hi ${owner.name.split(" ")[0]}, you've been assigned to investigate a risk that requires your domain expertise. The General Counsel needs your input before proceeding to draft 10-K disclosure updates.`,
      }]);
    }, 300);
    return () => clearTimeout(t);
  }, [owner.name, messages.length]);

  // Step 2 — show AI analysis after greeting
  useEffect(() => {
    if (messages.length !== 1) return;
    const t = setTimeout(() => {
      setMessages(prev => {
        if (prev.length !== 1) return prev;
        return [...prev, {
          id: "2",
          role: "assistant",
          content: "Here's the risk you've been assigned and the AI analysis for your review:",
          component: (
            <div className="mt-3 space-y-3">
              {/* Risk summary card */}
              <div className="rounded-xl border border-black/[0.09] dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className={cn(
                    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold",
                    risk.severity === "Critical"
                      ? "bg-red-50 border-red-200 text-red-700 dark:bg-red-950/40 dark:border-red-800 dark:text-red-400"
                      : "bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-400"
                  )}>
                    {risk.severity}
                  </span>
                  <span className="text-[13px] font-semibold text-slate-800 dark:text-zinc-100">{risk.name}</span>
                </div>
                <p className="text-[12px] text-slate-500 dark:text-zinc-400 leading-relaxed mb-3">{risk.summary}</p>
                {/* AI analysis inset */}
                <div className="rounded-lg border border-blue-200/60 dark:border-blue-900/30 bg-blue-50/40 dark:bg-blue-950/10 px-3.5 py-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-blue-500/70 dark:text-blue-400/60 mb-2">AI Analysis</p>
                  <p className="text-[12px] text-slate-600 dark:text-zinc-400 leading-relaxed whitespace-pre-wrap">{risk.aiAnalysis}</p>
                </div>
              </div>
              <p className="text-[13px] font-semibold text-slate-800 dark:text-zinc-100">
                Based on your domain expertise, what additional context can you provide about this risk?
              </p>
              <p className="text-[12px] text-slate-400 dark:text-zinc-500">
                For example: supplier diversification plans, timeline to impact, or controls already in place.
              </p>
            </div>
          ),
        }];
      });
      setStep("context");
      setTimeout(scrollToBottom, 50);
    }, 800);
    return () => clearTimeout(t);
  }, [messages.length, risk]);

  useEffect(() => { scrollToBottom(); }, [messages]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || step !== "context") return;

    setMessages(prev => [...prev, {
      id: `u-${Date.now()}`,
      role: "user",
      content: trimmed,
    }]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: `a-${Date.now()}`,
        role: "assistant",
        content: `Thank you for that context. I've added it to the risk analysis. The AI assessed this risk as ${risk.severity.toUpperCase()}. Based on your domain expertise, do you agree with this severity assessment?`,
        component: (
          <div className="mt-3 flex flex-wrap gap-2">
            {[
              { value: "agree"     as const, label: `Agree — ${risk.severity.toUpperCase()}` },
              { value: "downgrade" as const, label: "Should be lower" },
              { value: "upgrade"   as const, label: "Not a risk" },
            ].map(opt => (
              <button
                key={opt.value}
                onClick={() => handleSeveritySelect(opt.value)}
                className="rounded-lg border border-black/[0.09] dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-1.5 text-[12px] font-semibold text-slate-600 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-700 hover:border-slate-200 dark:hover:border-zinc-600 transition-colors"
              >
                {opt.label}
              </button>
            ))}
          </div>
        ),
      }]);
      setStep("severity");
      setIsLoading(false);
    }, 1000);
  };

  const handleSeveritySelect = (choice: "agree" | "upgrade" | "downgrade") => {
    const labels = { agree: `Agree — ${risk.severity.toUpperCase()}`, upgrade: "Not a risk", downgrade: "Should be lower" };
    setMessages(prev => [...prev, { id: `u-${Date.now()}`, role: "user", content: labels[choice] }]);
    setIsLoading(true);

    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: `a-${Date.now()}`,
        role: "assistant",
        content: "Got it. Finally, please confirm the disclosure recommendation. Diligent AI suggests the following update for the 10-K:",
        component: (
          <div className="mt-3 space-y-3">
            <div className="rounded-xl border border-blue-200/60 dark:border-blue-900/30 bg-blue-50/40 dark:bg-blue-950/10 px-3.5 py-3">
              <p className="text-[12px] text-slate-600 dark:text-zinc-400 leading-relaxed">{risk.disclosureRec}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleDisclosureConfirm}
                className="rounded-lg bg-slate-800 dark:bg-zinc-100 px-3 py-1.5 text-[12px] font-semibold text-white dark:text-zinc-900 hover:bg-slate-900 dark:hover:bg-white transition-colors"
              >
                Confirm recommendation
              </button>
              <button
                onClick={handleDisclosureReject}
                className="rounded-lg border border-black/[0.09] dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-1.5 text-[12px] font-semibold text-slate-500 dark:text-zinc-400 hover:border-red-200 dark:hover:border-red-800 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              >
                Request changes
              </button>
            </div>
          </div>
        ),
      }]);
      setStep("disclosure");
      setIsLoading(false);
    }, 600);
  };

  const handleDisclosureConfirm = () => {
    setMessages(prev => [...prev, { id: `u-${Date.now()}`, role: "user", content: "Confirm recommendation" }]);
    setIsLoading(true);

    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: `a-${Date.now()}`,
        role: "assistant",
        content: "Investigation complete. Your input has been added to the risk analysis. The General Counsel will proceed to draft the 10-K disclosure update. Once all owners complete their investigations, the workflow continues to drafting.",
        component: (
          <div className="mt-3 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20 p-4">
            <div className="flex items-center gap-2 mb-2 text-emerald-700 dark:text-emerald-400">
              <svg width="14" height="14" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 6l3 3 5-5" />
              </svg>
              <span className="text-[13px] font-semibold">Investigation submitted</span>
            </div>
            <p className="text-[12px] text-slate-500 dark:text-zinc-400 leading-relaxed mb-1.5">
              Thank you. Your responses have been recorded and the GC will be notified.
            </p>
            <p className="text-[12px] text-slate-400 dark:text-zinc-500">
              Reference ID: INV-{riskId.toUpperCase()}-2026
            </p>
          </div>
        ),
      }]);
      setStep("complete");
      setIsLoading(false);
    }, 800);
  };

  const handleDisclosureReject = () => {
    const ts = Date.now();
    setMessages(prev => [...prev,
      { id: `u-${ts}`,   role: "user",      content: "Request changes" },
      { id: `a-${ts+1}`, role: "assistant", content: "I've flagged your request for changes. The General Counsel will review and may reach out for clarification. Add a note below if you'd like to specify what should be revised.",
        component: (
          <div className="mt-3 space-y-2">
            <textarea
              placeholder="Describe what changes you'd recommend..."
              className="w-full rounded-xl border border-black/[0.09] dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 px-3 py-2 text-[12px] text-slate-700 dark:text-zinc-200 placeholder-slate-400 dark:placeholder-zinc-500 focus:border-slate-300 dark:focus:border-zinc-500 focus:outline-none resize-none"
              rows={3}
            />
            <button
              onClick={() => {
                setMessages(prev => [...prev, {
                  id: `a-${Date.now()}`, role: "assistant",
                  content: "Your feedback has been submitted. The GC will review before drafting.",
                }]);
                setStep("complete");
              }}
              className="rounded-lg bg-slate-800 dark:bg-zinc-100 px-3 py-1.5 text-[12px] font-semibold text-white dark:text-zinc-900 hover:bg-slate-900 dark:hover:bg-white transition-colors"
            >
              Submit feedback
            </button>
          </div>
        ),
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-[#f0f0f1] dark:bg-zinc-950">
      <ProtoPanel
        description={`Viewing as: ${owner.name} · Risk Owner Investigation`}
        stateToggle={false}
      />

      {/* Fixed blurred dashboard background */}
      <div
        className="fixed inset-0 overflow-hidden pointer-events-none"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      >
        <DashboardBackground />
      </div>
      <div
        className="fixed inset-0 pointer-events-none backdrop-blur-[5px] bg-[#f0f0f1]/65 dark:bg-zinc-950/70"
        style={{ zIndex: 1 }}
        aria-hidden="true"
      />

      {/* Chat panel layer */}
      <div
        className="relative flex items-center justify-center px-6 py-8"
        style={{ minHeight: "calc(100vh - 40px)", zIndex: 10 }}
      >
        <div className="w-full max-w-[480px]">
          {/* Chat panel */}
          <div
            className="flex flex-col overflow-hidden rounded-[20px] border border-black/[0.09] dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-[0_20px_60px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.50)]"
            style={{ height: "min(600px, calc(100vh - 120px))" }}
          >
            {/* Panel header */}
            <div className="flex flex-shrink-0 items-center justify-between border-b border-black/[0.09] dark:border-zinc-700 px-5 py-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg border border-black/[0.05] dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 p-1">
                  <DiligentLogoFull />
                </div>
                <div>
                  <p className="text-[12px] font-semibold text-slate-800 dark:text-zinc-100">Risk Investigation</p>
                  <p className="text-[11px] text-slate-400 dark:text-zinc-500 truncate max-w-[160px]">{risk.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <img src={owner.avatarUrl} alt={owner.name} className="h-7 w-7 rounded-full object-cover flex-shrink-0" />
                <div className="text-right">
                  <p className="text-[12px] font-semibold text-slate-800 dark:text-zinc-100">{owner.name}</p>
                  <p className="text-[11px] text-slate-400 dark:text-zinc-500">{owner.title}</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 min-h-0 overflow-y-auto px-4 py-5 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={cn("flex gap-2.5", msg.role === "user" && "flex-row-reverse")}>
                  {/* Avatar */}
                  {msg.role === "assistant" && (
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-black/[0.09] dark:border-zinc-700 bg-white dark:bg-zinc-800 p-1 mt-0.5">
                      <DiligentLogoFull />
                    </div>
                  )}
                  {msg.role === "user" && (
                    <img src={owner.avatarUrl} alt={owner.name} className="h-7 w-7 flex-shrink-0 rounded-full object-cover mt-0.5" />
                  )}
                  {/* Bubble */}
                  <div className={cn("min-w-0 max-w-[85%]", msg.role === "user" && "flex justify-end")}>
                    <div className={cn(
                      "rounded-2xl px-4 py-3",
                      msg.role === "assistant"
                        ? "rounded-tl-sm border border-black/[0.09] dark:border-zinc-700 bg-white dark:bg-zinc-800"
                        : "rounded-tr-sm bg-slate-100 dark:bg-zinc-700"
                    )}>
                      <p className="text-[13px] leading-relaxed text-slate-700 dark:text-zinc-200">{msg.content}</p>
                      {msg.component}
                    </div>
                  </div>
                </div>
              ))}

              {/* Loading dots */}
              {isLoading && (
                <div className="flex gap-2.5">
                  <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-black/[0.09] dark:border-zinc-700 bg-white dark:bg-zinc-800 p-1 mt-0.5">
                    <DiligentLogoFull />
                  </div>
                  <div className="rounded-2xl rounded-tl-sm border border-black/[0.09] dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-3">
                    <div className="flex gap-1 items-center h-4">
                      {[0, 150, 300].map(delay => (
                        <span
                          key={delay}
                          className="h-2 w-2 rounded-full bg-slate-300 dark:bg-zinc-500 animate-bounce"
                          style={{ animationDelay: `${delay}ms` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input — only during context step */}
            {step === "context" && (
              <div className="flex-shrink-0 border-t border-black/[0.09] dark:border-zinc-700 p-3">
                <div className="flex items-center gap-2 rounded-xl border border-black/[0.09] dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 p-2">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-black/[0.05] dark:border-zinc-700 bg-white dark:bg-zinc-900 p-1">
                    <DiligentLogoFull />
                  </div>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Add context from your expertise…"
                    className="flex-1 bg-transparent text-[13px] text-slate-800 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none"
                    disabled={isLoading}
                    autoFocus
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    className={cn(
                      "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg transition-colors",
                      input.trim() && !isLoading
                        ? "bg-slate-800 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-slate-900 dark:hover:bg-white"
                        : "bg-slate-100 dark:bg-zinc-700 text-slate-300 dark:text-zinc-500"
                    )}
                  >
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2L7 9M14 2l-4.5 12L7 9 2 6.5 14 2z" />
                    </svg>
                  </button>
                </div>
                <p className="mt-1.5 px-1 text-[11px] text-slate-400 dark:text-zinc-500">
                  Your response will be shared with the CRO and used to inform the 10-K disclosure draft.
                </p>
              </div>
            )}

            {/* Complete state — footer nav */}
            {step === "complete" && (
              <div className="flex-shrink-0 border-t border-black/[0.09] dark:border-zinc-700 px-5 py-4 flex items-center justify-between">
                <Link
                  href="/gc-commandcenter/status"
                  className="text-[13px] text-slate-400 dark:text-zinc-500 hover:text-slate-600 dark:hover:text-zinc-300 transition-colors"
                >
                  ← Back to status
                </Link>
                <span className="text-[12px] text-slate-300 dark:text-zinc-600">CRO Review — coming soon</span>
              </div>
            )}
          </div>

          {/* Below panel nav */}
          {step !== "complete" && (
            <div className="mt-4 flex justify-center">
              <Link
                href="/gc-commandcenter/status"
                className="text-[12px] text-slate-400 dark:text-zinc-500 hover:text-slate-600 dark:hover:text-zinc-300 transition-colors"
              >
                ← Back to status
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function OwnerInvestigationPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-[#f0f0f1] dark:bg-zinc-950">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-300 border-t-transparent dark:border-zinc-600" />
      </div>
    }>
      <InvestigationContent />
    </Suspense>
  );
}
