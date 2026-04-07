"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ProtoPanel } from "../../../components/ProtoPanel";

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
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const RISK_NAMES: Record<string, string> = {
  taiwan: "Taiwan Strait Geopolitical Tensions",
  cyber:  "Critical Vendor Cybersecurity Breach",
  dma:    "EU Digital Markets Act Enforcement",
};

const RISK_SEVERITY: Record<string, string> = {
  taiwan: "Critical",
  cyber:  "High",
  dma:    "High",
};

const OWNER_DATA: Record<string, { name: string; title: string; avatarUrl: string }> = {
  "diana-reyes": { name: "Diana Reyes", title: "VP, Supply Chain",           avatarUrl: "https://randomuser.me/api/portraits/med/women/44.jpg" },
  "marcus-webb":  { name: "Marcus Webb",  title: "CISO",                      avatarUrl: "https://i.pravatar.cc/150?u=marcus-webb" },
  "james-park":   { name: "James Park",   title: "Chief Compliance Officer",  avatarUrl: "https://i.pravatar.cc/150?u=james-park" },
};

const SEVERITY_LABELS: Record<string, string> = {
  agree:     "Agreed with AI assessment",
  downgrade: "Suggested lower severity",
  upgrade:   "Not a risk",
};

const DEFAULT_CONTEXT: Record<string, string> = {
  taiwan: "We have supplier diversification underway — Vietnam and Malaysia qualification programs are both in progress, but they're 12–18 months from meaningful volume. In the near term, approximately 47% of our critical chip volume flows through Taiwan-based facilities with no viable short-term substitution.",
  cyber:  "CloudSecure processes PII under 3 active DPAs. Our security team has been in contact and is conducting impact assessment. Preliminary scope suggests up to 2.3M records may be affected. We've notified our legal team for GDPR/CCPA notification window analysis.",
  dma:    "Our EU operations represent 23% of global revenue. We have not yet completed a formal DMA compliance assessment. Based on the enforcement patterns in peer filings, our current platform features in the EU market warrant a dedicated compliance review.",
};

const LIKELIHOOD_OPTIONS = ["", "Low", "Medium", "High", "Critical"];
const IMPACT_OPTIONS     = ["", "Low", "Medium", "High", "Critical"];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function SectionCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[20px] border border-black/[0.09] dark:border-zinc-700 bg-white dark:bg-zinc-900 p-[22px_24px]">
      <h2 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400 dark:text-zinc-500 mb-3">{label}</h2>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page content                                                       */
/* ------------------------------------------------------------------ */

function CroReviewContent() {
  const searchParams = useSearchParams();
  const riskId  = searchParams?.get("risk")  || "taiwan";
  const ownerId = searchParams?.get("owner") || "diana-reyes";

  const owner    = OWNER_DATA[ownerId]  ?? OWNER_DATA["diana-reyes"];
  const riskName = RISK_NAMES[riskId]   ?? RISK_NAMES["taiwan"];
  const severity = RISK_SEVERITY[riskId] ?? "Critical";

  // Attempt to read investigation context from prior session (set by C2)
  const [ownerContext, setOwnerContext] = useState<string>("");
  const [severityChoice, setSeverityChoice] = useState<string>("agree");
  const [disclosureConfirmed, setDisclosureConfirmed] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = sessionStorage.getItem("croReview");
      if (stored) {
        const data = JSON.parse(stored);
        if (data.riskId === riskId) {
          setOwnerContext(data.userContext || "");
          setSeverityChoice(data.severityChoice || "agree");
          setDisclosureConfirmed(data.disclosureConfirmed ?? true);
          return;
        }
      }
    } catch { /* ignore */ }
    // Fallback to default context for the prototype
    setOwnerContext(DEFAULT_CONTEXT[riskId] ?? "");
  }, [riskId]);

  // CRO assessment fields
  const [likelihood,   setLikelihood]   = useState("");
  const [impact,       setImpact]       = useState("");
  const [controls,     setControls]     = useState("");
  const [mitigations,  setMitigations]  = useState("");
  const [notes,        setNotes]        = useState("");
  const [submitted,    setSubmitted]    = useState(false);

  const severityBadge = severity === "Critical"
    ? "bg-red-50 border-red-200 text-red-700 dark:bg-red-950/40 dark:border-red-800 dark:text-red-400"
    : "bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-400";

  const SUGGESTION_CHIPS = [
    "Summarize risk for disclosure",
    "Highlight key controls",
    "Note disclosure sensitivities",
  ];

  return (
    <div className="min-h-screen bg-[#f0f0f1] dark:bg-zinc-950">
      <ProtoPanel description="Viewing as: Chief Risk Officer" stateToggle={false} />

      {/* Nav */}
      <nav className="border-b border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-3.5">
          <div className="flex items-center gap-2.5">
            <DiligentLogoFull />
            <span className="text-xs font-semibold tracking-tight text-slate-800 dark:text-zinc-100">GRC Command Center</span>
          </div>
          <div className="flex items-center gap-3">
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

      {/* Content */}
      <div className="mx-auto w-full max-w-3xl px-6 pb-10 pt-8 space-y-4">

        {/* Breadcrumb + headline */}
        <div>
          <div className="flex items-center gap-1.5 text-[12px] text-slate-400 dark:text-zinc-500 mb-3">
            <Link href="/gc-commandcenter/cro-review" className="hover:text-slate-600 dark:hover:text-zinc-300 transition-colors">
              AI Risk Essentials
            </Link>
            <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3l5 5-5 5"/></svg>
            <span className="text-slate-600 dark:text-zinc-300">Risk Owner Investigation Review</span>
          </div>
          <h1 className="text-[1.75rem] font-light tracking-[-0.02em] text-slate-800 dark:text-zinc-100 leading-[1.2] mb-1">
            Risk Owner Investigation Review
          </h1>
          <p className="text-[13px] text-slate-500 dark:text-zinc-400">
            Review what {owner.name} provided for this risk investigation, then add your assessment.
          </p>
        </div>

        {/* Risk */}
        <SectionCard label="Assigned risk">
          <div className="flex items-center gap-2.5">
            <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold flex-shrink-0", severityBadge)}>
              {severity}
            </span>
            <p className="text-[15px] font-semibold text-slate-800 dark:text-zinc-100">{riskName}</p>
          </div>
        </SectionCard>

        {/* Owner */}
        <SectionCard label="Investigated by">
          <div className="flex items-center gap-3">
            <img src={owner.avatarUrl} alt={owner.name} className="h-10 w-10 rounded-full object-cover flex-shrink-0" />
            <div>
              <p className="text-[14px] font-semibold text-slate-800 dark:text-zinc-100">{owner.name}</p>
              <p className="text-[12px] text-slate-400 dark:text-zinc-500">{owner.title}</p>
            </div>
          </div>
        </SectionCard>

        {/* Owner context */}
        <SectionCard label="Additional context from Risk Owner">
          <p className="text-[13px] text-slate-600 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap">
            {ownerContext || "No additional context was provided in this session."}
          </p>
        </SectionCard>

        {/* Severity validation */}
        <SectionCard label="Severity assessment">
          <p className="text-[13px] text-slate-700 dark:text-zinc-200">
            {SEVERITY_LABELS[severityChoice] ?? SEVERITY_LABELS["agree"]}
          </p>
        </SectionCard>

        {/* Disclosure recommendation */}
        <SectionCard label="Disclosure recommendation">
          <div className="flex items-center gap-2">
            {disclosureConfirmed ? (
              <>
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/40 flex-shrink-0">
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600 dark:text-emerald-400">
                    <path d="M2 6l3 3 5-5" />
                  </svg>
                </div>
                <p className="text-[13px] text-slate-700 dark:text-zinc-200">Confirmed by owner</p>
              </>
            ) : (
              <>
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-950/40 flex-shrink-0">
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600 dark:text-amber-400">
                    <path d="M6 2v5M6 9.5v.5" />
                  </svg>
                </div>
                <p className="text-[13px] text-slate-700 dark:text-zinc-200">Owner requested changes</p>
              </>
            )}
          </div>
        </SectionCard>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-zinc-700 to-transparent" />

        {/* CRO Assessment form */}
        <div className="rounded-[20px] border border-blue-200/60 dark:border-blue-900/30 bg-blue-50/30 dark:bg-blue-950/10 p-[22px_24px] space-y-5">
          <div>
            <h2 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-blue-500/70 dark:text-blue-400/60 mb-0.5">Your risk assessment</h2>
            <p className="text-[12px] text-slate-500 dark:text-zinc-400">
              Assess likelihood, impact, controls, and mitigations. This will inform the 10-K disclosure draft.
            </p>
          </div>

          {/* Likelihood + Impact */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Likelihood of occurrence", value: likelihood, onChange: setLikelihood, options: LIKELIHOOD_OPTIONS },
              { label: "Impact if it occurs",       value: impact,      onChange: setImpact,      options: IMPACT_OPTIONS },
            ].map(({ label, value, onChange, options }) => (
              <div key={label}>
                <label className="block text-[12px] font-semibold text-slate-600 dark:text-zinc-300 mb-1.5">{label}</label>
                <select
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  disabled={submitted}
                  className="w-full rounded-xl border border-black/[0.09] dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-[13px] text-slate-800 dark:text-zinc-100 focus:border-slate-300 dark:focus:border-zinc-500 focus:outline-none disabled:opacity-50"
                >
                  {options.map((opt) => (
                    <option key={opt || "empty"} value={opt}>{opt || "Select…"}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          {/* Controls + Mitigations */}
          {[
            { label: "Controls in place",                value: controls,    onChange: setControls,    placeholder: "e.g., Supplier diversification program, dual-sourcing for critical components…" },
            { label: "Mitigations planned or underway",  value: mitigations, onChange: setMitigations, placeholder: "e.g., Samsung qualification in progress, 18-month timeline to shift 30%…" },
          ].map(({ label, value, onChange, placeholder }) => (
            <div key={label}>
              <label className="block text-[12px] font-semibold text-slate-600 dark:text-zinc-300 mb-1.5">{label}</label>
              <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                rows={2}
                disabled={submitted}
                className="w-full rounded-xl border border-black/[0.09] dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-[13px] text-slate-800 dark:text-zinc-100 placeholder-slate-300 dark:placeholder-zinc-600 focus:border-slate-300 dark:focus:border-zinc-500 focus:outline-none resize-none disabled:opacity-50"
              />
            </div>
          ))}

          {/* Additional notes */}
          <div>
            <label className="block text-[12px] font-semibold text-slate-600 dark:text-zinc-300 mb-1.5">Additional CRO assessment</label>
            <p className="text-[11px] text-slate-400 dark:text-zinc-500 mb-2">
              Add context for the 10-K draft — key considerations, board-level messaging, or disclosure nuances.
            </p>
            {!submitted && (
              <div className="flex flex-wrap gap-1.5 mb-2">
                <span className="text-[11px] text-slate-400 dark:text-zinc-500">Try:</span>
                {SUGGESTION_CHIPS.map((chip) => (
                  <button
                    key={chip}
                    onClick={() => setNotes((prev) => prev ? `${prev}\n\n${chip}` : chip)}
                    className="rounded-full border border-black/[0.09] dark:border-zinc-700 bg-white dark:bg-zinc-900 px-2.5 py-0.5 text-[11px] text-slate-500 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-800 hover:border-slate-200 dark:hover:border-zinc-600 transition-colors"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}
            <div className="flex items-start gap-2.5 rounded-xl border border-black/[0.09] dark:border-zinc-700 bg-white dark:bg-zinc-900 p-3">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-black/[0.05] dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 p-1.5">
                <DiligentLogoFull />
              </div>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add additional context for the 10-K draft…"
                rows={3}
                disabled={submitted}
                className="flex-1 bg-transparent text-[13px] text-slate-800 dark:text-zinc-100 placeholder-slate-300 dark:placeholder-zinc-600 focus:outline-none resize-none disabled:opacity-50"
              />
            </div>
          </div>
        </div>

        {/* Submit / Next steps */}
        <div className="rounded-[20px] border border-black/[0.09] dark:border-zinc-700 bg-white dark:bg-zinc-900 p-[22px_24px]">
          <h2 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400 dark:text-zinc-500 mb-1">Next steps</h2>
          <p className="text-[13px] text-slate-500 dark:text-zinc-400 leading-relaxed mb-4">
            Submit your assessment to complete your review. Your input will be passed to the General Counsel to inform the 10-K disclosure draft.
          </p>
          {submitted ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/40">
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 6l3 3 5-5" />
                  </svg>
                </div>
                <span className="text-[13px] font-semibold">Assessment submitted</span>
              </div>
              <span className="text-[12px] text-slate-300 dark:text-zinc-600">GC Drafting — coming soon</span>
            </div>
          ) : (
            <button
              onClick={() => setSubmitted(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-800 dark:bg-zinc-100 px-5 py-[10px] text-[14px] font-normal text-white dark:text-zinc-900 hover:bg-slate-900 dark:hover:bg-white active:bg-slate-950 transition-colors"
            >
              Submit assessment
            </button>
          )}
        </div>

        <div className="flex items-center justify-between pt-2">
          <Link href="/gc-commandcenter/cro-review" className="text-[13px] text-slate-400 dark:text-zinc-500 hover:text-slate-600 dark:hover:text-zinc-300 transition-colors">
            ← Back to Risk Essentials
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CroReviewPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-[#f0f0f1] dark:bg-zinc-950">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-300 border-t-transparent dark:border-zinc-600" />
      </div>
    }>
      <CroReviewContent />
    </Suspense>
  );
}
