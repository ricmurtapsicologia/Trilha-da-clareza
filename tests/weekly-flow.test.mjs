import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {readingSummary,readingReviewSummary,articleCatalog,articleText,weeklyProgressMax,getWeeklyStatus} from '../leitura-semanal.js';

test('biblioteca editorial possui quatro leituras autônomas e progressão coerente',()=>{
  assert.equal(articleCatalog.length,4);
  assert.deepEqual(articleCatalog.map(a=>a.number),[1,2,3,4]);
  assert.equal(new Set(articleCatalog.map(a=>a.id)).size,4);
  for(const a of articleCatalog){
    assert.ok(articleText(a.id).length>1600);
    assert.match(articleText(a.id),/PARTE 1:/);
    assert.match(articleText(a.id),/PARTE 3:/);
  }
  assert.equal(weeklyProgressMax,6);
  assert.throws(()=>articleText('inexistente'),/Leitura não encontrada/);
});
test('plano é concreto, de uma única ação e apresenta alternativa condicional',()=>{
  const s=readingSummary('inicio','intervalo',{articleId:'comecar',cue:'agenda',barrier:'tempo'});
  assert.match(s,/única experiência desta semana/);
  assert.match(s,/primeiro passo, por até cinco minutos/);
  assert.match(s,/Quando: Num intervalo previamente reservado/);
  assert.match(s,/Se–então: Depois de consultar minha agenda/);
  assert.match(s,/Se não houver tempo/);
  assert.match(s,/Na revisão:/);
  assert.match(s,/Preparado localmente, sem envio automático/);
});
test('cada ação é executável sem impor contato, resultado clínico ou obrigação diária',()=>{
  for(const id of ['inicio','organizacao','comunicacao']){
    const s=readingSummary(id);
    assert.match(s,/Recurso psicoeducativo/);
    assert.match(s,/Se–então:/);
    assert.doesNotMatch(s,/diagnóstico:|resultado clínico|cura garantida|obrigação diária/i);
  }
  assert.throws(()=>readingSummary('outro'),/escolher uma ação/);
});
test('revisão posterior documenta tentativa e barreira sem texto pessoal',()=>{
  const s=readingReviewSummary('parcial','interrupcao','menor');
  assert.match(s,/Comecei, mas precisei interromper/);
  assert.match(s,/Interrupção ou mudança de prioridade/);
  assert.match(s,/Reduzir o próximo passo/);
  assert.match(s,/sem envio automático/);
  assert.throws(()=>readingReviewSummary('outro'),/Escolha o resultado/);
});
test('arquivo público não contém dados clínicos individuais, endpoints ou persistência',()=>{
  const source=readFileSync(new URL('../leitura-semanal.js',import.meta.url),'utf8');
  assert.doesNotMatch(source,/Daufenbach|Florianópolis|João Vittor|bupropiona|prontuário|paciente Fábio|Gmail|Google Docs/i);
  assert.doesNotMatch(source,/\blocalStorage\b|\bsessionStorage\b|\bindexedDB\b|\bfetch\s*\(|XMLHttpRequest|sendBeacon/);
  assert.doesNotMatch(source,/https?:\/\//);
  assert.doesNotMatch(source,/style="/);
  assert.match(source,/aria-valuemax="6"/);
  const status=getWeeklyStatus();
  assert.equal(status.visited,false);
});
test('continua na mesma página, com revisão independente',()=>{
  const app=readFileSync(new URL('../src/app.ts',import.meta.url),'utf8');
  assert.match(app,/data-action="weekly"/);
  assert.match(app,/data-action="review-weekly"/);
  assert.match(app,/mountWeekly\(host\)/);
  assert.match(app,/releaseWeeklyReadingMode/);
  assert.ok(!existsSync(new URL('../leitura-semanal.html',import.meta.url)));
});
