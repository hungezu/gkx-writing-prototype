import {execFileSync} from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
const run=(args,cwd)=>execFileSync('git',args,{cwd,encoding:'utf8',stdio:['ignore','pipe','pipe']}).trim();
const root=process.cwd();
const remote=run(['remote','get-url','origin'],root);
await fs.access(path.join(root,'dist/index.html'));
const directory=await fs.mkdtemp(path.join(os.tmpdir(),'gkx-pages-'));
try {
 run(['init','-b','gh-pages'],directory);
 run(['remote','add','origin',remote],directory);
 const exists=run(['ls-remote','origin','refs/heads/gh-pages'],directory);
 if(exists) {
  run(['fetch','--depth=1','origin','gh-pages'],directory);
  run(['reset','--hard','FETCH_HEAD'],directory);
  for(const entry of await fs.readdir(directory)) if(entry!=='.git') await fs.rm(path.join(directory,entry),{recursive:true,force:true});
 }
 await fs.cp(path.join(root,'dist'),directory,{recursive:true});
 await fs.writeFile(path.join(directory,'.nojekyll'),'');
 run(['add','-A'],directory);
 if(run(['status','--porcelain'],directory)) {
  const revision=run(['rev-parse','--short','HEAD'],root);
  run(['commit','-m',`Publish prototype from ${revision}`],directory);
  console.log(run(['push','origin','HEAD:gh-pages'],directory));
  console.log(`Published gh-pages commit ${run(['rev-parse','HEAD'],directory)}`);
 } else console.log('Published files already match the current build.');
} finally {await fs.rm(directory,{recursive:true,force:true});}
