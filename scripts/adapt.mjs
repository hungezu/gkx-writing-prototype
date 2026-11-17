import fs from 'node:fs/promises';

// Start from the converted Figma source; retain every original class and node ID.
let code = await fs.readFile('src/FigmaPage.tsx', 'utf8');
code = `import type { ReactNode } from 'react';\nimport ProgressRing from './ProgressRing';\nimport ScrollingTitle from './ScrollingTitle';\n` + code;
code = code.replace(/"\/figma\/([^"\n]+)"/g, '`${import.meta.env.BASE_URL}figma/$1`');
code = code.replace('export default function FigmaPage() {', `
export interface ViewProps {
  onAction: (action: string, value?: string) => void;
  prompt: string; setPrompt: (value: string) => void;
  model: string; reportType: string; project: string;
  category: string; library: string; projectMode: string;
  collapsed: boolean; closedGroups: string[]; selectedReport: string; resourceFeedback?: ReactNode; generatedReport?: ReactNode; background?: ReactNode;
  renderDropdown: (kind: string, trigger: ReactNode) => ReactNode;
  renderComposer: (content: ReactNode) => ReactNode;
  projectTree: ReactNode;
  generating: boolean;
  mobile: boolean;
}
export default function FigmaPage({onAction, prompt, setPrompt, model, reportType, project, category, library, projectMode, collapsed, closedGroups, selectedReport, resourceFeedback, generatedReport, background, renderDropdown, renderComposer, projectTree, generating, mobile}: ViewProps) {`);
code = code.replace('data-name="高端智库"', 'data-name="高端智库" data-collapsed={collapsed} data-project-mode={projectMode}');

function bounds(id) {
  const marker = `data-node-id="${id}"`;
  const markerAt = code.indexOf(marker);
  if (markerAt < 0) throw new Error(`Missing node ${id}`);
  const start = code.lastIndexOf('<', markerAt);
  const openEnd = code.indexOf('>', markerAt) + 1;
  const tag = code.slice(start).match(/^<(\w+)/)[1];
  const re = new RegExp(`<(/?)${tag}\\b[^>]*>`, 'g');
  re.lastIndex = start;
  let depth = 0, end = openEnd;
  for (let match; (match = re.exec(code));) {
    if (match[0].endsWith('/>')) continue;
    depth += match[1] ? -1 : 1;
    if (depth === 0) { end = re.lastIndex; break; }
  }
  return {start, openEnd, end, tag};
}
function button(id, action, value, attrs = '') {
  const {start, openEnd, end, tag} = bounds(id);
  const opening = code.slice(start, openEnd).replace(`<${tag}`, `<button type="button" onClick={() => onAction(${JSON.stringify(action)}, ${JSON.stringify(value)})} ${attrs}`);
  code = code.slice(0, start) + opening + code.slice(openEnd, end).replace(new RegExp(`</${tag}>$`), '</button>') + code.slice(end);
}
function text(id, replacement) {
  const {start, openEnd, end, tag} = bounds(id);
  code = code.slice(0, openEnd) + replacement + `</${tag}>` + code.slice(end);
}
function changeTag(id, tag, attrs='') {
  const {start,openEnd,end,tag:oldTag}=bounds(id);
  code=code.slice(0,start)+code.slice(start,openEnd).replace(`<${oldTag}`,`<${tag} ${attrs}`)+code.slice(openEnd,end).replace(new RegExp(`</${oldTag}>$`),`</${tag}>`)+code.slice(end);
}

for (const [id, label] of [['1:169','首页'],['1:171','科学研究'],['1:173','未来教育'],['1:175','科技评价'],['1:177','战略咨询'],['1:180','应用管理'],['1:182','集群服务']]) button(id, 'navigation', label);
for (const [id, label] of [['1:186','工作台'],['1:195','待办中心'],['1:204','消息中心'],['1:207','李科']]) button(id, 'utility', label);
button('1:70', 'collapse', '', 'aria-label={(mobile ? collapsed : !collapsed) ? "收起写作项目" : "展开写作项目"} aria-expanded={mobile ? collapsed : !collapsed}');
button('I1:88;1736:167', 'projectMode', '项目', 'aria-pressed={projectMode === "项目"}');
button('I1:88;1736:170', 'projectMode', '最近', 'aria-pressed={projectMode === "最近"}');
button('1:89', 'newReport', '', 'aria-current="page"');
for (const [id, group] of [['1:102','低空经济战略研究'],['1:137','新兴产业布局'],['1:272','独立报告']]) button(id, 'group', group, `aria-expanded={!closedGroups.includes(${JSON.stringify(group)})}`);
for (const [id, group] of [['1:101','低空经济战略研究'],['1:136','新兴产业布局'],['1:271','独立报告']]) code = code.replace(`data-node-id="${id}"`, `data-node-id="${id}" data-closed={closedGroups.includes(${JSON.stringify(group)})}`);
for(const [id,group] of [['1:103','低空经济战略研究'],['1:138','新兴产业布局'],['1:273','独立报告']]) {
 const {openEnd,end}=bounds(id);
 const original=code.slice(openEnd,end-6);
 text(id,`{closedGroups.includes(${JSON.stringify(group)}) ? (<div className="relative size-[16px]"><div className="absolute inset-[13.44%_5.63%_10.31%_5.63%]"><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgClosedFolder} /></div></div>) : (<>${original}</>)}`);
}
for (const id of ['1:109','1:119','1:128','1:144','1:153','1:279','1:288']) button(id,'report',id,`aria-pressed={selectedReport === "${id}"} data-report="true"`);
button('1:260','project','');
button('7:51','reportType','', 'aria-label="选择报告类型"');
button('1:324','skills','');
button('1:328','templates','');
button('1:314','model','', 'aria-label="选择模型"');
button('7:43','send','', 'aria-label="发送报告需求" disabled={!prompt.trim() || generating}');
button('7:64','library','技能广场','aria-pressed={library === "技能广场"}');
button('7:65','library','知识库','aria-pressed={library === "知识库"}');
for (const [id, label] of [['7:69','全部'],['7:72','战略分析'],['7:82','产业研究'],['7:85','技术研判'],['7:88','政策分析'],['7:91','证据核验'],['7:94','观点论证'],['7:97','报告写作']]) button(id,'category',label,`aria-pressed={category === ${JSON.stringify(label)}}`);
text('1:267','<p className="leading-[22px]">{project}</p>');
text('I7:51;1907:7757','{reportType}');
text('1:315','<p className="leading-[22px]">{model}</p>');
text('1:62','<p data-node-id="1:63" className="font-normal leading-[20px] text-[#86909c] text-[12px] whitespace-nowrap">智能创作报告</p>');
text('1:300','<ProgressRing value={65} label="低空飞行服务重点企业筛选生成进度" />');
for (const [id,label] of [
  ['1:110','深圳低空经济产业链战略研究'],
  ['1:120','大湾区低空经济区域竞争比较'],
  ['1:129','低空飞行服务重点企业筛选'],
  ['1:145','未来产业方向优先级分析'],
  ['1:154','具身智能产业发展趋势研判'],
  ['1:280','未来产业方向优先级分析'],
  ['1:289','具身智能产业发展趋势研判'],
]) text(id, `<ScrollingTitle text=${JSON.stringify(label)} />`);
for (const [row,title,tag] of [
 ['1:109','1:110','1:112'],['1:119','1:120','1:122'],['1:128','1:129','1:131'],
 ['1:144','1:145','1:147'],['1:153','1:154','1:156'],['1:279','1:280','1:282'],['1:288','1:289','1:291'],
]) {
 const b=bounds(row);
 code=code.slice(0,b.start)+code.slice(b.start,b.openEnd).replace('<button type="button"','<div')+code.slice(b.openEnd,b.end).replace(/<\/button>$/,'</div>')+code.slice(b.end);
 changeTag(title,'button',`type="button" data-report-title="true" onClick={(event) => {event.stopPropagation();onAction('report','${row}');}}`);
 changeTag(tag,'button',`type="button" data-report-tag="true" aria-pressed={selectedReport === '${row}'} onClick={(event) => {event.stopPropagation();onAction('toggleReport','${row}');}}`);
}
code = code.replace(/<span className="font-normal leading-\[28px\] text-\[#4e5969\] text-\[20px\]">｜<\/span>/, '');
{
  const {start,end} = bounds('7:62');
  code = code.slice(0,start) + `<textarea data-node-id="7:62" aria-label="报告需求" value={prompt} onChange={(event) => setPrompt(event.target.value)} onKeyDown={(event) => { if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') { event.preventDefault(); onAction('send'); } }} placeholder="示例：分析深圳低空经济产业链现状，识别未来三年值得重点布局的方向，并提出产业培育建议" rows={3} className="prompt-input font-normal leading-[22px] text-[#1d2129] text-[14px]" />` + code.slice(end);
}
// Semantic landmarks preserve the original dimensions.
text('1:100','{projectTree}');
for(const [id,kind] of [['1:260','project'],['7:51','reportType'],['1:324','skills'],['1:328','templates'],['1:314','model']]) {
 let {start,end}=bounds(id);
 let trigger=code.slice(start,end).replace(/ onClick=\{\(\) => onAction\("[^"]+", ""\)\}/,'');
 code=code.slice(0,start)+`{renderDropdown('${kind}', (${trigger}))}`+code.slice(end);
}
{
 const {start,end}=bounds('7:25');
 code=code.slice(0,start)+'{renderComposer(('+code.slice(start,end)+'))}'+code.slice(end);
}
{
  const {start} = bounds('1:270');
  code = code.slice(0,start) + '{background}\n' + code.slice(start);
}
{
  const {end} = bounds('1:100');
  code = code.slice(0,end-6) + '{generatedReport}' + code.slice(end-6);
}
{
  const {end} = bounds('7:100');
  code = code.slice(0,end-6) + '{resourceFeedback}' + code.slice(end-6);
}
for (const [id,newTag] of [['1:162','header'],['1:168','nav'],['1:82','aside'],['1:61','main']]) {
  const {start,openEnd,end,tag}=bounds(id);
  code = code.slice(0,start) + code.slice(start,openEnd).replace(`<${tag}`,`<${newTag}`) + code.slice(openEnd,end).replace(new RegExp(`</${tag}>$`),`</${newTag}>`) + code.slice(end);
}
await fs.writeFile('src/FigmaPage.tsx',code);
console.log('Adapted Figma source: local assets, semantic controls, reactive state.');
