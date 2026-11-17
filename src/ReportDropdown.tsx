import { useState, type ReactElement } from 'react';
import {PlusIcon} from '@radix-ui/react-icons';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuGroup, DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuItem } from './components/ui/dropdown-menu';

export default function ReportDropdown({kind, trigger, options, value, selected, onChange, onCreateProject}: {kind:string;trigger:ReactElement;options:string[];value:string;selected:string[];onChange:(value:string)=>void;onCreateProject?:()=>void}) {
  const [open,setOpen] = useState(false);
  const titles:Record<string,string> = {project:'写作项目',reportType:'报告类型',skills:'技能',templates:'模板选择',model:'模型选择'};
  return <DropdownMenu open={open} onOpenChange={setOpen}>
    <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
    <DropdownMenuContent className="w-[224px]" align={kind==='model'?'end':'start'} sideOffset={8} collisionPadding={12}>
      <DropdownMenuLabel>{titles[kind]}</DropdownMenuLabel>
      <DropdownMenuSeparator />
      {kind==='skills' ? <>
        <DropdownMenuGroup>{options.map(option=><DropdownMenuCheckboxItem key={option} checked={selected.includes(option)} onCheckedChange={()=>onChange(option)} onSelect={event=>event.preventDefault()}>{option}</DropdownMenuCheckboxItem>)}</DropdownMenuGroup>
        <DropdownMenuSeparator /><DropdownMenuGroup><DropdownMenuItem onSelect={()=>setOpen(false)}>完成选择</DropdownMenuItem></DropdownMenuGroup>
      </> : <DropdownMenuRadioGroup value={value} onValueChange={onChange}>{options.map(option=><DropdownMenuRadioItem key={option} value={option}>{option}</DropdownMenuRadioItem>)}</DropdownMenuRadioGroup>}
      {kind==='project' && onCreateProject && <><DropdownMenuSeparator/><DropdownMenuGroup><DropdownMenuItem data-create-project="true" onSelect={onCreateProject}><PlusIcon aria-hidden="true"/>新建项目</DropdownMenuItem></DropdownMenuGroup></>}
    </DropdownMenuContent>
  </DropdownMenu>;
}
