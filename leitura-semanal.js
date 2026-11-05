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

/* Biblioteca psicoeducativa. Todos os exemplos são fictícios e sem identificação. */
const catalog=[
 {id:"comecar",number:1,title:"Da intenção à ação",subtitle:"Entender por que saber não é o mesmo que conseguir começar",pages},
 {id:"incerteza",number:2,title:"Preocupação útil ou antecipação?",subtitle:"Distinguir informação, hipótese e problema solucionável",pages:[
  {label:"01 · Reconhecer",title:"O que a preocupação tenta resolver?",paragraphs:[
   "Preocupar-se faz parte da vida. Antecipar dificuldades pode ajudar a preparar um compromisso, avaliar riscos e buscar informações relevantes. A dificuldade aparece quando a mente trata cada possibilidade desfavorável como uma tarefa urgente. Nesse caso, a preocupação não produz necessariamente uma decisão melhor; ela pode apenas ocupar tempo e atenção.",
   "Considere duas situações. Na primeira, uma conta tem vencimento confirmado nesta semana e é preciso organizar o pagamento. Na segunda, uma pessoa imagina que talvez receba uma cobrança inesperada, embora não exista sinal concreto disso. A primeira pede uma ação verificável. A segunda talvez peça apenas reconhecer a hipótese e aguardar novas informações.",
   "Em ambos os casos, a emoção pode ser intensa. A intensidade do desconforto, porém, não é prova de que um acontecimento seja provável. O objetivo não é negar riscos reais, mas perguntar: quais informações tenho, quais estou supondo e o que efetivamente pode ser feito com segurança agora?"
  ],quote:"Uma preocupação é mais útil quando ajuda a identificar uma decisão possível."},
  {label:"02 · Diferenciar",title:"Fatos, hipóteses e problemas reais",paragraphs:[
   "A interpretação de uma situação pode ser tão influente quanto a situação em si. Se uma mensagem não foi respondida, é fato que ainda não houve resposta. Já concluir que a outra pessoa está irritada é uma hipótese. A distinção é importante porque hipóteses podem ser examinadas sem serem imediatamente transformadas em certezas.",
   "Quando existe um problema concreto, a solução de problemas começa pela descrição específica, pelas opções disponíveis e pela avaliação das consequências. Quando existe apenas uma previsão, pode ser mais apropriado tolerar temporariamente a incerteza, observar novas evidências ou direcionar a atenção para uma tarefa presente.",
   "Em situações de ameaça, coerção, violência ou perigo real, não se deve tratar o risco como simples distorção de pensamento. A proteção e o acesso ao apoio adequado prevalecem sobre qualquer exercício de reflexão."
  ],quote:"Fato exige resposta proporcional; hipótese exige exame cuidadoso."},
  {label:"03 · Experimentar",title:"Uma pergunta antes de uma conclusão",paragraphs:[
   "Escolha uma situação cotidiana de baixa intensidade emocional. Se perceber uma previsão desfavorável, descreva mentalmente o que aconteceu e o que ainda não sabe. Em seguida, pergunte qual informação realmente faria diferença para decidir. Nem toda incerteza precisa ser resolvida de imediato.",
   "Uma experiência pequena pode ser aguardar um momento apropriado antes de tirar uma conclusão, consultar uma informação objetiva uma única vez ou escolher uma atividade sob seu controle. Evite transformar a verificação em uma sequência repetitiva de garantias.",
   "Ao revisar a tentativa, observe se a distinção entre fatos e hipóteses alterou a maneira de responder. Não é necessário que a ansiedade desapareça. O resultado é uma oportunidade de aprender como você tomou a decisão."
  ],quote:"O experimento procura informações sobre seu comportamento, não garantias absolutas."}
 ]},
 {id:"autocobranca",number:3,title:"Autocobrança e flexibilidade",subtitle:"Responsabilidade sem transformar tudo em prova de desempenho",pages:[
  {label:"01 · Identificar",title:"Quando a exigência deixa de ajudar",paragraphs:[
   "Padrões elevados podem sustentar um trabalho cuidadoso. Entretanto, a exigência pode perder sua utilidade quando cada tarefa se transforma numa avaliação global da pessoa. Um atraso pontual passa a significar incapacidade; uma interrupção habitual parece comprometer todo o planejamento.",
   "Em situações assim, a autocrítica pode aumentar a vigilância sobre possíveis erros e dificultar o começo. O esforço para evitar uma execução imperfeita, paradoxalmente, pode levar ao adiamento. Identificar o ciclo permite separar o valor de uma pessoa do resultado de uma tarefa.",
   "Isso não significa ignorar responsabilidades. Uma avaliação proporcional considera o que aconteceu, quais recursos estavam disponíveis e o que seria uma correção realista."
  ],quote:"Responsabilidade orienta uma correção; julgamento global aumenta o peso da tarefa."},
  {label:"02 · Reformular",title:"O que seria suficientemente adequado?",paragraphs:[
   "A pergunta 'qual seria a forma perfeita de fazer?' costuma ampliar o escopo de uma tarefa. Outra pergunta pode ser mais útil: 'qual é a menor versão adequada e segura que atende ao objetivo?'. A resposta depende do contexto. Uma obrigação profissional crítica exige critérios diferentes de uma atividade doméstica simples.",
   "Considere uma tarefa de rotina que pode ser dividida em três partes. Antes de começar, decida qual parte é prioritária e como reconhecer sua conclusão. Um limite temporal curto evita que o planejamento ocupe toda a energia reservada à execução.",
   "Se perceber uma regra absoluta — 'sempre faço tudo errado' — procure descrevê-la em termos específicos e verificáveis. Uma observação como 'não concluí esta etapa hoje' é mais útil para planejar uma correção."
  ],quote:"O objetivo é adequação ao contexto, não perfeição indiscriminada."},
  {label:"03 · Praticar",title:"Planejar sem transformar o plano em cobrança",paragraphs:[
   "Para uma obrigação não urgente, escolha um resultado pequeno, possível e observável. Defina uma ocasião viável e qual será o primeiro movimento. Uma etapa de poucos minutos pode ser suficiente para testar o início de uma atividade.",
   "Antes de agir, considere qual obstáculo poderia aparecer: cansaço, interrupção ou tarefa mais complexa que o esperado. Prepare uma alternativa proporcional. Se o contexto mudar, reduzir ou adiar o passo de forma consciente pode ser mais útil do que forçar uma execução inadequada.",
   "Depois, compare o plano com o que foi possível realizar. Registre mentalmente o que aprendeu sobre a tarefa e suas condições, não apenas se atingiu ou não a meta."
  ],quote:"A capacidade de ajustar um plano é parte da competência de planejar."}
 ]},
 {id:"limites",number:4,title:"Limites e decisões conscientes",subtitle:"Reconhecer o que cabe a você em interações cotidianas",pages:[
  {label:"01 · Identificar",title:"A diferença entre pedido e obrigação",paragraphs:[
   "Receber uma solicitação não significa que ela precisa ser aceita imediatamente. Antes de responder, é possível identificar o pedido, sua urgência real, o tempo disponível e as próprias responsabilidades. Essa pausa organiza a decisão sem transformar a relação numa disputa.",
   "Algumas solicitações representam deveres assumidos ou necessidades importantes de outras pessoas; outras podem ser negociadas. O contexto e a segurança importam. Um limite adequado não é uma recusa automática, mas uma resposta consciente, específica e proporcional.",
   "Em interações tensas, a antecipação da reação alheia pode tornar a resposta mais difícil. Nem sempre é possível controlar como o outro reagirá. É possível, contudo, avaliar qual comunicação ou busca de apoio seria apropriada."
  ],quote:"Um pedido merece avaliação; não precisa receber uma resposta impulsiva."},
  {label:"02 · Planejar",title:"Uma comunicação mais específica",paragraphs:[
   "Expressões vagas podem prolongar a tensão. Em vez de 'você nunca respeita meus horários', uma formulação observável ajuda a organizar a conversa: 'Recebi o pedido durante um compromisso. Preciso verificar quando consigo responder'. A frase descreve uma condição e estabelece uma próxima ação.",
   "Uma comunicação assertiva costuma combinar clareza, respeito e limites proporcionais. Isso não significa garantir concordância nem insistir até convencer alguém. É legítimo adiar uma resposta quando é preciso reunir informações ou quando não existem condições adequadas para conversar.",
   "Se houver intimidação, coerção ou risco concreto, não se recomenda ensaiar uma confrontação. A prioridade deve ser proteção e apoio profissional ou institucional apropriado."
  ],quote:"A clareza está no que você pode comunicar, não no controle da resposta alheia."},
  {label:"03 · Aplicar",title:"Comece pela análise do pedido",paragraphs:[
   "Escolha uma comunicação cotidiana, não urgente e segura. Antes de responder, identifique o pedido concreto e anote mentalmente uma opção: aceitar, negociar, solicitar tempo ou recusar de maneira respeitosa. O exercício pode terminar nessa análise, sem envio de mensagem.",
   "Caso a situação seja complexa, seu primeiro passo pode ser buscar esclarecimento em momento apropriado. Um limite não precisa ser anunciado imediatamente para ser reconhecido. O importante é distinguir escolha consciente de reação automática.",
   "Na revisão, observe se houve maior clareza sobre o pedido e sobre aquilo que dependia de você. Não avalie o exercício pela concordância de outras pessoas."
  ],quote:"A primeira habilidade pode ser escolher quando e como responder."}
 ]}
];
const choices=[
 {id:"inicio",label:"Iniciar uma pendência simples",text:"Escolher uma pendência e experimentar apenas o primeiro passo, por até cinco minutos.",hint:"Abrir o material necessário, identificar a primeira ação e começar."},
 {id:"organizacao",label:"Dividir uma tarefa",text:"Anotar até três passos de uma tarefa e experimentar somente o primeiro.",hint:"Uma lista curta, sem obrigação de concluir o restante."},
 {id:"comunicacao",label:"Analisar uma solicitação não urgente",text:"Identificar o pedido e escolher uma resposta possível sem obrigação de enviá-la.",hint:"Não usar em contexto de ameaça, coerção ou insegurança."}
];
const cues=[
 {id:"inicio_turno",text:"Ao iniciar um período disponível"},
 {id:"agenda",text:"Depois de consultar minha agenda"},
 {id:"pausa",text:"Depois de uma pausa ou descanso"},
 {id:"seguro",text:"Quando houver condições adequadas e seguras"}
];
const barriers=[
 {id:"tempo",label:"O tempo pode ficar curto",response:"Se não houver tempo, farei apenas a preparação inicial de um minuto ou remanejarei conscientemente a ocasião."},
 {id:"energia",label:"Posso estar cansado",response:"Se estiver cansado, reduzirei o passo ao mínimo viável ou priorizarei descanso, sem transformar isso em falha."},
 {id:"amplitude",label:"A tarefa pode parecer grande",response:"Se o passo parecer grande, anotarei somente a primeira ação observável."},
 {id:"interrupcao",label:"Posso ser interrompido",response:"Se surgir uma interrupção, registrarei mentalmente onde parei e decidirei se será apropriado retomar."},
 {id:"seguranca",label:"O contexto pode não ser seguro",response:"Se houver risco, ameaça ou coerção, não executarei o exercício; priorizarei proteção e apoio adequado."}
];
const moments=[
 {id:"definir",text:"Ainda vou definir a ocasião"},
 {id:"intervalo",text:"Num intervalo previamente reservado"},
 {id:"rotina",text:"Num momento previsível da rotina"},
 {id:"condicoes",text:"Quando houver condições seguras e adequadas"}
];
const interpretations=[
 {id:"a",text:"Só devo começar quando estiver completamente motivado.",feedback:"Essa hipótese torna a motivação uma condição obrigatória; a leitura propõe testar uma ação pequena mesmo sem motivação plena, quando for viável."},
 {id:"b",text:"Uma pequena ação pode revelar condições reais e orientar ajustes.",feedback:"Esta interpretação acompanha a proposta: testar um passo específico e aprender com o que aconteceu."},
 {id:"c",text:"Para progredir, preciso executar várias tarefas no mesmo dia.",feedback:"Quantidade não é o objetivo do experimento; acumular tarefas pode aumentar a autocobrança e dificultar a execução."}
];
const reasons=[
 {id:"observavel",label:"A ação permite observar o que aconteceu."},
 {id:"certeza",label:"A ação só vale se eliminar toda incerteza."},
 {id:"perfeicao",label:"A ação precisa terminar a tarefa inteira."}
];
const reviews=[
 {id:"tentei",label:"Experimentei o passo escolhido"},
 {id:"parcial",label:"Comecei, mas precisei interromper"},
 {id:"nao",label:"Não foi possível começar"},
 {id:"inseguro",label:"Não era apropriado ou seguro tentar"}
];
const reviewBarriers=[
 {id:"tempo",label:"Falta de tempo"},
 {id:"energia",label:"Cansaço ou dificuldade de atenção"},
 {id:"tamanho",label:"Etapa maior do que parecia"},
 {id:"interrupcao",label:"Interrupção ou mudança de prioridade"},
 {id:"seguranca",label:"Segurança ou contexto inadequado"},
 {id:"outra",label:"Outra condição"}
];
const adjustments=[
 {id:"menor",label:"Reduzir o próximo passo"},
 {id:"horario",label:"Escolher outra ocasião"},
 {id:"apoio",label:"Buscar apoio apropriado"},
 {id:"manter",label:"Manter o plano, se continuar adequado"},
 {id:"pausar",label:"Pausar sem cobrança e reavaliar"}
];
function get(list,id){return list.find(x=>x.id===id);}
function esc(value){return String(value??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;");}
function pick(value,list){return get(list,value)?.text||get(list,value)?.label||"";}
export const articleCatalog=catalog.map(({id,number,title,subtitle})=>({id,number,title,subtitle}));
export const weeklyProgressMax=6;
/* Somente estado temporário no módulo JS. Persistência entre telas desta aba, nunca entre sessões. */
const state={articleId:"comecar",step:0,visited:false,interpretation:"",reason:"",action:"",cue:"",when:"",barrier:"",reviewStatus:"",reviewObstacle:"",adjustment:"",clean:false};
export function getWeeklyStatus(){return {visited:state.visited,step:state.step,articleId:state.articleId,articleTitle:get(catalog,state.articleId)?.title||"",hasPlan:!!state.action};}
export function beginWeeklyReview(){state.step=6;state.visited=true;}
export function releaseWeeklyReadingMode(){document.body.classList.remove("reading-focus");}
export function readingSummary(actionId,when="",extras={}){
 const action=get(choices,actionId);if(!action)throw new Error("É preciso escolher uma ação.");
 const article=get(catalog,extras.articleId||"comecar")||catalog[0];
 const whenText=get(moments,when)?.text||when||"Ainda vou definir a ocasião";
 const cueText=get(cues,extras.cue)?.text||"Em uma oportunidade apropriada";
 const barrier=get(barriers,extras.barrier);
 return [
 "TRILHA DA CLAREZA — ATIVIDADE DA SEMANA",
 "Leitura: "+article.title,
 "Ideia central: conhecimento e execução são capacidades relacionadas, mas diferentes.",
 "Minha única experiência desta semana: "+action.text,
 "Quando: "+whenText,
 "Se–então: "+cueText+", vou experimentar o passo escolhido, se for adequado.",
 "Obstáculo considerado: "+(barrier?.label||"A definir"),
 "Alternativa: "+(barrier?.response||"Se não houver condições apropriadas, posso reavaliar o passo."),
 "Na revisão: consegui tentar? O que facilitou ou dificultou? Que ajuste faria?",
 "Recurso psicoeducativo, não é diagnóstico ou avaliação clínica.",
 "Preparado localmente, sem envio automático."
 ].join("\n");
}
export function readingReviewSummary(statusId,obstacleId,adjustId){
 const status=get(reviews,statusId);if(!status)throw Error("Escolha o resultado da tentativa.");
 return ["TRILHA DA CLAREZA — REVISÃO DE UMA TENTATIVA",
 "O que aconteceu: "+status.label,
 "Condição observada: "+(get(reviewBarriers,obstacleId)?.label||"Não informada"),
 "Ajuste considerado: "+(get(adjustments,adjustId)?.label||"A definir"),
 "Uma tentativa, mesmo interrompida, pode oferecer informações sobre a próxima decisão.",
 "Recurso psicoeducativo. Registro opcional e local, sem envio automático."].join("\n");
}
export function articleText(articleId){
 const article=get(catalog,articleId);if(!article)throw Error("Leitura não encontrada.");
 return ["TRILHA DA CLAREZA — LEITURA "+article.number+": "+article.title,article.subtitle,
 ...article.pages.flatMap((p,i)=>["","PARTE "+(i+1)+": "+p.title,...p.paragraphs,"Reflexão: "+p.quote]),
 "","Conteúdo psicoeducativo; não substitui atendimento profissional."].join("\n\n");
}
function saveText(text,filename){
 const blob=new Blob([text],{type:"text/plain;charset=utf-8"});
 const url=URL.createObjectURL(blob),link=document.createElement("a");link.href=url;link.download=filename;
 document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);
}
function controls(list,name,selected,kind="radio"){
 return list.map(o=>'<label class="weekly-pick"><input type="'+kind+'" name="'+name+'" value="'+esc(o.id)+'" '+(selected===o.id?'checked':'')+'><span><strong>'+esc(o.label||o.text)+'</strong>'+(o.hint?'<small>'+esc(o.hint)+'</small>':'')+'</span></label>').join("");
}
function btn(name,text,cls="secondary",attr=""){
 return '<button type="button" class="btn '+cls+'" data-weekly-'+name+' '+attr+'>'+text+'</button>';
}
function heading(kicker,title,body=""){
 return '<article class="weekly-page"><p class="weekly-kicker">'+kicker+'</p><h1 tabindex="-1" id="weekly-heading">'+title+'</h1>'+body+'</article>';
}
function lessonPage(article,index){
 const p=article.pages[index];
 return heading(esc(p.label),esc(p.title),p.paragraphs.map(t=>'<p>'+esc(t)+'</p>').join("")+'<blockquote>'+esc(p.quote)+'</blockquote>');
}
function statusText(){return state.step===6?"Revisar tentativa":state.step==="library"?"Biblioteca de leituras":"Etapa "+(state.step+1)+" de "+weeklyProgressMax;}
export function mountWeekly(host){
 if(host.dataset.weeklyMounted==="1")return;
 host.dataset.weeklyMounted="1";state.visited=true;
 const surface=document.createElement("section");surface.className="weekly-reader";host.append(surface);
 const render=()=>{
  const article=get(catalog,state.articleId)||catalog[0];let content="";
  if(state.step==="library"){
   content=heading("BIBLIOTECA · APRENDIZAGEM PROGRESSIVA","Escolha uma leitura.",'<p>Quatro temas em sequência sugerida. Não é necessário realizar mais de uma atividade por semana; escolha apenas o que fizer sentido.</p><div class="weekly-catalog">'+catalog.map(c=>'<article class="weekly-catalog-item"><small>LEITURA '+c.number+'</small><h2>'+esc(c.title)+'</h2><p>'+esc(c.subtitle)+'</p>'+btn("article","Abrir leitura →","secondary",'data-article="'+c.id+'"')+'</article>').join("")+'</div>');
  }else if(Number.isInteger(state.step)&&state.step<3){
   content=lessonPage(article,state.step)+
    '<div class="weekly-actions">'+btn("download-reading","Salvar leitura completa (.txt)")+
    btn("print","Imprimir / salvar PDF")+(state.step>0?btn("back","← Anterior"):"")+
    btn("next",state.step===2?"Interpretar o texto →":"Próxima parte →","primary")+'</div>';
  }else if(state.step===3){
   const chosen=get(interpretations,state.interpretation);
   content=heading("04 · COMPREENDER","O que explica a proposta do texto?",'<p>Escolha uma interpretação e veja por que ela se aproxima, ou se distancia, do mecanismo estudado.</p>'+
    '<fieldset class="weekly-picks"><legend>Qual afirmação é mais consistente?</legend>'+controls(interpretations,"weekly-understanding",state.interpretation)+'</fieldset>'+
    '<div class="weekly-feedback" id="weekly-feedback" role="status" aria-live="polite">'+esc(chosen?.feedback||"Selecione uma alternativa para conhecer a explicação.")+'</div>'+
    '<fieldset class="weekly-picks"><legend>Se desejado, escolha a justificativa que mais faz sentido. <span class="optional">(opcional)</span></legend>'+controls(reasons,"weekly-reason",state.reason)+'</fieldset>'+
    '<p class="weekly-hint" id="weekly-reason-feedback" aria-live="polite">'+(state.reason?esc(state.reason==="observavel"?"Isso mesmo: uma ação pequena oferece informações observáveis.":"Reflita: o objetivo não é obter certeza absoluta ou terminar tudo de uma vez."):"")+'</p>')+
    '<div class="weekly-actions">'+btn("back","← Voltar à leitura")+btn("next","Escolher uma ação →","primary",!state.interpretation?"disabled":"")+'</div>';
  }else if(state.step===4){
   content=heading("05 · PLANEJAR","Um passo concreto, não uma cobrança.",'<p>Escolha uma atividade pequena, uma ocasião reconhecível e um plano alternativo. Nenhuma delas precisa ser realizada em situação insegura.</p>'+
    '<fieldset class="weekly-picks"><legend>1. Qual única ação pretende experimentar?</legend>'+controls(choices,"weekly-action",state.action)+'</fieldset>'+
    '<fieldset class="weekly-picks"><legend>2. Qual situação indicará que é hora de tentar?</legend>'+controls(cues,"weekly-cue",state.cue)+'</fieldset>'+
    '<label class="weekly-field-label" for="weekly-when">3. Em qual período seria viável? <small>(opcional)</small></label><select id="weekly-when">'+moments.map(m=>'<option value="'+esc(m.id)+'" '+(state.when===m.id?"selected":"")+'>'+esc(m.text)+'</option>').join("")+'</select>'+
    '<fieldset class="weekly-picks"><legend>4. Qual obstáculo vale antecipar?</legend>'+controls(barriers,"weekly-barrier",state.barrier)+'</fieldset>'+
    '<div class="weekly-preview"><strong>Se aparecer esse obstáculo…</strong><p id="weekly-fallback">'+esc(get(barriers,state.barrier)?.response||"Escolha um obstáculo para montar uma alternativa viável.")+'</p></div>'+
    '<p class="weekly-caution">Se houver risco, violência, coerção ou insegurança, priorize proteção e apoio adequado. A atividade é voluntária.</p>')+
    '<div class="weekly-actions">'+btn("back","← Voltar")+btn("next","Preparar minha síntese →","primary",!(state.action&&state.cue&&state.barrier)?"disabled":"")+'</div>';
  }else if(state.step===5){
   content=heading("06 · SÍNTESE","Sua única ação para esta semana.",'<p>Leve um plano específico, com alternativa se algo dificultar a execução. Não é necessário terminar tudo nem sentir menos ansiedade para aprender com a tentativa.</p>'+
    '<pre id="weekly-summary" class="weekly-summary" tabindex="0"></pre>'+
    '<p class="weekly-reflection"><strong>Quando voltar:</strong> revise o que aconteceu, inclusive se não foi possível ou seguro tentar.</p>'+
    '<div class="weekly-actions">'+btn("copy","Copiar plano","primary")+btn("download","Salvar plano (.txt)")+btn("review","Revisar uma tentativa →")+btn("back","← Alterar plano")+'</div>'+
    '<p role="status" aria-live="polite" id="weekly-status" class="weekly-status"></p>');
  }else if(state.step===6){
   content=heading("REVISÃO · APRENDIZAGEM","O que aconteceu quando tentou?",'<p>Você pode revisar uma tentativa mesmo que não tenha concluído a leitura hoje. Uma dificuldade é informação para ajustar o plano, não uma nota de desempenho.</p>'+
    '<fieldset class="weekly-picks"><legend>1. Como foi a tentativa?</legend>'+controls(reviews,"weekly-review",state.reviewStatus)+'</fieldset>'+
    '<fieldset class="weekly-picks"><legend>2. O que mais influenciou?</legend>'+controls(reviewBarriers,"weekly-obstacle",state.reviewObstacle)+'</fieldset>'+
    '<fieldset class="weekly-picks"><legend>3. Qual ajuste parece mais adequado?</legend>'+controls(adjustments,"weekly-adjust",state.adjustment)+'</fieldset>'+
    '<pre class="weekly-summary" id="weekly-review-summary" tabindex="0"></pre>'+
    '<p class="weekly-caution">Se o impedimento estiver relacionado à segurança ou a sofrimento intenso, não force o experimento. A decisão pode ser discutida com o profissional responsável.</p>')+
    '<div class="weekly-actions">'+btn("review-copy","Copiar revisão","primary",!state.reviewStatus?"disabled":"")+btn("review-download","Salvar revisão (.txt)","secondary",!state.reviewStatus?"disabled":"")+btn("review-done","Voltar à leitura")+'</div>'+
    '<p role="status" class="weekly-status" id="weekly-status" aria-live="polite"></p>';
  }
  const progress=Number.isInteger(state.step)&&state.step>=0&&state.step<=5?
   '<div class="weekly-progress"><strong>'+statusText()+'</strong><span>6 etapas no percurso completo</span></div>'+
   '<div class="weekly-progress-track" role="progressbar" aria-label="Progresso completo da atividade" aria-valuemin="1" aria-valuemax="6" aria-valuenow="'+(state.step+1)+'"><span class="weekly-fill" style="width:'+((state.step+1)/6*100)+'%"></span></div>':
   '<div class="weekly-progress">'+statusText()+'</div>';
  surface.innerHTML='<div class="weekly-banner"><span>TRILHA DA CLAREZA · '+esc(article.title)+'</span><div class="weekly-toolbar">'+
  '<button type="button" data-weekly-catalog>Biblioteca</button>'+
  '<button type="button" data-weekly-reader-mode>'+(state.clean?"Sair do modo leitura":"Modo leitura")+'</button>'+
  '<button type="button" data-weekly-restart>Recomeçar e limpar</button></div></div>'+
  progress+content+'<aside class="weekly-limit">Material psicoeducativo; não substitui atendimento psicológico, avaliação de risco ou emergência. Suas escolhas permanecem na memória desta aba e não são enviadas automaticamente. Ao fechar ou recarregar, são descartadas.</aside>'+
  '<section class="weekly-print-content" aria-label="Leitura completa para impressão"><h1>'+esc(article.title)+'</h1>'+article.pages.map(p=>'<section><h2>'+esc(p.title)+'</h2>'+p.paragraphs.map(t=>'<p>'+esc(t)+'</p>').join("")+'</section>').join("")+'</section>';
  if(state.step===5)surface.querySelector("#weekly-summary").textContent=readingSummary(state.action,state.when,{articleId:state.articleId,cue:state.cue,barrier:state.barrier});
  if(state.step===6)updateReview();
  document.body.classList.toggle("reading-focus",state.clean);
  surface.querySelector("#weekly-heading")?.focus({preventScroll:true});
 };
 const updateReview=()=>{
  const node=surface.querySelector("#weekly-review-summary");if(!node)return;
  node.textContent=state.reviewStatus?readingReviewSummary(state.reviewStatus,state.reviewObstacle,state.adjustment):"Selecione a resposta à primeira pergunta para construir a síntese.";
  const disabled=!state.reviewStatus;surface.querySelectorAll("[data-weekly-review-copy],[data-weekly-review-download]").forEach(b=>b.disabled=disabled);
 };
 const toast=t=>{const node=surface.querySelector("#weekly-status");if(node)node.textContent=t;};
 const jump=stage=>{state.step=stage;render();window.scrollTo({top:0,behavior:"auto"});};
 const copy=async text=>{
  try{await navigator.clipboard.writeText(text);toast("Síntese copiada para a área de transferência.");}
  catch{toast("Cópia automática indisponível. Selecione o texto visível da síntese para copiar.");}
 };
 surface.addEventListener("click",async event=>{
  const b=event.target.closest("button");if(!b||!surface.contains(b))return;
  if(b.hasAttribute("data-weekly-next")){
   if(state.step===3&&!state.interpretation)return;
   if(state.step===4&&!(state.action&&state.cue&&state.barrier))return;
   jump(Math.min(5,state.step+1));
  }else if(b.hasAttribute("data-weekly-back"))jump(Math.max(0,state.step-1));
  else if(b.hasAttribute("data-weekly-catalog"))jump("library");
  else if(b.hasAttribute("data-weekly-article")){
   const selected=b.dataset.article;if(!get(catalog,selected))return;
   state.articleId=selected;state.interpretation="";state.reason="";state.action="";state.when="";state.cue="";state.barrier="";
   jump(0);
  }else if(b.hasAttribute("data-weekly-review"))jump(6);
  else if(b.hasAttribute("data-weekly-review-done"))jump(state.action?5:0);
  else if(b.hasAttribute("data-weekly-restart")){
   Object.assign(state,{step:0,interpretation:"",reason:"",action:"",cue:"",when:"",barrier:"",reviewStatus:"",reviewObstacle:"",adjustment:"",clean:false});
   jump(0);
  }else if(b.hasAttribute("data-weekly-reader-mode")){
   state.clean=!state.clean;render();
  }else if(b.hasAttribute("data-weekly-copy"))await copy(readingSummary(state.action,state.when,{articleId:state.articleId,cue:state.cue,barrier:state.barrier}));
  else if(b.hasAttribute("data-weekly-download")){saveText(readingSummary(state.action,state.when,{articleId:state.articleId,cue:state.cue,barrier:state.barrier}),"trilha-da-clareza-plano-semanal.txt");toast("Arquivo criado no seu dispositivo.");}
  else if(b.hasAttribute("data-weekly-download-reading")){saveText(articleText(state.articleId),"trilha-da-clareza-leitura-"+state.articleId+".txt");}
  else if(b.hasAttribute("data-weekly-print")){window.print();}
  else if(b.hasAttribute("data-weekly-review-copy")){if(state.reviewStatus)await copy(readingReviewSummary(state.reviewStatus,state.reviewObstacle,state.adjustment));}
  else if(b.hasAttribute("data-weekly-review-download")){if(state.reviewStatus){saveText(readingReviewSummary(state.reviewStatus,state.reviewObstacle,state.adjustment),"trilha-da-clareza-revisao.txt");toast("Revisão criada no seu dispositivo.");}}
 });
 surface.addEventListener("change",event=>{
  const el=event.target;
  if(el.name==="weekly-understanding"){
   state.interpretation=el.value;
   surface.querySelector("#weekly-feedback").textContent=get(interpretations,state.interpretation)?.feedback||"";
   surface.querySelector("[data-weekly-next]").disabled=false;
  }else if(el.name==="weekly-reason"){
   state.reason=el.value;
   surface.querySelector("#weekly-reason-feedback").textContent=state.reason==="observavel"?
     "Esta é uma justificativa coerente: o experimento permite observar o que aconteceu.":
     "O experimento não exige certeza absoluta nem conclusão completa de uma tarefa.";
  }else if(el.name==="weekly-action"||el.name==="weekly-cue"||el.name==="weekly-barrier"){
   if(el.name==="weekly-action")state.action=el.value;
   if(el.name==="weekly-cue")state.cue=el.value;
   if(el.name==="weekly-barrier")state.barrier=el.value;
   const fallback=surface.querySelector("#weekly-fallback");
   if(fallback)fallback.textContent=get(barriers,state.barrier)?.response||"Escolha um obstáculo.";
   surface.querySelector("[data-weekly-next]").disabled=!(state.action&&state.cue&&state.barrier);
  }else if(el.id==="weekly-when")state.when=el.value;
  else if(el.name==="weekly-review"||el.name==="weekly-obstacle"||el.name==="weekly-adjust"){
   if(el.name==="weekly-review")state.reviewStatus=el.value;
   if(el.name==="weekly-obstacle")state.reviewObstacle=el.value;
   if(el.name==="weekly-adjust")state.adjustment=el.value;
   updateReview();
  }
 });
 render();
}
