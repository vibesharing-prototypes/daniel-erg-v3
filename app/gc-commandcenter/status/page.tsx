"use client";

import React from "react";
import Link from "next/link";
import { StakeholderFooter, PrototypeControlLink } from "../../superhero/StakeholderFooter";
import { ProtoPanel } from "../../components/ProtoPanel";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const AVATARS: Record<string, string> = {
  "diana-reyes": "https://randomuser.me/api/portraits/med/women/44.jpg",
  "marcus-webb": "https://i.pravatar.cc/150?u=marcus-webb",
  "james-park": "https://i.pravatar.cc/150?u=james-park",
};

const ASSIGNED_RISKS = [
  {
    id: "taiwan",
    ownerId: "diana-reyes",
    name: "Taiwan Strait Geopolitical Tensions",
    severity: "Critical" as const,
    owner: "Diana Reyes",
    title: "VP, Supply Chain",
    avatarUrl: AVATARS["diana-reyes"],
    notifiedAt: "10:00 AM",
    status: "Awaiting response",
  },
  {
    id: "cyber",
    ownerId: "marcus-webb",
    name: "Critical Vendor Cybersecurity Breach",
    severity: "High" as const,
    owner: "Marcus Webb",
    title: "CISO",
    avatarUrl: AVATARS["marcus-webb"],
    notifiedAt: "10:00 AM",
    status: "Awaiting response",
  },
  {
    id: "dma",
    ownerId: "james-park",
    name: "EU Digital Markets Act Enforcement",
    severity: "High" as const,
    owner: "James Park",
    title: "Chief Compliance Officer",
    avatarUrl: AVATARS["james-park"],
    notifiedAt: "10:00 AM",
    status: "Awaiting response",
  },
];

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
      <path d="M9.65975 9.99958L4.55273 4.89256V6.5949L7.53183 9.99958L4.55273 12.9787V15.1066L9.65975 9.99958Z" fill="#F8F8FA"/>
      <path d="M9.65975 9.99958L4.55273 4.89256V6.5949L7.53183 9.99958L4.55273 12.9787V15.1066L9.65975 9.99958Z" fill="#F8F8FA"/>
      <path d="M9.65975 9.99958L4.55273 4.89256V6.5949L7.53183 9.99958L4.55273 12.9787V15.1066L9.65975 9.99958Z" fill="#F8F8FA"/>
      <path d="M9.66016 9.99998L4.55273 15.1064V12.9785L7.53223 9.99998L4.55273 6.59471V4.89256L9.66016 9.99998Z" fill="#F8F8FA"/>
    </svg>
  );
}

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

export default function CommandCenterStatusPage() {
  return (
    <div className="min-h-screen bg-[#f0f0f1] dark:bg-zinc-950">
      <ProtoPanel
        description="Viewing as: General Counsel — risk owners assigned &amp; notified"
        stateToggle={false}
      />

      {/* Top nav bar */}
      <nav className="border-b border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-3.5">
          <div className="flex items-center gap-2.5">
            <DiligentLogoFull />
            <span className="text-xs font-semibold tracking-tight text-slate-800 dark:text-zinc-100">GRC Command Center</span>
          </div>
          <div className="flex items-center gap-3">
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

      {/* Hero banner — open layout, no container */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 90% 100% at 50% 0%, rgba(16,185,129,0.05) 0%, transparent 100%)" }}
        />
        <div className="relative mx-auto max-w-2xl px-6 pt-12 pb-10 text-center">
          {/* Status pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 dark:border-emerald-800 bg-white dark:bg-zinc-900 px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-[13px] font-semibold text-emerald-700 dark:text-emerald-400">Risk Owners Notified</span>
          </div>

          {/* Headline */}
          <h1 className="text-[2.5rem] font-light tracking-[-0.02em] text-slate-800 dark:text-zinc-100 leading-[1.15] mb-4">
            All owners notified — assessments underway.
          </h1>

          {/* Subtitle */}
          <p className="text-[13px] text-slate-500 dark:text-zinc-400 leading-relaxed max-w-xl mx-auto">
            3 risk owners have been assigned and notified. Each will complete an AI-guided interview
            to assess severity, likelihood, and existing controls. You&apos;ll receive updates as they respond.
          </p>

          {/* Metric boxes */}
          <div className="flex items-center justify-center gap-3 mt-8">
            {[
              { value: "3", label: "Risks Assigned" },
              { value: "3", label: "Owners Notified" },
              { value: "0", label: "Responses" },
            ].map((metric) => (
              <div key={metric.label} className="w-28 h-20 rounded-xl border border-black/[0.09] dark:border-zinc-700 bg-white dark:bg-zinc-900 flex flex-col items-center justify-center">
                <span className="text-[22px] font-semibold text-slate-800 dark:text-zinc-100">{metric.value}</span>
                <span className="text-[11px] text-slate-400 dark:text-zinc-500">{metric.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="mx-auto w-full max-w-6xl px-6 pb-6 space-y-6">
        {/* Risk cards */}
        <div>
          <h3 className="text-[11px] font-semibold text-slate-800 dark:text-zinc-100 uppercase tracking-wide mb-3">Risk assessments underway</h3>
          <div className="space-y-3">
            {ASSIGNED_RISKS.map((risk, i) => (
              <div
                key={risk.id}
                className="suggestion-card rounded-[20px] border border-black/[0.09] dark:border-zinc-700 bg-white dark:bg-zinc-900 p-[22px_24px] transition-all duration-[250ms] ease-out hover:bg-slate-50 dark:hover:bg-zinc-800 hover:border-slate-200 dark:hover:border-zinc-600 hover:shadow-[0_8px_28px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 [will-change:transform] [backface-visibility:hidden]"
                style={{ animationDelay: `${i * 120}ms` }}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <SeverityBadge severity={risk.severity} />
                    <p className="text-[14px] font-semibold text-slate-800 dark:text-zinc-100 truncate">{risk.name}</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="flex items-center gap-2">
                      <img src={risk.avatarUrl} alt={risk.owner} className="h-7 w-7 rounded-full object-cover" />
                      <div>
                        <p className="text-[13px] font-semibold text-slate-700 dark:text-zinc-200">{risk.owner}</p>
                        <p className="text-[11px] text-slate-400 dark:text-zinc-500">{risk.title}</p>
                      </div>
                    </div>
                    <Link
                      href={`/gc-commandcenter/owner-investigation/notification?risk=${risk.id}&owner=${risk.ownerId}`}
                      className="text-[13px] font-normal text-slate-500 dark:text-zinc-400 bg-white dark:bg-zinc-800 border border-black/[0.09] dark:border-zinc-700 rounded-xl py-[7px] px-3 hover:bg-slate-50 dark:hover:bg-zinc-700 hover:border-slate-200 dark:hover:border-zinc-600 transition-colors"
                    >
                      View notification
                    </Link>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-black/[0.05] dark:border-zinc-800">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 dark:text-zinc-500">
                    <circle cx="8" cy="8" r="6.5" /><polyline points="8 4.5 8 8 10.5 9.5" />
                  </svg>
                  <span className="text-[12px] text-slate-400 dark:text-zinc-500">Notified today at {risk.notifiedAt} · {risk.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What happens next */}
        <div>
          <h3 className="text-[11px] font-semibold text-slate-800 dark:text-zinc-100 uppercase tracking-wide mb-3">What happens next</h3>
          <div className="space-y-3">
            {[
              "Each risk owner completes an AI-guided interview about severity, likelihood, and existing controls or mitigations.",
              "The system will evaluate whether the company needs to update its regulatory disclosures (10-K, 10-Q, 8-K).",
              "You\u2019ll be notified when assessments are complete and disclosure recommendations are ready for your review.",
            ].map((text, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white dark:bg-zinc-900 border border-black/[0.09] dark:border-zinc-700 flex-shrink-0 mt-0.5">
                  <span className="text-[11px] font-semibold text-slate-600 dark:text-zinc-400">{i + 1}</span>
                </div>
                <p className="text-[13px] text-slate-500 dark:text-zinc-400 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Prompt box */}
        <div className="h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-zinc-700 to-transparent" />
        <div className="rounded-2xl border border-black/[0.09] dark:border-zinc-700 bg-white dark:bg-zinc-900 p-2 shadow-[0_8px_28px_rgba(0,0,0,0.06)]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 dark:bg-zinc-800 border border-black/[0.05] dark:border-zinc-700 flex-shrink-0 p-1.5">
              <DiligentLogoFull />
            </div>
            <input
              type="text"
              placeholder="Ask about risk status, follow up with owners..."
              className="flex-1 bg-transparent text-[14px] text-slate-800 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none"
            />
            <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-slate-900 dark:hover:bg-white active:bg-slate-950 transition-colors flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2L7 9" /><path d="M14 2L9.5 14L7 9L2 6.5L14 2Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <StakeholderFooter label="Next in the prototype: Diana Reyes receives her risk owner notification">
        <PrototypeControlLink href="/superhero/owner-investigation/notification?risk=risk-taiwan&owner=diana-reyes">
          View Diana Reyes&apos; notification →
        </PrototypeControlLink>
      </StakeholderFooter>
    </div>
  );
}
