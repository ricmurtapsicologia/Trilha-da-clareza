/* Leitura semanal em página única. Textos gerais; não contém relatos ou dados clínicos. */
const pages=[
{
  label:"01 · Compreender",
  title:"A diferença entre saber e conseguir fazer",
  paragraphs:[
    "Uma pessoa pode compreender com precisão por que determinada atitude seria útil e, ainda assim, encontrar grande dificuldade para executá-la. Isso parece contraditório apenas quando confundimos conhecimento com capacidade de ação. Saber o que fazer depende de compreender a tarefa; começar exige também recursos de atenção, organização, energia, tolerância à incerteza e condições ambientais. Essas capacidades variam ao longo do tempo e podem ser afetadas por estresse, cansaço e sofrimento emocional.",
    "Imagine um profissional que pretende resolver uma pendência simples. Ele conhece o procedimento, tem as ferramentas e dispõe de alguns minutos. Entretanto, antes de começar, antecipa que a atividade poderá se estender, interromper outras responsabilidades ou revelar um novo problema. A tarefa deixa de ser apenas uma tarefa. Ela passa a representar a possibilidade de perder o controle do restante do dia. Nesse momento, adiar oferece uma espécie de alívio imediato.",
    "Esse alívio tem um custo potencial. A pendência permanece, a pessoa passa a pensar nela com mais frequência e o próximo encontro com a tarefa pode produzir ainda mais apreensão. Na terapia cognitivo-comportamental, essa sequência pode ser compreendida como um ciclo de evitação mantido por consequências de curto prazo: evitar reduz momentaneamente o desconforto, enquanto a dificuldade de iniciar continua sem ser testada. Isso não significa falta de interesse, fraqueza ou preguiça.",
    "O primeiro passo útil não costuma ser cobrar mais motivação. É tornar a ação observável e proporcional aos recursos disponíveis. Em vez de dizer 'preciso resolver tudo', pode ser mais viável definir 'vou abrir o documento, identificar o primeiro requisito e anotar a próxima ação'. O objetivo inicial é recuperar a capacidade de começar, não produzir desempenho perfeito."
  ],
  quote:"Conhecer o caminho e conseguir dar o primeiro passo são habilidades relacionadas, mas diferentes."
},
{
  label:"02 · Analisar",
  title:"Quando o planejamento se transforma em uma exigência rígida",
  paragraphs:[
    "Planejar é uma estratégia importante para administrar demandas. O problema surge quando o planejamento deixa de funcionar como orientação e passa a ser tratado como uma regra que não pode ser ajustada. Uma interrupção pequena começa a parecer ameaçadora porque é interpretada como o início de uma sequência de falhas. A previsão de que 'se eu mudar uma coisa, perderei o controle de todo o resto' pode aumentar a ansiedade e tornar qualquer ajuste mais difícil.",
    "Há duas perguntas diferentes nesse cenário. A primeira é factual: quanto tempo esta atividade realmente exige e quais compromissos precisam ser preservados? A segunda é interpretativa: o que estou supondo que aconteceria se eu dedicasse alguns minutos a outra prioridade? Perguntas factuais pedem informações e estimativas; perguntas interpretativas exigem examinar previsões, não apenas obedecer a elas.",
    "Considere a distinção entre risco concreto e possibilidade hipotética. Em certas situações, interromper uma obrigação de fato produziria prejuízos; nesse caso, respeitar o compromisso é uma decisão adequada. Em outras, existe apenas a previsão de que uma pausa de dez minutos comprometerá toda a produtividade. Essas duas situações não deveriam receber a mesma resposta. Antes de agir, vale avaliar o contexto, a segurança, as responsabilidades reais e os recursos disponíveis.",
    "Flexibilidade não significa abandonar compromissos. Significa ajustar métodos sem perder de vista o objetivo. Uma agenda pode incluir margens de reorganização, e um projeto complexo pode começar com uma etapa mínima. Ao testar ações pequenas, a pessoa reúne informações concretas sobre a própria capacidade de adaptação. Quando a previsão não se confirma, surge a oportunidade de atualizar uma regra rígida. Quando uma dificuldade real aparece, o plano pode ser ajustado sem transformar o resultado em julgamento pessoal."
  ],
  quote:"Um plano útil orienta decisões; ele não precisa se tornar uma prova de valor pessoal."
},
{
  label:"03 · Aplicar",
  title:"Um experimento pequeno, possível e verificável",
  paragraphs:[
    "A passagem da reflexão para a prática pode ser facilitada por um experimento comportamental simples. Em vez de formular um objetivo amplo — por exemplo, 'ser mais organizado' —, escolhe-se uma ação visível, executável em tempo delimitado e compatível com a situação atual. A proposta não é provar que a ansiedade está errada nem garantir um resultado agradável. Trata-se de recolher informações reais sobre o que aconteceu quando uma atitude foi tentada.",
    "Um experimento bem delimitado tem quatro elementos: uma situação apropriada, uma ação específica, uma duração pequena e um critério modesto de conclusão. 'Organizar minha vida' é amplo demais. 'Durante dez minutos, escolher uma pendência, anotar seus dois primeiros passos e executar apenas o primeiro' permite saber se a atividade foi tentada. O tempo é um teto, não uma obrigação de ocupar todos os minutos.",
    "Também é necessário prever a possibilidade de não conseguir realizar a atividade. Nesse caso, a revisão não precisa assumir a forma de uma cobrança. Pergunte: o passo estava maior do que parecia? A ocasião escolhida era inviável? Havia um risco concreto ou uma interrupção importante? O exercício deveria ser dividido novamente? Essa análise produz informações para um novo planejamento e evita transformar uma tentativa em mais uma fonte de autocrítica.",
    "Se a tarefa envolver contatos interpessoais, mensagens ou conflitos, não é necessário responder imediatamente nem se expor a uma situação insegura. Uma etapa inicial pode ser somente avaliar a demanda e definir qual resposta seria apropriada. Em qualquer atividade, o contexto clínico e a segurança prevalecem sobre a execução do exercício.",
    "Para esta semana, escolha somente um passo. Não é necessário completar vários desafios, manter sequências diárias ou demonstrar evolução para a ferramenta. Após experimentá-lo, observe o que facilitou, o que dificultou e qual ajuste faria numa próxima oportunidade. Essa pequena ponte entre compreensão e comportamento é o produto concreto da leitura."
  ],
  quote:"Uma ação pequena e observável pode ensinar mais que um plano perfeito que nunca começa."
}
];
const actions=[
{id:"inicio",label:"Iniciar uma pendência",description:"Escolher uma tarefa e executar apenas seu primeiro passo, por até dez minutos.",text:"Escolher uma pendência e executar somente o primeiro passo, por até dez minutos."},
{id:"organizacao",label:"Organizar antes de agir",description:"Anotar até três etapas de uma tarefa e concluir somente a etapa inicial.",text:"Dividir uma tarefa em até três passos e concluir apenas o primeiro."},
{id:"comunicacao",label:"Examinar uma comunicação",description:"Ler uma mensagem ou solicitação não urgente, identificar o pedido e decidir um próximo passo, sem exigência de responder no momento.",text:"Ler uma comunicação não urgente, identificar a demanda e decidir o próximo passo sem obrigação de responder imediatamente."}
];
const moments=[
{value:"",label:"Escolher depois"},
{value:"Em um momento tranquilo nesta semana",label:"Em um momento tranquilo nesta semana"},
{value:"Em um intervalo previamente reservado",label:"Em um intervalo previamente reservado"},
{value:"Quando houver condições adequadas e seguras",label:"Quando houver condições adequadas e seguras"}
];
const escapeHtml=s=>String(s).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;");
export function readingSummary(actionId,when=""){
 const action=actions.find(a=>a.id===actionId);
 if(!action)throw new Error("É preciso escolher uma ação.");
 const moment=moments.find(m=>m.value===when)?.value||"Em momento a definir";
 return ["TRILHA DA CLAREZA — ATIVIDADE DA SEMANA",
  "Leitura: Da intenção à ação — por que começar pode ser difícil",
  "Ideia central: compreender uma dificuldade e iniciar uma ação são processos diferentes.",
  "Minha única experiência desta semana: "+action.text,
  "Quando: "+moment,
  "Na revisão: consegui tentar? O que facilitou ou dificultou? Que ajuste faria?",
  "Recurso psicoeducativo, não é diagnóstico ou avaliação clínica.",
  "Preparado localmente, sem envio automático."].join("\n");
}
export function mountWeekly(host){
 if(host.dataset.weeklyMounted==="1")return;
 host.dataset.weeklyMounted="1";
 let step=0,selected="",when="",understanding="";
 const container=document.createElement("section");
 container.className="weekly-reader";
 host.append(container);
 const render=()=>{
  let inner="";
  if(step<3){
   const p=pages[step];
   inner='<div class="weekly-progress"><span>Leitura da semana</span><strong>Página '+(step+1)+' de 3</strong></div>'+
   '<div class="weekly-progress-track" role="progressbar" aria-label="Progresso da leitura" aria-valuenow="'+(step+1)+'" aria-valuemin="1" aria-valuemax="3"><span style="width:'+((step+1)/3*100)+'%"></span></div>'+
   '<article class="weekly-page"><p class="weekly-kicker">'+p.label+'</p><h1 id="weekly-heading" tabindex="-1">'+p.title+'</h1>'+
   p.paragraphs.map(t=>'<p>'+escapeHtml(t)+'</p>').join("")+
   '<blockquote>'+p.quote+'</blockquote></article>'+
   '<div class="weekly-actions">'+(step>0?'<button type="button" data-weekly-back class="btn secondary">← Voltar</button>':'')+
   '<button type="button" data-weekly-next class="btn primary">'+(step===2?"Interpretar o texto →":"Próxima página →")+'</button></div>';
  }else if(step===3){
   inner='<div class="weekly-progress">Aplicação · interpretação do texto</div><div class="weekly-page"><p class="weekly-kicker">04 · Interpretar</p><h1 id="weekly-heading" tabindex="-1">Qual conclusão é sustentada pela leitura?</h1>'+
    '<p>A ideia central não é eliminar toda a ansiedade antes de agir, mas tornar a ação suficientemente pequena para ser avaliada em condições apropriadas.</p>'+
    '<fieldset class="weekly-quiz"><legend>Selecione a interpretação mais consistente com o texto:</legend>'+
    '<label><input type="radio" name="weekly-understanding" value="a" '+(understanding==="a"?"checked":"")+'><span>Uma tarefa só deve começar quando a pessoa se sentir completamente segura e motivada.</span></label>'+
    '<label><input type="radio" name="weekly-understanding" value="b" '+(understanding==="b"?"checked":"")+'><span>Dividir uma tarefa em etapas pequenas permite experimentar uma ação e revisar as condições reais de execução.</span></label>'+
    '<label><input type="radio" name="weekly-understanding" value="c" '+(understanding==="c"?"checked":"")+'><span>O melhor caminho é executar várias tarefas no mesmo dia para superar rapidamente o desconforto.</span></label>'+
    '</fieldset><div class="weekly-feedback" role="status" aria-live="polite">'+(understanding?understanding==="b"?'Esta interpretação acompanha o argumento: uma ação concreta e delimitada permite aprender com a experiência.':'Releia a diferença entre ação proporcional e exigência de desempenho. O texto não recomenda esperar motivação plena nem acumular tarefas.':'Selecione uma alternativa para receber a devolutiva.')+'</div></div>'+
    '<div class="weekly-actions"><button type="button" data-weekly-back class="btn secondary">← Voltar à leitura</button><button type="button" data-weekly-next class="btn primary" '+(!understanding?'disabled':'')+'>Escolher uma ação →</button></div>';
  }else if(step===4){
   inner='<div class="weekly-progress">Aplicação · uma única atividade da semana</div><div class="weekly-page"><p class="weekly-kicker">05 · Experimentar</p><h1 id="weekly-heading" tabindex="-1">Escolha somente uma atitude.</h1>'+
   '<p>Uma atividade pequena e verificável basta. Escolha a opção mais compatível com suas condições atuais. Não é uma obrigação diária.</p>'+
   '<fieldset class="weekly-picks"><legend>Qual experimento faz sentido?</legend>'+
   actions.map(a=>'<label class="weekly-pick"><input type="radio" name="weekly-action" value="'+a.id+'" '+(selected===a.id?"checked":"")+'><span><strong>'+a.label+'</strong><small>'+a.description+'</small></span></label>').join("")+
   '</fieldset><label for="weekly-when" class="weekly-field-label">Quando pretende tentar? <small>Opcional</small></label>'+
   '<select id="weekly-when">'+moments.map(m=>'<option value="'+escapeHtml(m.value)+'" '+(when===m.value?"selected":"")+'>'+m.label+'</option>').join("")+'</select>'+
   '<p class="weekly-caution">Se houver ameaça, coerção ou risco concreto, não execute atividades de contato; priorize sua segurança e a orientação profissional.</p></div>'+
   '<div class="weekly-actions"><button type="button" data-weekly-back class="btn secondary">← Voltar</button><button type="button" data-weekly-next class="btn primary" '+(!selected?'disabled':'')+'>Preparar minha síntese →</button></div>';
  }else{
   inner='<div class="weekly-progress">Síntese · encerramento</div><div class="weekly-page"><p class="weekly-kicker">CONCLUSÃO DA ATIVIDADE</p><h1 id="weekly-heading" tabindex="-1">Um passo para esta semana.</h1>'+
   '<p>Este é um plano possível, não uma cobrança. Você pode adaptá-lo à realidade do dia.</p><pre class="weekly-summary" id="weekly-summary"></pre>'+
   '<p class="weekly-reflection">Depois de tentar, considere três perguntas: <strong>o que consegui fazer?</strong> O que tornou mais difícil? O que ajustaria da próxima vez?</p>'+
   '<div class="weekly-actions"><button type="button" data-weekly-copy class="btn primary">Copiar síntese</button><button type="button" data-weekly-download class="btn secondary">Baixar em .txt</button><button type="button" data-weekly-back class="btn secondary">← Rever ação</button></div>'+
   '<p class="weekly-status" role="status" aria-live="polite" id="weekly-status"></p></div>';
  }
  container.innerHTML='<div class="weekly-banner"><span>UMA LEITURA. UMA DECISÃO. UMA AÇÃO NA SEMANA.</span><button type="button" data-weekly-restart>Recomeçar e limpar</button></div>'+inner+
   '<aside class="weekly-limit">Material psicoeducativo. Não substitui psicoterapia, avaliação clínica ou atendimento de urgência. Nenhuma resposta é enviada automaticamente ou armazenada no servidor.</aside>';
  if(step===5)container.querySelector("#weekly-summary").textContent=readingSummary(selected,when);
  container.querySelector("#weekly-heading")?.focus({preventScroll:true});
 };
 container.addEventListener("click",async e=>{
  const b=e.target.closest("button");
  if(!b||!container.contains(b))return;
  if(b.hasAttribute("data-weekly-back"))step=Math.max(0,step-1);
  else if(b.hasAttribute("data-weekly-next")){
    if(step===3&&!understanding)return;
    if(step===4&&!selected)return;
    step=Math.min(5,step+1);
  }else if(b.hasAttribute("data-weekly-restart")){step=0;selected="";when="";understanding="";}
  else if(b.hasAttribute("data-weekly-copy")){
    try{await navigator.clipboard.writeText(readingSummary(selected,when));container.querySelector("#weekly-status").textContent="Síntese copiada para a área de transferência.";}
    catch{container.querySelector("#weekly-status").textContent="Cópia automática indisponível. Selecione o texto da síntese para copiar.";}
    return;
  }else if(b.hasAttribute("data-weekly-download")){
    const blob=new Blob([readingSummary(selected,when)],{type:"text/plain;charset=utf-8"});
    const url=URL.createObjectURL(blob);const anchor=document.createElement("a");anchor.href=url;anchor.download="trilha-da-clareza-atividade-da-semana.txt";document.body.append(anchor);anchor.click();anchor.remove();
    setTimeout(()=>URL.revokeObjectURL(url),1500);container.querySelector("#weekly-status").textContent="Arquivo criado no seu dispositivo.";return;
  }else return;
  render();
  window.scrollTo({top:0,behavior:"auto"});
 });
 container.addEventListener("change",e=>{
  const input=e.target;
  if(input.name==="weekly-understanding"){understanding=input.value;render();}
  else if(input.name==="weekly-action"){selected=input.value;render();}
  else if(input.id==="weekly-when"){when=input.value;}
 });
 render();
}