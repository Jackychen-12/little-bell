<p align="center">
  <img src="assets/tray-icon.png" width="128" alt="Little Bell">
</p>
<h1 align="center">Little Bell</h1>
<p align="center">
  <strong>Desktop pet + remote mobile approve/deny for AI coding agents</strong><br/>
  <sub>Based on <a href="https://github.com/rullerzhou-afk/clawd-on-desk">Clawd on Desk</a>, enhanced with Bark push, rule engine, and webhook notifications</sub>
</p>

<p align="center">
  <a href="README.zh-CN.md">中文版</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey" alt="Platform">
  <a href="https://github.com/Jackychen-12/little-bell/stargazers"><img src="https://img.shields.io/github/stars/Jackychen-12/little-bell?style=flat&logo=github&color=yellow" alt="Stars"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-AGPL--3.0-blue" alt="License"></a>
</p>

<p align="center">
  <img src="assets/hero.gif" alt="Little Bell — a desktop pet that reacts to your AI coding agent in real time, with mobile remote approve/deny capabilities.">
</p>

Little Bell lives on your desktop and reacts to what your AI coding agent is doing — in real time. But unlike other desktop pets, **when you walk away from your desk, Little Bell follows you to your phone**: permission requests push to your iPhone via Bark, and you can approve or deny without going back to your computer.

> Supports **Claude Code**, **Codex CLI**, **Copilot CLI**, **Gemini CLI**, **Cursor Agent**, **CodeBuddy**, **Kiro CLI**, **Qwen Code**, **opencode**, and more.

---

## Features

### 📲 Remote Approve/Deny

When an agent requests permission, you don't need to be at your desk:

```
Agent: "Bash: npm install"  → needs approval
  ↓
Little Bell receives the request
  ↓
Desktop: permission bubble pops up (same as Clawd)
Phone:   Bark push notification with action link
  ↓
You tap the notification → mobile action page opens
  → [Approve]  [Deny]
  ↓
Agent continues (or stops)
```

### 🛡️ Rule Engine

Don't want to pull out your phone for every `git status`? Configure auto-allow/deny rules:

```
Settings → Remote → Rule Engine

Auto-Allow:
  Read              (all file reads)
  Bash:ls *         (ls commands)
  Bash:git status
  Bash:git diff*

Auto-Deny:
  Bash:rm -rf /*    (never allow)
  Bash:sudo *       (never allow)
```

Matched operations are resolved instantly. Only unmatched requests reach your phone.

### 📱 Multi-Channel Push

- **Bark (iOS)** — push to iPhone with clickable action URL
- **Webhook** — Feishu / DingTalk / Slack / Discord bot integration
- **Telegram** — built-in Telegram approval bot
- **macOS / Windows / Linux** — desktop notification + permission bubble

### 🎨 Animations & Interaction
- **12 animated states** — idle, thinking, typing, building, subagent groove, juggling, error, happy, notification, sweeping, carrying, sleeping
- **3 built-in themes** — Clawd (pixel crab), Calico (cat), Cloudling
- **Eye tracking** — follows your cursor with body lean
- **Click reactions** — double-click poke, 4-click flail
- **Mini mode** — hides at screen edge with peek-on-hover

### 💬 Permission Bubble
- **Desktop floating card** — approve/deny without switching to terminal
- **Global hotkeys** — `Ctrl+Shift+Y` Allow, `Ctrl+Shift+N` Deny
- **Stacking layout** — multiple requests stack upward
- **Auto-dismiss** — if you answer in terminal first

### 🔗 Multi-Agent Support
Claude Code, Codex CLI, Copilot CLI, Gemini CLI, Cursor Agent, CodeBuddy, Kiro CLI, Kimi CLI, Qwen Code, opencode, Pi, OpenClaw, Hermes — all supported with independent session tracking.

### ⚙️ System
- Click-through transparent areas
- Position memory across restarts
- Do Not Disturb mode
- Sound effects (toggleable)
- i18n (EN, 中文, 繁體, 한국어, 日本語)
- Auto-update from GitHub releases

---

## Install

### macOS / Linux (from source)

```bash
git clone https://github.com/Jackychen-12/little-bell.git
cd little-bell
npm install
npm start
```

### Windows

Download from [Releases](https://github.com/Jackychen-12/little-bell/releases), or build from source:

```bash
npm install
npm run build
```

### Configure Bark (iOS push)

1. Install [Bark](https://apps.apple.com/app/bark/id1403753865) on iPhone
2. Open Bark → copy your Device Key
3. In Little Bell: right-click → Settings → Remote → enter Device Key → Enable

### Configure Webhook (Feishu/DingTalk/Slack)

Settings → Remote → Webhook → enter your bot URL and body template.

---

## Project Structure (new files)

```
src/
├── bark-notifier.js        ← NEW: Bark + Webhook push module
├── rule-engine.js           ← NEW: auto-allow/deny pattern matching
├── permission.js            ← MODIFIED: added maybeStartBarkApproval()
├── server-route-permission.js ← MODIFIED: rule engine check before bubble
├── prefs.js                 ← MODIFIED: added barkApproval, webhookNotify, ruleEngine prefs
├── network/
│   └── mobile-preview-server.js ← MODIFIED: added /action/:id routes
└── ... (all original clawd-on-desk files preserved)
```

---

## Acknowledgments

- Based on [Clawd on Desk](https://github.com/rullerzhou-afk/clawd-on-desk) by [@rullerzhou-afk](https://github.com/rullerzhou-afk)
- Original Clawd pixel art from [clawd-tank](https://github.com/marciogranzotto/clawd-tank)
- Remote approval concept from [little-bell Python edition](https://github.com/Jackychen-12/little-bell)

## License

Source code: [AGPL-3.0](LICENSE) (inherited from Clawd on Desk).

Artwork and bundled theme assets are NOT covered by AGPL-3.0 — see [assets/LICENSE](assets/LICENSE).
