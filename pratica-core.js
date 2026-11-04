/* Funções puras da prática breve. Não acessam rede, cookies ou armazenamento. */
export const focusOptions = Object.freeze({
  antecipacao: {
    name: 'Antecipação e incerteza',
    skill: 'Diferenciar fatos, previsões e possibilidades',
    cue: 'Prever uma dificuldade não significa que ela já aconteceu. Verifique quais fatos estão disponíveis, sem ignorar sinais concretos de risco.',
    actions: [
      {id:'verificar',text:'Verificar uma informação relevante antes de tirar conclusões.'},
      {id:'alternativas',text:'Considerar duas explicações possíveis para a situação.'},
      {id:'passo',text:'Escolher uma pequena ação possível, mesmo sem certeza absoluta.'}
    ]
  },
  autocobranca: {
    name: 'Autocobrança',
    skill: 'Avaliar exigências com responsabilidade e proporção',
    cue: 'Observe se uma dificuldade pontual virou uma conclusão sobre seu valor como pessoa. Responsabilidade não precisa significar punição.',
    actions: [
      {id:'reformular',text:'Descrever o que ocorreu sem usar “sempre”, “nunca” ou “tudo”.'},
      {id:'priorizar',text:'Escolher uma tarefa relevante e realizável para começar.'},
      {id:'equilibrar',text:'Formular uma exigência mais justa para esta situação.'}
    ]
  },
  limites: {
    name: 'Conflitos e limites',
    skill: 'Distinguir suas escolhas da reação de outras pessoas',
    cue: 'Você pode escolher como se expressar e buscar ajuda, mas não controlar integralmente a reação alheia. Antes de conversar, considere se há segurança.',
    actions: [
      {id:'limite',text:'Identificar qual limite pessoal precisa ser respeitado.'},
      {id:'pedido',text:'Preparar um pedido específico para uma conversa segura.'},
      {id:'apoio',text:'Buscar apoio apropriado caso exista pressão, ameaça ou insegurança.'}
    ]
  }
});
export function cleanNote(value, limit=220) {
  return String(value ?? '').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g,'').trim().slice(0,limit);
}
export function safeLevel(value) {
  const v=String(value ?? '');
  return /^(10|[0-9])$/.test(v) ? v : '';
}
export function makeSummary(data, detailed=false) {
  const choice=focusOptions[data.focus];
  if(!choice) throw new Error('Foco não selecionado');
  const action=choice.actions.find(x=>x.id===data.action);
  if(!action) throw new Error('Próximo passo não selecionado');
  const allowedWhen=['Hoje, se for apropriado','Nos próximos dias','Quando houver condições seguras','Na próxima sessão'];
  const when=allowedWhen.includes(data.when) ? data.when : 'A definir';
  const lines=[
    'TRILHA DA CLAREZA — MEU PRÓXIMO PASSO',
    'Recurso psicoeducativo. Não é diagnóstico, avaliação de risco ou tratamento.',
    '',
    'Tema: '+choice.name,
    'Habilidade: '+choice.skill,
    'Atitude escolhida: '+action.text,
    'Quando: '+when,
    '',
    'Posso rever esta escolha quando tiver novas informações.',
    'Síntese criada localmente por escolha do usuário.'
  ];
  if(detailed) {
    lines.push('','REFLEXÕES PESSOAIS (EXPORTAÇÃO VOLUNTÁRIA)',
      'O que observei: '+(cleanNote(data.observation)||'Não informado'),
      'Minha previsão ou interpretação: '+(cleanNote(data.interpretation)||'Não informado'),
      'Como pretendo adaptar o passo: '+(cleanNote(data.customAction)||'Não informado'),
      'Intensidade percebida no início (0–10): '+(safeLevel(data.startLevel)||'Não informada'),
      'Intensidade percebida no fim (0–10): '+(safeLevel(data.endLevel)||'Não informada'),
      'Os valores são percepções momentâneas; não constituem medida clínica de eficácia.'
    );
  }
  return lines.join('\n');
}