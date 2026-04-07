"use client";

import React, { Suspense } from "react";
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

const OWNER_DATA: Record<string, { name: string; title: string; avatarUrl: string }> = {
  "diana-reyes": { name: "Diana Reyes", title: "VP, Supply Chain", avatarUrl: "https://randomuser.me/api/portraits/med/women/44.jpg" },
  "marcus-webb":  { name: "Marcus Webb",  title: "CISO",                avatarUrl: "https://i.pravatar.cc/150?u=marcus-webb" },
  "james-park":   { name: "James Park",   title: "Chief Compliance Officer", avatarUrl: "https://i.pravatar.cc/150?u=james-park" },
};

const RISK_NAMES: Record<string, string> = {
  "taiwan": "Taiwan Strait Geopolitical Tensions",
  "cyber":  "Critical Vendor Cybersecurity Breach",
  "dma":    "EU Digital Markets Act Enforcement",
};

function NotificationContent() {
  const searchParams = useSearchParams();
  const riskId  = searchParams?.get("risk")  || "taiwan";
  const ownerId = searchParams?.get("owner") || "diana-reyes";

  const owner    = OWNER_DATA[ownerId] ?? OWNER_DATA["diana-reyes"];
  const riskName = RISK_NAMES[riskId]  ?? RISK_NAMES["taiwan"];
  const investigationUrl = `/gc-commandcenter/owner-investigation?risk=${riskId}&owner=${ownerId}`;

  return (
    <div className="min-h-screen bg-[#f0f0f1] dark:bg-zinc-950">
      <ProtoPanel
        description={`Viewing as: ${owner.name} · Risk Owner`}
        stateToggle={false}
      />

      <div className="flex min-h-[calc(100vh-40px)] flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-xl">
          {/* Context caption */}
          <p className="mb-6 text-center text-[13px] text-slate-400 dark:text-zinc-500">
            {owner.name} receives this email after being assigned as a risk owner.
          </p>

          {/* Email card */}
          <div className="overflow-hidden rounded-[20px] border border-black/[0.09] dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">

            {/* Email header */}
            <div className="space-y-2 border-b border-black/[0.06] dark:border-zinc-800 bg-slate-50 dark:bg-zinc-800/50 px-6 py-4">
              {[
                { label: "From",    value: <>GRC Command Center <span className="text-slate-400 dark:text-zinc-500 font-normal">&lt;noreply@diligent.com&gt;</span></> },
                { label: "To",      value: <>{owner.name} <span className="text-slate-400 dark:text-zinc-500 font-normal">&lt;{owner.name.toLowerCase().replace(" ", ".")}@company.com&gt;</span></> },
                { label: "Subject", value: <>Risk investigation required: <span className="font-semibold">{riskName}</span></> },
              ].map(({ label, value }) => (
                <div key={label} className="flex gap-3 text-[12px]">
                  <span className="w-14 flex-shrink-0 text-slate-400 dark:text-zinc-500">{label}</span>
                  <span className="text-slate-800 dark:text-zinc-100">{value}</span>
                </div>
              ))}
            </div>

            {/* Email body */}
            <div className="space-y-4 px-6 py-6">
              {/* Sender identity */}
              <div className="mb-6 flex items-center gap-2">
                <DiligentLogoFull />
                <span className="text-[12px] font-semibold tracking-tight text-slate-800 dark:text-zinc-100">GRC Command Center</span>
              </div>

              <p className="text-[14px] font-semibold text-slate-800 dark:text-zinc-100">
                Hi {owner.name.split(" ")[0]},
              </p>

              <p className="text-[13px] leading-relaxed text-slate-500 dark:text-zinc-400">
                The General Counsel has assigned you to investigate an emerging risk that requires your domain expertise.
                Your input is needed before the team can draft 10-K disclosure updates.
              </p>

              {/* Assigned risk */}
              <div className="rounded-xl border border-black/[0.09] dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 p-4">
                <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400 dark:text-zinc-500">
                  Assigned risk
                </p>
                <p className="text-[13px] font-semibold text-slate-800 dark:text-zinc-100">{riskName}</p>
              </div>

              <p className="text-[13px] leading-relaxed text-slate-500 dark:text-zinc-400">
                Please review the AI analysis, add context from your expertise, and validate the severity and disclosure recommendations.
                The investigation is due by <span className="font-semibold text-slate-700 dark:text-zinc-200">Feb 5, 2026</span>.
              </p>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-zinc-700 to-transparent" />

              {/* CTA */}
              <div className="pt-1">
                <Link
                  href={investigationUrl}
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-800 px-5 py-[10px] text-[14px] font-normal text-white transition-colors hover:bg-slate-900 active:bg-slate-950 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
                >
                  Start investigation
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 3l5 5-5 5" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Page nav */}
          <div className="mt-6 flex items-center justify-between px-1">
            <Link
              href="/gc-commandcenter/status"
              className="text-[13px] text-slate-400 transition-colors hover:text-slate-600 dark:text-zinc-500 dark:hover:text-zinc-300"
            >
              ← Back to status
            </Link>
            <Link
              href={investigationUrl}
              className="text-[13px] text-slate-400 transition-colors hover:text-slate-600 dark:text-zinc-500 dark:hover:text-zinc-300"
            >
              Start investigation →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NotificationPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-[#f0f0f1] dark:bg-zinc-950">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-300 border-t-transparent dark:border-zinc-600" />
      </div>
    }>
      <NotificationContent />
    </Suspense>
  );
}
