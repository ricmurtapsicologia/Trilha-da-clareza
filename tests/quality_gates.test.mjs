import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {journeys, audios} from '../dist/content.js';
import {validate} from '../dist/domain.js';
const src = readFileSync(new URL('../src/app.ts', import.meta.url), 'utf8');
const markup = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const content = readFileSync(new URL('../src/content.ts', import.meta.url), 'utf8');
const challenge = (id) => journeys.flatMap(j=>j.challenges).find(c=>c.id===id);
test('matriz do conteúdo e voz estruturalmente íntegras', () => {
  assert.deepEqual(validate(journeys,audios),[]);
  assert.equal(journeys.flatMap(j=>j.challenges).length,18);
  assert.equal(journeys.flatMap(j=>j.challenges.flatMap(c=>c.choices)).length,54);
  assert.equal(audios.length,12);
});
test('p4: diálogo não incentiva exposição à violência', () => {
  assert.match(challenge('p4').choices[2].feedback,/ameaça|violência/);
});
test('c2: atraso de familiar admite risco concreto', () => {
  assert.match(challenge('c2').choices[0].feedback,/perigo|risco/);
});
test('c3: responsabilidades respeitam limites e abuso', () => {
  assert.match(challenge('c3').choices[2].feedback,/abuso|ameaça/);
});
test('a3: comunicação não obriga negociação em risco', () => {
  assert.match(challenge('a3').choices[2].feedback,/violência|ameaça/);
});
test('respostas não persistem nem são transmitidas em execução normal', () => {
  assert.doesNotMatch(src,/\b(?:fetch|sendBeacon|XMLHttpRequest|WebSocket|indexedDB|localStorage|sessionStorage)\s*(?:\(|\.|\[)/);
});
test('CSP bloqueia conexões de rede da aplicação', () => {
  assert.match(markup,/connect-src 'none'/);
});
test('sem dados identificáveis ou contato nos roteiros', () => {
  assert.doesNotMatch(content,/\b[\w.-]+@[\w.-]+\.[A-Za-z]{2,}\b/);
  assert.doesNotMatch(content,/\b\d{3}\.\d{3}\.\d{3}-\d{2}\b/);
});
test('pausa desabilita interação do fundo', () => {
  assert.match(src,/state\.paused\?'inert':'/);
});
test('narração é opcional e possui transcrição', () => {
  assert.match(src,/data-action="transcript"/);
  assert.match(src,/speechSynthesis/);
  assert.match(src,/data-audio/);
});
