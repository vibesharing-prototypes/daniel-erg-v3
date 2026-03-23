# ERG V3

## Project Structure

This is a **Next.js 14 App Router** prototype deployed via VibeSharing. It demonstrates a GRC Command Center for emerging risk detection and disclosure workflow.

**Active pages**: `/` (index), `/gc-commandcenter`, `/gc-commandcenter/status`

### Source Files (8 total)
- `app/page.tsx` — Prototype index hub
- `app/layout.tsx` — Root layout (Plus Jakarta Sans, VibeSharing SDK)
- `app/globals.css` — Tailwind + CSS variables + animations
- `app/components/ProtoPanel.tsx` — Theme toggle bar (used on every page)
- `app/components/ScanModal.tsx` — Agent scan modal + toast + pill
- `app/gc-commandcenter/page.tsx` — GRC Command Center dashboard
- `app/gc-commandcenter/status/page.tsx` — Risk Owners Notified page
- `app/superhero/StakeholderFooter.tsx` — Prototype nav footer

### Design System
Visual direction documented in `visual_direction.md`. Key: Plus Jakarta Sans, `#f0f0f1` bg, `rounded-[20px]` cards, `dark:` variants on everything, semantic status colors.

## Deep Context

**Read `.context/` folder** for comprehensive project knowledge:
- `.context/PROJECT.md` — Full project context, history, decisions, design system
- `.context/VIBESHARING.md` — Deployment guide, known issues, troubleshooting
- `.context/ROADMAP.md` — What's done, what's next, reference prototypes
- `.context/PATTERNS.md` — Code conventions, component patterns, dark mode guide

## IMPORTANT: Deployment

Deploy via VibeSharing MCP tool. **Always do full deploys** — include ALL config + app + static files. See `.context/VIBESHARING.md` for the exact file list and known issues.

Prototype ID: `42e8e6a0-4f82-4d83-a053-0a638c944b5d`

## IMPORTANT: File Placement Rules

- React components go in `app/` or `app/components/`
- Static assets go in `public/`
- **Never** put HTML files in the repo root

## Tech Stack

- Next.js 14, React 18, Tailwind CSS, TypeScript
- `output: "export"` for static builds
- `darkMode: "class"` in Tailwind config

## Development

```bash
npm install
npm run dev    # localhost:3000
```

## V2 Reference

Original V2 preserved at git tag `v2-baseline` and source repo `https://github.com/vibesharing-prototypes/174f24af-erg-v2.git`. Use as feature reference only — rebuild to V3 design system, don't import wholesale.
