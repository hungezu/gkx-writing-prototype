import {useState} from 'react';
import type {ReportFolder} from './workspace-data';
import {DropdownMenu,DropdownMenuTrigger,DropdownMenuContent,DropdownMenuGroup,DropdownMenuItem,DropdownMenuSeparator,DropdownMenuSub,DropdownMenuSubTrigger,DropdownMenuSubContent,DropdownMenuPortal} from './components/ui/dropdown-menu';

export default function TreeMoreMenu({kind,id,name,folders,folderId,nodeId,onAction,onMove}: {kind:'folder'|'report';id:string;name:string;folders:ReportFolder[];folderId?:string;nodeId?:string;onAction:(action:string,kind:'folder'|'report',id:string)=>void;onMove:(id:string,target:string)=>void}) {
 const [open,setOpen]=useState(false);
 return <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
  <DropdownMenuTrigger asChild><button type="button" data-node-id={nodeId} className={`tree-more ${kind==='folder'?'folder-more':''}`} aria-label={`${name} 更多操作`} onClick={event=>event.stopPropagation()}><img alt="" src={`${import.meta.env.BASE_URL}figma/imgFrame.svg`} width={16} height={16}/></button></DropdownMenuTrigger>
  <DropdownMenuContent align="end" sideOffset={6} collisionPadding={12} className="w-[160px]" onClick={event=>event.stopPropagation()}>
   <DropdownMenuGroup><DropdownMenuItem onSelect={()=>onAction('rename',kind,id)}>重命名</DropdownMenuItem>
    {kind==='report' && <DropdownMenuSub><DropdownMenuSubTrigger>移动至</DropdownMenuSubTrigger><DropdownMenuPortal><DropdownMenuSubContent collisionPadding={12} className="w-[224px]" onClick={event=>event.stopPropagation()}><DropdownMenuGroup>{folders.map(folder=><DropdownMenuItem key={folder.id} disabled={folder.id===folderId} onSelect={()=>onMove(id,folder.id)}>{folder.name}{folder.id===folderId?'（当前项目）':''}</DropdownMenuItem>)}</DropdownMenuGroup></DropdownMenuSubContent></DropdownMenuPortal></DropdownMenuSub>}
   </DropdownMenuGroup>
   <DropdownMenuSeparator/><DropdownMenuGroup><DropdownMenuItem variant="destructive" onSelect={()=>onAction('delete',kind,id)}>删除</DropdownMenuItem></DropdownMenuGroup>
  </DropdownMenuContent>
 </DropdownMenu>;
}
