import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,mkdtempSync,existsSync,rmSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const gate=JSON.parse(read('docs/ONDA_9_GO_NO_GO.json'));
const prev=JSON.parse(read('docs/ONDA_8_READINESS.json'));
const audit=JSON.parse(read('docs/AUDITORIA_ONDA7_MACHINE.json'));
const run=args=>spawnSync(process.execPath,['scripts/release_preflight.mjs',...args],{encoding:'utf8'});
test('Onda 9: publicação e merge continuam bloqueados',()=>{
  assert.equal(gate.release_approved,false);
  assert.equal(gate.merge_authorized,false);
  assert.equal(gate.patient_use_authorized,false);
  assert.equal(gate.operational_state,'NO_GO');
  assert.equal(prev.patient_use_authorized,false);
});
test('Onda 9: oito autorizações obrigatórias distintas e não homologadas',()=>{
  assert.equal(gate.required_signoffs.length,8);
  assert.equal(new Set(gate.required_signoffs.map(x=>x.id)).size,8);
  assert.ok(gate.required_signoffs.every(x=>x.approved===false));
});
test('Onda 9: matriz 30/30 não pode ser declarada aprovada',()=>{
  assert.equal(audit.controls.filter(x=>x.status==='PASS').length,15);
  assert.equal(audit.controls.filter(x=>x.status==='PARTIAL').length,14);
  assert.equal(audit.controls.filter(x=>x.status==='BLOCKED').length,1);
});
test('Onda 9: CLI require-ready nega lançamento de forma segura',()=>{
  const result=run(['--require-ready']);
  assert.equal(result.status,2,result.stderr);
  assert.match(result.stdout,/ONDA9 NO_GO/);
  assert.match(result.stderr,/BLOQUEADO/);
});
test('Onda 9: relatório contém 6 hashes sem liberar a clínica',()=>{
  const dir=mkdtempSync(join(tmpdir(),'trilha9-'));
  try{
    const path=join(dir,'readiness.json');
    const result=run(['--out',path]);
    assert.equal(result.status,0,result.stderr);
    assert.ok(existsSync(path));
    const data=JSON.parse(readFileSync(path,'utf8'));
    assert.equal(data.decision,'NO_GO');
    assert.equal(data.clinical_approval_conferred,false);
    assert.equal(data.deploy_executed,false);
    assert.equal(data.merge_executed,false);
    assert.equal(data.unresolved_wave8_gates.length,12);
    assert.equal(data.unapproved_release_signoffs.length,8);
    assert.equal(data.candidate_asset_hashes.length,6);
    assert.ok(data.candidate_asset_hashes.every(x=>/^[a-f0-9]{64}$/.test(x.sha256)));
  } finally {rmSync(dir,{recursive:true,force:true});}
});
test('Onda 9: roteiro de reversão é auditável e sem force push',()=>{
  const s=read('docs/ONDA_9_PLANO_PUBLICACAO_ROLLBACK.md').toLowerCase();
  for(const keyword of ['no-go','rollback','gitHub pages','pr de reversão','não fazer force push','piloto supervisionado']){
    assert.ok(s.includes(keyword.toLowerCase()),keyword);
  }
});
