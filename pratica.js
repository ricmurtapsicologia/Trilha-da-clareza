import {focusOptions,makeSummary} from './pratica-core.js';
const byId=id=>document.getElementById(id);
const panels=Array.from(document.querySelectorAll('[data-step]'));
const titles=['Escolher','Perceber','Orientar-se','Agir','Revisar'];
const state={focus:null,action:null,step:0};
function message(value) {byId('mensagem').textContent=value;}
function data() {
  return {focus:state.focus,action:state.action,
    observation:byId('observacao').value,interpretation:byId('interpretacao').value,
    customAction:byId('acao-pessoal').value,when:byId('momento').value,
    startLevel:byId('intensidade-inicial').value,endLevel:byId('intensidade-final').value};
}
function summary(detailed=false) {return makeSummary(data(),detailed);}
function updateSummary() {if(state.step===4) byId('resumo').textContent=summary();}
function showStep(n) {
  if(!Number.isInteger(n)||n<0||n>4) return;
  state.step=n;
  panels.forEach(panel=>{panel.hidden=Number(panel.dataset.step)!==n;});
  byId('bar-fill').style.width=String((n+1)*20)+'%';
  byId('step-label').textContent=String(n+1)+' de 5 · '+titles[n];
  byId('action-warning').hidden=true;
  message('');
  if(n===4) updateSummary();
  byId('title-'+String(n)).focus({preventScroll:true});
  window.scrollTo({top:0,behavior:'auto'});
}
function buildActions(focus) {
  const options=byId('action-options');
  options.replaceChildren();
  for(const item of focusOptions[focus].actions) {
    const label=document.createElement('label');
    label.className='radio-option';
    const input=document.createElement('input');
    input.type='radio'; input.name='passo'; input.value=item.id;
    input.checked=state.action===item.id;
    input.addEventListener('change',()=>{state.action=item.id;byId('action-warning').hidden=true;});
    const span=document.createElement('span');
    span.textContent=item.text;
    label.append(input,span);
    options.append(label);
  }
}
for(const button of document.querySelectorAll('[data-focus]')) {
  button.addEventListener('click',()=>{
    const focus=button.dataset.focus;
    if(!Object.hasOwn(focusOptions,focus))return;
    state.focus=focus;
    state.action=null;
    byId('focus-cue').textContent=focusOptions[focus].cue;
    byId('skill-cue').textContent='Habilidade desta prática: '+focusOptions[focus].skill+'.';
    buildActions(focus);
    showStep(1);
  });
}
for(const button of document.querySelectorAll('[data-next]')){
  button.addEventListener('click',()=>{
    const next=Number(button.dataset.next);
    if(next===4&&!state.action){byId('action-warning').hidden=false;byId('action-options').querySelector('input')?.focus();return;}
    showStep(next);
  });
}
for(const button of document.querySelectorAll('[data-back]')){
  button.addEventListener('click',()=>showStep(Math.max(0,state.step-1)));
}
for(const id of ['intensidade-inicial','intensidade-final']){
  const select=byId(id);
  for(let i=0;i<=10;i++){
    const option=document.createElement('option');
    option.value=String(i);
    option.textContent=String(i)+(i===0?' — nenhuma percebida':i===10?' — muito intensa':'');
    select.append(option);
  }
}
byId('intensidade-final').addEventListener('change',updateSummary);
byId('copiar').addEventListener('click',async ()=>{
  const text=summary(false);
  let copied=false;
  if(navigator.clipboard&&navigator.clipboard.writeText){
    try {await navigator.clipboard.writeText(text);copied=true;}catch(_e){}
  }
  if(!copied){
    const field=document.createElement('textarea');
    field.value=text;field.setAttribute('readonly','');
    field.style.position='fixed';field.style.left='-9999px';
    document.body.append(field);field.select();
    try{copied=document.execCommand('copy');}catch(_e){}
    field.remove();
  }
  if(!copied){
    const range=document.createRange();
    range.selectNodeContents(byId('resumo'));
    window.getSelection()?.removeAllRanges();
    window.getSelection()?.addRange(range);
  }
  message(copied?'Síntese sem anotações pessoais copiada.':'Não foi possível copiar automaticamente. Selecione a síntese exibida para copiar.');
});
byId('baixar').addEventListener('click',()=>{
  const contents=summary(true);
  const blob=new Blob([contents],{type:'text/plain;charset=utf-8'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;a.download='trilha-da-clareza-reflexao-pessoal.txt';
  document.body.append(a);a.click();a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),1500);
  message('Arquivo criado somente no seu dispositivo. Você decide se deseja guardá-lo ou compartilhá-lo.');
});
byId('reiniciar').addEventListener('click',()=>{
  state.focus=null;state.action=null;
  for(const textarea of document.querySelectorAll('textarea'))textarea.value='';
  for(const select of document.querySelectorAll('select'))select.value='';
  byId('action-options').replaceChildren();
  byId('resumo').textContent='';
  showStep(0);
  message('A prática foi reiniciada e as informações temporárias foram descartadas.');
});
showStep(0);