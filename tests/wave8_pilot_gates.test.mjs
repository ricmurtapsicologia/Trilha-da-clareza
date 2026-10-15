import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const policy=JSON.parse(read('docs/ONDA_8_READINESS.json'));
const protocol=read('docs/ONDA_8_PROTOCOLO_PILOTO.md');
const instruments=read('docs/ONDA_8_INSTRUMENTOS.md');
test('8.1: pilot with people remains explicitly unauthorized',()=>{
  assert.equal(policy.wave,'8/9');
  assert.equal(policy.recruitment_authorized,false);
  assert.equal(policy.pilot_with_people_authorized,false);
  assert.equal(policy.patient_use_authorized,false);
  assert.equal(policy.synthetic_dry_run_allowed,true);
});
test('8.2: none of the 12 mandatory gates are artificially approved',()=>{
  assert.equal(policy.requirements.length,12);
  assert.equal(new Set(policy.requirements.map(g=>g.id)).size,12);
  for(const gate of policy.requirements){
    assert.equal(gate.approved,false,gate.id);
    assert.ok(gate.label.length>15,gate.id);
  }
});
test('8.3: no real participant recruitment or consent is recorded',()=>{
  assert.equal(policy.evidence.clinical_pilot_sessions,0);
  assert.equal(policy.evidence.participants_recruited,0);
  assert.equal(policy.evidence.consents_collected,0);
});
test('8.4: safety protocol includes stop, ethical review and LGPD',()=>{
  for(const keyword of ['interromper','LGPD','CEP','consentimento','assistivas','recrutamento']){
    assert.ok(protocol.toLowerCase().includes(keyword.toLowerCase()),keyword);
  }
  assert.match(protocol,/NÃO INICIADO E NÃO AUTORIZADO/);
  assert.match(instruments,/NÃO é termo de consentimento juridicamente aprovado/);
});
test('8.5: no identifying user records are created by the preparation',()=>{
  assert.doesNotMatch(JSON.stringify(policy),/\b[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}\b/);
  assert.doesNotMatch(JSON.stringify(policy),/participantes_?reais\s*:\s*[1-9]/);
  assert.ok(existsSync(new URL('../tests/wave8_synthetic.py',import.meta.url)));
});
