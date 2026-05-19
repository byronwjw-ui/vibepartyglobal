# VibeParty

> 让聚会马上热起来 — 16 款多人派对游戏的中文 Web/PWA 平台。
> 打开网页即可组局，无需下载、无需登录、无需后端。

## ✨ 特性

- **16 款原创派对游戏**，覆盖热场 / 运气 / 投票 / 表演 / 推理 5 大分类
- **手机优先**，一台手机围坐就能玩（pass-and-play）
- **PWA 可安装到桌面**，支持脱机访问外壳
- **霓虹玻璃拟态 UI**，深色 + 渐变 + Framer Motion 动效
- **6 种聚会模式**：朋友局 / 破冰局 / 搞笑局 / 暧昧局 / 无酒精局 / 喝酒模式
- **喝酒模式年龄确认 + 安全提示**，默认不强调饮酒，所有挑战可跳过
- **localStorage** 持久化玩家与设置，刷新不丢失
- **结构上预留** 英文 / Stripe / Supabase / Venue 商业版扩展

## 🚀 快速开始

### 本地开发

```bash
npm install
npm run dev
```

打开 http://localhost:3000

### 生产构建

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

## 🌐 部署到 Vercel

1. 把本仓库推送到 GitHub
2. 在 [vercel.com](https://vercel.com) 点击 **New Project**
3. 选择本仓库，框架自动识别为 **Next.js**
4. 点击 **Deploy**，等待 1–2 分钟即可
5. 在域名服务商（Cloudflare / Namecheap / Squarespace 等）把 DNS 指向 Vercel 提供的地址即可绑定自定义域名

> 域名 ≠ 服务器。域名只是一个指针；真正运行项目的是 Vercel / Cloudflare Pages 等托管服务。

也可以部署到 Cloudflare Pages（选择 Next.js preset）或任何支持 Next.js 14 的平台。

## 🧱 技术栈

- **Next.js 14**（App Router）+ **TypeScript**
- **Tailwind CSS** + 自定义霓虹色板
- **Framer Motion** 页面 / 卡片 / 按钮动效
- **Zustand** 全局状态（玩家 / 设置 / 最近游戏）
- **localStorage** 持久化（兼容 SSR，不会出现 `window is not defined`）
- **PWA manifest**（可安装到桌面）

## 📁 项目结构

```
/app
  layout.tsx, page.tsx, globals.css
  setup/        玩家设置
  lobby/        游戏大厅
  game/[gameId]/page.tsx        路由分发
  game/[gameId]/games/*.tsx     16 款游戏组件
  settings/, safety/, about/
/components     可复用 UI 组件
/store          Zustand store
/lib            工具函数、常量、useTurn hook
/types          全局类型
/data           游戏定义、昵称池、安全文案
/data/zh-CN     所有中文题库
/public         manifest、icon、robots
```

## 🎮 16 款游戏

| # | 名称 | 分类 | 人数 |
|---|------|------|------|
| 1 | Vibe Cards 派对卡牌 | 热场 | 2+ |
| 2 | Truth or Dare 真心话大冒险 | 热场 | 2+ |
| 3 | Never Have I Ever 我从来没有 | 热场 | 2+ |
| 4 | Would You Rather 二选一 | 热场 | 2+ |
| 5 | Five Second Challenge 5秒挑战 | 热场 | 2+ |
| 6 | Higher or Lower 高低牌 | 运气 | 2+ |
| 7 | Mine Trap 地雷陷阱 | 运气 | 2+ |
| 8 | Number Bomb 数字炸弹 | 运气 | 2+ |
| 9 | Oracle Book 答案之书 | 运气 | 1+ |
| 10 | Most Likely To 谁最可能 | 投票 | 3+ |
| 11 | Hot Seat 热座拷问 | 投票 | 3+ |
| 12 | King's Command 国王指令 | 投票 | 3+ |
| 13 | Charades 你演我猜 | 表演 | 3+ |
| 14 | Undercover 谁是卧底 | 推理 | 3+ |
| 15 | Secret Location 间谍地点 | 推理 | 4+ |
| 16 | Mafia Lite 黑手党极速版 | 推理 | 5+ |

## 🛡️ 内容安全

- 默认不强调饮酒，全部文案用"挑战 / 惩罚 / 扣分 / 表演"
- 喝酒模式需通过年龄确认弹窗
- 所有挑战可跳过；暧昧不等于低俗；禁止强迫肢体接触、羞辱、危险动作
- 全部题库为 VibeParty 原创，不复制任何已有产品的卡牌文案、角色或视觉

## 🔮 未来扩展（已在结构上预留）

`lib/constants.ts` 中 `APP_CONFIG` 包含全部 feature flag：

```ts
pricingEnabled: false   // → Stripe / Party Pass
proEnabled: false       // → Pro 题库
partyPassEnabled: false // → 一次性高级卡组
venueEnabled: false     // → Venue 商业大屏版
i18nReady: true         // → 英文 / 多语言
```

可后续接入：

- 🌍 **英文 / 多语言**：所有文案已尽量收敛到 `data/`，新增 `data/en-US/*.ts` 即可
- 💳 **Stripe 付费**：把游戏 `isPremium` 标记后，在路由层加 paywall 组件
- ☁️ **Supabase 账号 + 云端题库**：替换 `lib/storage.ts` 的 localStorage 实现
- 📺 **Venue 大屏模式**：新增 `/venue/[code]` 路由，扫码加入
- ✏️ **自定义卡组**：在 setup 里加自建题库 UI，写入 localStorage

## 📝 License

私有项目。未授权请勿复制。

