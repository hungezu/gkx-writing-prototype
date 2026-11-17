import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {chromium} from 'playwright';
const url=process.argv[2]||'http://127.0.0.1:4173/';
const browser=await chromium.launch({channel:'chrome',headless:true,args:['--enable-unsafe-swiftshader']});
const page=await browser.newPage({viewport:{width:1312,height:774}});const errors=[];const checks=[];page.on('pageerror',error=>errors.push(error.message));
const n=id=>page.locator(`[data-node-id="${id}"]`);const dialog=page.locator('dialog');
async function more(kind,id){const scope=kind==='report'?n(id):page.locator(`[data-folder-id="${id}"] .tree-folder-heading`);await scope.hover();await scope.locator('.tree-more').click();await page.getByRole('menu').waitFor();}
async function close(){await dialog.getByRole('button',{name:'关闭弹窗'}).click();}
async function rename(kind,id,name){await more(kind,id);await page.getByRole('menuitem',{name:'重命名',exact:true}).click();await dialog.getByRole('textbox',{name:'名称'}).fill(name);await dialog.getByRole('button',{name:'保存',exact:true}).click();}
async function move(id,name){await more('report',id);await page.getByRole('menuitem',{name:'移动至',exact:true}).hover();await page.getByRole('menuitem',{name,exact:true}).click();}
async function check(name,run){await run();checks.push(name);}
try{
 await page.goto(url,{waitUntil:'networkidle'});
 await check('所有项目和报告都有更多菜单',async()=>{assert.equal(await page.locator('.tree-more').count(),10);assert.equal(await page.locator('[data-report]').count(),7);});
 const title='深圳低空经济产业链战略研究（更新版）';
 await check('报告重命名与刷新保留',async()=>{await rename('report','1:109',title);assert.equal(await n('1:109').locator('.scrolling-title').innerText(),title);await page.reload({waitUntil:'networkidle'});assert.equal(await n('1:109').locator('.scrolling-title').innerText(),title);});
 const project='新兴产业布局（更新）';
 await check('项目重命名和下拉同步',async()=>{await rename('folder','emerging',project);assert.equal(await n('1:137').innerText(),project);await n('1:260').click();assert.equal(await page.getByRole('menuitemradio',{name:project,exact:true}).count(),1);await page.keyboard.press('Escape');await page.reload({waitUntil:'networkidle'});assert.equal(await n('1:137').innerText(),project);});
 await check('报告跨项目移动与刷新保留',async()=>{await move('1:109',project);assert.equal(await n('1:109').evaluate(el=>el.closest('[data-folder-id]').dataset.folderId),'emerging');assert.equal(await page.locator('[data-folder-id="low-altitude"] [data-node-id="1:109"]').count(),0);await page.reload({waitUntil:'networkidle'});assert.equal(await n('1:109').evaluate(el=>el.closest('[data-folder-id]').dataset.folderId),'emerging');});
 await check('删除报告可取消及确认',async()=>{await more('report','1:119');await page.getByRole('menuitem',{name:'删除',exact:true}).click();await dialog.getByRole('button',{name:'取消',exact:true}).click();assert.equal(await n('1:119').count(),1);await more('report','1:119');await page.getByRole('menuitem',{name:'删除',exact:true}).click();await dialog.getByRole('button',{name:'确认删除',exact:true}).click();assert.equal(await n('1:119').count(),0);await page.reload({waitUntil:'networkidle'});assert.equal(await n('1:119').count(),0);});
 await check('项目重复名称验证',async()=>{await more('folder','emerging');await page.getByRole('menuitem',{name:'重命名',exact:true}).click();await dialog.getByRole('textbox',{name:'名称'}).fill('低空经济战略研究');await dialog.getByRole('button',{name:'保存',exact:true}).click();assert.equal(await dialog.getByRole('textbox',{name:'名称'}).getAttribute('aria-invalid'),'true');assert.match(await dialog.innerText(),/已有同名项目/);await close();});
 await check('新建项目及移入报告',async()=>{await n('1:260').click();await page.getByRole('menuitem',{name:'新建项目',exact:true}).click();await dialog.getByRole('textbox',{name:'名称'}).fill('测试写作项目');await dialog.getByRole('button',{name:'保存',exact:true}).click();await move('1:128','测试写作项目');assert.equal(await n('1:128').evaluate(el=>el.closest('[data-folder-id]').querySelector('.tree-folder-name').textContent),'测试写作项目');});
 await check('删除项目确认关联报告数量',async()=>{await more('folder','emerging');await page.getByRole('menuitem',{name:'删除',exact:true}).click();assert.match(await dialog.innerText(),/3 份报告/);await dialog.getByRole('button',{name:'确认删除',exact:true}).click();assert.equal(await page.locator('[data-folder-id="emerging"]').count(),0);assert.equal(await n('1:109').count(),0);assert.equal(await n('1:144').count(),0);assert.equal(await n('1:153').count(),0);await page.reload({waitUntil:'networkidle'});const valid=await page.evaluate(()=>{const data=JSON.parse(localStorage.getItem('gkx-writing-prototype:workspace-v1'));return data.reports.every(report=>data.folders.some(folder=>folder.id===report.folderId));});assert.equal(valid,true);});
 await check('移动菜单保留报告类型与进度',async()=>{assert.match(await n('1:128').innerText(),/洞察报告/);assert.equal(await n('1:128').getByRole('progressbar').getAttribute('aria-valuenow'),'65');});
 await page.screenshot({path:'design/qa/workspace-management.png'});assert.deepEqual(errors,[]);await fs.writeFile('design/qa/workspace-checks.json',JSON.stringify({url,checks,errors},null,2));console.log(JSON.stringify({passed:checks.length,checks,errors},null,2));
}finally{await browser.close();}
