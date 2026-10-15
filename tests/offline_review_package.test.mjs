import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync,mkdtempSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {spawnSync} from 'node:child_process';
test('Prévia offline sem servidor, com CSP baseada em hashes exatos',()=>{
 const dir=mkdtempSync(join(tmpdir(),'trilha-review-'));
 try{
  const path=join(dir,'offline.html');
  const r=spawnSync(process.execPath,['scripts/build_review_offline.mjs','--out',path],{encoding:'utf8'});
  assert.equal(r.status,0,r.stderr);
  assert.ok(existsSync(path));
  const html=readFileSync(path,'utf8');
  assert.match(html,/PRÉVIA OFFLINE PARA REVISÃO TÉCNICA/);
  assert.match(html,/NÃO HOMOLOGADA/);
  assert.match(html,/script-src 'sha256-[A-Za-z0-9+/=]+'/);
  assert.match(html,/style-src 'sha256-[A-Za-z0-9+/=]+'/);
  assert.match(html,/connect-src 'none'/);
  assert.doesNotMatch(html,/type="module"|src="\.\/dist\/app\.js"|href="\.\/style\.css"/);
  assert.match(html,/function discardSession/);
  assert.match(html,/function journeyComplete/);
 }finally{rmSync(dir,{recursive:true,force:true});}
});
