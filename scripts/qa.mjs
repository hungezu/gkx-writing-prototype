import {chromium} from 'playwright';
import fs from 'node:fs/promises';
const url = process.argv[2] || 'http://127.0.0.1:5173';
const browser = await chromium.launch({channel:'chrome', headless:true});
const checks = [
  ['1:61',{x:200,y:61,width:1704,height:903}],
  ['1:69',{x:465,y:108,width:1422,height:839}],
  ['1:82',{x:233,y:124,width:216,height:644}],
  ['1:70',{x:481,y:124,width:24,height:24}],
  ['1:270',{x:780,y:228,width:800,height:258}],
  ['7:25',{x:784,y:354,width:792,height:128}],
  ['7:100',{x:576,y:566,width:1200,height:80}],
  ['1:207',{x:1806,y:8,width:98,height:40}],
];
const results = [];
for(const [width,height] of [[1920,980],[1440,900],[1280,720],[1024,768],[768,1024],[390,844]]) {
 const page = await browser.newPage({viewport:{width,height},deviceScaleFactor:1});
 const errors=[];page.on('pageerror',err=>errors.push(err.message));
 await page.goto(url,{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
 await page.screenshot({path:`design/qa/render-${width}.png`,fullPage:true});
 const geometry=width===1920?await Promise.all(checks.map(async([id,design])=>({id,design,actual:await page.locator(`[data-node-id="${id}"]`).boundingBox()}))):[];
 const layout=await page.evaluate(()=>({width:innerWidth,height:innerHeight,bodyScrollWidth:document.body.scrollWidth,rootScrollWidth:document.getElementById('root').scrollWidth,brokenImages:[...document.images].filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.src),font:getComputedStyle(document.body).fontFamily}));
 results.push({width,height,errors,layout,geometry});await page.close();
}
await fs.writeFile('design/qa/layout-checks.json',JSON.stringify(results,null,2));
console.log(JSON.stringify(results,null,2));await browser.close();
