import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const review=JSON.parse(read('docs/HOMOLOGACAO_TRIAGEM_CLINICA.json'));
const pilot=JSON.parse(read('docs/ONDA_8_READINESS.json'));
const go=JSON.parse(read('docs/ONDA_9_GO_NO_GO.json'));
test('Homologação: 18 desafios x 3 e 12 roteiros seguem sem aprovação clínica automática',()=>{
  assert.equal(review.review_type,'TRIAGEM_EDITORIAL_PRELIMINAR_NAO_CLINICA');
  assert.equal(review.challenges.length,18);
  assert.equal(review.audio_scripts.length,12);
  assert.equal(new Set(review.challenges.map(i=>i.id)).size,18);
  assert.equal(new Set(review.audio_scripts.map(i=>i.id)).size,12);
  assert.ok([...review.challenges,...review.audio_scripts].every(x=>x.clinical_review==='PENDENTE'&&!x.approved));
  assert.equal(review.human_clinical_signoff,false);
});
test('Homologação: riscos de crise, violência e grounding permanecem explicitados',()=>{
  const map=Object.fromEntries([...review.challenges,...review.audio_scripts].map(i=>[i.id,i]));
  for(const id of ['p4','c2','c3','a3','skill-incerteza','grounding']){
    assert.ok(map[id],id);
    assert.ok(['Médio','Alto'].includes(map[id].attention),id);
  }
});
test('Homologação: exigências LGPD, acesso assistivo e hospedagem ainda estão abertas',()=>{
  assert.ok(pilot.requirements.every(g=>!g.approved));
  assert.ok(go.required_signoffs.every(s=>!s.approved));
  assert.equal(pilot.patient_use_authorized,false);
  assert.equal(go.patient_use_authorized,false);
  const md=read('docs/HOMOLOGACAO_NORMAS_HOSTING.md');
  for(const fragment of ['GitHub Pages','CNS nº 510/2016','CFP nº 009/2024','legítimo interesse','anti-iframe'])
    assert.ok(md.includes(fragment),fragment);
});
test('Homologação: protocolo de aparelho físico não se autodeclara executado',()=>{
  const doc=read('docs/HOMOLOGACAO_TESTE_FISICO.md');
  assert.match(doc,/Status: NÃO EXECUTADO/);
  assert.equal((doc.match(/\| AT-\d\d \|/g)||[]).length,12);
  assert.equal((doc.match(/\| PENDENTE \|/g)||[]).length,12);
});
