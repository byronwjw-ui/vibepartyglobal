# VibeParty

中文派对游戏 Web/PWA 平台。打开网页即可组局，16 款多人派对游戏，全部免费。

## 本地开发

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
npm start
```

## 部署到 Vercel

1. 推送到 GitHub
2. 在 Vercel 导入项目，框架选 Next.js
3. 点击 Deploy
4. 在域名服务商处把 DNS 指向 Vercel

Feature flag 在 `lib/constants.ts` 的 `APP_CONFIG`。
