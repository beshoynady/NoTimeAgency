---
name: run-no-time-landing
description: Build, run, and visually drive the NO TIME landing site (Next.js). Use when asked to start the dev server, run lint, take a screenshot of a page/section, or check responsive/mobile/RTL layout by actually rendering it in a browser.
---

Next.js 16 (Turbopack) app router site, `[locale]`-routed (`en`/`ar`).
There's no `chromium-cli`/Playwright/Puppeteer installed in this
environment, so it's driven by launching headless Edge with a
`--remote-debugging-port` and scripting it directly over the Chrome
DevTools Protocol — the driver is
[`scripts/visual-review.mjs`](../../../scripts/visual-review.mjs)
(graduated out of this skill dir since it's plain project tooling).
All paths below are relative to the repo root.

This was verified on native Windows (PowerShell/Git Bash), not a
Linux container — there's no `apt-get` step; the one system
dependency is Microsoft Edge (or Chrome), already present on this
host.

## Prerequisites

- Node.js (v24.14.1 verified this session; no `engines` pin in
  `package.json`, any recent LTS should work).
- Microsoft Edge or Chrome, for the CDP driver. Verified path on this
  host:
  `C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe`

## Setup

```bash
npm install
```

No env vars required.

## Build

No build step needed to drive the dev server. For a production build:

```bash
npm run build
```

## Run (agent path)

**1. Start the dev server** (Turbopack, ~14s cold start):

```bash
npm run dev > /tmp/dev-server.log 2>&1 &
timeout 30 bash -c 'until curl -sf http://localhost:3000/en -o /dev/null; do sleep 1; done'
```

If the very first `curl` in that loop reports the server isn't up yet
even though the log already says `✓ Ready`, that's normal — the first
real request triggers Turbopack's on-demand route compile. Just retry
`curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/en`;
a `200` confirms it.

**2. Launch headless Edge with CDP:**

```bash
"/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" \
  --headless=new --disable-gpu --no-sandbox \
  --remote-debugging-port=9222 \
  --user-data-dir="/tmp/edge-profile" about:blank &
timeout 20 bash -c 'until curl -sf http://localhost:9222/json/version >/dev/null; do sleep 1; done'
```

**3. Run the driver** — real `window.scrollTo` steps down the full
page, one PNG per stop (this matters: see Gotchas):

```bash
node scripts/visual-review.mjs <url> <width> <outputPrefix>

# examples:
node scripts/visual-review.mjs http://localhost:3000/en 375 /tmp/shots/en_375
node scripts/visual-review.mjs http://localhost:3000/ar 1440 /tmp/shots/ar_1440
```

Screenshots land at `<outputPrefix>_s00.png`, `_s01.png`, … covering
the full page. Standard breakpoints used for QA on this project: 375,
390, 768, 1024, 1440, 1920.

**4. Clean up** when done — kill the CDP-driven Edge instance (find its
PID via `netstat -ano | grep :9222` on Windows) and, if you started
the dev server yourself, its PID too (`netstat -ano | grep :3000`).

## Run (human path)

```bash
npm run dev   # → http://localhost:3000/en (redirects from /). Ctrl-C to stop.
```

## Test

```bash
npm run lint
```

Runs ESLint over the whole repo. Verified clean (exit 0, no output) this session.

---

## Gotchas

- **Scroll-driven / pinned sections render blank unless you actually
  scroll.** `components/home/Process.jsx`, `Scene360.jsx`, and
  `motion/TickRail.jsx` all use `position: sticky` + Framer Motion
  `useScroll` (or GSAP `ScrollTrigger`) keyed off real `window`
  scroll position. A tempting shortcut — CDP
  `Page.captureScreenshot` with `captureBeyondViewport: true` and a
  tall clip, to grab the whole page in one shot without scrolling —
  does **not** trigger these; the sticky element just sits at its
  initial offset and everything below reads as empty black space.
  `scripts/visual-review.mjs` avoids this by issuing real
  `window.scrollTo(0, y)` calls and waiting ~550ms before each
  capture. If you write a different driver, keep this behavior.
- **The floating "N" circle bottom-left in every screenshot is not a
  page bug.** It's Next.js's own dev-mode indicator
  (`<nextjs-portal>` in the DOM, confirmed via
  `document.elementFromPoint`). It only shows under `next dev`, never
  in a production build (`next start`) — don't report it as a UI
  defect.
- **`jsconfig.json`'s `baseUrl` breaks every `@/*` import if it's
  wrong.** Hit this live: a stray edit had set `baseUrl` to a
  nonexistent folder name, and the dev server 500'd on every route
  with `Module not found: Can't resolve '@/components/...'`. If the
  server won't boot and the error is a `@/`-alias resolution failure,
  check this file first before anything else.
- **Port collisions are silent past the log.** `next dev` will happily
  print `✓ Ready` while actually failing to bind if something else
  (a previous run) still holds :3000. On Windows, `pkill -f next`
  doesn't reliably work from Git Bash — find the real owner with
  `netstat -ano | grep :3000` and `taskkill //PID <pid> //F`. Same
  pattern for a stale Edge instance squatting on :9222.
- **Quote the Edge path.** `Program Files (x86)` has a space; the
  msedge.exe invocation above needs the double quotes even inside a
  larger command.

## Troubleshooting

- **`Module not found: Can't resolve '@/...'` / every page 500s**:
  `jsconfig.json` → `compilerOptions.baseUrl` is wrong or points
  somewhere that doesn't exist. Fix it to `"."` (or remove the
  `baseUrl` key entirely — `paths` alone still resolves `@/*`
  correctly relative to the config file).
- **`curl` to :3000 fails right after `npm run dev` logs `✓ Ready`**:
  Turbopack compiles routes on first request, not at boot. Retry the
  `curl` once or twice a second or two apart before concluding it's
  actually down.
- **Driver's screenshots show large blank/black stretches inside a
  section**: you're most likely capturing without a real scroll (see
  Gotchas above) — use `scripts/visual-review.mjs` as-is, or if
  writing a custom capture, drive it with `window.scrollTo` + a short
  wait per stop, not a beyond-viewport clip.
