# Onda 7 — Auditoria canônica 30/30, estado em 15/10/2026

**Regra:** 30 controles nomeados, sem transformar controles parciais em PASS. A matriz abaixo adapta o protocolo canônico institucional/técnico ao produto web de saúde mental. A auditoria **não está aprovada** para liberação assistencial.

| # | Controle canônico | Status | Evidência ou lacuna |
|---:|---|---|---|
| 01 | Smoke | PASS local | Aplicação abre no carregador offline e navega; 106 verificações |
| 02 | Pinpoint | PASS local | 18 desafios / 54 escolhas inspecionáveis, cenários rastreáveis por ID |
| 03 | Deep audit | PARCIAL | Auditoria de rede HTTP/HTTPS e headers reais indisponível |
| 04 | Consistency | PASS local | Conteúdo estruturado, validações de 3 jornadas e 12 roteiros |
| 05 | Contradiction | PARCIAL | Quatro hotfixes feitos; revisão clínica independente pendente |
| 06 | Completeness | PARCIAL | Faltam MP3 TTS e aprovação do piloto |
| 07 | Traceability | PARCIAL | IDs e competências documentados; fonte clínica/formalização pendentes |
| 08 | Compliance | PARCIAL | LGPD por minimização no código; WCAG e termos da hospedagem pendentes |
| 09 | Regression | PASS local | 21 testes Node, 106 verificações e 220 verificações UX |
| 10 | Change-impact | PASS local | Quatro ajustes clínicos e UX retestados |
| 11 | Cross-reference | PASS local | IDs áudio/jornada/desafios validados e compilação íntegra |
| 12 | Link integrity | PASS local | Fluxos internos navegam; sem links externos do jogo críticos |
| 13 | Visual QA | PASS local | Capturas locais desktop e mobile; ajustes de contraste |
| 14 | Accessibility | PARCIAL | Foco, transcrição, inert e zoom preliminares; WCAG AA com leitor real pendente |
| 15 | Usability | PARCIAL | Testes funcionais não substituem teste com usuários |
| 16 | Cognitive-load | PARCIAL | Textos breves, ritmo livre; aceitação emocional não avaliada |
| 17 | Narrative-flow | PASS local | Jornadas completas do início ao encerramento |
| 18 | Red-team | PARCIAL | Riscos contextuais revisados; faltam ensaios de segurança clínica/UX |
| 19 | Edge-case | PASS local | Alternativas múltiplas, reinício, pausa e saída no teste disponível |
| 20 | Scenario stress | PASS local | 4 viewports x 3 jornadas x 6 desafios x 3 alternativas, 220 assertivas |
| 21 | Fact-check | PARCIAL | Mecanismos de TCC plausíveis; referências e revisão documental pendentes |
| 22 | Citation | PARCIAL | Não há bibliografia clínica versionada vinculada às mensagens |
| 23 | Source-to-claim | PARCIAL | Rastreabilidade técnico-científica para cada intervenção pendente |
| 24 | Legal defensibility | PARCIAL | Privacidade declarada; licenças TTS, hospedagem e avaliação legal pendentes |
| 25 | Decision-readiness | BLOQUEADO | Gates assistenciais não cumpridos; não divulgar a pacientes |
| 26 | Publication preflight | PARCIAL | GitHub Pages deployment e smoke HTTPS em CI (6 recursos) PASS; E2E de navegador real permanece não comprovado |
| 27 | Version-drift | PASS local/CI | Build e verificações do PR aprovados na automação |
| 28 | Canonical-template | PASS justificado | Produto independente; identidade própria; sem alteração de templates externos |
| 29 | Duplication/redundancy | PASS local | 3 jornadas, IDs únicos, 12 narrações gerenciadas em fonte única |
| 30 | Terminology | PARCIAL | Termos revistos preliminarmente; revisão final do psicólogo pendente |

**Apuração:** 14 PASS local/CI; 15 PARCIAL; 1 BLOQUEADO. **30/30 integral: NÃO ATINGIDO.**

## E2E e disponibilidade
- `npm run typecheck` e `npm run build`: PASS.
- `npm test`: 21/21 PASS.
- `python tests/browser_e2e.py`: 106/106 PASS (carregador offline).
- `python tests/ux_regression.py`: 220/220 PASS (carregador offline; 4 viewports, 54 combinações de cenário e escolha por viewport).
- Build e implantação do GitHub Pages: GitHub Actions marcou SUCCESS.
- Teste Chromium HTTP em loopback: **bloqueado pelo ambiente (`ERR_BLOCKED_BY_ADMINISTRATOR`)**; não equivale a falha de aplicação.
- Smoke HTTPS de leitura executado pelo GitHub Actions: **PASS**, seis recursos (index, CSS, JS e SVG) e verificações de identificação/CSP; execução 38732817549.
- E2E de interações em navegador na URL pública **não concluído**; não equivale ao smoke de GET.

## Gate de liberação
Não mesclar a ramificação de auditoria até review, reexecução de CI e decisão de liberação. Não homologar pacientes sem Gate 1 clínico, Gate 5 áudio, Gate 6 acessibilidade/privacidade real, Gate 7 E2E e 30/30, e Gate 8 piloto apropriado. A matriz 90/90 ampliada, quando exigida no procedimento de qualidade, também permanece **não executada integralmente**.
