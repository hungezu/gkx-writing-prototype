# 高端智库 · 智能创作报告原型

独立新项目，复刻 Figma「高端智库」节点 `1:60`。

- 在线原型：https://hungezu.github.io/gkx-writing-prototype/
- 设计来源：https://www.figma.com/design/2C73QbtLwcTHtNzQ35zodW/Untitled?node-id=1-60
- 技术栈：React 19、TypeScript、Vite 6、Tailwind CSS 4。

## 开发与验证

```sh
npm ci
npm run dev
npm run build
node scripts/qa.mjs
node scripts/interactions.mjs
```

QA 脚本使用本机 Chrome，截图和验证记录在 `design/qa/`。初版在 1920 × 980 基准下，8 个关键容器的位置与尺寸与设计相同；后续按浏览器标注调整固定侧栏、滚动条和分类字号，其他窗口尺寸做响应式适配。视觉规则详见 `DESIGN_RULES.md`。

## 原型范围

可操作的报告输入、项目选择、报告类型选择、模板与技能选择、模型选项、项目树、项目/最近、技能/知识库与分类筛选；可预览和下载结构草稿，并在本机浏览器保存与恢复上次草稿。

未连接后端或 AI 模型。设计稿未提供技能条目、知识库内容、报告正文或其他业务模块页面；初始画面保持原稿，相关入口以状态反馈或明确标记的原型示例展示。

资源已下载并随项目保存，运行时不依赖 Figma 临时资源 URL。来源上下文保存于本地 `design/source/`；转换与适配流程在 `scripts/transform.mjs`、`scripts/adapt.mjs`，已生成代码可直接开发。若要重新采集并转换，保存新的设计上下文后运行 `npm run design:restore`。

## 发布

`npm run build` 生成 `dist/`。GitHub Pages 使用 `gh-pages` 分支；Vite 配置 `base: './'` 支持仓库子路径访问。只部署静态文件。

## 项目与报告管理

每个项目和报告都有更多菜单：重命名、删除；报告另有“移动至”。项目菜单还可新建项目。项目删除会明确提示将同时删除其中报告，支持取消。

这些操作更新本机浏览器保存的列表；不涉及服务器业务数据。数据模型在 `src/workspace-data.ts`，列表和菜单在 `src/ReportTree.tsx`、`src/TreeMoreMenu.tsx`。新生成的原型报告也进入同一列表。

React Bits 的 Galaxy 和 BorderGlow 来自其当前公开 registry，已随源码保存。Galaxy 放在首页创作框附近，BorderGlow 用于整体激活反馈。

补充验收：

```sh
npm run preview -- --port 4173
node scripts/interactions.mjs http://127.0.0.1:4173/
node scripts/workspace.test.mjs http://127.0.0.1:4173/
node scripts/annotations.test.mjs http://127.0.0.1:4173/
```

任务清单见 `design/界面标注任务清单-2026-11-17.md`。
