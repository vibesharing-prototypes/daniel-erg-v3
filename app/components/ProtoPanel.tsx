"use client";

import React from "react";

type Theme = "light" | "dark";
type State = "calm" | "busy" | "critical";

interface ProtoPanelProps {
  description?: string;
  themeToggle?: boolean;
  stateToggle?: boolean;
  stateLabels?: [string, string, string];
  onThemeChange?: (theme: Theme) => void;
  onStateChange?: (state: State) => void;
  children?: React.ReactNode;
}

const STATE_KEYS: State[] = ["calm", "busy", "critical"];

export function ProtoPanel({
  description = "A Claude-coded prototype.",
  themeToggle = true,
  stateToggle = true,
  stateLabels = ["CALM", "BUSY", "CRITICAL"],
  onThemeChange,
  onStateChange,
  children,
}: ProtoPanelProps) {
  const [open, setOpen] = React.useState(false);
  const [theme, setTheme] = React.useState<Theme>(() =>
    typeof document !== "undefined" && document.documentElement.classList.contains("dark") ? "dark" : "light"
  );
  const [state, setState] = React.useState<State>("calm");
  const styleRef = React.useRef<HTMLStyleElement | null>(null);

  // Inject CSS via style element (static string, no user input)
  React.useEffect(() => {
    if (document.getElementById("pp-styles")) return;
    const style = document.createElement("style");
    style.id = "pp-styles";
    style.textContent = PANEL_CSS;
    document.head.appendChild(style);
    styleRef.current = style;
    return () => { style.remove(); };
  }, []);

  // Apply dark class to <html> for Tailwind
  React.useEffect(() => {
    const html = document.documentElement;
    if (theme === "dark") {
      html.classList.add("dark");
      html.classList.remove("light");
    } else {
      html.classList.remove("dark");
      html.classList.add("light");
    }
    onThemeChange?.(theme);
    document.dispatchEvent(new CustomEvent("proto:theme", { detail: { theme }, bubbles: true }));
  }, [theme]);

  // Apply state to body
  React.useEffect(() => {
    document.body.dataset.ppState = state;
    onStateChange?.(state);
    document.dispatchEvent(new CustomEvent("proto:state", { detail: { state }, bubbles: true }));
  }, [state]);

  // Apply body open class
  React.useEffect(() => {
    document.body.classList.toggle("pp-open", open);
  }, [open]);

  return (
    <div className={`pp-bar${open ? " pp-open" : ""}`} role="region" aria-label="Prototype controls">
      {/* Collapsed row */}
      <div
        className="pp-collapsed"
        role="button"
        aria-expanded={open}
        tabIndex={0}
        onClick={() => setOpen(!open)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen(!open); }
        }}
      >
        <span className="pp-label">PROTOTYPE CONTROLS &mdash; NOT PART OF THE PRODUCT</span>
        <span className="pp-chevron" aria-label="Toggle prototype controls">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </div>

      {/* Expanded panel */}
      <div className="pp-expanded" aria-hidden={!open}>
        {themeToggle && (
          <>
            <div className="pp-group">
              <span className="pp-group-label">THEME</span>
              <div className="pp-pill pp-theme-pill">
                {(["light", "dark"] as Theme[]).map((t) => (
                  <button
                    key={t}
                    className={`pp-btn${theme === t ? " pp-active" : ""}`}
                    onClick={(e) => { e.stopPropagation(); setTheme(t); }}
                  >
                    {t.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            <div className="pp-divider" />
          </>
        )}

        {stateToggle && (
          <>
            <div className="pp-group">
              <span className="pp-group-label">STATE</span>
              <div className="pp-pill pp-state-pill">
                {STATE_KEYS.map((s, i) => (
                  <button
                    key={s}
                    className={`pp-btn${state === s ? " pp-active" : ""}`}
                    data-pp-state={s}
                    onClick={(e) => { e.stopPropagation(); setState(s); }}
                  >
                    {stateLabels[i]}
                  </button>
                ))}
              </div>
            </div>
            <div className="pp-divider" />
          </>
        )}

        {children && (
          <>
            {children}
            <div className="pp-divider" />
          </>
        )}
        <p className="pp-description">{description}</p>
      </div>
    </div>
  );
}

const PANEL_CSS = `
  .pp-bar {
    background: linear-gradient(180deg, #111113 0%, #1a1a1d 55%, #1c1c1f 100%);
    border-bottom: 1px solid #2e2e32;
    flex-shrink: 0;
    z-index: 200;
    overflow: hidden;
    position: relative;
    transition: max-height 0.32s cubic-bezier(0.4, 0, 0.2, 1);
    max-height: 34px;
    box-shadow:
      inset 0 1px 0 rgba(0,0,0,0.8),
      inset 0 3px 12px rgba(0,0,0,0.5),
      0 3px 10px rgba(0,0,0,0.35);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
    font-size: 12px;
    box-sizing: border-box;
  }
  .pp-bar::before {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg,
      transparent 0%,
      rgba(255,255,255,0.07) 15%,
      rgba(255,255,255,0.07) 85%,
      transparent 100%);
    pointer-events: none;
    z-index: 1;
  }
  .pp-bar.pp-open { max-height: 130px; }

  .pp-collapsed {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 34px;
    padding: 0 14px 0 16px;
    cursor: pointer;
    user-select: none;
    transition: background 0.15s;
  }
  .pp-collapsed:hover { background: rgba(255,255,255,0.02); }
  .pp-collapsed:hover .pp-label { color: #c0c0c3; }

  .pp-label {
    font-family: 'Courier New', Courier, 'Lucida Console', monospace;
    font-size: 12px;
    letter-spacing: 0.06em;
    color: #909093;
    transition: color 0.15s;
    white-space: nowrap;
  }

  .pp-chevron {
    display: flex;
    align-items: center;
    padding: 4px;
    color: #8a8a8d;
    transition: color 0.15s, transform 0.28s cubic-bezier(0.4, 0, 0.2, 1);
    flex-shrink: 0;
  }
  .pp-chevron:hover { color: #c0c0c3; }
  .pp-bar.pp-open .pp-chevron { transform: rotate(180deg); }

  .pp-expanded {
    display: flex;
    align-items: center;
    gap: 0;
    padding: 0 16px 11px;
    opacity: 0;
    transform: perspective(480px) rotateX(-6deg) translateY(-6px);
    transform-origin: top center;
    transition:
      opacity 0.25s 0.04s,
      transform 0.28s 0.04s cubic-bezier(0.2, 0.8, 0.4, 1);
    pointer-events: none;
  }
  .pp-bar.pp-open .pp-expanded {
    opacity: 1;
    transform: perspective(480px) rotateX(0deg) translateY(0);
    pointer-events: auto;
  }

  .pp-divider {
    width: 1px;
    height: 20px;
    background: #424246;
    margin: 0 16px;
    flex-shrink: 0;
  }

  .pp-group {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .pp-group-label {
    font-size: 12px;
    color: #8a8a8d;
    letter-spacing: 0.04em;
    white-space: nowrap;
  }

  .pp-pill {
    display: flex;
    background: #111113;
    border: 1px solid #424246;
    border-radius: 20px;
    padding: 2px;
    gap: 2px;
  }
  .pp-btn {
    font-family: inherit;
    font-size: 12px;
    border: none;
    background: none;
    color: #8a8a8d;
    padding: 3px 10px;
    border-radius: 14px;
    cursor: pointer;
    transition: all 0.15s;
    letter-spacing: 0.04em;
    white-space: nowrap;
  }
  .pp-btn:hover:not(.pp-active) { color: #c0c0c3; }

  .pp-theme-pill .pp-btn.pp-active {
    background: #2e2e32;
    color: #ccccce;
  }

  .pp-state-pill .pp-btn[data-pp-state="calm"].pp-active {
    background: #2a2040;
    color: #9d84e8;
    border: 1px solid rgba(157, 132, 232, 0.25);
  }
  .pp-state-pill .pp-btn[data-pp-state="busy"].pp-active {
    background: #2a2200;
    color: #fbbf24;
    border: 1px solid rgba(251, 191, 36, 0.25);
  }
  .pp-state-pill .pp-btn[data-pp-state="critical"].pp-active {
    background: #3a1a1a;
    color: #f87171;
    border: 1px solid rgba(248, 113, 113, 0.25);
  }

  .pp-description {
    font-size: 12px;
    color: #8a8a8d;
    line-height: 1.5;
    letter-spacing: 0.03em;
    flex: 1;
    min-width: 0;
    margin: 0;
  }
`;
