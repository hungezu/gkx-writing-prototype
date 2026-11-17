import ScrollingTitle from './ScrollingTitle';
import ProgressRing from './ProgressRing';
import TreeMoreMenu from './TreeMoreMenu';
import type {ReportWorkspace} from './workspace-data';

export default function ReportTree({workspace,closedGroups,selectedReport,projectMode,onAction,onMore,onMove}: {workspace:ReportWorkspace;closedGroups:string[];selectedReport:string;projectMode:string;onAction:(action:string,value?:string)=>void;onMore:(action:string,kind:'folder'|'report',id:string)=>void;onMove:(id:string,target:string)=>void}) {
 const {folders,reports}=workspace;
 const base=import.meta.env.BASE_URL+'figma/';
 function row(report:ReportWorkspace['reports'][number]) {
  return <div key={report.id} data-node-id={report.id} data-report="true" data-selected={selectedReport===report.id} className={`report-row ${report.generated?'generated-report':''}`} onClick={()=>onAction('report',report.id)}>
   <button type="button" data-node-id={report.titleId} data-report-title="true" className="report-row-title" onClick={event=>{event.stopPropagation();onAction('report',report.id);}}><ScrollingTitle text={report.title}/></button>
   <div className="report-row-footer"><button type="button" data-node-id={report.tagId} data-report-tag="true" aria-pressed={selectedReport===report.id} onClick={event=>{event.stopPropagation();onAction('toggleReport',report.id);}}>{report.type}</button>{report.generated&&report.progress!==undefined&&<span className="report-progress-label">{report.progress<100?`${report.progress}%`:'已完成'}</span>}<TreeMoreMenu kind="report" id={report.id} name={report.title} folders={folders} folderId={report.folderId} nodeId={report.moreId} onAction={onMore} onMove={onMove}/></div>
   {report.notified && <img alt="" data-node-id={report.id==='1:109'?'1:118':undefined} className="report-status-dot" src={base+'imgEllipse14300.svg'}/>}
   {report.progress!==undefined && <div data-node-id={report.id==='1:128'?'1:300':undefined} className="report-row-progress"><ProgressRing value={report.progress} label={`${report.title}生成进度`}/></div>}
  </div>;
 }
 if(projectMode==='最近')return <>{[...reports].sort((a,b)=>(b.updatedAt||0)-(a.updatedAt||0)).map(row)}</>;
 return <>{folders.map(folder=>{
  const closed=closedGroups.includes(folder.name);
  return <div key={folder.id} data-folder-id={folder.id} data-node-id={folder.nodeId} data-closed={closed} className="tree-folder">
   <div className="tree-folder-heading"><button type="button" data-folder-toggle="true" data-node-id={folder.buttonId} aria-expanded={!closed} onClick={()=>onAction('group',folder.name)}>
    <span data-node-id={folder.iconId} className="tree-folder-icon">{closed ? <span key="closed" className="closed-folder-image"><img alt="" src={base+'imgClosedFolder.svg'}/></span> : <span key="open" className="open-folder-image"><span><img alt="" src={base+'imgOpenFolder.svg'}/></span></span>}</span><span className="tree-folder-name" title={folder.name}>{folder.name}</span>
   </button><TreeMoreMenu kind="folder" id={folder.id} name={folder.name} folders={folders} onAction={onMore} onMove={onMove}/></div>
   <div className="tree-folder-reports" aria-hidden={closed}><div className="tree-folder-reports-inner" inert={closed}>{reports.filter(report=>report.folderId===folder.id).map(row)}</div></div>
  </div>;
 })}{folders.length===0 && <p className="tree-empty">暂无写作项目，可在上方项目下拉菜单中新建。</p>}</>;
}
