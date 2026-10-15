import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
const read=(p)=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const audit=JSON.parse(read('docs/AUDITORIA_ONDA7_MACHINE.json'));
test('Onda 7: os 30 controles possuem nomes, evidências e estados únicos',()=>{
  assert.equal(audit.controls.length,30);
  assert.deepEqual(audit.controls.map(x=>x.id),Array.from({length:30},(_,i)=>i+1));
  assert.equal(new Set(audit.controls.map(x=>x.name)).size,30);
  for(const c of audit.controls){
    assert.match(c.name,/\S{4}/);
    assert.ok(c.evidence.trim().length>=20,c.name);
    assert.ok(['PASS','PARTIAL','BLOCKED'].includes(c.status),c.name);
  }
});
test('Onda 7: impede alegar 30/30 sem aceites clínicos e assistivos',()=>{
  const group=(status)=>audit.controls.filter(x=>x.status===status).length;
  assert.equal(group('PASS'),15);
  assert.equal(group('PARTIAL'),14);
  assert.equal(group('BLOCKED'),1);
  assert.equal(audit.controls.find(x=>x.id===25).status,'BLOCKED');
  for(const id of [5,6,7,8,14,15,16,18,21,22,23,24,30])
    assert.notEqual(audit.controls.find(x=>x.id===id).status,'PASS');
});
test('Onda 7: correção de descarte impede retomada da jornada encerrada',()=>{
  const s=read('src/app.ts');
  assert.match(s,/data-action="discard">Encerrar e descartar respostas/);
  assert.match(s,/function discardSession\(\)/);
  assert.match(s,/state\.journey=null;state\.step=0;state\.answers=Array\(6\)\.fill\(null\)/);
  assert.match(s,/case'discard':discardSession\(\)/);
});
test('Onda 7: documentação mantém gate clínico fechado',()=>{
  const gate=read('docs/GATES_DE_LIBERACAO.md');
  assert.match(gate,/NÃO HOMOLOGADO/);
  assert.match(gate,/\[ \] Revisão profissional/);
  assert.ok(existsSync(new URL('../docs/AUDITORIA_CANONICA_30_20261015.md',import.meta.url)));
});
