# Rodada de homologação — revisão preliminar do conteúdo

**Trilha da Clareza, 15/10/2026. Status: PRÉ-REVISÃO EDITORIAL/SEGURANÇA. NÃO HOMOLOGADO CLINICAMENTE.**

Foi realizada uma leitura preliminar de **18 desafios e 12 roteiros** do `src/content.ts` (blob SHA `d10b3673ccf06c2251020a64a743b7013fd3a263`). Cada desafio possui 3 alternativas e devolutivas, totalizando **54 escolhas**. A matriz estruturada desta revisão está em `docs/HOMOLOGACAO_TRIAGEM_CLINICA.json`. A folha completa de texto linha a linha permanece em `docs/REVISAO_CLINICA_ITEM_A_ITEM.md`.

## Resultado desta leitura

**Nenhum item aprovado formalmente.** `clinical_review=PENDENTE` em todos os 30 itens (18 desafios + 12 roteiros), porque esta etapa não substitui o aceite profissional. Há sinais de atenção para situações com **perigo real, violência e coerção**, particularmente `p4`, `c2`, `c3`, `a3`. Isso não significa que esses textos estejam necessariamente incorretos: já receberam ressalvas, mas é preciso decidir se a formulação e a abrangência são suficientes.

| Eixo | IDs | Questão a decidir na revisão profissional |
|---|---|---|
| Fatos e interpretações | p1–p6 | Evitar que técnicas de questionamento sejam confundidas com negação de sinais reais de perigo. Revisar p4 e p6 especialmente. |
| Controle e incerteza | c1–c6 | Não reduzir sinais de urgência a ansiedade; revisão prioritária de c2 (familiar atrasado), c3 (conflitos familiares) e c5 (verificação de segurança). |
| Ação | a1–a6 | Não pressionar atuação sob ameaça, coerção ou sofrimento intenso; rever a2, a3 e a4. |
| Transcrições e voz | 12 IDs | Equivalência texto/voz; direitos da voz; naturalidade, pausas e instruções que possam agravar desconforto. |
| Pausa somática | grounding | Não exigir atenção à respiração/corpo de quem não deseja; permitir leitura/encerramento imediato; testar pausas pelo sentido da frase. |

## Matriz de atenção por desafio

- **p1 — Baixo:** Distinguir observação de inferência; não afirmar intenção alheia.
- **p2 — Baixo:** Não apresentar previsão catastrófica como confirmação; revisar termos absolutos.
- **p3 — Baixo:** Autocrítica e generalizações; evitar enquadrar emoção como erro.
- **p4 — Médio:** O exemplo de conversar pode ser inseguro com violência/ameaça; salvaguarda já incluída, exige aceite.
- **p5 — Baixo:** Equilíbrio entre autorresponsabilidade e crítica não punitiva.
- **p6 — Médio:** Distanciamento cognitivo não pode ser interpretado como obrigação de tolerar perigo concreto.
- **c1 — Baixo:** Limites interpessoais e agência sem controle de terceiros.
- **c2 — Alto:** Atraso de familiar pode significar emergência real: checar risco e contexto antes de minimizar preocupação.
- **c3 — Alto:** Responsabilidade familiar, abuso e coerção; salvaguarda presente, revisar caso específico.
- **c4 — Médio:** Tomada de decisão sem pressão para agir se houver risco.
- **c5 — Médio:** Evitar desencorajar verificações necessárias para segurança.
- **c6 — Baixo:** Não caracterizar incerteza como garantia de desfecho benigno.
- **a1 — Baixo:** Priorização flexível, sem exigência de desempenho.
- **a2 — Médio:** Conversas em casa devem admitir contextos inseguros; comunicação não é obrigação.
- **a3 — Alto:** Comunicação sob ameaça ou violência: mensagem já condicionada à segurança, revisar.
- **a4 — Médio:** Ativação comportamental: linguagem não prescritiva, ritmos, sofrimento intenso.
- **a5 — Baixo:** Aprendizado com tentativa sem associar fracasso a valor pessoal.
- **a6 — Baixo:** Preservar direito de não agir imediatamente ou de encerrar.

## Revisão dos 12 roteiros

- **welcome — Baixo:** Sem expectativa de efeito terapêutico; livre interrupção.
- **intro-pensamentos — Baixo:** Distinção entre fatos e interpretações sem invalidar emoções.
- **intro-controle — Baixo:** Controle proporcional, sem responsabilização por terceiros.
- **intro-acao — Médio:** Cuidado com mensagens de ativação quando a pessoa estiver em crise.
- **skill-fatos — Baixo:** Exemplo didático, não concluir motivação de terceiros.
- **skill-controle — Médio:** Não confundir autonomia com segurança em contexto de abuso.
- **skill-passo — Baixo:** Convite flexível, não obrigação.
- **skill-palavras — Baixo:** Evitar afirmações universais sobre padrões cognitivos.
- **skill-incerteza — Alto:** Frase sobre dúvida não ser perigo confirmado precisa ressalva explícita para risco concreto.
- **skill-escolhas — Médio:** Benefício hipotético, sem prometer eficácia ou resultados.
- **grounding — Alto:** Focar sensações corporais pode causar desconforto; saída opt-in, sem exigência de respirar ou concluir; pausas semânticas precisam escuta.
- **ending — Baixo:** Sem promessa de melhora; encerramento claro e voluntário.

## Procedimento de aceite ainda necessário

1. Psicólogo responsável examina **cada cenário, pergunta, alternativa, feedback, reflexão e transcrição completa**, com atenção aos contextos de crise, violência e riscos para terceiros.
2. Para cada item: `APROVADO`, `CORRIGIR`, `REPROVADO`, motivo e referências clínicas; registrar aceite em ambiente adequado, fora de arquivo público com dados pessoais.
3. Implementar hotfixes, revalidar a fonte, vincular o parecer ao novo SHA e reexecutar E2E.
4. Uma mudança clínica substantiva **invalida o aceite anterior** até nova revisão. A escala de atenção é editorial, não instrumento diagnóstico e não mede probabilidade de dano.

**Gate clínico continua ABERTO.** Nenhuma promessa de eficácia psicoterapêutica, avaliação psicométrica ou benefício foi validada por esta análise.
