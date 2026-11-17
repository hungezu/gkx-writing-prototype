import { useEffect, useRef, useState, type ReactElement, type FormEvent } from 'react';
import FigmaPage from './FigmaPage';
import ProgressRing from './ProgressRing';
import Galaxy from './components/Galaxy';
import BorderGlow from './components/BorderGlow';
import ReportDropdown from './ReportDropdown';
import ReportTree from './ReportTree';
import {loadWorkspace, WORKSPACE_KEY} from './workspace-data';
import {Input} from './components/ui/input';
import {FieldGroup,Field,FieldLabel,FieldError} from './components/ui/field';

const reportTypes = ['战略分析报告', '研究报告', '洞察报告'];
const models = ['GLM 5.2', 'DeepSeek V3', 'Qwen 3'];
const templates = ['不使用模板', '战略分析报告', '产业研究报告', '政策分析报告'];
const skills = ['战略分析', '产业研究', '技术研判', '政策分析', '证据核验', '观点论证', '报告写作'];
type Modal = { kind: string; title: string; value?: string };
type Draft = { id?: string; title: string; prompt: string; type: string; project: string; model: string; template: string; skills: string[] };

export default function App() {
  const [workspace,setWorkspace] = useState(loadWorkspace);
  const projects=workspace.folders.map(folder=>folder.name);
  const [prompt, setPrompt] = useState('');
  const [model, setModel] = useState(models[0]);
  const [reportType, setReportType] = useState(reportTypes[0]);
  const [project, setProject] = useState(projects[0] || '选择写作项目');
  const [category, setCategory] = useState('全部');
  const [library, setLibrary] = useState('技能广场');
  const [projectMode, setProjectMode] = useState('项目');
  const [collapsed, setCollapsed] = useState(false);
  const [mobile,setMobile]=useState(()=>window.matchMedia('(max-width:760px)').matches);
  const [closedGroups, setClosedGroups] = useState<string[]>([]);
  const [selectedReport, setSelectedReport] = useState('');
  const [template, setTemplate] = useState(templates[0]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [modal, setModal] = useState<Modal | null>(null);
  const [toast, setToast] = useState('');
  const [resourceTouched, setResourceTouched] = useState(false);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [generating, setGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(100);
  const [activeDraftId,setActiveDraftId] = useState<string|null>(null);
  const [editName,setEditName] = useState('');
  const [editError,setEditError] = useState('');
  const dialogRef = useRef<HTMLDialogElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  useEffect(()=>{const query=window.matchMedia('(max-width:760px)');const update=()=>setMobile(query.matches);query.addEventListener('change',update);return()=>query.removeEventListener('change',update);},[]);
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
  useEffect(()=>{try{localStorage.setItem(WORKSPACE_KEY,JSON.stringify(workspace));}catch{/* Storage may be disabled. */}},[workspace]);
  useEffect(()=>{if(activeDraftId)setWorkspace(current=>({...current,reports:current.reports.map(report=>report.id===activeDraftId?{...report,progress:generationProgress}:report)}));},[activeDraftId,generationProgress]);
  useEffect(()=>{if(draft&&!generating){try{localStorage.setItem('gkx-writing-prototype:last-draft',JSON.stringify(draft));}catch{}}},[draft,generating]);
  const focusPrompt = () => requestAnimationFrame(() => document.querySelector<HTMLTextAreaElement>('[data-node-id="7:62"]')?.focus());
  function onAction(action: string, value = '') {
    switch (action) {
      case 'collapse': setCollapsed(!collapsed); break;
      case 'projectMode': setProjectMode(value); break;
      case 'group': setClosedGroups(groups => groups.includes(value) ? groups.filter(g => g !== value) : [...groups, value]); break;
      case 'newReport': setPrompt(''); setSelectedReport(''); setToast('已新建报告，请填写报告需求'); focusPrompt(); break;
      case 'report': {
        const report=workspace.reports.find(report=>report.id===value);if(!report)break;
        setSelectedReport(value);setReportType(report.type);setProject(workspace.folders.find(folder=>folder.id===report.folderId)?.name || project);
        setModal({kind:report.id===activeDraftId?(generating?'generating':'draft'):'existing',title:report.id===activeDraftId?'报告创作预览':report.title,value});break;
      }
      case 'toggleReport': {
        const report=workspace.reports.find(report=>report.id===value);if(!report)break;
        setSelectedReport(current=>current===value?'':value);setReportType(report.type);setProject(workspace.folders.find(folder=>folder.id===report.folderId)?.name || project);break;
      }
      case 'library': setLibrary(value); setCategory('全部'); setResourceTouched(true); break;
      case 'category': setCategory(value); setResourceTouched(true); break;
      case 'send': {
        if (generating) { setModal({kind:'generating', title:'报告生成进度'}); return; }
        if (!prompt.trim()) { setToast('请先填写报告需求'); focusPrompt(); return; }
        const folder=workspace.folders.find(folder=>folder.name===project);if(!folder){openNewProject();setToast('请先新建写作项目');return;}
        const id='report-'+crypto.randomUUID();
        const nextDraft = {id,title: prompt.trim().slice(0, 30), prompt: prompt.trim(), type: reportType, project, model, template, skills: selectedSkills};
        setDraft(nextDraft);
        setWorkspace(current=>({...current,reports:[...current.reports,{id,title:nextDraft.title,type:reportType,folderId:folder.id,progress:0,generated:true,updatedAt:Date.now()}]}));
        setActiveDraftId(id);setSelectedReport(id);setGenerationProgress(0);setGenerating(true);
        requestAnimationFrame(() => { const list = document.querySelector<HTMLElement>('[data-node-id="1:100"]'); if (list) list.scrollTop = list.scrollHeight; });
        setModal({kind: 'generating', title: '报告生成进度'}); break;
      }
      case 'navigation': if (value === '战略咨询') setToast('当前页面：战略咨询 · 智能创作报告'); else setModal({kind: 'module', title: value}); break;
      case 'utility': setModal({kind: 'utility', title: value}); break;
    }
  }
  function dropdownChange(kind:string,value:string) {
    if(kind==='skills') {setSelectedSkills(list=>list.includes(value)?list.filter(item=>item!==value):[...list,value]);return;}
    if(kind==='project')setProject(value);
    if(kind==='reportType')setReportType(value);
    if(kind==='model')setModel(value);
    if(kind==='templates')setTemplate(value);
    setToast(`已选择：${value}`);
  }
  function openNewProject() {setEditName('');setEditError('');setModal({kind:'new-project',title:'新建写作项目'});}
  function workspaceAction(action:string,kind:'folder'|'report',id:string) {
    const item=kind==='folder'?workspace.folders.find(folder=>folder.id===id):workspace.reports.find(report=>report.id===id);
    if(!item)return;setEditName('name' in item?item.name:item.title);setEditError('');
    setModal({kind:`${action}-${kind}`,title:`${action==='rename'?'重命名':'删除'}${kind==='folder'?'项目':'报告'}`,value:id});
  }
  function saveName(event:FormEvent<HTMLFormElement>) {
    event.preventDefault();if(!modal)return;const name=editName.trim();
    if(!name){setEditError('请输入名称');return;}
    if((modal.kind==='rename-folder'||modal.kind==='new-project')&&workspace.folders.some(folder=>folder.name===name&&folder.id!==modal.value)){setEditError('已有同名项目，请使用其他名称');return;}
    if(modal.kind==='new-project') {const id='project-'+crypto.randomUUID();setWorkspace(current=>({...current,folders:[...current.folders,{id,name}]}));setProject(name);}
    if(modal.kind==='rename-folder') {
      const folder=workspace.folders.find(folder=>folder.id===modal.value);if(!folder)return;
      setWorkspace(current=>({...current,folders:current.folders.map(item=>item.id===folder.id?{...item,name}:item)}));
      if(project===folder.name)setProject(name);setClosedGroups(groups=>groups.map(group=>group===folder.name?name:group));
      setDraft(current=>current?.project===folder.name?{...current,project:name}:current);
    }
    if(modal.kind==='rename-report') {
      setWorkspace(current=>({...current,reports:current.reports.map(report=>report.id===modal.value?{...report,title:name,updatedAt:Date.now()}:report)}));
      if(activeDraftId===modal.value)setDraft(current=>current?{...current,title:name}:current);
    }
    setModal(null);setToast(modal.kind==='new-project'?'已新建写作项目':'名称已更新');
  }
  function removeItem() {
    if(!modal?.value)return;const id=modal.value;
    const removed=workspace.reports.filter(report=>modal.kind==='delete-folder'?report.folderId===id:report.id===id);
    if(modal.kind==='delete-folder') {
      const folder=workspace.folders.find(folder=>folder.id===id);
      setWorkspace(current=>({folders:current.folders.filter(folder=>folder.id!==id),reports:current.reports.filter(report=>report.folderId!==id)}));
      if(folder?.name===project)setProject(workspace.folders.find(folder=>folder.id!==id)?.name || '选择写作项目');
      setClosedGroups(groups=>groups.filter(group=>group!==folder?.name));
    }else setWorkspace(current=>({...current,reports:current.reports.filter(report=>report.id!==id)}));
    if(removed.some(report=>report.id===selectedReport))setSelectedReport('');
    if(removed.some(report=>report.id===activeDraftId)){setGenerating(false);setActiveDraftId(null);setDraft(null);}
    try{const saved=JSON.parse(localStorage.getItem('gkx-writing-prototype:last-draft')||'null');if(removed.some(report=>report.id===saved?.id))localStorage.removeItem('gkx-writing-prototype:last-draft');}catch{}
    setModal(null);setToast('已删除');
  }
  function moveReport(id:string,target:string) {
    const folder=workspace.folders.find(folder=>folder.id===target);if(!folder)return;
    setWorkspace(current=>({...current,reports:current.reports.map(report=>report.id===id?{...report,folderId:target,updatedAt:Date.now()}:report)}));
    setClosedGroups(groups=>groups.filter(group=>group!==folder.name));
    if(selectedReport===id)setProject(folder.name);if(activeDraftId===id)setDraft(current=>current?{...current,project:folder.name}:current);
    setToast(`已移动至${folder.name}`);requestAnimationFrame(()=>document.querySelector(`[data-node-id="${CSS.escape(id)}"]`)?.scrollIntoView({block:'nearest'}));
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
  const activeReport=workspace.reports.find(report=>report.id===modal?.value);
  const activeFolder=workspace.folders.find(folder=>folder.id===activeReport?.folderId);
  const deletingFolder=workspace.folders.find(folder=>folder.id===modal?.value);
  const deletingCount=workspace.reports.filter(report=>report.folderId===modal?.value).length;
  return <>
    <FigmaPage {...{onAction, prompt, setPrompt, model, reportType, project, category, library, projectMode, collapsed, closedGroups, selectedReport, generating, mobile}} projectTree={<ReportTree workspace={workspace} closedGroups={closedGroups} selectedReport={selectedReport} projectMode={projectMode} onAction={onAction} onMore={workspaceAction} onMove={moveReport}/>} renderDropdown={(kind,trigger)=><ReportDropdown kind={kind} trigger={trigger as ReactElement} options={kind==='project'?projects:kind==='reportType'?reportTypes:kind==='model'?models:kind==='templates'?templates:skills} value={kind==='project'?project:kind==='reportType'?reportType:kind==='model'?model:template} selected={selectedSkills} onChange={value=>dropdownChange(kind,value)} onCreateProject={openNewProject} />} renderComposer={content=><BorderGlow className="composer-glow" backgroundColor="#ffffff" borderRadius={12} glowRadius={16} glowColor="220 75 70" glowIntensity={0.3} colors={['#86aaf6','#b7a3e8','#9dcfe3']} fillOpacity={0.035}>{content}</BorderGlow>} background={<div className="galaxy-backdrop" aria-hidden="true"><Galaxy density={1.1} glowIntensity={0.36} flareIntensity={1.55} starSpeed={0} mouseRepulsion clickWarp starColors={[]} hueShift={140} saturation={1} starSize={0.5} twinkleIntensity={0.3} speed={1} rotationSpeed={0.1} layers={3} direction="forward" repulsionStrength={2} mouseInteraction intro lightMode /></div>} resourceFeedback={resourceTouched && <section className="resource-feedback" aria-live="polite"><p>{library === '知识库' ? `暂无${category === '全部' ? '' : category}知识库内容` : `暂无${category === '全部' ? '' : category}技能条目`}</p><p>当前设计稿未提供资源条目，已保留筛选状态。</p></section>} />
    {toast && <div className="toast" role="status">{toast}</div>}
    <dialog ref={dialogRef} className="prototype-dialog" onCancel={() => setModal(null)} onClick={event => { if (event.target === event.currentTarget) { const rect = event.currentTarget.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) setModal(null); } }} aria-labelledby="dialog-title">
      <div className="dialog-header"><h2 id="dialog-title">{modal?.title}</h2><button className="close-button" aria-label="关闭弹窗" onClick={() => setModal(null)}>×</button></div>
      <div className="dialog-body">
        {(modal?.kind.startsWith('rename-')||modal?.kind==='new-project') && <form onSubmit={saveName}><FieldGroup><Field data-invalid={Boolean(editError)}><FieldLabel htmlFor="workspace-name">名称</FieldLabel><Input id="workspace-name" value={editName} onChange={event=>{setEditName(event.target.value);setEditError('');}} aria-invalid={Boolean(editError)} maxLength={120} onFocus={event=>event.currentTarget.select()} autoFocus/>{editError&&<FieldError>{editError}</FieldError>}</Field></FieldGroup><div className="dialog-footer"><button type="button" className="secondary-button" onClick={()=>setModal(null)}>取消</button><button type="submit" className="primary-button">保存</button></div></form>}
        {modal?.kind.startsWith('delete-') && <><p>{modal.kind==='delete-folder'?`确定删除项目“${deletingFolder?.name}”吗？`:`确定删除报告“${activeReport?.title}”吗？`}</p>{modal.kind==='delete-folder'&&deletingCount>0&&<p className="dialog-note" style={{marginTop:12}}>该项目下的 {deletingCount} 份报告也会一并删除。</p>}<div className="dialog-footer"><button className="secondary-button" onClick={()=>setModal(null)}>取消</button><button className="primary-button danger-button" onClick={removeItem}>确认删除</button></div></>}

        {modal?.kind === 'module' && <><p>当前原型已还原「战略咨询 · 智能创作报告」页面。</p><p className="dialog-note" style={{marginTop:12}}>设计稿未提供「{modal.title}」页面，暂以入口反馈展示。</p><div className="dialog-footer"><button className="primary-button" onClick={() => setModal(null)}>返回报告创作</button></div></>}
        {modal?.kind === 'utility' && <>
          {modal.title === '李科' ? <><p>李科</p><p className="dialog-note">深圳国际科技信息中心 · 原型演示账号</p></> : modal.title === '工作台' ? <><p>智能创作报告</p><p className="dialog-note">可在此继续查看本机上次保存的报告草稿。</p><button className="option-button" style={{width:'100%'}} onClick={restoreDraft}>查看上次创作草稿</button></> : <p>{modal.title === '待办中心' ? '暂无待办事项' : '暂无新消息'}</p>}
        </>}
        {modal?.kind === 'existing' && <><p className="dialog-note">设计稿中的报告示例；未提供报告正文。</p><p>所属项目：{activeFolder?.name}</p><p>报告类型：{activeReport?.type}</p>{activeReport?.progress!==undefined && <p className="generation-status"><ProgressRing value={activeReport.progress} label="报告生成进度" />生成进度：{activeReport.progress}%（演示数据）</p>}<div className="dialog-footer"><button className="primary-button" onClick={() => { setModal(null); focusPrompt(); }}>填写创作需求</button></div></>}
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
