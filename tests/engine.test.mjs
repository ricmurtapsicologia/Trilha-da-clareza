import test from 'node:test';
import assert from 'node:assert/strict';
import {validChoice,recordChoice,canAdvance,canVisit,journeyComplete} from '../dist/domain.js';

test('4.1: somente inteiros dentro da faixa são alternativas válidas',()=>{
  for(const n of [0,1,2]) assert.equal(validChoice(n),true);
  for(const n of [-1,3,99,0.5,NaN,Infinity,null,undefined,'1']) assert.equal(validChoice(n),false);
});
test('4.2: escolha válida é imutável e não altera outras respostas',()=>{
  const previous=Object.freeze([null,null,null,null,null,null]);
  const next=recordChoice(previous,2,1);
  assert.deepEqual(next,[null,null,1,null,null,null]);
  assert.deepEqual(previous,[null,null,null,null,null,null]);
});
test('4.3: índices inválidos não alteram nenhuma resposta',()=>{
  const old=[null,null,null,null,null,null];
  for(const [step,answer] of [[-1,0],[6,0],[0,-1],[0,3],[0,NaN],[1,1.2]]){
    assert.equal(recordChoice(old,step,answer),null);
    assert.deepEqual(old,[null,null,null,null,null,null]);
  }
});
test('4.4: progressão exige resposta válida e etapa existente',()=>{
  assert.equal(canAdvance([null,null],0),false);
  assert.equal(canAdvance([0,null],0),true);
  assert.equal(canAdvance([0,99],1),false);
  assert.equal(canAdvance([2,null],2),false);
  assert.equal(canAdvance([2,null],-1),false);
});
test('4.5: retorno ao tabuleiro não desbloqueia o futuro',()=>{
  const answers=[0,1,null,null,null,null];
  assert.equal(canVisit(answers,1,0),true);
  assert.equal(canVisit(answers,1,1),true);
  assert.equal(canVisit(answers,1,2),false);
  assert.equal(canVisit(answers,1,-1),false);
  assert.equal(canVisit(answers,1,3.5),false);
  assert.equal(canVisit(answers,6,2),false);
});
test('4.6: conclusão exige seis respostas reais e válidas',()=>{
  assert.equal(journeyComplete([0,1,2,0,1,2]),true);
  assert.equal(journeyComplete([0,1,2,0,1,null]),false);
  assert.equal(journeyComplete([0,1,2,0,1,3]),false);
  assert.equal(journeyComplete([0,1,2]),false);
  assert.equal(journeyComplete([]),false);
});
test('4.7: revisitar alternativa preserva o restante e permite troca',()=>{
  const initial=[0,1,2,null,null,null];
  const second=recordChoice(initial,0,2);
  assert.deepEqual(second,[2,1,2,null,null,null]);
  assert.deepEqual(initial,[0,1,2,null,null,null]);
});
