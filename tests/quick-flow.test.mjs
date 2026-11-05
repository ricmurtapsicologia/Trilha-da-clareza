import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {focusOptions,cleanNote,safeLevel,makeSummary} from '../pratica-core.js';
const example={
  focus:'antecipacao',action:'verificar',
  observation:'ANOTACAO_PRIVADA_123',interpretation:'PREVISAO_PRIVADA_987',
  customAction:'PASSO_PRIVADO_567',when:'Nos próximos dias',
  startLevel:'7',endLevel:'4'
};
test('três focos e três ações específicas em cada',()=>{
  assert.equal(Object.keys(focusOptions).length,3);
  for(const option of Object.values(focusOptions)){
    assert.ok(option.cue.length>90);
    assert.ok(option.skill.length>20);
    assert.equal(option.actions.length,3);
    assert.equal(new Set(option.actions.map(x=>x.id)).size,3);
  }
});
test('síntese neutra omite anotações e níveis de percepção',()=>{
  const output=makeSummary(example);
  assert.match(output,/Antecipação e incerteza/);
  assert.match(output,/Verificar uma informação/);
  assert.doesNotMatch(output,/ANOTACAO_PRIVADA|PREVISAO_PRIVADA|PASSO_PRIVADO|nível|7|4/);
});
test('exportação detalhada exige ação do usuário e inclui conteúdo escolhido',()=>{
  const output=makeSummary(example,true);
  assert.match(output,/ANOTACAO_PRIVADA_123/);
  assert.match(output,/PREVISAO_PRIVADA_987/);
  assert.match(output,/PASSO_PRIVADO_567/);
  assert.match(output,/7/);
  assert.match(output,/4/);
  assert.match(output,/não constituem medida clínica de eficácia/);
});
test('nenhuma entrada inválida gera plano',()=>{
  assert.throws(()=>makeSummary({...example,focus:'invalido'}),/Foco/);
  assert.throws(()=>makeSummary({...example,action:'invalida'}),/Próximo passo/);
});
test('campos pessoais limitados e sem controles',()=>{
  assert.equal(cleanNote('   a\u0000b\nc  '),'ab\nc');
  assert.equal(cleanNote('X'.repeat(300)).length,220);
  assert.equal(safeLevel('10'),'10');
  assert.equal(safeLevel('0'),'0');
  for(const invalid of ['11','-1','3.5','Infinity','texto',''])assert.equal(safeLevel(invalid),'');
});
test('arquivos novos não implementam armazenamento persistente nem rede',()=>{
  const source=readFileSync(new URL('../pratica.js',import.meta.url),'utf8');
  const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
  assert.doesNotMatch(source,/\blocalStorage\b|\bsessionStorage\b|\bindexedDB\b|\bfetch\s*\(|XMLHttpRequest|sendBeacon/);
  assert.match(html,/connect-src 'none'/);
  assert.doesNotMatch(html,/<form[\s>]/i);
  const app=readFileSync(new URL('../src/app.ts',import.meta.url),'utf8');
  assert.match(app,/não homologado para uso assistencial/i);
});
test('entrada nova integrada sem alterar a jornada de 18 desafios',()=>{
  const source=readFileSync(new URL('../dist/app.js',import.meta.url),'utf8');
  const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
  assert.match(source,/data-action="quick"/);
  assert.doesNotMatch(source,/href="\.\/pratica\.html"/);
  const quick=readFileSync(new URL('../pratica.js',import.meta.url),'utf8');
  assert.match(quick,/export function mountQuick\(host\)/);
  assert.doesNotMatch(quick,/attachShadow/);
  assert.match(quick,/className='quick-ui'/);
  assert.match(html,/href="\.\/pratica\.css"/);
  assert.ok(!existsSync(new URL('../pratica.html',import.meta.url)),'Página duplicada não deve existir');
  assert.match(html,/dist\/app\.js/);
});