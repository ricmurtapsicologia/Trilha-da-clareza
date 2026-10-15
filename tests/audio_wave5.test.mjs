import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { audios } from '../dist/content.js';
const text = readFileSync(new URL('../docs/ONDA_5_PREVIEW_MANIFEST.json',import.meta.url),'utf8');
const manifest = JSON.parse(text);
test('Onda 5: manifesto experimental contém 12 ids e duração adequada',()=>{
  assert.equal(manifest.items.length,12);
  assert.deepEqual(new Set(manifest.items.map(x=>x.id)),new Set(audios.map(x=>x.id)));
  for(const item of manifest.items){
    assert.ok(item.id==='grounding'?(item.duration_seconds>=60&&item.duration_seconds<=90):(item.duration_seconds>=15&&item.duration_seconds<=35));
    assert.match(item.sha256,/^[0-9a-f]{64}$/);
    assert.ok(item.bytes>10000);
  }
});
test('Onda 5: manifesto bloqueia uso assistencial e não contém dados de pacientes',()=>{
  assert.match(manifest.license_status,/Não homologada/);
  assert.match(manifest.clinical_status,/Pendente/);
  assert.match(manifest.assets_status,/fora do repositório/);
  assert.doesNotMatch(text,/\b[\w.-]+@[\w.-]+\.[A-Za-z]{2,}\b/);
});
