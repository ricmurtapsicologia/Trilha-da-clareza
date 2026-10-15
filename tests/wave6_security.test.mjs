import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=(name)=>readFileSync(new URL('../'+name,import.meta.url),'utf8');
const html=read('index.html'), src=read('src/app.ts'), css=read('style.css');
test('onda 6: CSP isola conexões, formulários e executáveis externos',()=>{
  for(const directive of ["default-src 'self'","script-src 'self'","connect-src 'none'","object-src 'none'","form-action 'none'"])assert.ok(html.includes(directive),directive);
  assert.doesNotMatch(html,/frame-ancestors/,'meta CSP não deve alegar proteção anti-iframe');
  assert.match(html,/<meta name="referrer" content="no-referrer">/);
});
test('onda 6: nenhum rastreador ou persistência de respostas no app',()=>{
  assert.doesNotMatch(src,/\b(?:fetch|XMLHttpRequest|sendBeacon|indexedDB|localStorage|sessionStorage)\s*(?:\(|\.|\[)/);
  assert.doesNotMatch(src,/https?:\/\/(?:www\.)?(?:google-analytics|googletagmanager|facebook|mixpanel)\b/i);
  assert.match(src,/window\.addEventListener\('pagehide',\(\)=>stopAudio\(\)\)/);
});
test('onda 6: narração prévia é limitada à voz local do aparelho',()=>{
  assert.match(src,/localVoice=voices\.find\(v=>v\.lang\.toLowerCase\(\)==='pt-br'&&v\.localService\)/);
  assert.doesNotMatch(src,/voices\.find\(v=>v\.lang\.toLowerCase\(\)==='pt-br'\)\|\|null/);
  assert.match(src,/Utilize a transcrição/);
});
test('onda 6: hospedagem e limites de privacidade são apresentados',()=>{
  assert.match(src,/hospedagem GitHub Pages pode registrar informações técnicas de acesso/);
  assert.match(src,/Protótipo não homologado para uso clínico/);
  assert.match(src,/CVV atende pelo número 188/);
});
test('onda 6: navegação reduzida, foco e diálogos modais',()=>{
  assert.match(css,/@media\(prefers-reduced-motion:reduce\)/);
  assert.match(css,/\.skip:focus/);
  assert.match(css,/:focus-visible/);
  assert.match(src,/aria-modal="true"/);
  assert.match(src,/state\.paused\?'inert':''/);
});
