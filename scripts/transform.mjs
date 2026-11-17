// transform.mjs — 把 Figma MCP `get_design_context` 的输出转成可运行组件
//
// 用法：
//   node scripts/transform.mjs <design-context.txt> [out=src/FigmaPage.tsx] [assetUrlBase=/figma]
//
// 做四件事：
//   1) 截断 MCP 在代码后附加的散文说明（否则写进 .tsx 语法报错）
//   2) 下载所有 const imgX = "<figma asset url>" 到 public<assetUrlBase>/imgX.<ext>
//      —— 按内容首字节判 SVG/PNG（MCP 常给错扩展名）；已存在则跳过（可重跑）
//   3) 把 URL 字符串替换成本地路径（代码里的 src={imgX} 引用自动生效）
//   4) 字体类归一（font-['PingFang_SC:Medium'] → font-medium…）；真正字体族在 index.css body 上设
//
// 注意：MCP 输出是 React+Tailwind。目标若是别的栈，需在末尾自行追加语法转译。
import fs from "node:fs/promises";
import path from "node:path";

const inputFile = process.argv[2];
const outFile = process.argv[3] || "src/FigmaPage.tsx";
const assetUrlBase = process.argv[4] || "/figma"; // 浏览器可访问路径；落盘到 public<assetUrlBase>
if (!inputFile) {
  console.error("usage: node scripts/transform.mjs <design-context.txt> [out] [assetUrlBase]");
  process.exit(1);
}

const root = path.resolve(".");
const assetDir = path.join(root, "public", assetUrlBase.replace(/^\//, ""));
await fs.mkdir(assetDir, { recursive: true });

let code = await fs.readFile(inputFile, "utf8");

// 1) 截断尾部散文（MCP 会在代码后附说明）
const cutMarkers = ["\nSUPER CRITICAL", "\nNode ids have been added", "\nThese styles are contained", "\nImages and SVGs will be stored"];
for (const m of cutMarkers) {
  const idx = code.indexOf(m);
  if (idx !== -1) code = code.slice(0, idx).trimEnd() + "\n";
}

// 2+3) 下载资源 + 替换 URL
const assetRe = /const\s+(\w+)\s*=\s*"(https:\/\/www\.figma\.com\/api\/mcp\/asset\/[^"]+)";/g;
const assets = [...code.matchAll(assetRe)];
console.log(`found ${assets.length} assets`);

let ok = 0, fail = 0;
for (const [, name, url] of assets) {
  try {
    const svg = path.join(assetDir, `${name}.svg`);
    const png = path.join(assetDir, `${name}.png`);
    let local = await fs.stat(svg).then(() => `${assetUrlBase}/${name}.svg`).catch(() =>
                fs.stat(png).then(() => `${assetUrlBase}/${name}.png`).catch(() => null));
    if (!local) {
      const res = await fetch(url); // 资源 URL 有效期约 7 天
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      const head = buf.subarray(0, 200).toString("utf8").trimStart();
      const ext = head.startsWith("<svg") || head.startsWith("<?xml") ? "svg" : "png";
      await fs.writeFile(path.join(assetDir, `${name}.${ext}`), buf);
      local = `${assetUrlBase}/${name}.${ext}`;
    }
    code = code.replaceAll(`"${url}"`, `"${local}"`);
    ok++;
  } catch (e) {
    console.error(`FAIL ${name}: ${e.message}`); // 失败多为并发 SSL，重跑即可（已下载会跳过）
    fail++;
  }
}
console.log(`downloaded ok=${ok} fail=${fail}`);

// 4) 字体类归一（按设计稿用到的字体族扩展这张表）
const fontMap = [
  [/font-\['[^']*:Semibold'\]/g, "font-semibold"],
  [/font-\['[^']*:Medium'\]/g, "font-medium"],
  [/font-\['[^']*:Regular'\]/g, "font-normal"],
  [/font-\['[^']*:[^']*Bold[^']*'\]/g, "font-bold"],
  [/font-\['[^']+:[^']*'\]/g, "font-medium"], // 兜底
];
for (const [re, rep] of fontMap) code = code.replaceAll(re, rep);

// 统一导出名
code = code.replace(/export default function \w+\(/, "export default function FigmaPage(");

await fs.mkdir(path.dirname(path.join(root, outFile)), { recursive: true });
await fs.writeFile(path.join(root, outFile), code, "utf8");
console.log(`wrote ${outFile}`);
