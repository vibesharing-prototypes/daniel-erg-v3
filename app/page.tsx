"use client";

import React from "react";
import Link from "next/link";
import { ProtoPanel } from "./components/ProtoPanel";

/* ------------------------------------------------------------------ */
/*  Flow definitions                                                   */
/* ------------------------------------------------------------------ */

type Step = {
  id: string;
  title: string;
  description: string;
  href: string;
  enabled: boolean;
};

type Section = {
  heading: string;
  steps: Step[];
};

const sections: Section[] = [
  {
    heading: "Entry Points",
    steps: [
      {
        id: "A",
        title: "Boards Home (Near-Term Vision)",
        description: "GC opens the standard Boards system enhanced with the GRC Command Center panel.",
        href: "/superhero/boards-home",
        enabled: false,
      },
      {
        id: "A2",
        title: "Boards Home — Dark",
        description: "Dark-mode variant of the Boards system with GRC Command Center panel.",
        href: "/superhero/boards-dark",
        enabled: false,
      },
      {
        id: "B",
        title: "GRC Command Center",
        description: "GC opens the full GRC Command Center — agents have detected emerging risks.",
        href: "/gc-commandcenter",
        enabled: true,
      },
      {
        id: "B2",
        title: "Risk Owners Notified",
        description: "Post-assignment status — risk owners notified, AI-guided interviews underway.",
        href: "/gc-commandcenter/status",
        enabled: true,
      },
    ],
  },
  {
    heading: "General Counsel — Detection & Assignment",
    steps: [
      {
        id: "1",
        title: "Review Detection Sources",
        description: "GC reviews what agents scanned and where the emerging risks originated.",
        href: "/gc-commandcenter/detection-sources",
        enabled: false,
      },
      {
        id: "2",
        title: "Assign Risk Owners",
        description: "GC assigns owners to each detected risk and kicks off investigation workflows.",
        href: "/superhero/coordinator",
        enabled: false,
      },
    ],
  },
  {
    heading: "Risk Owner & CRO",
    steps: [
      {
        id: "3",
        title: "Owner Investigation Notification",
        description: "Diana Reyes receives an email notification to investigate Taiwan Strait risk.",
        href: "/gc-commandcenter/owner-investigation/notification?risk=taiwan&owner=diana-reyes",
        enabled: true,
      },
      {
        id: "4",
        title: "Owner Investigation",
        description: "Risk owner investigates the risk, provides context, validates severity.",
        href: "/gc-commandcenter/owner-investigation?risk=taiwan&owner=diana-reyes",
        enabled: true,
      },
      {
        id: "5",
        title: "CRO Review",
        description: "Chief Risk Officer reviews the owner's findings and adds assessment.",
        href: "/gc-commandcenter/cro-review",
        enabled: true,
      },
      {
        id: "5b",
        title: "CRO Review — Detail",
        description: "CRO reviews investigation findings for Taiwan Strait risk.",
        href: "/gc-commandcenter/cro-review/review?risk=taiwan&owner=diana-reyes",
        enabled: true,
      },
    ],
  },
  {
    heading: "General Counsel — Drafting & Review",
    steps: [
      {
        id: "6",
        title: "GC Drafting Dashboard",
        description: "General Counsel reviews AI-drafted 10-K disclosure language for 3 risks.",
        href: "/gc-commandcenter/gc-drafting",
        enabled: true,
      },
      {
        id: "7",
        title: "GC Notification — Draft Ready",
        description: "GC receives notification that the 10-K draft is ready for review.",
        href: "/gc-commandcenter/gc-notification/draft-ready",
        enabled: false,
      },
      {
        id: "8",
        title: "GC Review & Context Packet",
        description: "GC reviews the 10-K, creates a Context Packet with peer filings and Q&A prep.",
        href: "/gc-commandcenter/gc-review",
        enabled: true,
      },
      {
        id: "9",
        title: "Context Packet",
        description: "Build a Context Packet with peer filings, transcripts, news, and Q&A prep.",
        href: "/gc-commandcenter/context-packet",
        enabled: false,
      },
    ],
  },
  {
    heading: "Data Room & CEO Approval",
    steps: [
      {
        id: "10",
        title: "Diligent Data Room",
        description: "View the Context Packet and official documents in the Data Room.",
        href: "/superhero/data-room",
        enabled: false,
      },
      {
        id: "11",
        title: "Taiwan Strait — Detail",
        description: "Drill into the Taiwan Strait context packet files.",
        href: "/superhero/data-room/taiwan-strait",
        enabled: false,
      },
      {
        id: "12",
        title: "CEO Notification",
        description: "CEO receives consolidated notification for all undisclosed risks.",
        href: "/superhero/ceo-review/notification",
        enabled: false,
      },
      {
        id: "13",
        title: "CEO Approval",
        description: "CEO reviews disclosures, approves, and suggests additional committee routing.",
        href: "/superhero/ceo-review",
        enabled: false,
      },
      {
        id: "13b",
        title: "Approval Status",
        description: "CEO disclosure approval page with pipeline status, documents, AI verification, and risk cards.",
        href: "/superhero/approval-status",
        enabled: false,
      },
    ],
  },
  {
    heading: "Committee Review & Filing",
    steps: [
      {
        id: "14",
        title: "GC Mobile Notification — CEO Approved",
        description: "GC notified that CEO approved and wants additional committees to review.",
        href: "/superhero/gc-notification/ceo-approved",
        enabled: false,
      },
      {
        id: "15",
        title: "Board Director Reviews in Boards",
        description: "Board Director reviews 10-K risk factor update in Boards with GovernAI.",
        href: "/superhero/board-governance",
        enabled: false,
      },
      {
        id: "16",
        title: "GC — All Committee Members Reviewed",
        description: "GC sees all committee members reviewed, EDGAR filing package is ready.",
        href: "/superhero/gc-committee-complete",
        enabled: false,
      },
    ],
  },
  {
    heading: "Standalone Visualizations",
    steps: [
      {
        id: "13c",
        title: "Risk Impact Visualization",
        description: "AI-detected Taiwan Strait risk — supply chain dependency map, control coverage, and disclosure readiness.",
        href: "/superhero/risk-analysis",
        enabled: false,
      },
      {
        id: "13d",
        title: "Risk Gravity Map",
        description: "Cinematic visualization of financial exposure pulled toward major enterprise risks with scenario simulation.",
        href: "/superhero/risk-gravity",
        enabled: false,
      },
      {
        id: "13e",
        title: "Risk Shockwave",
        description: "Animated propagation from geopolitical signal to disclosure — 37 minutes across 5 enterprise functions.",
        href: "/superhero/risk-shockwave",
        enabled: false,
      },
      {
        id: "13f",
        title: "Risk-to-Disclosure Pipeline",
        description: "7-stage pipeline from external signal to GC decision — traceability, evidence chain, and AI-drafted disclosure.",
        href: "/superhero/risk-pipeline",
        enabled: false,
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Diligent Logo                                                      */
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
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function PrototypeIndex() {
  return (
    <div className="min-h-screen bg-[#f0f0f1] dark:bg-zinc-950">
      <ProtoPanel
        description="Enterprise Risk Governance — Prototype Index"
        stateToggle={false}
      />

      {/* Nav */}
      <nav className="border-b border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-6 py-3.5">
          <div className="flex items-center gap-2.5">
            <DiligentLogoFull />
            <span className="text-xs font-semibold tracking-tight text-slate-800 dark:text-zinc-100">Enterprise Risk Governance</span>
          </div>
          <span className="inline-flex items-center rounded-full border border-black/[0.09] dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-1 text-[11px] font-semibold text-slate-500 dark:text-zinc-400">
            V3 Prototype
          </span>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="relative mx-auto max-w-3xl px-6 pt-10 pb-8">
          <h1 className="text-[2rem] font-light tracking-[-0.02em] text-slate-800 dark:text-zinc-100 leading-[1.2]">
            Prototype Index
          </h1>
          <p className="text-[13px] text-slate-500 dark:text-zinc-400 leading-relaxed mt-2 max-w-xl">
            Full V2 flow mapped below. Enabled steps are live in V3. Disabled steps are coming soon.
          </p>
        </div>
      </div>

      {/* Sections */}
      <main className="mx-auto max-w-3xl px-6 pb-10 space-y-6">
        {sections.map((section) => {
          const hasEnabled = section.steps.some((s) => s.enabled);
          return (
            <div key={section.heading}>
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-[11px] font-semibold text-slate-800 dark:text-zinc-100 uppercase tracking-wide">
                  {section.heading}
                </h2>
                {!hasEnabled && (
                  <span className="inline-flex items-center rounded-full bg-slate-100 dark:bg-zinc-800 border border-black/[0.05] dark:border-zinc-700 px-2 py-0.5 text-[10px] font-semibold text-slate-400 dark:text-zinc-500">
                    Coming soon
                  </span>
                )}
              </div>
              <div className="rounded-[20px] border border-black/[0.09] dark:border-zinc-700 bg-white dark:bg-zinc-900 divide-y divide-black/[0.05] dark:divide-zinc-800 overflow-hidden">
                {section.steps.map((step) =>
                  step.enabled ? (
                    <Link
                      key={step.id}
                      href={step.href}
                      className="flex items-center gap-4 px-5 py-3.5 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors group"
                    >
                      <span className="flex-shrink-0 h-7 w-7 rounded-full bg-slate-800 dark:bg-zinc-100 flex items-center justify-center text-[11px] font-semibold text-white dark:text-zinc-900">
                        {step.id}
                      </span>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[14px] font-semibold text-slate-800 dark:text-zinc-100 group-hover:text-slate-600 dark:group-hover:text-zinc-300 transition-colors">
                          {step.title}
                        </h3>
                        <p className="text-[12px] text-slate-400 dark:text-zinc-500 mt-0.5 truncate">{step.description}</p>
                      </div>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-300 dark:text-zinc-600 group-hover:text-slate-500 dark:group-hover:text-zinc-400 transition-colors flex-shrink-0">
                        <path d="M6 12l4-4-4-4" />
                      </svg>
                    </Link>
                  ) : (
                    <div
                      key={step.id}
                      className="flex items-center gap-4 px-5 py-3.5 opacity-40 cursor-default"
                    >
                      <span className="flex-shrink-0 h-7 w-7 rounded-full bg-slate-100 dark:bg-zinc-800 border border-black/[0.05] dark:border-zinc-700 flex items-center justify-center text-[11px] font-semibold text-slate-400 dark:text-zinc-500">
                        {step.id}
                      </span>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[14px] font-semibold text-slate-500 dark:text-zinc-500">
                          {step.title}
                        </h3>
                        <p className="text-[12px] text-slate-300 dark:text-zinc-600 mt-0.5 truncate">{step.description}</p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          );
        })}

        <div className="h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-zinc-700 to-transparent" />
        <p className="text-[12px] text-slate-400 dark:text-zinc-500 text-center">
          Prototype built with Next.js · Hosted on VibeSharing
        </p>
      </main>
    </div>
  );
}
