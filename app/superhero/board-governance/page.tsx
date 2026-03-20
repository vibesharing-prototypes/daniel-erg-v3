"use client";

import React, { useState } from "react";
import Link from "next/link";
import { StakeholderFooter, PrototypeControlLink } from "../StakeholderFooter";

type SlideType = "agenda" | "data" | "content";
type ViewMode = "meeting" | "prep";
type UserRole = "board-member" | "corp-sec";

type Slide = {
  id: number;
  type: SlideType;
  title: string;
  topics: string[];
  hasActions?: boolean;
  actionCount?: number;
  sentiment?: "positive" | "neutral" | "caution";
  riskRelated?: boolean;
};

type Action = {
  id: string;
  text: string;
  owner: string;
  status: "open" | "in-progress" | "closed" | "overdue";
  dueDate: string;
  sourceSlide: number;
};

const MEETING_INFO = {
  title: "Disclosure Committee Review",
  date: "February 28, 2026",
  totalSlides: 6,
  attendees: 8,
  duration: "1.5h",
};

const SLIDES: Slide[] = [
  { id: 1, type: "agenda", title: "Agenda", topics: ["Admin"] },
  { id: 2, type: "content", title: "10-K Risk Factor Update", topics: ["Risk", "Disclosure"], riskRelated: true, hasActions: true, actionCount: 3, sentiment: "caution" },
  { id: 3, type: "data", title: "ERM Board Deck", topics: ["Risk", "Strategy"], hasActions: true, actionCount: 2 },
  { id: 4, type: "content", title: "Context Packet — Taiwan Strait", topics: ["Geopolitical", "Supply Chain"], riskRelated: true },
  { id: 5, type: "content", title: "Context Packet — Vendor Breach", topics: ["Cybersecurity", "Vendor"], riskRelated: true },
  { id: 6, type: "content", title: "Context Packet — EU DMA", topics: ["Regulatory", "Compliance"], riskRelated: true },
];

const ACTIONS: Action[] = [
  { id: "A-1", text: "Finalize Taiwan Strait risk factor language for 10-Q", owner: "GC", status: "in-progress", dueDate: "Mar 1", sourceSlide: 2 },
  { id: "A-2", text: "Validate semiconductor supplier concentration figure (47%)", owner: "CPO", status: "open", dueDate: "Feb 28", sourceSlide: 2 },
  { id: "A-3", text: "Review peer 10-K filings for comparable disclosure language", owner: "Outside Counsel", status: "closed", dueDate: "Feb 25", sourceSlide: 2 },
  { id: "A-4", text: "Brief Audit Committee on financial statement implications", owner: "CFO", status: "open", dueDate: "Mar 5", sourceSlide: 3 },
  { id: "A-5", text: "Prepare board talking points on vendor breach remediation", owner: "CISO", status: "in-progress", dueDate: "Mar 3", sourceSlide: 3 },
];

function StatusBadge({ status }: { status: Action["status"] }) {
  const colors = {
    open: { bg: "#EFF6FF", fg: "#1D4ED8", border: "#BFDBFE" },
    "in-progress": { bg: "#FEF3C7", fg: "#B45309", border: "#FDE68A" },
    closed: { bg: "#ECFDF5", fg: "#047857", border: "#A7F3D0" },
    overdue: { bg: "#FEF2F2", fg: "#DC2626", border: "#FECACA" },
  };
  const c = colors[status];
  return (
    <span style={{
      fontSize: 10, fontWeight: 600, padding: "2px 6px", borderRadius: 4,
      background: c.bg, color: c.fg, border: `1px solid ${c.border}`,
      textTransform: "capitalize"
    }}>
      {status === "in-progress" ? "In Progress" : status}
    </span>
  );
}

function SentimentIndicator({ sentiment }: { sentiment: Slide["sentiment"] }) {
  if (!sentiment) return null;
  const config = {
    positive: { icon: "↑", color: "#059669", bg: "#ECFDF5", label: "Positive signal" },
    neutral: { icon: "→", color: "#8b949e", bg: "#F3F4F6", label: "Neutral" },
    caution: { icon: "⚠", color: "#D97706", bg: "#FEF3C7", label: "Needs attention" },
  };
  const c = config[sentiment];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: c.color }}>
      <span style={{
        width: 18, height: 18, borderRadius: 4, background: c.bg,
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10
      }}>
        {c.icon}
      </span>
      {c.label}
    </div>
  );
}

const BOARD_REVIEWERS = [
  { name: "David Patel", title: "Audit Committee Chair", avatar: "DP", reviewed: true },
  { name: "Linda Nakamura", title: "Risk Committee Chair", avatar: "LN", reviewed: true },
  { name: "James Thornton", title: "Independent Director", avatar: "JT", reviewed: false, isYou: true },
  { name: "Patricia Wells", title: "Cybersecurity Committee Chair", avatar: "PW", reviewed: false },
  { name: "Michael Okafor", title: "Compliance Committee Chair", avatar: "MO", reviewed: true },
];

export default function BoardGovernancePage() {
  const [currentSlide, setCurrentSlide] = useState(2);
  const [viewMode, setViewMode] = useState<ViewMode>("prep");
  const [userRole, setUserRole] = useState<UserRole>("board-member");
  const [notesOpen, setNotesOpen] = useState(true);
  const [aiPanelMode, setAiPanelMode] = useState<"context" | "meeting" | "actions">("context");
  const [markedAsRead, setMarkedAsRead] = useState(false);
  const [repOpen, setRepOpen] = useState(false);
  const [govOpen, setGovOpen] = useState(false);

  const slide = SLIDES[currentSlide - 1] || SLIDES[0];
  const slideActions = ACTIONS.filter(a => a.sourceSlide === currentSlide);
  const allOpenActions = ACTIONS.filter(a => a.status !== "closed");
  const overdueActions = ACTIONS.filter(a => a.status === "overdue");

  const handleMarkAsRead = () => {
    setMarkedAsRead(true);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0d1117", display: "flex", flexDirection: "column" }}>

      {/* Board Book Reader Chrome */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", maxWidth: 1400, margin: "0 auto", width: "100%", background: "#161b22", boxShadow: "0 0 40px rgba(0,0,0,0.5)" }}>
        {/* Top Navigation Bar */}
        <header style={{
          height: 44, background: "#161b22", borderBottom: "1px solid #30363d",
          display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 12px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* Diligent Logo */}
            <svg width="22" height="22" viewBox="0 0 222 222" xmlns="http://www.w3.org/2000/svg">
              <g>
                <path fill="#EE312E" d="M200.87,110.85c0,33.96-12.19,61.94-33.03,81.28c-0.24,0.21-0.42,0.43-0.66,0.64c-15.5,14.13-35.71,23.52-59.24,27.11l-1.59-1.62l35.07-201.75l1.32-3.69C178.64,30.36,200.87,65.37,200.87,110.85z"/>
                <path fill="#AF292E" d="M142.75,12.83l-0.99,1.47L0.74,119.34L0,118.65c0,0,0-0.03,0-0.06V0.45h85.63c5.91,0,11.64,0.34,17.19,1.01h0.21c14.02,1.66,26.93,5.31,38.48,10.78C141.97,12.46,142.75,12.83,142.75,12.83z"/>
                <path fill="#D3222A" d="M142.75,12.83L0,118.65v99.27v3.62h85.96c7.61,0,14.94-0.58,21.99-1.66C107.95,219.89,142.75,12.83,142.75,12.83z"/>
              </g>
            </svg>
            <span style={{ fontSize: 14, fontWeight: 600, color: "#f0f6fc", letterSpacing: "-0.3px" }}>Boards</span>
            <div style={{ width: 1, height: 16, background: "#30363d", margin: "0 4px" }} />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 13, color: "#c9d1d9", fontWeight: 500 }}>Disclosure Committee — Feb 28 Review</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button style={{ padding: "5px 10px", background: "none", border: "1px solid #30363d", borderRadius: 4, fontSize: 12, color: "#c9d1d9", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ fontSize: 12 }}>🖥</span> Present
            </button>
            <button style={{ padding: "5px 10px", background: "none", border: "1px solid #30363d", borderRadius: 4, fontSize: 12, color: "#c9d1d9", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ fontSize: 12 }}>📧</span> Follow
            </button>
            <button
              style={{
                padding: "5px 10px",
                background: viewMode === "prep" ? "#7C3AED" : "none",
                border: viewMode === "prep" ? "1px solid #7C3AED" : "1px solid #E5E7EB",
                borderRadius: 4, fontSize: 12,
                color: viewMode === "prep" ? "#fff" : "#7C3AED",
                cursor: "pointer", display: "flex", alignItems: "center", gap: 4,
                fontWeight: 600
              }}
            >
              <span style={{ fontSize: 10 }}>✦</span> GovernAI
            </button>
            <div style={{ width: 1, height: 20, background: "#30363d" }} />
            <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "#8b949e" }}>↗</button>
            <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "#8b949e" }}>🔍</button>
            <div style={{
              width: 18, height: 18, borderRadius: "50%", background: "#059669", color: "#fff",
              fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              ✓
            </div>
            <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "#8b949e" }}>?</button>
            <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "#8b949e" }}>⚙</button>
          </div>
        </header>

        {/* Review Complete Banner — inside Boards chrome */}
        {markedAsRead && (
          <div style={{
            padding: "8px 16px",
            background: "#052e16", borderBottom: "1px solid #065f46",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 10
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#059669" }}>Review Complete — no changes requested</span>
            <span style={{ fontSize: 12, color: "#34d399" }}>·</span>
            <span style={{ fontSize: 12, color: "#34d399" }}>The General Counsel has been notified</span>
          </div>
        )}

        {/* Secondary Toolbar */}
        <div style={{
          height: 40, background: "#1a1f2e", borderBottom: "1px solid #30363d",
          display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 12px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <button style={{ width: 28, height: 28, background: "none", border: "none", cursor: "pointer", color: "#8b949e", fontSize: 14 }}>☰</button>
            <button style={{ width: 28, height: 28, background: "none", border: "none", cursor: "pointer", color: "#8b949e", fontSize: 14 }}>↗</button>
            <button style={{ width: 28, height: 28, background: "none", border: "none", cursor: "pointer", color: "#8b949e", fontSize: 14 }}>👤</button>
            <button style={{ width: 28, height: 28, background: "none", border: "none", cursor: "pointer", color: "#8b949e", fontSize: 14 }}>🔍</button>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
            {["📋", "✋", "✏️", "△", "↩", "↪", "🗑", "📎", "🖨", "↗"].map((icon, i) => (
              <button key={i} style={{
                width: 28, height: 28, background: "none", border: "none",
                cursor: "pointer", color: i < 3 ? "#B45309" : "#6B7280", fontSize: 12
              }}>
                {icon}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div style={{ flex: 1, display: "flex" }}>
          {/* Left Sidebar - Navigation */}
          <aside style={{ width: 220, background: "#161b22", borderRight: "1px solid #30363d", padding: "12px 0", flexShrink: 0 }}>
            <div style={{ padding: "0 12px", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#8b949e" }}>Navigation</span>
                <button style={{ background: "none", border: "none", cursor: "pointer", color: "#6e7681" }}>≡</button>
              </div>
            </div>

            {viewMode === "prep" && (
              <div style={{ padding: "8px 12px", background: "#2e1065", margin: "0 8px", borderRadius: 8, marginBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: 14 }}>✨</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#a78bfa" }}>Meeting Prep</span>
                </div>
                <div style={{ display: "grid", gap: 4 }}>
                  <div style={{ fontSize: 11, color: "#8b949e", display: "flex", justifyContent: "space-between" }}>
                    <span>Open Actions</span>
                    <span style={{ fontWeight: 600, color: overdueActions.length > 0 ? "#DC2626" : "#374151" }}>
                      {allOpenActions.length} {overdueActions.length > 0 && `(${overdueActions.length} overdue)`}
                    </span>
                  </div>
                  <div style={{ fontSize: 11, color: "#8b949e", display: "flex", justifyContent: "space-between" }}>
                    <span>AI Verified</span>
                    <span style={{ fontWeight: 600, color: "#059669" }}>3 checks passed</span>
                  </div>
                </div>
              </div>
            )}

            <div style={{ padding: "0 8px" }}>
              <div style={{
                padding: "10px 12px", background: "#0d1117", borderRadius: 6,
                fontSize: 12, color: "#c9d1d9", fontWeight: 500
              }}>
                {MEETING_INFO.title} ({MEETING_INFO.date})
              </div>
            </div>

            <div style={{ marginTop: 16, padding: "0 8px", maxHeight: 400, overflowY: "auto" }}>
              {SLIDES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentSlide(s.id)}
                  style={{
                    width: "100%", padding: "8px", marginBottom: 4, borderRadius: 6,
                    background: currentSlide === s.id ? "#E0E7FF" : "transparent",
                    border: currentSlide === s.id ? "1px solid #818CF8" : "1px solid transparent",
                    cursor: "pointer", textAlign: "left",
                    display: "flex", alignItems: "center", gap: 8
                  }}
                >
                  <span style={{
                    width: 20, height: 20, borderRadius: 4, background: "#30363d",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 10, fontWeight: 600, color: "#8b949e"
                  }}>
                    {s.id}
                  </span>
                  <span style={{ fontSize: 11, color: "#c9d1d9", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {s.title}
                  </span>
                  {s.hasActions && (
                    <span style={{
                      width: 16, height: 16, borderRadius: "50%", background: "#422006",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 9, fontWeight: 700, color: "#fbbf24"
                    }}>
                      {s.actionCount}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </aside>

          {/* Main Slide Viewer */}
          <main style={{ flex: 1, display: "flex", flexDirection: "column", background: "#0d1117", padding: 16 }}>
            {/* Action buttons above the slide */}
            {!markedAsRead ? (
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 8,
                marginBottom: 10
              }}>
                  <button style={{
                    padding: "7px 14px", borderRadius: 6, fontSize: 12, fontWeight: 500, cursor: "pointer",
                    background: "#161b22", border: "1px solid #30363d", color: "#c9d1d9",
                    display: "flex", alignItems: "center", gap: 6,
                  }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                    Ask Clarifying Questions
                  </button>
                  <button style={{
                    padding: "7px 14px", borderRadius: 6, fontSize: 12, fontWeight: 500, cursor: "pointer",
                    background: "#161b22", border: "1px solid #30363d", color: "#c9d1d9",
                    display: "flex", alignItems: "center", gap: 6,
                  }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                    Request Edits
                  </button>
                  <button
                    onClick={handleMarkAsRead}
                    style={{
                      padding: "7px 14px", borderRadius: 6, fontSize: 12, fontWeight: 500, cursor: "pointer",
                      background: "#059669", border: "1px solid #059669", color: "#fff",
                      display: "flex", alignItems: "center", gap: 6,
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    Mark as Read / No Changes
                  </button>
              </div>
            ) : null}

            <div style={{
              flex: 1, background: "#161b22", borderRadius: 8, boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              display: "flex", flexDirection: "column", overflow: "hidden", padding: 32
            }}>
              {/* Slide 2: 10-K Risk Factor Update */}
              {currentSlide === 2 && (
                <>
                  <div style={{ marginBottom: 24 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                      <p style={{ fontSize: 12, color: "#8b949e", textTransform: "uppercase", letterSpacing: "1px" }}>Item 1A — Risk Factors</p>
                      <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 12, background: "#422006", color: "#fbbf24", fontWeight: 600, border: "1px solid #92400e" }}>UPDATED</span>
                    </div>
                    <h1 style={{ fontSize: 28, fontWeight: 700, color: "#f0f6fc", lineHeight: 1.2 }}>
                      Semiconductor Supply Chain and Geopolitical Risks
                    </h1>
                  </div>

                  {/* Risk summary cards */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 28 }}>
                    <div style={{ padding: 16, background: "#3b1219", borderRadius: 12, borderLeft: "4px solid #dc2626" }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: "#fca5a5", marginBottom: 4 }}>Severity</div>
                      <div style={{ fontSize: 22, fontWeight: 800, color: "#DC2626" }}>Critical</div>
                      <div style={{ fontSize: 11, color: "#fca5a5" }}>Escalated from High</div>
                    </div>
                    <div style={{ padding: 16, background: "#422006", borderRadius: 12, borderLeft: "4px solid #d97706" }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: "#fbbf24", marginBottom: 4 }}>Supply Concentration</div>
                      <div style={{ fontSize: 22, fontWeight: 800, color: "#D97706" }}>47%</div>
                      <div style={{ fontSize: 11, color: "#fbbf24" }}>Taiwan-based suppliers</div>
                    </div>
                    <div style={{ padding: 16, background: "#0c2d6b", borderRadius: 12, borderLeft: "4px solid #3b82f6" }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: "#60a5fa", marginBottom: 4 }}>Filing Deadline</div>
                      <div style={{ fontSize: 22, fontWeight: 800, color: "#3B82F6" }}>13 days</div>
                      <div style={{ fontSize: 11, color: "#60a5fa" }}>10-Q due March 15</div>
                    </div>
                  </div>

                  {/* The actual 10-K disclosure text */}
                  <div style={{ marginBottom: 24 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#c9d1d9", marginBottom: 12 }}>Proposed Disclosure Language</div>
                    <div style={{
                      padding: 20, background: "#1a1f2e", borderRadius: 8, border: "1px solid #30363d",
                      borderLeft: "4px solid #3b82f6"
                    }}>
                      <p style={{ fontSize: 14, color: "#f0f6fc", lineHeight: 1.8 }}>
                        We face significant risks related to semiconductor supply chain concentration and geopolitical exposure in the Taiwan Strait region. Approximately 47% of our chip suppliers have Taiwan-based operations, creating material concentration risk. Escalating tensions may disrupt our semiconductor supply chain, extend lead times, and materially impact our ability to source critical components. We are pursuing supplier diversification initiatives, including evaluation of alternative sourcing regions as discussed at the board level; however, qualification of alternative suppliers typically requires 12–18 months.
                      </p>
                    </div>
                  </div>

                  {/* Prior year comparison */}
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#c9d1d9", marginBottom: 12 }}>Changes from Prior Year</div>
                    <div style={{
                      display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16
                    }}>
                      <div style={{ padding: 16, background: "#161b22", borderRadius: 8, border: "1px solid #30363d" }}>
                        <div style={{ fontSize: 11, fontWeight: 600, color: "#6e7681", marginBottom: 8 }}>PRIOR YEAR (FY2025)</div>
                        <p style={{ fontSize: 12, color: "#8b949e", lineHeight: 1.6 }}>
                          Our operations depend on the continuous and uninterrupted performance of our supply chain and key operational processes. Disruptions caused by natural disasters, geopolitical events, or failures of key vendors could adversely affect our ability to deliver products and services.
                        </p>
                      </div>
                      <div style={{ padding: 16, background: "#0c2d6b", borderRadius: 8, border: "1px solid #1e40af" }}>
                        <div style={{ fontSize: 11, fontWeight: 600, color: "#60a5fa", marginBottom: 8 }}>WHAT&apos;S NEW</div>
                        <ul style={{ fontSize: 12, color: "#93c5fd", lineHeight: 1.6, paddingLeft: 16, margin: 0 }}>
                          <li style={{ marginBottom: 4 }}>Specific Taiwan Strait exposure</li>
                          <li style={{ marginBottom: 4 }}>47% supplier concentration figure</li>
                          <li style={{ marginBottom: 4 }}>Board-level diversification initiatives</li>
                          <li>12–18 month qualification timeline</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: 16, borderTop: "1px solid #30363d" }}>
                    <div style={{ fontSize: 12, color: "#6e7681" }}>
                      Confidential — Disclosure Committee
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 12, background: markedAsRead ? "#059669" : "#ECFDF5", color: markedAsRead ? "#fff" : "#059669", fontWeight: 600, border: `1px solid ${markedAsRead ? "#059669" : "#A7F3D0"}` }}>
                        {markedAsRead ? "✓ You Reviewed" : "✓ AI Verified"}
                      </span>
                      <div style={{ fontSize: 12, color: "#6e7681" }}>2</div>
                    </div>
                  </div>
                </>
              )}

              {/* Slide 1: Agenda */}
              {currentSlide === 1 && (
                <>
                  <div style={{ marginBottom: 32 }}>
                    <p style={{ fontSize: 12, color: "#8b949e", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 8 }}>Disclosure Committee</p>
                    <h1 style={{ fontSize: 32, fontWeight: 700, color: "#f0f6fc", lineHeight: 1.2 }}>
                      Agenda — February 28, 2026
                    </h1>
                  </div>
                  <div style={{ display: "grid", gap: 12 }}>
                    {SLIDES.slice(1).map((s, i) => (
                      <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", background: "#1a1f2e", borderRadius: 8 }}>
                        <div style={{
                          width: 28, height: 28, borderRadius: "50%", background: "#30363d",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 13, fontWeight: 700, color: "#c9d1d9", flexShrink: 0
                        }}>
                          {i + 1}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 14, fontWeight: 600, color: "#f0f6fc" }}>{s.title}</div>
                          <div style={{ fontSize: 12, color: "#8b949e", display: "flex", gap: 6, marginTop: 4 }}>
                            {s.topics.map(t => <span key={t}>{t}</span>)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: 16, borderTop: "1px solid #30363d" }}>
                    <div style={{ fontSize: 12, color: "#6e7681" }}>Confidential — Disclosure Committee</div>
                    <div style={{ fontSize: 12, color: "#6e7681" }}>1</div>
                  </div>
                </>
              )}

              {/* Slides 3-6: Placeholder content */}
              {currentSlide >= 3 && (
                <>
                  <div style={{ marginBottom: 32 }}>
                    <p style={{ fontSize: 12, color: "#8b949e", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 8 }}>
                      {slide.topics.join(" · ")}
                    </p>
                    <h1 style={{ fontSize: 28, fontWeight: 700, color: "#f0f6fc", lineHeight: 1.2 }}>
                      {slide.title}
                    </h1>
                  </div>
                  <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ textAlign: "center", color: "#6e7681" }}>
                      <div style={{ fontSize: 48, marginBottom: 12, opacity: 0.3 }}>📄</div>
                      <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>Document Preview</div>
                      <div style={{ fontSize: 12 }}>Full content available in the Context Packet</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: 16, borderTop: "1px solid #30363d" }}>
                    <div style={{ fontSize: 12, color: "#6e7681" }}>Confidential — Disclosure Committee</div>
                    <div style={{ fontSize: 12, color: "#6e7681" }}>{currentSlide}</div>
                  </div>
                </>
              )}
            </div>

            {/* Page Navigation */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              marginTop: 12, padding: "0 8px"
            }}>
              <button
                onClick={() => setCurrentSlide(Math.max(1, currentSlide - 1))}
                style={{ fontSize: 12, color: "#8b949e", background: "none", border: "none", cursor: "pointer" }}
              >
                {currentSlide > 1 ? `Back to page ${currentSlide - 1}` : ""}
              </button>

              <div style={{ flex: 1, margin: "0 24px", position: "relative" }}>
                <div style={{ height: 4, background: "#30363d", borderRadius: 2 }} />
                <div
                  style={{
                    position: "absolute",
                    left: `${((currentSlide - 1) / (MEETING_INFO.totalSlides - 1)) * 100}%`,
                    top: "50%", transform: "translate(-50%, -50%)",
                    width: 14, height: 14, borderRadius: "50%", background: "#58a6ff", border: "2px solid #fff",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.2)", cursor: "pointer"
                  }}
                />
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <button
                  onClick={() => setCurrentSlide(Math.max(1, currentSlide - 1))}
                  style={{ width: 28, height: 28, borderRadius: 4, background: "#161b22", border: "1px solid #30363d", cursor: "pointer" }}
                >
                  ‹
                </button>
                <span style={{ fontSize: 13, color: "#c9d1d9", minWidth: 50, textAlign: "center" }}>
                  {currentSlide} / {MEETING_INFO.totalSlides}
                </span>
                <button
                  onClick={() => setCurrentSlide(Math.min(MEETING_INFO.totalSlides, currentSlide + 1))}
                  style={{ width: 28, height: 28, borderRadius: 4, background: "#161b22", border: "1px solid #30363d", cursor: "pointer" }}
                >
                  ›
                </button>
                <div style={{ width: 1, height: 20, background: "#30363d", margin: "0 8px" }} />
                <button style={{ padding: "4px 8px", background: "#161b22", border: "1px solid #30363d", borderRadius: 4, fontSize: 12 }}>🔍−</button>
                <span style={{ fontSize: 12, color: "#8b949e" }}>125%</span>
                <button style={{ padding: "4px 8px", background: "#161b22", border: "1px solid #30363d", borderRadius: 4, fontSize: 12 }}>🔍+</button>
              </div>
            </div>
          </main>

          {/* Right Sidebar — GovernAI Panel */}
          {notesOpen && (
            <aside style={{ width: 320, background: "#161b22", borderLeft: "1px solid #E5E7EB", display: "flex", flexDirection: "column" }}>
              <div style={{
                padding: "12px 16px", borderBottom: "1px solid #30363d",
                display: "flex", alignItems: "center", justifyContent: "space-between"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {viewMode === "prep" ? (
                    <>
                      <span style={{ fontSize: 16 }}>✨</span>
                      <span style={{ fontSize: 14, fontWeight: 600, color: "#a78bfa" }}>
                        {userRole === "board-member" ? "Board Prep" : "Exec Prep"}
                      </span>
                      <span style={{
                        fontSize: 9, padding: "2px 6px", borderRadius: 4,
                        background: userRole === "board-member" ? "#E0E7FF" : "#FEF3C7",
                        color: userRole === "board-member" ? "#4338CA" : "#B45309",
                        fontWeight: 600
                      }}>
                        {userRole === "board-member" ? "DIRECTOR" : "CORP SEC"}
                      </span>
                    </>
                  ) : (
                    <>
                      <span style={{ fontSize: 16 }}>📝</span>
                      <span style={{ fontSize: 14, fontWeight: 600, color: "#c9d1d9" }}>Notes</span>
                    </>
                  )}
                </div>
                <button
                  onClick={() => setNotesOpen(false)}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "#6e7681", fontSize: 18 }}
                >
                  ×
                </button>
              </div>

              {viewMode === "meeting" && (
                <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{ padding: 16, borderBottom: "1px solid #30363d" }}>
                    <button style={{
                      width: "100%", padding: "10px 12px", background: "#1a1f2e",
                      border: "1px dashed #30363d", borderRadius: 8, color: "#8b949e",
                      fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6
                    }}>
                      <span>+</span> Add note
                    </button>
                  </div>
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 32, color: "#6e7681" }}>
                    <div style={{ fontSize: 48, marginBottom: 12, opacity: 0.5 }}>📝</div>
                    <div style={{ fontSize: 13, textAlign: "center" }}>No page notes</div>
                    <div style={{ fontSize: 12, textAlign: "center", marginTop: 4 }}>Click above to add a note to this slide</div>
                  </div>
                  {slideActions.length > 0 && (
                    <div style={{ padding: 12, borderTop: "1px solid #30363d", background: "#422006" }}>
                      <div style={{ fontSize: 11, color: "#fbbf24", display: "flex", alignItems: "center", gap: 6 }}>
                        <span>⚡</span>
                        <span>{slideActions.length} open action{slideActions.length > 1 ? "s" : ""} from this slide</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {viewMode === "prep" && (
                <>
                  <div style={{ display: "flex", borderBottom: "1px solid #30363d" }}>
                    {[
                      { id: "context" as const, label: "This Slide", count: null },
                      { id: "meeting" as const, label: "Overview", count: null },
                      { id: "actions" as const, label: "Actions", count: allOpenActions.length },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setAiPanelMode(tab.id)}
                        style={{
                          flex: 1, padding: "10px 8px", fontSize: 12, fontWeight: 600, cursor: "pointer",
                          background: "none", border: "none",
                          color: aiPanelMode === tab.id ? "#5B21B6" : "#6B7280",
                          borderBottom: aiPanelMode === tab.id ? "2px solid #5B21B6" : "2px solid transparent",
                          display: "flex", alignItems: "center", justifyContent: "center", gap: 4
                        }}
                      >
                        {tab.label}
                        {tab.count && (
                          <span style={{
                            fontSize: 10, padding: "1px 5px", borderRadius: 8,
                            background: aiPanelMode === tab.id ? "#7C3AED" : "#E5E7EB",
                            color: aiPanelMode === tab.id ? "#fff" : "#6B7280"
                          }}>
                            {tab.count}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>

                  <div style={{ flex: 1, overflow: "auto", padding: 16 }}>
                    {aiPanelMode === "context" && (
                      <div>
                        {/* Diligent AI Header */}
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                          <svg width="18" height="18" viewBox="0 0 222 222" xmlns="http://www.w3.org/2000/svg">
                            <g>
                              <path fill="#EE312E" d="M200.87,110.85c0,33.96-12.19,61.94-33.03,81.28c-0.24,0.21-0.42,0.43-0.66,0.64c-15.5,14.13-35.71,23.52-59.24,27.11l-1.59-1.62l35.07-201.75l1.32-3.69C178.64,30.36,200.87,65.37,200.87,110.85z"/>
                              <path fill="#AF292E" d="M142.75,12.83l-0.99,1.47L0.74,119.34L0,118.65c0,0,0-0.03,0-0.06V0.45h85.63c5.91,0,11.64,0.34,17.19,1.01h0.21c14.02,1.66,26.93,5.31,38.48,10.78C141.97,12.46,142.75,12.83,142.75,12.83z"/>
                              <path fill="#D3222A" d="M142.75,12.83L0,118.65v99.27v3.62h85.96c7.61,0,14.94-0.58,21.99-1.66C107.95,219.89,142.75,12.83,142.75,12.83z"/>
                            </g>
                          </svg>
                          <span style={{ fontSize: 13, fontWeight: 700, color: "#f0f6fc" }}>Diligent AI</span>
                          <span style={{ fontSize: 10, padding: "2px 6px", borderRadius: 4, background: "#2e1065", color: "#7C3AED", fontWeight: 600 }}>INSIGHTS</span>
                        </div>

                        {/* Suggested Questions — moved to top */}
                        <div style={{ marginBottom: 20 }}>
                          <div style={{ fontSize: 11, fontWeight: 600, color: "#8b949e", marginBottom: 8 }}>SUGGESTED QUESTIONS</div>
                          <div style={{ display: "grid", gap: 8 }}>
                            <div style={{ padding: 10, background: "#2e1065", borderRadius: 6, fontSize: 12, color: "#a78bfa", borderLeft: "3px solid #7c3aed", lineHeight: 1.5 }}>
                              &quot;What is the board&apos;s exposure if we don&apos;t disclose and this becomes material?&quot;
                            </div>
                            <div style={{ padding: 10, background: "#2e1065", borderRadius: 6, fontSize: 12, color: "#a78bfa", borderLeft: "3px solid #7c3aed", lineHeight: 1.5 }}>
                              &quot;Have our D&amp;O insurance carriers flagged geopolitical supply chain as a coverage concern?&quot;
                            </div>
                            <div style={{ padding: 10, background: "#2e1065", borderRadius: 6, fontSize: 12, color: "#a78bfa", borderLeft: "3px solid #7c3aed", lineHeight: 1.5 }}>
                              &quot;How does this disclosure language compare to what our outside counsel recommended?&quot;
                            </div>
                          </div>
                        </div>

                        {/* Reputational Implications — accordion */}
                        <div style={{ marginBottom: 8 }}>
                          <button
                            onClick={() => setRepOpen(!repOpen)}
                            style={{
                              width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                              padding: "10px 12px", background: "#3b1219", borderRadius: repOpen ? "8px 8px 0 0" : 8,
                              border: "1px solid #7f1d1d", cursor: "pointer", textAlign: "left"
                            }}
                          >
                            <span style={{ fontSize: 11, fontWeight: 600, color: "#DC2626" }}>⚠ REPUTATIONAL IMPLICATIONS</span>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: repOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}><polyline points="6 9 12 15 18 9" /></svg>
                          </button>
                          {repOpen && (
                            <div style={{
                              padding: 12, background: "#3b1219",
                              borderRadius: "0 0 8px 8px", borderLeft: "1px solid #7f1d1d", borderRight: "1px solid #7f1d1d", borderBottom: "1px solid #7f1d1d"
                            }}>
                              <div style={{ display: "grid", gap: 10 }}>
                                <div style={{ fontSize: 12, color: "#fca5a5", lineHeight: 1.6 }}>
                                  <strong>Investor confidence risk:</strong> Failure to disclose known supply chain concentration may be viewed as a material omission. 3 shareholder advisory firms have flagged semiconductor risk disclosure as a 2026 proxy season focus area.
                                </div>
                                <div style={{ fontSize: 12, color: "#fca5a5", lineHeight: 1.6 }}>
                                  <strong>Media exposure:</strong> 12 major news outlets have published Taiwan Strait supply chain articles in the last 30 days. Analysts are likely to ask about this on the next earnings call.
                                </div>
                                <div style={{ fontSize: 12, color: "#fca5a5", lineHeight: 1.6 }}>
                                  <strong>Peer comparison gap:</strong> 4 of 6 comparable companies have already updated their risk factor language for Taiwan exposure. Delayed disclosure may signal governance weakness.
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Governance Implications — accordion */}
                        <div style={{ marginBottom: 20 }}>
                          <button
                            onClick={() => setGovOpen(!govOpen)}
                            style={{
                              width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                              padding: "10px 12px", background: "#0c2d6b", borderRadius: govOpen ? "8px 8px 0 0" : 8,
                              border: "1px solid #1e40af", cursor: "pointer", textAlign: "left"
                            }}
                          >
                            <span style={{ fontSize: 11, fontWeight: 600, color: "#60a5fa" }}>GOVERNANCE IMPLICATIONS</span>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: govOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}><polyline points="6 9 12 15 18 9" /></svg>
                          </button>
                          {govOpen && (
                            <div style={{
                              padding: 12, background: "#0c2d6b",
                              borderRadius: "0 0 8px 8px", borderLeft: "1px solid #1e40af", borderRight: "1px solid #1e40af", borderBottom: "1px solid #1e40af"
                            }}>
                              <div style={{ display: "grid", gap: 10 }}>
                                <div style={{ fontSize: 12, color: "#93c5fd", lineHeight: 1.6 }}>
                                  <strong>Board oversight obligation:</strong> The board has a fiduciary duty to ensure material risks are adequately disclosed. Taiwan Strait risk was discussed in Q3 board materials but not reflected in current SEC filings.
                                </div>
                                <div style={{ fontSize: 12, color: "#93c5fd", lineHeight: 1.6 }}>
                                  <strong>Disclosure Committee process:</strong> This risk was identified by monitoring agents 18 days ago. Prompt escalation through the Disclosure Committee demonstrates sound governance practices.
                                </div>
                                <div style={{ fontSize: 12, color: "#93c5fd", lineHeight: 1.6 }}>
                                  <strong>Regulatory alignment:</strong> SEC has increased scrutiny on geopolitical risk disclosures per recent Staff Legal Bulletins. Updated language aligns with current guidance.
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {aiPanelMode === "meeting" && (
                      <div>
                        <div style={{ marginBottom: 20 }}>
                          <div style={{ fontSize: 11, fontWeight: 600, color: "#8b949e", marginBottom: 8 }}>DISCLOSURE STATUS</div>
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                            <div style={{ padding: 12, background: "#052e16", borderRadius: 8, border: "1px solid #065f46" }}>
                              <div style={{ fontSize: 20, fontWeight: 800, color: "#059669" }}>3 / 3</div>
                              <div style={{ fontSize: 11, color: "#34d399" }}>Risks reviewed</div>
                            </div>
                            <div style={{ padding: 12, background: "#1a1f2e", borderRadius: 8, border: "1px solid #30363d" }}>
                              <div style={{ fontSize: 20, fontWeight: 800, color: "#f0f6fc" }}>13 days</div>
                              <div style={{ fontSize: 11, color: "#8b949e" }}>Until 10-Q filing</div>
                            </div>
                          </div>
                        </div>

                        <div style={{ marginBottom: 20 }}>
                          <div style={{ fontSize: 11, fontWeight: 600, color: "#8b949e", marginBottom: 8 }}>RISKS REQUIRING DISCLOSURE</div>
                          <div style={{ display: "grid", gap: 6 }}>
                            {[
                              { risk: "Taiwan Strait Geopolitical Tensions", severity: "Critical", color: "#DC2626", bg: "#FEF2F2", border: "#FECACA" },
                              { risk: "Critical Vendor Cybersecurity Breach", severity: "High", color: "#D97706", bg: "#FEF3C7", border: "#FDE68A" },
                              { risk: "EU Digital Markets Act Enforcement", severity: "High", color: "#D97706", bg: "#FEF3C7", border: "#FDE68A" },
                            ].map(r => (
                              <div key={r.risk} style={{
                                display: "flex", alignItems: "center", gap: 8,
                                padding: "8px 10px", background: r.bg, borderRadius: 6,
                                border: `1px solid ${r.border}`
                              }}>
                                <div style={{ flex: 1 }}>
                                  <div style={{ fontSize: 12, fontWeight: 600, color: "#f0f6fc" }}>{r.risk}</div>
                                </div>
                                <span style={{ fontSize: 10, fontWeight: 600, color: r.color, background: "#161b22", padding: "2px 6px", borderRadius: 4 }}>
                                  {r.severity}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <div style={{ fontSize: 11, fontWeight: 600, color: "#8b949e", marginBottom: 8 }}>COMMITTEE ROUTING</div>
                          <div style={{
                            padding: 12, background: "#0c2d6b", borderRadius: 8,
                            border: "1px solid #1e40af"
                          }}>
                            <div style={{ fontSize: 12, fontWeight: 600, color: "#93c5fd", marginBottom: 6 }}>After this review:</div>
                            <div style={{ display: "grid", gap: 4, fontSize: 12, color: "#60a5fa" }}>
                              <div>→ Audit Committee (risk disclosures, financial implications)</div>
                              <div>→ Risk Committee</div>
                              <div>→ Compliance / Regulatory Committee</div>
                              <div>→ Cybersecurity Committee</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {aiPanelMode === "actions" && (
                      <div>
                        {userRole === "board-member" && (
                          <>
                            <div style={{ marginBottom: 16 }}>
                              <div style={{ fontSize: 13, fontWeight: 600, color: "#f0f6fc", marginBottom: 4 }}>
                                What would you like to do?
                              </div>
                              <div style={{ fontSize: 11, color: "#8b949e" }}>
                                GovernAI can help you review these disclosures
                              </div>
                            </div>

                            <div style={{ display: "grid", gap: 10 }}>
                              <div style={{
                                padding: 14, background: "#1a1f2e", borderRadius: 10,
                                border: "1px solid #30363d"
                              }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                                  <div style={{ fontSize: 13, color: "#f0f6fc", fontWeight: 600 }}>
                                    Add questions to my meeting notes
                                  </div>
                                  <span style={{ fontSize: 9, padding: "2px 6px", borderRadius: 4, background: "#052e16", color: "#059669", fontWeight: 600 }}>
                                    INSTANT
                                  </span>
                                </div>
                                <div style={{ fontSize: 11, color: "#8b949e", marginBottom: 12 }}>
                                  Save suggested questions about the risk disclosure to your notes
                                </div>
                                <button style={{
                                  padding: "8px 14px", background: "#7C3AED", color: "#fff",
                                  border: "none", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer",
                                  display: "flex", alignItems: "center", gap: 6
                                }}>
                                  <span>✓</span> Add to Notes
                                </button>
                              </div>

                              <div style={{
                                padding: 14, background: "linear-gradient(135deg, #2e1065 0%, #1e1b4b 100%)",
                                borderRadius: 10, border: "1px solid #5b21b6"
                              }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                                  <div style={{ fontSize: 13, color: "#a78bfa", fontWeight: 600 }}>
                                    Compare with peer disclosures
                                  </div>
                                  <span style={{ fontSize: 9, padding: "2px 6px", borderRadius: 4, background: "#EDE9FE", color: "#7C3AED", fontWeight: 600 }}>
                                    AGENT DRAFT
                                  </span>
                                </div>
                                <div style={{ fontSize: 11, color: "#8b949e", marginBottom: 12 }}>
                                  Agent creates a side-by-side comparison of your disclosure vs. peer filings. You review before sharing.
                                </div>
                                <button style={{
                                  padding: "8px 14px", background: "#161b22", color: "#7C3AED",
                                  border: "1px solid #7C3AED", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer",
                                  display: "flex", alignItems: "center", gap: 6
                                }}>
                                  <span>✨</span> Generate Comparison
                                </button>
                              </div>
                            </div>

                            <div style={{ margin: "20px 0", borderTop: "1px solid #30363d" }} />

                            <div style={{ fontSize: 11, fontWeight: 600, color: "#8b949e", marginBottom: 8 }}>
                              ACTION ITEMS ({ACTIONS.length})
                            </div>
                            <div style={{ display: "grid", gap: 6 }}>
                              {ACTIONS.map(action => (
                                <div key={action.id} style={{
                                  padding: 10, background: "#161b22", borderRadius: 8,
                                  border: "1px solid #30363d", fontSize: 12
                                }}>
                                  <div style={{ color: "#f0f6fc", marginBottom: 4 }}>{action.text}</div>
                                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <span style={{ fontSize: 10, color: "#8b949e" }}>{action.owner} · Due {action.dueDate}</span>
                                    <StatusBadge status={action.status} />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </>
                        )}

                        {userRole === "corp-sec" && (
                          <>
                            <div style={{
                              padding: 12, background: "#052e16", borderRadius: 10,
                              border: "1px solid #065f46", marginBottom: 16
                            }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <span style={{ fontSize: 16 }}>✓</span>
                                <div>
                                  <div style={{ fontSize: 13, fontWeight: 600, color: "#059669" }}>On track for filing</div>
                                  <div style={{ fontSize: 11, color: "#34d399" }}>CEO approved, AI verified, {allOpenActions.length} actions remaining</div>
                                </div>
                              </div>
                            </div>

                            <div style={{ display: "grid", gap: 10 }}>
                              <div style={{
                                padding: 14, background: "linear-gradient(135deg, #3b1219 0%, #450a0a 100%)",
                                borderRadius: 10, border: "1px solid #7f1d1d"
                              }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                                  <div style={{ fontSize: 13, color: "#fca5a5", fontWeight: 600 }}>
                                    Route to additional committees
                                  </div>
                                  <span style={{ fontSize: 9, padding: "2px 6px", borderRadius: 4, background: "#FEE2E2", color: "#DC2626", fontWeight: 600 }}>
                                    NEXT STEP
                                  </span>
                                </div>
                                <div style={{ fontSize: 11, color: "#fca5a5", marginBottom: 12 }}>
                                  CEO requested forwarding to Risk, Compliance, and Cybersecurity committees.
                                </div>
                                <button style={{
                                  padding: "8px 14px", background: "#DC2626", color: "#fff",
                                  border: "none", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer",
                                  display: "flex", alignItems: "center", gap: 6
                                }}>
                                  <span>📧</span> Notify Committees
                                </button>
                              </div>

                              <div style={{
                                padding: 14, background: "#1a1f2e",
                                borderRadius: 10, border: "1px solid #30363d"
                              }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                                  <div style={{ fontSize: 13, color: "#f0f6fc", fontWeight: 600 }}>
                                    Generate EDGAR filing package
                                  </div>
                                  <span style={{ fontSize: 9, padding: "2px 6px", borderRadius: 4, background: "#052e16", color: "#059669", fontWeight: 600 }}>
                                    INSTANT
                                  </span>
                                </div>
                                <div style={{ fontSize: 11, color: "#8b949e", marginBottom: 12 }}>
                                  Prepare the EDGAR submission package with all approved disclosures.
                                </div>
                                <button style={{
                                  padding: "8px 14px", background: "#7C3AED", color: "#fff",
                                  border: "none", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer",
                                  display: "flex", alignItems: "center", gap: 6
                                }}>
                                  <span>✓</span> Generate Package
                                </button>
                              </div>
                            </div>

                            <div style={{ margin: "20px 0", borderTop: "1px solid #30363d" }} />

                            <div style={{ fontSize: 11, fontWeight: 600, color: "#8b949e", marginBottom: 8 }}>
                              ALL ACTIONS ({ACTIONS.length})
                            </div>
                            <div style={{ display: "grid", gap: 6 }}>
                              {ACTIONS.map(action => (
                                <div key={action.id} style={{
                                  padding: 10, background: "#161b22", borderRadius: 8,
                                  border: "1px solid #30363d", fontSize: 12
                                }}>
                                  <div style={{ color: "#f0f6fc", marginBottom: 4 }}>{action.text}</div>
                                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <span style={{ fontSize: 10, color: "#8b949e" }}>{action.owner} · Due {action.dueDate}</span>
                                    <StatusBadge status={action.status} />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  <div style={{ padding: 12, borderTop: "1px solid #30363d" }}>
                    <div style={{
                      display: "flex", alignItems: "center", gap: 8, padding: "10px 12px",
                      background: "#2e1065", borderRadius: 8, border: "1px solid #5b21b6"
                    }}>
                      <span style={{ fontSize: 14 }}>✨</span>
                      <input
                        type="text"
                        placeholder="Ask about this disclosure..."
                        style={{
                          flex: 1, background: "none", border: "none", outline: "none",
                          fontSize: 13, color: "#a78bfa"
                        }}
                      />
                      <button style={{
                        padding: "4px 10px", background: "#7C3AED", color: "#fff",
                        border: "none", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer"
                      }}>
                        Ask
                      </button>
                    </div>
                  </div>
                </>
              )}
            </aside>
          )}
        </div>
      </div>

      {/* Prototype footer */}
      <StakeholderFooter label="Prototype navigation — Board Director reviewing disclosures in Boards">
        <PrototypeControlLink href="/superhero/gc-committee-complete">
          Advance to GC experience →
        </PrototypeControlLink>
      </StakeholderFooter>
    </div>
  );
}
