import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {readingSummary} from '../leitura-semanal.js';

test('uma atividade semanal possui plano executável e não coleta respostas',()=>{
 const s=readingSummary('inicio','Em um momento tranquilo nesta semana');
 assert.match(s,/única experiência desta semana/);
 assert.match(s,/primeiro passo, por até dez minutos/);
 assert.match(s,/Quando: Em um momento tranquilo nesta semana/);
 assert.match(s,/Preparado localmente, sem envio automático/);
});
test('todos os planos têm objetivo observável e não são confundidos com avaliação clínica',()=>{
 for(const id of ['inicio','organizacao','comunicacao']){
  const s=readingSummary(id);
  assert.match(s,/Recurso psicoeducativo/);
  assert.match(s,/Na revisão:/);
  assert.doesNotMatch(s,/diagnóstico:|resultado clínico|cura garantida/i);
 }
 assert.throws(()=>readingSummary('outro'),/escolher uma ação/);
});
test('não expõe informações de atendimento individual ou conectores pessoais',()=>{
 const source=readFileSync(new URL('../leitura-semanal.js',import.meta.url),'utf8');
 assert.doesNotMatch(source,/Daufenbach|Florianópolis|João Vittor|bupropiona|prontuário|medicação|Gmail|Google Docs/i);
 assert.doesNotMatch(source,/\blocalStorage\b|\bsessionStorage\b|\bindexedDB\b|\bfetch\s*\(|XMLHttpRequest|sendBeacon/);
 assert.doesNotMatch(source,/https?:\/\//);
});
test('entrada do produto continua somente em index.html',()=>{
 const app=readFileSync(new URL('../src/app.ts',import.meta.url),'utf8');
 assert.match(app,/data-action="weekly"/);
 assert.match(app,/mountWeekly\(host\)/);
 assert.match(app,/screen==='weekly'/);
 assert.ok(!existsSync(new URL('../leitura-semanal.html',import.meta.url)));
});
