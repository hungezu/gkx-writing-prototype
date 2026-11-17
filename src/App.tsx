import { useEffect, useRef, useState } from 'react';
import FigmaPage from './FigmaPage';
import ProgressRing from './ProgressRing';

const reportTypes = ['战略分析报告', '研究报告', '洞察报告'];
const projects = ['低空经济战略研究', '新兴产业布局', '独立报告'];
const models = ['GLM 5.2', 'DeepSeek V3', 'Qwen 3'];
const templates = ['不使用模板', '战略分析报告', '产业研究报告', '政策分析报告'];
const skills = ['战略分析', '产业研究', '技术研判', '政策分析', '证据核验', '观点论证', '报告写作'];
const reportData: Record<string, [string, string, string]> = {
  '1:109': ['深圳低空经济产业链战略研', '战略分析报告', projects[0]],
  '1:119': ['大湾区低空经济区域竞争比较', '研究报告', projects[0]],
  '1:128': ['低空飞行服务重点企业筛选', '洞察报告', projects[0]],
  '1:144': ['未来产业方向优先级分析', '战略分析报告', projects[1]],
  '1:153': ['具身智能产业发展趋势研判', '洞察报告', projects[1]],
  '1:279': ['未来产业方向优先级分析', '战略分析报告', projects[2]],
  '1:288': ['具身智能产业发展趋势研判', '洞察报告', projects[2]],
};
type Modal = { kind: string; title: string; value?: string };
type Draft = { title: string; prompt: string; type: string; project: string; model: string; template: string; skills: string[] };

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [model, setModel] = useState(models[0]);
  const [reportType, setReportType] = useState(reportTypes[0]);
  const [project, setProject] = useState(projects[0]);
  const [category, setCategory] = useState('全部');
  const [library, setLibrary] = useState('技能广场');
  const [projectMode, setProjectMode] = useState('项目');
  const [collapsed, setCollapsed] = useState(false);
  const [closedGroups, setClosedGroups] = useState<string[]>([]);
  const [selectedReport, setSelectedReport] = useState('1:109');
  const [template, setTemplate] = useState(templates[0]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [modal, setModal] = useState<Modal | null>(null);
  const [toast, setToast] = useState('');
  const [resourceTouched, setResourceTouched] = useState(false);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [generating, setGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(100);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (modal && dialogRef.current && !dialogRef.current.open) {
      lastFocus.current = document.activeElement as HTMLElement;
      dialogRef.current.showModal();
    }
    if (!modal && dialogRef.current?.open) { dialogRef.current.close(); lastFocus.current?.focus(); }
  }, [modal]);
  useEffect(() => { if (toast) { const timer = window.setTimeout(() => setToast(''), 3200); return () => window.clearTimeout(timer); } }, [toast]);
  useEffect(() => {
    if (!generating) return;
    const timer = window.setInterval(() => setGenerationProgress(value => Math.min(100, value + 20)), 400);
    return () => window.clearInterval(timer);
  }, [generating]);
  useEffect(() => {
    if (!generating || generationProgress < 100 || !draft) return;
    setGenerating(false);
    try { localStorage.setItem('gkx-writing-prototype:last-draft', JSON.stringify(draft)); } catch { /* Private browsing may disable storage. */ }
    setModal(current => current?.kind === 'generating' ? {kind:'draft', title:'报告创作预览'} : current);
    setToast('报告草稿演示已完成');
  }, [generationProgress, generating, draft]);
  const focusPrompt = () => requestAnimationFrame(() => document.querySelector<HTMLTextAreaElement>('[data-node-id="7:62"]')?.focus());
  function onAction(action: string, value = '') {
    switch (action) {
      case 'collapse': setCollapsed(!collapsed); break;
      case 'projectMode': setProjectMode(value); break;
      case 'group': setClosedGroups(groups => groups.includes(value) ? groups.filter(g => g !== value) : [...groups, value]); break;
      case 'newReport': setPrompt(''); setSelectedReport(''); setToast('已新建报告，请填写报告需求'); focusPrompt(); break;
      case 'report': {
        const [title, type, folder] = reportData[value];
        setSelectedReport(value); setReportType(type); setProject(folder);
        setModal({kind: 'existing', title, value}); break;
      }
      case 'project': setModal({kind: action, title: '选择写作项目'}); break;
      case 'reportType': setModal({kind: action, title: '选择报告类型'}); break;
      case 'model': setModal({kind: action, title: '选择模型'}); break;
      case 'templates': setModal({kind: action, title: '模板选择'}); break;
      case 'skills': setModal({kind: action, title: '选择技能'}); break;
      case 'library': setLibrary(value); setCategory('全部'); setResourceTouched(true); break;
      case 'category': setCategory(value); setResourceTouched(true); break;
      case 'send': {
        if (generating) { setModal({kind:'generating', title:'报告生成进度'}); return; }
        if (!prompt.trim()) { setToast('请先填写报告需求'); focusPrompt(); return; }
        const nextDraft = {title: prompt.trim().slice(0, 30), prompt: prompt.trim(), type: reportType, project, model, template, skills: selectedSkills};
        setDraft(nextDraft);
        setSelectedReport('generated'); setGenerationProgress(0); setGenerating(true);
        requestAnimationFrame(() => { const list = document.querySelector<HTMLElement>('[data-node-id="1:100"]'); if (list) list.scrollTop = list.scrollHeight; });
        setModal({kind: 'generating', title: '报告生成进度'}); break;
      }
      case 'navigation': if (value === '战略咨询') setToast('当前页面：战略咨询 · 智能创作报告'); else setModal({kind: 'module', title: value}); break;
      case 'utility': setModal({kind: 'utility', title: value}); break;
    }
  }
  const optionKind = modal?.kind;
  const options = optionKind === 'project' ? projects : optionKind === 'reportType' ? reportTypes : optionKind === 'model' ? models : optionKind === 'templates' ? templates : skills;
  const selectedOption = optionKind === 'project' ? project : optionKind === 'reportType' ? reportType : optionKind === 'model' ? model : template;
  function choose(value: string) {
    if (optionKind === 'skills') { setSelectedSkills(list => list.includes(value) ? list.filter(item => item !== value) : [...list, value]); return; }
    if (optionKind === 'project') setProject(value);
    if (optionKind === 'reportType') setReportType(value);
    if (optionKind === 'model') setModel(value);
    if (optionKind === 'templates') setTemplate(value);
    setModal(null); setToast(`已选择：${value}`);
  }
  function downloadDraft() {
    if (!draft) return;
    const content = `# ${draft.title}\n\n> 原型草稿：未连接模型服务，以下为报告结构示例。\n\n- 项目：${draft.project}\n- 类型：${draft.type}\n- 模型选项：${draft.model}\n- 模板：${draft.template}\n- 技能：${draft.skills.join('、') || '未选择'}\n\n## 写作需求\n${draft.prompt}\n\n## 一、研究背景与目标\n待补充研究范围、时间窗口和关键问题。\n\n## 二、证据与分析\n待补充权威数据、来源引用和分析过程。\n\n## 三、战略判断与建议\n待补充结论、判断依据和实施建议。\n`;
    const url = URL.createObjectURL(new Blob([content], {type: 'text/markdown;charset=utf-8'}));
    const link = document.createElement('a'); link.href = url; link.download = '报告创作草稿.md'; link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  function restoreDraft() {
    try { const saved = JSON.parse(localStorage.getItem('gkx-writing-prototype:last-draft') || 'null'); if (saved?.prompt && typeof saved.prompt === 'string') { setDraft(saved); setModal({kind:'draft', title:'上次创作草稿'}); } else setToast('暂无本地保存的草稿'); }
    catch { setToast('暂无可读取的本地草稿'); }
  }
  return <>
    <FigmaPage {...{onAction, prompt, setPrompt, model, reportType, project, category, library, projectMode, collapsed, closedGroups, selectedReport}} generatedReport={draft && <button className="generated-report" onClick={() => setModal({kind:generating?'generating':'draft',title:generating?'报告生成进度':'报告创作预览'})}><ProgressRing value={generationProgress} label="当前报告生成进度" /><p className="generated-report-title">{draft.title}</p><div className="generated-report-meta"><span>{draft.type}</span><span>{generating ? `${generationProgress}%` : '已完成'}</span></div></button>} resourceFeedback={resourceTouched && <section className="resource-feedback" aria-live="polite"><p>{library === '知识库' ? `暂无${category === '全部' ? '' : category}知识库内容` : `暂无${category === '全部' ? '' : category}技能条目`}</p><p>当前设计稿未提供资源条目，已保留筛选状态。</p></section>} />
    {toast && <div className="toast" role="status">{toast}</div>}
    <dialog ref={dialogRef} className="prototype-dialog" onCancel={() => setModal(null)} onClick={event => { if (event.target === event.currentTarget) { const rect = event.currentTarget.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) setModal(null); } }} aria-labelledby="dialog-title">
      <div className="dialog-header"><h2 id="dialog-title">{modal?.title}</h2><button className="close-button" aria-label="关闭弹窗" onClick={() => setModal(null)}>×</button></div>
      <div className="dialog-body">
        {['project','reportType','model','templates','skills'].includes(modal?.kind || '') && <>
          {['model','templates','skills'].includes(modal?.kind || '') && <p className="dialog-note">原型示例选项；选择结果应用于本次报告需求。模型选项未连接在线服务。</p>}
          <div className="option-list">{options.map(value => <button key={value} className="option-button" aria-pressed={optionKind === 'skills' ? selectedSkills.includes(value) : selectedOption === value} onClick={() => choose(value)}><span>{value}</span><span className="option-indicator">{(optionKind === 'skills' ? selectedSkills.includes(value) : selectedOption === value) ? '已选择' : ''}</span></button>)}</div>
          {optionKind === 'skills' && <div className="dialog-footer"><button className="primary-button" onClick={() => {setModal(null); setToast(`已选择 ${selectedSkills.length} 项技能`);}}>完成选择</button></div>}
        </>}
        {modal?.kind === 'module' && <><p>当前原型已还原「战略咨询 · 智能创作报告」页面。</p><p className="dialog-note" style={{marginTop:12}}>设计稿未提供「{modal.title}」页面，暂以入口反馈展示。</p><div className="dialog-footer"><button className="primary-button" onClick={() => setModal(null)}>返回报告创作</button></div></>}
        {modal?.kind === 'utility' && <>
          {modal.title === '李科' ? <><p>李科</p><p className="dialog-note">深圳国际科技信息中心 · 原型演示账号</p></> : modal.title === '工作台' ? <><p>智能创作报告</p><p className="dialog-note">可在此继续查看本机上次保存的报告草稿。</p><button className="option-button" style={{width:'100%'}} onClick={restoreDraft}>查看上次创作草稿</button></> : <p>{modal.title === '待办中心' ? '暂无待办事项' : '暂无新消息'}</p>}
        </>}
        {modal?.kind === 'existing' && <><p className="dialog-note">设计稿中的报告示例；未提供报告正文。</p><p>所属项目：{reportData[modal.value!]?.[2]}</p><p>报告类型：{reportData[modal.value!]?.[1]}</p>{modal.value === '1:128' && <p className="generation-status"><ProgressRing value={65} label="示例报告生成进度" />生成进度：65%（演示数据）</p>}<div className="dialog-footer"><button className="primary-button" onClick={() => { setModal(null); focusPrompt(); }}>填写创作需求</button></div></>}
        {modal?.kind === 'generating' && <><p className="generation-status"><ProgressRing value={generationProgress} label="报告生成进度" />正在生成：{generationProgress}%</p><p className="dialog-note">本地原型进度演示，未连接实际模型服务。完成后可查看报告结构草稿。</p><div className="dialog-footer"><button className="secondary-button" onClick={() => setModal(null)}>后台查看进度</button></div></>}
        {modal?.kind === 'draft' && draft && <>
          <p className="dialog-note">原型草稿 · 已保存在本机浏览器。未连接模型服务，以下为报告结构示例。</p>
          <div className="report-preview"><p>项目：{draft.project}　类型：{draft.type}</p><p>模型选项：{draft.model}</p><p>模板：{draft.template}　技能：{draft.skills.join('、') || '未选择'}</p><h3>写作需求</h3><p>{draft.prompt}</p><h3>一、研究背景与目标</h3><p>待补充研究范围、时间窗口和关键问题。</p><h3>二、证据与分析</h3><p>待补充权威数据、来源引用和分析过程。</p><h3>三、战略判断与建议</h3><p>待补充结论、判断依据和实施建议。</p></div>
          <div className="dialog-footer"><button className="secondary-button" onClick={() => {setModal(null);focusPrompt();}}>继续编辑</button><button className="primary-button" onClick={downloadDraft}>下载草稿</button></div>
        </>}
      </div>
    </dialog>
  </>;
}
