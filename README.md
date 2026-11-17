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

QA 脚本使用本机 Chrome，截图和验证记录在 `design/qa/`。在 1920 × 980 基准下，8 个关键容器的位置与尺寸与设计相同；其他窗口尺寸做响应式适配。视觉规则详见 `DESIGN_RULES.md`。

## 原型范围

可操作的报告输入、项目选择、报告类型选择、模板与技能选择、模型选项、项目树、项目/最近、技能/知识库与分类筛选；可预览和下载结构草稿，并在本机浏览器保存与恢复上次草稿。

未连接后端或 AI 模型。设计稿未提供技能条目、知识库内容、报告正文或其他业务模块页面；初始画面保持原稿，相关入口以状态反馈或明确标记的原型示例展示。

资源已下载并随项目保存，运行时不依赖 Figma 临时资源 URL。来源上下文保存于本地 `design/source/`；转换与适配流程在 `scripts/transform.mjs`、`scripts/adapt.mjs`，已生成代码可直接开发。若要重新采集并转换，保存新的设计上下文后运行 `npm run design:restore`。

## 发布

`npm run build` 生成 `dist/`。GitHub Pages 使用 `gh-pages` 分支；Vite 配置 `base: './'` 支持仓库子路径访问。只部署静态文件。
