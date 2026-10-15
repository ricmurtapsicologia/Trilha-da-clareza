import { journeys, audios } from './content.js';
import { validate, progressPercent, safeText, exportSummary } from './domain.js';
const app = document.getElementById('app');
if (!app)
    throw new Error('Aplicação sem elemento raiz');
const root = app;
const problems = validate(journeys, audios);
if (problems.length)
    throw new Error('Conteúdo inválido: ' + problems.join('; '));
const state = { screen: 'home', journey: null, step: 0, answers: Array(6).fill(null), action: '', intensityStart: null, intensityEnd: null, paused: false, audioOn: true, audioId: null, audioExpanded: false };
let sound = null;
function stopAudio() { if ('speechSynthesis' in window)
    window.speechSynthesis.cancel(); sound = null; state.audioId = null; }
function playAudio(id) { const a = audios.find(a => a.id === id); if (!a || !state.audioOn)
    return; if (!('speechSynthesis' in window)) {
    announce('Este navegador não oferece narração. Leia a transcrição disponível.');
    return;
} if (state.audioId === id) {
    stopAudio();
    render();
    return;
} stopAudio(); sound = new SpeechSynthesisUtterance(a.text); sound.lang = 'pt-BR'; sound.rate = .93; sound.pitch = 1; sound.volume = 1; const voices = window.speechSynthesis.getVoices(); sound.voice = voices.find(v => v.lang.toLowerCase() === 'pt-br' && v.localService) || voices.find(v => v.lang.toLowerCase() === 'pt-br') || null; sound.onend = () => { state.audioId = null; renderAudioButtons(); }; sound.onerror = () => { state.audioId = null; renderAudioButtons(); }; state.audioId = id; window.speechSynthesis.speak(sound); renderAudioButtons(); }
function renderAudioButtons() { document.querySelectorAll('[data-audio]').forEach(b => { const playing = state.audioId === b.dataset.audio; b.textContent = playing ? '■ Parar narração' : '▷ Ouvir orientação'; b.setAttribute('aria-pressed', String(playing)); }); }
function narrate(id) { const a = audios.find(x => x.id === id); return `<div class="narrator"><div class="topline"><div><strong>${safeText(a.title)}</strong><p>Leitura opcional · ${a.seconds}s estimados</p></div><button class="tool" data-audio="${a.id}" type="button" ${state.audioOn ? '' : 'disabled'}>▷ Ouvir orientação</button></div><button class="linklike" data-action="transcript" type="button" aria-expanded="${state.audioExpanded}">${state.audioExpanded ? 'Ocultar' : 'Ver'} transcrição</button>${state.audioExpanded ? `<p class="text-audio">${safeText(a.text)}</p>` : ''}<p class="stop-note">Prévia de voz do dispositivo. Voz neural pré-gravada ainda não produzida.</p></div>`; }
function logo() { return `<a class="identity" href="#inicio" data-action="home" aria-label="Trilha da Clareza, voltar ao início"><span class="brand-icon" aria-hidden="true">⌁</span><span class="brandtext"><strong>TRILHA DA CLAREZA</strong><small>Pensamentos · Emoções · Escolhas</small></span></a>`; }
function shell(main) { root.innerHTML = `<div class="layout" ${state.paused ? 'inert' : ''}><header class="topbar">${logo()}<nav class="top-actions" aria-label="Principal"><button class="linklike" data-action="select">Jornadas</button><button class="linklike" data-action="help">Sobre e privacidade</button></nav></header><main id="main-content" class="main" tabindex="-1">${main}</main><footer class="footer"><span>Trilha da Clareza · Protótipo não homologado para uso clínico.</span><span>Sem cadastro · Sem histórico · Sem rastreadores</span><span class="footlinks"><button class="linklike" data-action="help">Privacidade</button><button class="linklike" data-action="home">Início</button></span></footer></div>${state.paused ? pauseView() : ''}`; window.scrollTo({ top: 0, behavior: 'instant' }); }
function homeView() { return `<section class="hero"><div class="hero-copy"><span class="eyebrow">Uma experiência para olhar para dentro</span><h1>Entre o que acontece e o que você faz, existe um espaço para <em>escolher.</em></h1><p class="lead">Explore pensamentos, emoções e possibilidades em jornadas interativas. Sem respostas perfeitas, sem pressão e sempre no seu ritmo.</p><div class="actions"><button class="btn primary" data-action="select">Explorar as jornadas <span aria-hidden="true">↗</span></button><button class="btn secondary" data-action="help">Como funciona?</button></div><div class="hero-caption"><span>3 jornadas</span><span>6 desafios em cada</span><span>8–12 minutos estimados</span></div></div><div class="art" aria-hidden="true"><div class="art-ring"></div><div class="art-ring second"></div><svg viewBox="0 0 430 430" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M50 324 C79 305 99 352 135 314 S195 278 186 233 S255 180 226 135 S288 67 348 113" stroke="#d8e6dc" stroke-width="66" stroke-linecap="round"/><path d="M50 324 C79 305 99 352 135 314 S195 278 186 233 S255 180 226 135 S288 67 348 113" stroke="#72968a" stroke-width="3" stroke-dasharray="6 9" stroke-linecap="round"/><circle cx="50" cy="324" r="21" fill="#173c43" stroke="#f7f4ee" stroke-width="6"/><circle cx="50" cy="324" r="6" fill="#e4be83"/><circle cx="186" cy="233" r="19" fill="#fffdf9" stroke="#77998c" stroke-width="7"/><circle cx="226" cy="135" r="19" fill="#fffdf9" stroke="#d7a66d" stroke-width="7"/><circle cx="348" cy="113" r="23" fill="#d7a66d" stroke="#f7f4ee" stroke-width="6"/><path d="m338 113 8 8 13-17" stroke="#173c43" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg><span class="floating top">✦ Descobrir possibilidades</span><span class="floating bottom">◌ Cada passo importa</span></div></section><section class="section" aria-labelledby="why-title"><span class="eyebrow">O que você encontrará</span><h2 id="why-title">Clareza começa por perceber.</h2><div class="noticegrid"><article><h3>Observar</h3><p>Notar o que aconteceu e o que a mente acrescentou.</p></article><article><h3>Experimentar</h3><p>Explorar respostas possíveis sem certo ou errado absoluto.</p></article><article><h3>Escolher</h3><p>Identificar um próximo passo pequeno e realizável.</p></article></div></section><aside class="note">Esta é uma versão experimental não homologada para uso assistencial. O conteúdo é psicoeducativo e não substitui atendimento profissional, diagnóstico ou serviço de emergência. Você pode sair a qualquer momento.</aside>`; }
function card(j, i) { return `<article class="journey-card"><div class="num"><span>JORNADA 0${i + 1}</span><span>6 ETAPAS</span></div><span class="journey-mark" aria-hidden="true">${j.icon}</span><h3>${safeText(j.name)}</h3><p>${safeText(j.description)}</p><button class="btn secondary small" data-start="${j.id}">Começar jornada <span aria-hidden="true">↗</span></button></article>`; }
function selectView() { return `<section class="section"><span class="eyebrow">Escolha seu caminho</span><div class="section-head"><h1>Por onde você prefere começar?</h1><p class="lead">Cada jornada é independente. Você pode explorar uma de cada vez, repetir ou encerrar quando quiser.</p></div>${narrate('welcome')}<div class="cards cards-spaced">${journeys.map(card).join('')}</div><div class="note note-spaced">Protótipo não homologado para uso assistencial. As histórias são fictícias. Nenhuma resposta é enviada ou gravada automaticamente. As orientações não substituem uma avaliação profissional.</div></section>`; }
function board(j) { return `<aside class="panel board" aria-label="Progresso da jornada"><h3>SUA TRILHA · ${state.step + 1} DE 6</h3><div class="meter level-${state.step}" role="progressbar" aria-label="Progresso" aria-valuenow="${progressPercent(state.step)}" aria-valuemin="0" aria-valuemax="100"><div></div></div><div class="board-track">${j.challenges.map((c, i) => `<button class="tile ${i === state.step ? 'active' : i < state.step ? 'done' : ''}" data-step="${i}" ${i > state.step ? 'disabled' : ''} ${i === state.step ? 'aria-current="step"' : ''}><strong>${i < state.step ? '✓' : String(i + 1).padStart(2, '0')}</strong><span>${safeText(c.label)}</span></button>`).join('')}</div><p class="board-footer">Você pode voltar às etapas concluídas. Não existem pontos ou tempo limite.</p></aside>`; }
function audioForStep(j, step) { const mapping = { pensamentos: [j.introAudio, 'skill-fatos', 'skill-palavras', 'skill-incerteza', 'skill-fatos', 'skill-escolhas'], controle: [j.introAudio, 'skill-controle', 'skill-incerteza', 'skill-controle', 'skill-escolhas', 'skill-incerteza'], acao: [j.introAudio, 'skill-passo', 'skill-escolhas', 'skill-passo', 'skill-escolhas', 'skill-passo'] }; return (mapping[j.id] || [])[step] || j.introAudio; }
function playView() { const j = state.journey; const c = j.challenges[state.step]; const answer = state.answers[state.step]; return `<section class="journey-head"><span class="eyebrow">Jornada ${journeys.indexOf(j) + 1} de 3</span><h1>${safeText(j.name)}</h1><p class="lead">${safeText(j.description)}</p><div class="tools"><button class="tool" data-action="pause">Ⅱ Fazer uma pausa</button><button class="tool" data-action="select">⇤ Escolher outra jornada</button></div></section><div class="play">${board(j)}<section class="panel challenge" aria-labelledby="challenge-title"><span class="step-info">Etapa ${state.step + 1} · ${safeText(c.skill)}</span><h2 id="challenge-title" tabindex="-1">${safeText(c.title)}</h2><p class="scenario">${safeText(c.situation)}</p><p class="question">${safeText(c.question)}</p><div class="options" role="group" aria-label="Escolha uma resposta">${c.choices.map((x, i) => `<button class="option ${answer === i ? 'selected' : ''}" data-choice="${i}" aria-pressed="${answer === i}"><span class="circle" aria-hidden="true">${answer === i ? '✓' : ''}</span><span>${safeText(x.text)}</span></button>`).join('')}</div>${answer !== null ? `<div class="feedback" role="status"><strong>Para refletir</strong><p>${safeText(c.choices[answer].feedback)}</p><small>${safeText(c.choices[answer].reflection)}</small></div>` : ''}<div class="game-actions"><button class="btn quiet" data-action="previous" ${state.step === 0 ? 'disabled' : ''}>← Voltar</button><button class="btn primary" data-action="next" ${answer === null ? 'disabled' : ''}>${state.step === 5 ? 'Concluir jornada' : 'Próxima etapa →'}</button></div></section></div><section class="section">${narrate(audioForStep(j, state.step))}</section>`; }
function finishView() { const j = state.journey; return `<section class="panel finish"><div class="seal" aria-hidden="true">✧</div><span class="eyebrow">Jornada concluída</span><h1>Um passo de cada vez.</h1><p class="lead">Você explorou seis situações e diferentes formas de interpretá-las e responder a elas. Não precisa sentir algo diferente agora para que a reflexão tenha valor.</p><div class="reflection"><strong>Ideia para levar com você</strong><p>${safeText(j.takeaway)}</p></div><div class="field"><label for="next-step">Qual atitude pequena você gostaria de experimentar? <span class="muted">(opcional)</span></label><textarea id="next-step" maxlength="300" placeholder="Exemplo: separar dez minutos para organizar uma conversa...">${safeText(state.action)}</textarea><small>Este texto permanece apenas nesta página enquanto ela estiver aberta. Não é salvo automaticamente.</small></div><div class="actions"><button class="btn primary" data-action="export">↓ Salvar minha reflexão</button><button class="btn secondary" data-action="select">Explorar outra jornada</button><button class="btn quiet" data-action="restart">Repetir esta jornada</button></div><hr class="bar">${narrate('ending')}<p class="stop-note finish-note">Material psicoeducativo, sem pontuação psicológica, diagnóstico ou avaliação clínica individualizada.</p></section>`; }
function helpView() { return `<article class="help"><span class="eyebrow">Sobre o projeto</span><h1>Um espaço para explorar, sem cobranças.</h1><section><h2>Como funciona?</h2><p>Escolha uma das três jornadas, leia uma situação fictícia e selecione a resposta que deseja explorar. Receba uma explicação e avance quando estiver pronto. Você pode voltar, pausar e recomeçar sem consequências.</p></section><section><h2>Privacidade por padrão</h2><p>Não exigimos nome, conta, telefone ou e-mail. Suas escolhas permanecem temporariamente na memória desta página e são descartadas ao recarregá-la ou fechá-la. Não existem cookies analíticos, banco de dados clínicos ou envio automático de respostas.</p><p>Se escolher salvar um resumo, seu próprio navegador criará um arquivo de texto. Após o download, você controla onde ele será armazenado ou compartilhado.</p></section><section><h2>Áudio e acessibilidade</h2><p>A narração opcional utiliza, nesta versão demonstrativa, a voz disponível no dispositivo, cuja naturalidade pode variar. Os 12 roteiros estão escritos e podem ser lidos sem ativar o som. Nenhum áudio começa automaticamente. Você também pode usar o teclado e reduzir animações pelas preferências do dispositivo.</p></section><section><h2>Limites de utilização</h2><p>Este recurso oferece psicoeducação e reflexão; não é teste psicológico, psicoterapia, diagnóstico, avaliação de risco ou atendimento de crise. Se o conteúdo causar desconforto, interrompa a atividade e procure apoio profissional. Em situação de risco imediato, procure atendimento de urgência local. No Brasil, o CVV atende pelo número 188 para apoio emocional.</p></section><section><h2>Sobre esta versão</h2><p>Trilha da Clareza · Protótipo funcional 0.1.0, sujeito a homologação clínica, técnica e de acessibilidade antes de oferta como recurso assistencial.</p></section><button class="btn primary" data-action="select">Ver jornadas →</button></article>`; }
function pauseView() { return `<div class="pause-bkg"><section class="pause-modal" role="dialog" aria-modal="true" aria-labelledby="pause-title"><span class="eyebrow">Você decide o ritmo</span><h2 id="pause-title">Uma pausa também é uma escolha.</h2><p class="lead">Se desejar, observe o apoio do corpo, note três elementos ao redor e reserve um momento antes de continuar. Não é necessário modificar a respiração ou atingir uma sensação específica.</p>${narrate('grounding')}<div class="actions"><button class="btn primary" data-action="resume">Continuar jornada</button><button class="btn secondary" data-action="select">Encerrar esta jornada</button></div><p class="stop-note">Se este exercício não for confortável, você pode simplesmente ignorá-lo e encerrar.</p></section></div>`; }
function render() { if (state.screen === 'play' && !state.journey)
    state.screen = 'select'; const contents = state.screen === 'home' ? homeView() : state.screen === 'select' ? selectView() : state.screen === 'play' ? playView() : state.screen === 'finish' ? finishView() : helpView(); shell(contents); renderAudioButtons(); }
function focusMain() { const focusTarget = (state.screen === 'play' ? root.querySelector('#challenge-title') : root.querySelector('#main-content')); focusTarget?.focus({ preventScroll: true }); }
function announce(text) { let node = document.getElementById('announcer'); if (!node) {
    node = document.createElement('div');
    node.id = 'announcer';
    node.className = 'sr-only';
    node.setAttribute('role', 'status');
    document.body.appendChild(node);
} node.textContent = text; }
function go(screen) { stopAudio(); state.screen = screen; state.paused = false; state.audioExpanded = false; render(); focusMain(); }
function start(id) { const j = journeys.find(j => j.id === id); if (!j)
    return; stopAudio(); state.journey = j; state.step = 0; state.answers = Array(6).fill(null); state.action = ''; go('play'); }
function next() { if (state.answers[state.step] === null)
    return; stopAudio(); if (state.step === 5) {
    go('finish');
    return;
} state.step++; state.audioExpanded = false; render(); focusMain(); }
function exportLocal() { if (!state.journey)
    return; const value = document.getElementById('next-step')?.value || ''; state.action = value; const text = exportSummary(state.journey, state.answers, value); const blob = new Blob([text], { type: 'text/plain;charset=utf-8' }); const url = URL.createObjectURL(blob); const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'trilha-da-clareza-reflexao.txt'; document.body.appendChild(anchor); anchor.click(); anchor.remove(); URL.revokeObjectURL(url); announce('Resumo gerado localmente. Verifique os downloads do seu dispositivo.'); }
root.addEventListener('click', event => { const target = event.target; const button = target.closest('button,[data-action]'); if (!button)
    return; event.preventDefault(); const d = button.dataset; if (d.audio) {
    playAudio(d.audio);
    return;
} if (d.start) {
    start(d.start);
    return;
} if (d.choice !== undefined && state.screen === 'play') {
    state.answers[state.step] = Number(d.choice);
    state.audioExpanded = false;
    render();
    root.querySelector(`[data-choice=\"${d.choice}\"]`)?.focus({ preventScroll: true });
    return;
} if (d.step !== undefined && state.screen === 'play') {
    const n = Number(d.step);
    if (n >= 0 && n <= state.step) {
        stopAudio();
        state.step = n;
        render();
        focusMain();
    }
    return;
} switch (d.action) {
    case 'home':
        go('home');
        break;
    case 'select':
        go('select');
        break;
    case 'help':
        go('help');
        break;
    case 'transcript':
        state.audioExpanded = !state.audioExpanded;
        render();
        break;
    case 'pause':
        stopAudio();
        state.paused = true;
        render();
        root.querySelector('.pause-modal [data-action=resume]')?.focus();
        break;
    case 'resume':
        stopAudio();
        state.paused = false;
        render();
        root.querySelector('[data-action=pause]')?.focus();
        break;
    case 'previous':
        if (state.step > 0) {
            stopAudio();
            state.step--;
            render();
            focusMain();
        }
        break;
    case 'next':
        next();
        break;
    case 'export':
        exportLocal();
        break;
    case 'restart':
        if (state.journey)
            start(state.journey.id);
        break;
    default: break;
} });
root.addEventListener('input', event => { const target = event.target; if (target.id === 'next-step')
    state.action = target.value; });
document.addEventListener('keydown', event => { if (!state.paused)
    return; if (event.key === 'Escape') {
    event.preventDefault();
    stopAudio();
    state.paused = false;
    render();
    root.querySelector('[data-action=pause]')?.focus();
    return;
} if (event.key === 'Tab') {
    const controls = Array.from(root.querySelectorAll('.pause-modal button:not([disabled])'));
    if (!controls.length)
        return;
    const first = controls[0], last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
    }
    else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
    }
} });
window.addEventListener('pagehide', () => stopAudio());
render();
