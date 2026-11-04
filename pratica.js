import {focusOptions,makeSummary} from './pratica-core.js';
/** Monta a prática dentro da Trilha principal: mesma URL, estado local e descarte ao sair. */
export function mountQuick(host) {
  if(host.shadowRoot) return;
  const shadow=host.attachShadow({mode:'open'});
  const sheet=document.createElement('link');
  sheet.rel='stylesheet';sheet.href='./pratica.css';
  shadow.append(sheet);
  const surface=document.createElement('div');
  surface.className='wrap';
  surface.innerHTML=`<div class="quick-exit"><button type="button" class="secondary" data-reset>Recomeçar e apagar minhas respostas</button></div>
<div class="intro"><p class="eyebrow">Uma prática breve · No seu ritmo</p>
      <h1>Entre perceber e agir, existe espaço para escolher.</h1>
      <p>Observe o que está acontecendo e experimente formular um próximo passo. Você pode interromper a prática a qualquer momento.</p>
    </div>
    <div class="tracker" aria-label="Etapas da prática">
      <div class="tracker-line"><strong id="step-label">1 de 5 · Escolher</strong><span>Sem pontuação ou prazo</span></div>
      <div class="bar" role="progressbar" aria-label="Progresso da prática" aria-valuemin="1" aria-valuemax="5" aria-valuenow="1"><div id="bar-fill"></div></div>
    </div>
    <section class="panel" data-step="0" aria-labelledby="title-0">
      <p class="eyebrow">01 · Escolher</p><h2 id="title-0" tabindex="-1">O que você precisa trabalhar agora?</h2>
      <p class="hint">Escolha uma situação cotidiana para reflexão. Nenhuma opção avalia seu estado de saúde.</p>
      <div class="focus-grid">
        <button class="focus-card" type="button" data-focus="antecipacao"><strong>Antecipando problemas</strong><span>Quando a mente prevê resultados difíceis antes de ter informações.</span><small>Examinar fatos e possibilidades</small></button>
        <button class="focus-card" type="button" data-focus="autocobranca"><strong>Cobrando demais de mim</strong><span>Quando uma tarefa ou erro parece definir todo o seu valor.</span><small>Responder com responsabilidade e proporção</small></button>
        <button class="focus-card" type="button" data-focus="limites"><strong>Conflitos e limites</strong><span>Quando você sente pressão para controlar as escolhas e reações de outras pessoas.</span><small>Reconhecer o que depende de você</small></button>
      </div>
    </section>
    <section class="panel" data-step="1" aria-labelledby="title-1" hidden>
      <p class="eyebrow">02 · Perceber</p><h2 id="title-1" tabindex="-1">O que aconteceu e o que você imaginou?</h2>
      <p id="focus-cue" class="feature-note"></p>
      <label for="observacao">O que você observou de fato? <span class="optional">Opcional</span></label>
      <textarea id="observacao" maxlength="220" rows="2" placeholder="Descreva apenas o que aconteceu, sem precisar se identificar."></textarea>
      <label for="interpretacao">Que conclusão ou previsão surgiu? <span class="optional">Opcional</span></label>
      <textarea id="interpretacao" maxlength="220" rows="2" placeholder="Por exemplo: talvez eu não consiga resolver isso."></textarea>
      <label for="intensidade-inicial">Como percebe sua ansiedade agora? <span class="optional">Opcional; não é escala clínica</span></label>
      <select id="intensidade-inicial"><option value="">Prefiro não responder</option></select>
      <p class="fine">Suas anotações permanecem somente nesta página enquanto estiver aberta. Não são enviadas nem salvas automaticamente.</p>
      <div class="actions"><button class="secondary" type="button" data-back>Voltar</button><button class="primary" type="button" data-next="2">Continuar</button></div>
    </section>
    <section class="panel" data-step="2" aria-labelledby="title-2" hidden>
      <p class="eyebrow">03 · Orientar-se</p><h2 id="title-2" tabindex="-1">Faça uma pausa, se desejar.</h2>
      <p>Você não precisa eliminar a ansiedade nem mudar a respiração para continuar.</p>
      <div class="feature-note"><ol>
        <li>Observe onde está e encontre três elementos do ambiente que chamem sua atenção.</li>
        <li>Se for confortável, perceba o apoio dos pés no chão ou do corpo na cadeira.</li>
        <li>Volte à situação: quais informações são fatos e quais são previsões?</li>
        <li>Se a pausa não for confortável, você pode simplesmente ignorá-la.</li>
      </ol></div>
      <p class="fine">Caso exista ameaça, violência ou risco concreto, priorize proteção e ajuda apropriada. Esta prática não serve para avaliar perigo.</p>
      <div class="actions"><button class="secondary" type="button" data-back>Voltar</button><button class="primary" type="button" data-next="3">Escolher próximo passo</button></div>
    </section>
    <section class="panel" data-step="3" aria-labelledby="title-3" hidden>
      <p class="eyebrow">04 · Agir</p><h2 id="title-3" tabindex="-1">Qual pequeno passo depende de você?</h2>
      <p id="skill-cue" class="hint"></p>
      <fieldset><legend>Selecione uma possibilidade para experimentar</legend><div id="action-options" class="radio-list"></div></fieldset>
      <label for="acao-pessoal">Como gostaria de adaptar esse passo? <span class="optional">Opcional</span></label>
      <textarea id="acao-pessoal" maxlength="220" rows="2" placeholder="Uma ação pequena, segura e concreta."></textarea>
      <label for="momento">Quando poderia experimentá-la? <span class="optional">Opcional</span></label>
      <select id="momento"><option value="">Ainda não decidi</option><option value="Hoje, se for apropriado">Hoje, se for apropriado</option><option value="Nos próximos dias">Nos próximos dias</option><option value="Quando houver condições seguras">Quando houver condições seguras</option><option value="Na próxima sessão">Na próxima sessão</option></select>
      <p id="action-warning" class="warning" role="alert" hidden>Escolha uma das possibilidades acima ou volte para encerrar.</p>
      <div class="actions"><button class="secondary" type="button" data-back>Voltar</button><button class="primary" type="button" data-next="4">Ver minha síntese</button></div>
    </section>
    <section class="panel" data-step="4" aria-labelledby="title-4" hidden>
      <p class="eyebrow">05 · Revisar</p><h2 id="title-4" tabindex="-1">Seu próximo passo possível</h2>
      <p>Você não precisa se sentir diferente para que uma reflexão tenha utilidade. Observe o que faz sentido levar ao cotidiano.</p>
      <label for="intensidade-final">Como percebe sua ansiedade neste momento? <span class="optional">Opcional; não é medida de eficácia</span></label>
      <select id="intensidade-final"><option value="">Prefiro não responder</option></select>
      <div class="summary"><h3>Síntese para levar com você</h3><pre id="resumo" aria-live="polite"></pre></div>
      <div class="actions"><button class="primary" id="copiar" type="button">Copiar síntese sem anotações pessoais</button><button class="secondary" id="baixar" type="button">Baixar reflexão detalhada (.txt)</button></div>
      <p class="fine">A cópia não inclui os campos livres nem a intensidade percebida. O download detalhado inclui suas anotações, apenas se você decidir gerá-lo. Nenhum dado é transmitido à clínica.</p>
      <div class="actions"><button class="secondary" type="button" data-back>Revisar meu plano</button><button class="subtle" id="reiniciar" type="button">Recomeçar e descartar tudo</button></div>
    </section>
    <p id="mensagem" class="status" role="status" aria-live="polite"></p>
    <aside class="safety"><strong>Limites e apoio</strong><p>Protótipo psicoeducativo ainda não homologado para uso assistencial. Não oferece diagnóstico, psicoterapia ou avaliação de risco. Se o conteúdo causar desconforto, encerre a atividade. Em risco imediato, procure os serviços de emergência locais; no Brasil, SAMU 192 e Corpo de Bombeiros 193. Apoio emocional: <a href="tel:188">CVV 188</a>.</p></aside>`;
  shadow.append(surface);
const byId=id=>shadow.getElementById(id);
const panels=Array.from(shadow.querySelectorAll('[data-step]'));
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
  shadow.querySelector('.bar').setAttribute('aria-valuenow',String(n+1));
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
for(const button of shadow.querySelectorAll('[data-focus]')) {
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
for(const button of shadow.querySelectorAll('[data-next]')){
  button.addEventListener('click',()=>{
    const next=Number(button.dataset.next);
    if(next===4&&!state.action){byId('action-warning').hidden=false;byId('action-options').querySelector('input')?.focus();return;}
    showStep(next);
  });
}
for(const button of shadow.querySelectorAll('[data-back]')){
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
for(const button of shadow.querySelectorAll('#reiniciar,[data-reset]')) button.addEventListener('click',()=>{
  state.focus=null;state.action=null;
  for(const textarea of shadow.querySelectorAll('textarea'))textarea.value='';
  for(const select of shadow.querySelectorAll('select'))select.value='';
  byId('action-options').replaceChildren();
  byId('resumo').textContent='';
  showStep(0);
  message('A prática foi reiniciada e as informações temporárias foram descartadas.');
});
showStep(0);
}
