export function validate(journeys, audio) {
    const errors = [];
    const jids = new Set();
    const cids = new Set();
    const aids = new Set();
    if (journeys.length !== 3)
        errors.push('Esperadas exatamente 3 jornadas');
    if (audio.length !== 12)
        errors.push('Esperados exatamente 12 roteiros de áudio');
    for (const a of audio) {
        if (aids.has(a.id))
            errors.push('Áudio duplicado ' + a.id);
        aids.add(a.id);
        if (!a.text.trim())
            errors.push('Áudio vazio ' + a.id);
    }
    for (const j of journeys) {
        if (jids.has(j.id))
            errors.push('Jornada duplicada ' + j.id);
        jids.add(j.id);
        if (j.challenges.length !== 6)
            errors.push('Jornada ' + j.id + ' sem seis desafios');
        for (const c of j.challenges) {
            if (cids.has(c.id))
                errors.push('Desafio duplicado ' + c.id);
            cids.add(c.id);
            if (c.choices.length !== 3)
                errors.push('Três escolhas esperadas: ' + c.id);
            for (const ch of c.choices) {
                if (!ch.text || !ch.feedback || !ch.reflection)
                    errors.push('Escolha incompleta ' + c.id);
            }
        }
        if (!aids.has(j.introAudio) || !aids.has(j.skillAudio))
            errors.push('Narração não localizada ' + j.id);
    }
    return errors;
}
export function progressPercent(stage, total = 6) { return Math.min(100, Math.max(0, Math.round(stage / total * 100))); }
export function safeText(v) { return v.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
export function exportSummary(j, answers, action) {
    const lines = ['TRILHA DA CLAREZA — REFLEXÃO PESSOAL', 'Recurso psicoeducativo; não é avaliação ou diagnóstico.', '', `Jornada: ${j.name}`, '', ...j.challenges.flatMap((c, i) => [`${i + 1}. ${c.title}`, `Escolha: ${answers[i] === null ? 'Não respondida' : c.choices[answers[i]].text}`, '']), `Ideia central: ${j.takeaway}`, `Próximo passo escolhido: ${action || 'Não informado'}`, '', 'Arquivo gerado localmente por escolha do usuário.'];
    return lines.join('\n');
}
/** Regras puras de percurso. Não gravam respostas nem produzem pontuação. */
export function validChoice(choice, total = 3) {
    return Number.isInteger(choice) && typeof choice === 'number' && choice >= 0 && choice < total;
}
export function recordChoice(answers, step, choice, total = 3) {
    if (!Number.isInteger(step) || step < 0 || step >= answers.length || !validChoice(choice, total))
        return null;
    const updated = [...answers];
    updated[step] = choice;
    return updated;
}
export function canAdvance(answers, step, total = 3) {
    return Number.isInteger(step) && step >= 0 && step < answers.length && validChoice(answers[step], total);
}
export function canVisit(answers, current, target) {
    return Number.isInteger(current) && Number.isInteger(target) && current >= 0 && current < answers.length && target >= 0 && target <= current;
}
export function journeyComplete(answers, expected = 6, total = 3) {
    return answers.length === expected && answers.every(choice => validChoice(choice, total));
}
