<p align="center">
  <img src="assets/tray-icon.png" width="128" alt="Little Bell">
</p>
<h1 align="center">Little Bell 小铃铛</h1>
<p align="center">
  <strong>桌面宠物 + 手机远程批准/拒绝，为 AI 编程 Agent 而生</strong><br/>
  <sub>基于 <a href="https://github.com/rullerzhou-afk/clawd-on-desk">Clawd on Desk</a>，增强了 Bark 推送、规则引擎和 Webhook 通知</sub>
</p>

<p align="center">
  <a href="README.md">English</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/平台-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey" alt="Platform">
  <a href="https://github.com/Jackychen-12/little-bell/stargazers"><img src="https://img.shields.io/github/stars/Jackychen-12/little-bell?style=flat&logo=github&color=yellow" alt="Stars"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-AGPL--3.0-blue" alt="License"></a>
</p>

<p align="center">
  <img src="assets/hero.gif" alt="Little Bell — 实时响应 AI Agent 状态的桌面宠物，支持手机远程批准/拒绝权限请求。">
</p>

Little Bell 住在你的桌面上，实时响应 AI 编程 Agent 的状态。与其他桌面宠物不同的是，**当你离开电脑，Little Bell 会跟到你的手机上**——权限请求通过 Bark 推送到 iPhone，你可以直接在手机上批准或拒绝，不用跑回电脑。

> 支持 **Claude Code**、**Codex CLI**、**Copilot CLI**、**Gemini CLI**、**Cursor Agent**、**CodeBuddy**、**Kiro CLI**、**Qwen Code**、**opencode** 等。

---

## 功能

### 📲 手机远程批准/拒绝

Agent 请求权限时，你不需要在电脑前：

```
Agent: "Bash: npm install"  → 需要你批准
  ↓
Little Bell 接收请求
  ↓
桌面：弹出权限气泡卡片
手机：Bark 推送通知 + 操作链接
  ↓
你点击通知 → 打开手机端操作页面
  → [批准]  [拒绝]
  ↓
Agent 继续执行（或停止）
```

### 🛡️ 规则引擎

不想每次 `git status` 都掏手机？配置自动放行/拒绝规则：

```
设置 → 远程 → 规则引擎

自动批准:
  Read              （所有读文件操作）
  Bash:ls *         （ls 命令）
  Bash:git status
  Bash:git diff*

自动拒绝:
  Bash:rm -rf /*    （永远拒绝）
  Bash:sudo *       （永远拒绝）
```

匹配规则的操作会被立即处理，只有不匹配的请求才会推送到手机。

### 📱 多通道推送

- **Bark (iOS)** — 推送到 iPhone，通知可点击直达操作页面
- **Webhook** — 飞书 / 钉钉 / Slack / Discord 机器人
- **Telegram** — 内置 Telegram 审批 Bot
- **桌面通知** — macOS / Windows / Linux 系统通知 + 权限气泡

### 🎨 动画与交互
- **12 种动画状态** — 待机、思考、打字、构建、子任务摇摆、多任务杂耍、报错、开心、通知、扫地、搬运、睡觉
- **3 套内置主题** — Clawd（像素螃蟹）、Calico（三花猫）、Cloudling（云宝）
- **眼球追踪** — 待机时跟随鼠标，身体倾斜 + 阴影拉伸
- **点击互动** — 双击戳一下，连击 4 次挣扎
- **迷你模式** — 拖到屏幕边缘自动隐藏，悬停时探头

### 💬 权限气泡
- **桌面浮动卡片** — 不用切到终端就能批准/拒绝
- **全局快捷键** — `Ctrl+Shift+Y` 批准，`Ctrl+Shift+N` 拒绝
- **堆叠布局** — 多个权限请求从右下角向上堆叠
- **自动消失** — 如果你在终端里先回答了，气泡自动关闭

### 🔗 多 Agent 支持

Claude Code、Codex CLI、Copilot CLI、Gemini CLI、Cursor Agent、CodeBuddy、Kiro CLI、Kimi CLI、Qwen Code、opencode、Pi、OpenClaw、Hermes — 全部支持，每个会话独立追踪。

### ⚙️ 系统
- 透明区域点击穿透
- 位置记忆（重启后恢复）
- 勿扰模式
- 音效（可开关）
- 多语言（中文 / English / 繁體 / 한국어 / 日本語）
- 自动更新

---

## 安装

### macOS / Linux（源码运行）

```bash
git clone https://github.com/Jackychen-12/little-bell.git
cd little-bell
npm install
npm start
```

### Windows

从 [Releases](https://github.com/Jackychen-12/little-bell/releases) 下载安装包，或从源码构建：

```bash
npm install
npm run build
```

### 配置 Bark（iOS 推送）

1. 在 App Store 下载 [Bark](https://apps.apple.com/app/bark/id1403753865)
2. 打开 Bark → 复制首页的 Device Key
3. 在 Little Bell 中：右键 → 设置 → 远程 → 填入 Device Key → 启用

### 配置 Webhook（飞书 / 钉钉 / Slack）

设置 → 远程 → Webhook → 填入机器人 URL 和消息模板。

---

## 致谢

- 基于 [Clawd on Desk](https://github.com/rullerzhou-afk/clawd-on-desk)，作者 [@rullerzhou-afk](https://github.com/rullerzhou-afk)
- 原始 Clawd 像素画来自 [clawd-tank](https://github.com/marciogranzotto/clawd-tank)

## 许可证

源代码：[AGPL-3.0](LICENSE)（继承自 Clawd on Desk）。

美术素材和主题资源不在 AGPL-3.0 范围内，详见 [assets/LICENSE](assets/LICENSE)。
