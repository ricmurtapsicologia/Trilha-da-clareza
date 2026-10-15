import test from 'node:test';
import assert from 'node:assert/strict';
import {journeys,audios} from '../dist/content.js';
import {validate,progressPercent,exportSummary,safeText} from '../dist/domain.js';
test('conteúdo validado',()=> assert.deepEqual(validate(journeys,audios),[]));
test('3 jornadas únicas',()=>assert.equal(new Set(journeys.map(j=>j.id)).size,3));
test('18 desafios únicos',()=>assert.equal(new Set(journeys.flatMap(j=>j.challenges.map(c=>c.id))).size,18));
test('54 escolhas de retorno educativo',()=>assert.equal(journeys.flatMap(j=>j.challenges.flatMap(c=>c.choices)).length,54));
test('12 roteiros de áudio completos',()=>assert.equal(audios.filter(a=>a.text.trim().length>30).length,12));
test('faixa de progresso',()=>{assert.equal(progressPercent(0),0);assert.equal(progressPercent(3),50);assert.equal(progressPercent(6),100)});
test('resumo não interpreta diagnóstico',()=>{const r=exportSummary(journeys[0],[0,1,2,0,1,2],'Atitude pequena');assert.match(r,/psicoeducativo/);assert.match(r,/Atitude pequena/);assert.doesNotMatch(r,/probabilidade de transtorno|diagnosticado/i)});
test('escape de texto',()=>assert.equal(safeText('<script>'), '&lt;script&gt;'));
for(const j of journeys){test(`jornada ${j.id} completa e textos`,()=>{assert.equal(j.challenges.length,6);assert.ok(j.takeaway.length>20);for(const c of j.challenges){assert.ok(c.situation.length>=50);assert.ok(c.question.length>=25);assert.equal(c.choices.length,3);for(const ch of c.choices){assert.ok(ch.feedback.length>50);assert.ok(ch.reflection.length>10)}}})}
