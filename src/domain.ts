export type Choice = { text: string; feedback: string; reflection: string };
export type Challenge = { id: string; label: string; title: string; situation: string; question: string; skill: string; choices: [Choice,Choice,Choice] };
export type Journey = { id:string; name:string; short:string; description:string; color:string; icon:string; introAudio:string; skillAudio:string; challenges: [Challenge,Challenge,Challenge,Challenge,Challenge,Challenge]; takeaway:string };
export type AudioScript = { id:string; title:string; text:string; seconds:number };
export function validate(journeys:Journey[],audio:AudioScript[]):string[]{
  const errors:string[]=[];const jids=new Set<string>();const cids=new Set<string>();const aids=new Set<string>();
  if(journeys.length!==3)errors.push('Esperadas exatamente 3 jornadas');
  if(audio.length!==12)errors.push('Esperados exatamente 12 roteiros de áudio');
  for(const a of audio){if(aids.has(a.id))errors.push('Áudio duplicado '+a.id);aids.add(a.id);if(!a.text.trim())errors.push('Áudio vazio '+a.id)}
  for(const j of journeys){if(jids.has(j.id))errors.push('Jornada duplicada '+j.id);jids.add(j.id);if(j.challenges.length!==6)errors.push('Jornada '+j.id+' sem seis desafios');for(const c of j.challenges){if(cids.has(c.id))errors.push('Desafio duplicado '+c.id);cids.add(c.id);if(c.choices.length!==3)errors.push('Três escolhas esperadas: '+c.id);for(const ch of c.choices){if(!ch.text||!ch.feedback||!ch.reflection)errors.push('Escolha incompleta '+c.id)}}if(!aids.has(j.introAudio)||!aids.has(j.skillAudio)) errors.push('Narração não localizada '+j.id)}
  return errors;
}
export function progressPercent(stage:number,total=6){return Math.min(100,Math.max(0,Math.round(stage/total*100)))}
export function safeText(v:string){return v.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!))}
export function exportSummary(j:Journey,answers:(number|null)[],action:string):string{
  const lines=['TRILHA DA CLAREZA — REFLEXÃO PESSOAL','Recurso psicoeducativo; não é avaliação ou diagnóstico.','',`Jornada: ${j.name}`,'',...j.challenges.flatMap((c,i)=>[`${i+1}. ${c.title}`,`Escolha: ${answers[i]===null?'Não respondida':c.choices[answers[i]!].text}`,'']),`Ideia central: ${j.takeaway}`,`Próximo passo escolhido: ${action||'Não informado'}`,'','Arquivo gerado localmente por escolha do usuário.'];return lines.join('\n');
}

/** Regras puras de percurso. Não gravam respostas nem produzem pontuação. */
export function validChoice(choice:unknown, total=3):choice is number {
  return Number.isInteger(choice)&&typeof choice==='number'&&choice>=0&&choice<total;
}
export function recordChoice(answers:readonly (number|null)[], step:number, choice:number, total=3):(number|null)[]|null {
  if(!Number.isInteger(step)||step<0||step>=answers.length||!validChoice(choice,total))return null;
  const updated=[...answers];updated[step]=choice;return updated;
}
export function canAdvance(answers:readonly (number|null)[], step:number, total=3):boolean {
  return Number.isInteger(step)&&step>=0&&step<answers.length&&validChoice(answers[step],total);
}
export function canVisit(answers:readonly (number|null)[], current:number, target:number):boolean {
  return Number.isInteger(current)&&Number.isInteger(target)&&current>=0&&current<answers.length&&target>=0&&target<=current;
}
export function journeyComplete(answers:readonly (number|null)[], expected=6, total=3):boolean {
  return answers.length===expected&&answers.every(choice=>validChoice(choice,total));
}
