export interface ReportFolder { id:string; name:string; nodeId?:string; buttonId?:string; iconId?:string }
export interface ReportRecord { id:string; title:string; type:string; folderId:string; titleId?:string; tagId?:string; moreId?:string; progress?:number; notified?:boolean; generated?:boolean; updatedAt?:number }
export interface ReportWorkspace { folders:ReportFolder[]; reports:ReportRecord[] }
export const INITIAL_WORKSPACE:ReportWorkspace={
 folders:[
  {id:'low-altitude',name:'低空经济战略研究',nodeId:'1:101',buttonId:'1:102',iconId:'1:103'},
  {id:'emerging',name:'新兴产业布局',nodeId:'1:136',buttonId:'1:137',iconId:'1:138'},
  {id:'independent',name:'独立报告',nodeId:'1:271',buttonId:'1:272',iconId:'1:273'},
 ],
 reports:[
  {id:'1:109',title:'深圳低空经济产业链战略研究',type:'战略分析报告',folderId:'low-altitude',titleId:'1:110',tagId:'1:112',moreId:'1:113',notified:true},
  {id:'1:119',title:'大湾区低空经济区域竞争比较',type:'研究报告',folderId:'low-altitude',titleId:'1:120',tagId:'1:122'},
  {id:'1:128',title:'低空飞行服务重点企业筛选',type:'洞察报告',folderId:'low-altitude',titleId:'1:129',tagId:'1:131',progress:65},
  {id:'1:144',title:'未来产业方向优先级分析',type:'战略分析报告',folderId:'emerging',titleId:'1:145',tagId:'1:147'},
  {id:'1:153',title:'具身智能产业发展趋势研判',type:'洞察报告',folderId:'emerging',titleId:'1:154',tagId:'1:156'},
  {id:'1:279',title:'未来产业方向优先级分析',type:'战略分析报告',folderId:'independent',titleId:'1:280',tagId:'1:282'},
  {id:'1:288',title:'具身智能产业发展趋势研判',type:'洞察报告',folderId:'independent',titleId:'1:289',tagId:'1:291'},
 ]
};
export const WORKSPACE_KEY='gkx-writing-prototype:workspace-v1';
export function loadWorkspace():ReportWorkspace {
 try {const data=JSON.parse(localStorage.getItem(WORKSPACE_KEY)||'null');
  if(data && Array.isArray(data.folders) && Array.isArray(data.reports) && data.folders.every((f:ReportFolder)=>typeof f.id==='string'&&typeof f.name==='string') && data.reports.every((r:ReportRecord)=>typeof r.id==='string'&&typeof r.title==='string'&&typeof r.type==='string'&&data.folders.some((f:ReportFolder)=>f.id===r.folderId)))return data;
 }catch{/* Use the design's sample data if storage is unavailable or damaged. */}
 return INITIAL_WORKSPACE;
}
