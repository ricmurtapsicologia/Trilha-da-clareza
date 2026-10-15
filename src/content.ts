import type {AudioScript,Choice,Challenge,Journey} from './domain.js';
const choice=(text:string,feedback:string,reflection:string):Choice=>({text,feedback,reflection});
const c=(id:string,label:string,title:string,situation:string,question:string,skill:string,choices:[Choice,Choice,Choice]):Challenge=>({id,label,title,situation,question,skill,choices});
export const journeys:Journey[]=[
{
 id:'pensamentos',name:'O que minha mente está dizendo?',short:'Pensamentos e previsões',description:'Observe como acontecimentos e interpretações podem ser diferentes.',color:'sage',icon:'◌',introAudio:'intro-pensamentos',skillAudio:'skill-fatos',takeaway:'Pensamentos são hipóteses que podem ser examinadas, não verdades automáticas.',
 challenges:[
 c('p1','Perceber','O que realmente aconteceu?','Você enviou uma mensagem importante. Algumas horas se passaram e não houve resposta.','Qual frase descreve melhor um fato observável?','Fatos e interpretações',[
 choice('A mensagem ainda não recebeu resposta.','Isso descreve o que você efetivamente observou, sem atribuir motivos à outra pessoa.','O que eu realmente sei?'),
 choice('A pessoa está irritada comigo.','Essa é uma possibilidade, mas não há informação suficiente para tratá-la como fato.','Que outras explicações existem?'),
 choice('Certamente fiz algo errado.','A palavra “certamente” pode esconder uma conclusão antecipada.','O que me permitiria verificar isso?')]),
 c('p2','Nomear','Quando a mente prevê o pior','Uma mudança de horário no trabalho é anunciada, sem explicações.','Que atitude favorece uma interpretação mais equilibrada?','Previsões e incerteza',[
 choice('Considerar mais de uma explicação possível.','Abrir espaço para alternativas reduz a certeza indevida sobre o futuro.','Quais informações ainda faltam?'),
 choice('Concluir que uma demissão está próxima.','É compreensível preocupar-se, mas uma hipótese não se transforma em fato só porque causa medo.','Qual é a evidência disponível?'),
 choice('Ignorar completamente o aviso.','Ignorar pode aliviar por instantes, mas não ajuda a compreender a situação.','Há algo útil que posso verificar?')]),
 c('p3','Explorar','O peso das palavras','Ao lembrar um erro, surge o pensamento: “Eu sempre estrago tudo”.','O que chama atenção nessa frase?','Generalizações',[
 choice('“Sempre” transforma um episódio em regra.','Identificar palavras absolutas ajuda a examinar se a conclusão é proporcional aos fatos.','Existem exceções?'),
 choice('É uma descrição perfeitamente objetiva.','Essa conclusão pode estar influenciada pela emoção do momento.','Que exemplos contrários existem?'),
 choice('Pensar assim vai me motivar mais.','Autocrítica intensa nem sempre facilita mudanças; podemos buscar uma avaliação precisa.','Como formular isso com justiça?')]),
 c('p4','Investigar','O que dizem as evidências?','Você imagina que uma conversa será um desastre. Ainda não conversou com a pessoa.','Qual pergunta pode ajudar a investigar essa previsão?','Questionamento socrático',[
 choice('Que elementos sustentam e contradizem essa previsão?','Essa pergunta promove uma análise menos unilateral.','O que considero evidência?'),
 choice('Como faço para ter certeza de que dará errado?','Procurar somente sinais de ameaça pode reforçar uma conclusão já assumida.','Estou considerando outras possibilidades?'),
 choice('É melhor cancelar qualquer conversa?','Evitar pode aliviar agora, mas impede descobrir o que de fato ocorreria.','Qual seria um passo seguro?')]),
 c('p5','Reformular','Uma frase mais justa','Você teve um dia difícil e não concluiu tudo o que planejou.','Qual alternativa mantém responsabilidade sem exagero?','Reavaliação cognitiva',[
 choice('Hoje não consegui tudo; posso reorganizar o restante.','Você reconhece uma dificuldade sem transformar o dia em fracasso pessoal.','Qual prioridade é possível amanhã?'),
 choice('Sou incapaz de cumprir compromissos.','Um desempenho pontual não resume sua capacidade ou identidade.','Como avaliaria outra pessoa nessa situação?'),
 choice('Não importa, não tenho responsabilidade alguma.','Uma avaliação equilibrada também preserva a capacidade de assumir responsabilidades.','Que parte posso ajustar?')]),
 c('p6','Consolidar','Pensar é o mesmo que saber?','Uma preocupação retorna várias vezes, mesmo sem evidências novas.','Qual lembrete você gostaria de experimentar?','Distanciamento cognitivo',[
 choice('Estou tendo o pensamento de que algo ruim acontecerá.','Essa formulação cria espaço entre a experiência do pensamento e sua confirmação.','Qual é o próximo passo útil?'),
 choice('Se pensei tantas vezes, é porque vai acontecer.','Frequência de um pensamento não comprova sua veracidade.','Tenho uma evidência nova?'),
 choice('Preciso eliminar esse pensamento imediatamente.','Lutar contra cada pensamento pode aumentar a atenção dedicada a ele.','Posso observá-lo sem obedecer?')])]
},
{
 id:'controle',name:'O que está sob meu controle?',short:'Controle e incerteza',description:'Diferencie suas ações, sua influência e o que depende de outros fatores.',color:'amber',icon:'⌁',introAudio:'intro-controle',skillAudio:'skill-controle',takeaway:'Você pode escolher ações possíveis sem precisar garantir todos os resultados.',
 challenges:[
 c('c1','Distinguir','Onde termina meu controle?','Uma pessoa querida tomou uma decisão com a qual você discorda.','Qual parte está diretamente sob seu controle?','Círculos de controle',[
 choice('A forma respeitosa como converso sobre o assunto.','Sua comunicação é uma ação sua; a decisão final da outra pessoa pode não ser.','Como gostaria de me expressar?'),
 choice('A decisão que a outra pessoa deve tomar.','Você pode orientar ou negociar, mas não determinar todas as decisões alheias.','Onde posso influenciar sem controlar?'),
 choice('Tudo o que acontecer com ela no futuro.','Assumir responsabilidade por todos os resultados cria uma tarefa impossível.','Qual responsabilidade é realmente minha?')]),
 c('c2','Investigar','Incerteza não é perigo confirmado','Um familiar está atrasado e você não recebeu notícias.','O que diferencia uma medida razoável de uma escalada de preocupação?','Incerteza e ação',[
 choice('Verificar de modo proporcional e considerar o contexto.','É possível agir com prudência sem assumir automaticamente o pior cenário.','Qual informação concreta ajudaria?'),
 choice('Imaginar todas as tragédias possíveis até obter resposta.','Esse esforço mental pode aumentar o sofrimento sem produzir informação.','Que ação concreta seria suficiente por agora?'),
 choice('Descartar qualquer possibilidade de problema.','Equilíbrio não significa negar riscos; significa responder de modo proporcional.','Qual cuidado faz sentido?')]),
 c('c3','Observar','A responsabilidade tem limites','Uma situação familiar difícil exige decisões compartilhadas.','Qual frase preserva sua participação sem assumir tudo?','Responsabilidade proporcional',[
 choice('Posso contribuir com minha parte e dialogar sobre as demais.','Compartilhar responsabilidades pode ser mais realista e sustentável.','Quem mais pode participar?'),
 choice('Se algo der errado, a culpa será exclusivamente minha.','Responsabilidade total nem sempre corresponde ao que você efetivamente controla.','Quais fatores independem de mim?'),
 choice('Não vou me envolver em nada.','Afastar-se completamente pode impedir contribuições possíveis.','Qual participação faz sentido?')]),
 c('c4','Escolher','O próximo passo possível','Você precisa tomar uma decisão, mas ainda faltam informações.','Qual é uma resposta funcional?','Tomada de decisão',[
 choice('Definir quais informações são essenciais e como obtê-las.','Uma etapa pequena pode substituir a busca impossível por certeza absoluta.','O que preciso saber primeiro?'),
 choice('Esperar até não existir nenhuma dúvida.','A certeza completa pode ser inalcançável em decisões cotidianas.','Quanto de informação é suficiente?'),
 choice('Decidir imediatamente, sem considerar consequências.','Agir com pressa também pode ser uma resposta à ansiedade.','Posso fazer uma pausa breve?')]),
 c('c5','Praticar','Quando a preocupação recomeça','Você já tomou uma medida razoável. Mesmo assim, sente vontade de verificar tudo novamente.','O que pode ajudar a escolher conscientemente?','Comportamentos de segurança',[
 choice('Perguntar se houve uma informação nova que justifique verificar.','Essa análise diferencia uma necessidade real de uma repetição guiada pela preocupação.','Qual meu critério para verificar?'),
 choice('Verificar repetidamente até sentir alívio completo.','O alívio imediato pode manter um ciclo de verificações sem fim.','Estou buscando informação ou certeza emocional?'),
 choice('Nunca mais verificar, independentemente da situação.','É importante considerar riscos concretos. A proposta não é seguir uma regra rígida.','O que é proporcional a este contexto?')]),
 c('c6','Integrar','Aceitar a existência de dúvidas','Você planejou com cuidado, mas não tem como prever como todos reagirão.','Qual compromisso pode orientar sua atitude?','Tolerância à incerteza',[
 choice('Agir segundo meus valores e ajustar o plano se necessário.','A flexibilidade permite agir mesmo sem controlar integralmente os resultados.','Que valor quero expressar?'),
 choice('Continuar pensando até prever cada reação.','O pensamento repetitivo pode parecer preparação, mas não garante previsão correta.','Quando pensar deixa de ajudar?'),
 choice('Abandonar o plano porque há incerteza.','Uma dúvida não precisa, por si só, impedir toda ação.','Qual primeiro passo é viável?')])]
},
{
 id:'acao',name:'Qual será meu próximo passo?',short:'Escolhas e ação',description:'Transforme reflexões em atitudes pequenas, realistas e alinhadas ao que importa.',color:'clay',icon:'↗',introAudio:'intro-acao',skillAudio:'skill-passo',takeaway:'Uma ação pequena e possível costuma ser mais útil do que um plano perfeito que nunca começa.',
 challenges:[
 c('a1','Priorizar','Muitas tarefas ao mesmo tempo','Você olha sua lista de pendências e sente que precisa resolver tudo hoje.','Que movimento torna a situação mais manejável?','Priorização',[
 choice('Escolher uma tarefa relevante e realizável para começar.','Reduzir a quantidade de decisões simultâneas pode facilitar o início.','Qual tarefa merece atenção agora?'),
 choice('Tentar começar todas de uma vez.','Dividir a atenção entre muitas frentes pode aumentar a sensação de desorganização.','O que pode esperar?'),
 choice('Desistir de todas porque não consigo resolver tudo.','Não conseguir tudo de uma vez não impede algum avanço.','Qual seria um primeiro passo pequeno?')]),
 c('a2','Planejar','Um passo verificável','Você quer melhorar o diálogo em casa, mas seu objetivo ainda é muito amplo.','Qual proposta é mais concreta?','Planejamento comportamental',[
 choice('Reservar um momento adequado para conversar sobre um tema.','Definir uma ação observável torna o plano mais executável.','Quando e onde isso seria possível?'),
 choice('Fazer com que ninguém mais discuta.','O objetivo depende da reação de outras pessoas, não apenas da sua ação.','Como reformular a meta?'),
 choice('Ser uma pessoa totalmente diferente amanhã.','Mudanças muito vagas ou abrangentes dificultam reconhecer passos concretos.','Qual comportamento específico quero praticar?')]),
 c('a3','Comunicar','Falar sem aumentar o conflito','Você precisa conversar sobre um problema que gerou tensão.','Qual início tende a favorecer um diálogo claro?','Comunicação assertiva',[
 choice('Descrever o fato, sua preocupação e um pedido específico.','Uma fala concreta e respeitosa facilita que o outro compreenda sua necessidade.','Como formularia seu pedido?'),
 choice('Começar acusando a outra pessoa de sempre errar.','Generalizações e acusações podem aumentar reações defensivas.','Como falar do episódio específico?'),
 choice('Não falar nunca para evitar qualquer incômodo.','Evitar todas as conversas difíceis pode manter problemas sem negociação.','Existe um momento apropriado?')]),
 c('a4','Experimentar','O menor passo útil','Uma atividade importante foi adiada durante vários dias.','Qual experiência pode ajudar a iniciar?','Ativação comportamental',[
 choice('Experimentar dedicar cinco minutos ao primeiro passo.','Um compromisso pequeno pode reduzir a barreira inicial sem exigir motivação perfeita.','Qual é o primeiro movimento concreto?'),
 choice('Esperar até sentir motivação total.','A motivação nem sempre precisa vir antes da ação; às vezes, ela aparece ao começar.','O que poderia testar por cinco minutos?'),
 choice('Prometer resolver tudo de uma vez.','Metas grandes podem produzir mais pressão quando se está sobrecarregado.','Como dividir em partes?')]),
 c('a5','Reavaliar','Quando o plano não funciona','Você tentou uma estratégia e não obteve o resultado esperado.','Qual interpretação ajuda a continuar aprendendo?','Aprendizagem por experimentos',[
 choice('Observar o resultado e ajustar a próxima tentativa.','Um experimento pode ensinar algo mesmo quando o resultado é diferente do previsto.','O que aprendi sobre essa situação?'),
 choice('Isso prova que nunca vou conseguir.','Uma tentativa não determina todos os resultados futuros.','Que variáveis poderiam mudar?'),
 choice('Repetir sem avaliar nada.','Repetir pode ser útil em alguns contextos, mas observar o efeito ajuda a escolher melhor.','Qual ajuste faria sentido?')]),
 c('a6','Concluir','O compromisso possível','Ao terminar esta jornada, você pode decidir se deseja experimentar uma mudança.','Qual forma de compromisso respeita seu ritmo?','Plano de ação',[
 choice('Escolher uma ação pequena, concreta e ajustável.','Compromissos realistas facilitam a continuidade sem transformar a experiência em cobrança.','Qual atitude quero experimentar?'),
 choice('Exigir uma transformação imediata.','Mudanças sustentáveis geralmente envolvem prática e ajustes, não uma prova de perfeição.','Qual seria um passo suficiente hoje?'),
 choice('Deixar a decisão para sempre.','Você pode escolher não agir agora, mas vale reconhecer se o adiamento tem uma função.','O que precisaria para decidir?')])]
}
];
export const audios:AudioScript[]=[
{id:'welcome',title:'Boas-vindas',seconds:24,text:'Bem-vindo à Trilha da Clareza. Aqui você pode explorar pensamentos, emoções e escolhas com liberdade. Não há pontos a conquistar nem obrigação de acertar. Vá no seu ritmo. Quando quiser, podemos começar.'},
{id:'intro-pensamentos',title:'Início: pensamentos e previsões',seconds:24,text:'Às vezes a mente tenta completar informações que ainda não temos. Nesta jornada, vamos perceber a diferença entre aquilo que aconteceu e a interpretação que fazemos. Não é preciso ter certeza de tudo para observar com curiosidade.'},
{id:'intro-controle',title:'Início: controle e incerteza',seconds:24,text:'Nem tudo depende de você. Algumas situações permitem atitudes concretas; outras envolvem escolhas alheias ou acontecimentos ainda incertos. Vamos descobrir onde sua ação pode fazer diferença, sem exigir controle absoluto.'},
{id:'intro-acao',title:'Início: escolhas e ação',seconds:23,text:'Quando uma situação parece grande demais, podemos procurar um passo menor. Esta jornada convida você a experimentar decisões concretas, coerentes com seus valores, sem exigir perfeição.'},
{id:'skill-fatos',title:'Diferenciar fatos e interpretações',seconds:27,text:'Uma mensagem sem resposta é um fato observável. Pensar que alguém está irritado pode ser uma interpretação. A interpretação merece atenção, mas não é uma prova. Que informação você realmente possui? Que outras explicações existem?'},
{id:'skill-controle',title:'Escolher o que depende de você',seconds:26,text:'Você pode escolher como falar, agir e pedir ajuda. Nem sempre pode determinar as decisões e emoções de outras pessoas. Reconhecer limites não é desistir: pode abrir espaço para respostas mais realistas.'},
{id:'skill-passo',title:'Dar um passo possível',seconds:23,text:'Um plano útil não precisa resolver tudo. Pode começar com uma conversa, uma pergunta ou cinco minutos de uma tarefa. O que importa agora é escolher algo possível, que faça sentido para você.'},
{id:'skill-palavras',title:'Atenção às generalizações',seconds:22,text:'Palavras como sempre, nunca e tudo podem transformar um episódio em conclusão geral. Pergunte-se: há exceções? Como eu descreveria esta situação de forma mais específica e justa?'},
{id:'skill-incerteza',title:'Conviver com perguntas abertas',seconds:23,text:'Ter uma dúvida não significa estar diante de um perigo confirmado. Em algumas situações, é possível verificar informações. Em outras, precisamos agir com prudência mesmo sem garantias. Você pode avaliar o próximo passo.'},
{id:'skill-escolhas',title:'Refletir sobre alternativas',seconds:24,text:'Uma escolha pode produzir alívio imediato e ainda assim não resolver o problema. Outra pode exigir algum esforço e aproximar você do que valoriza. Observe as possibilidades sem se julgar por ter dúvidas.'},
{id:'grounding',title:'Pausa para se orientar',seconds:80,text:'Se quiser, interrompa o percurso por um instante. Perceba o apoio dos seus pés ou do seu corpo na cadeira. Observe o espaço ao redor. Encontre três objetos ou cores que chamem sua atenção. Você não precisa mudar sua respiração. Apenas note o ar entrando e saindo, se isso for confortável. Agora, observe algum som próximo ou distante. Não existe uma sensação correta a alcançar. Quando desejar, escolha se prefere continuar ou encerrar.'},
{id:'ending',title:'Encerramento',seconds:24,text:'Você chegou ao final desta jornada. Não é necessário sentir algo diferente agora. Se alguma reflexão foi útil, considere levá-la para uma situação cotidiana. Uma pequena escolha pode ser um bom começo. Obrigado por participar.'}
];
