import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {audios} from '../dist/content.js';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('Áudio Android: 12 roteiros textuais, nenhum MP3 neural integrado',()=>{
 assert.equal(audios.length,12);
 assert.equal(new Set(audios.map(a=>a.id)).size,12);
 assert.ok(audios.every(a=>a.text.trim().length>40));
 const html=read('index.html'),app=read('src/app.ts');
 assert.doesNotMatch(html,/<audio\b|\.mp3|<source\b/);
 assert.doesNotMatch(app,/new Audio\(|\.mp3|<audio\b/);
 assert.match(app,/new SpeechSynthesisUtterance\(a\.text\)/);
});
test('Áudio Android: fallback pt-BR do navegador sem esperar localService',()=>{
 const s=read('src/app.ts');
 assert.match(s,/localVoice=voices\.find\(v=>v\.lang\.toLowerCase\(\)==='pt-br'&&v\.localService\)\|\|voices\.find\(v=>v\.lang\.toLowerCase\(\)==='pt-br'\)/);
 assert.match(s,/if\(localVoice\)sound\.voice=localVoice/);
 assert.match(s,/window\.speechSynthesis\.speak\(sound\)/);
 assert.match(s,/const note=document\.querySelector<HTMLElement>\('\[data-audio-feedback\]'\)/);
 assert.match(s,/Google/);
 assert.match(s,/suas respostas não são narradas/);
});
