# Onda 7 — Auditoria canônica dos 30 controles (versão de 15/10/2026)

**Este é o resultado da auditoria de 30 controles, NÃO a aprovação de 30/30 controles.** O produto ainda não está homologado para uso com pacientes. A matriz legível deriva de `docs/AUDITORIA_ONDA7_MACHINE.json`. Alterações e evidências estão no PR #1, ainda sem merge.

## Estado por controle

| Nº | Controle | Resultado | Evidência ou limitação |
|---:|---|---|---|
| 01 | Smoke | PASS técnico | CI HTTP e HTTPS; navegador Chromium percorre telas |
| 02 | Pinpoint | PASS técnico | Identificação dos 18 desafios e 54 feedbacks por ID |
| 03 | Deep audit | PARCIAL | HTTP e rede testados; proteção anti-iframe e análise externa permanecem |
| 04 | Consistency | PASS técnico | Tipagem e validação dos objetos de jornada e áudio |
| 05 | Contradiction | PARCIAL | Ajustes de risco feitos; revisão clínica independente ausente |
| 06 | Completeness | PARCIAL | Módulo TTS não homologado, sem piloto |
| 07 | Traceability | PARCIAL | Matriz conteúdo e referências presentes, fundamentação individual pendente |
| 08 | Compliance | PARCIAL | Cookies/storage ausentes nos testes; LGPD e hospedagem não homologadas |
| 09 | Regression | PASS técnico | Build, 40 Node, E2E 820 candidata/600 pública antes da Onda 7 |
| 10 | Change-impact | PASS técnico | Testes de regressão para motor, UX e CSP |
| 11 | Cross-reference | PASS técnico | IDs de áudios e cenários validados |
| 12 | Link integrity | PASS técnico | Navegação interna e recursos HTTPS testados |
| 13 | Visual QA | PASS técnico | Oito capturas em 4 larguras, revisão heurística automatizada |
| 14 | Accessibility | PARCIAL | 21 cenários axe sem achados; teste humano assistivo pendente |
| 15 | Usability | PARCIAL | Sem pesquisa observacional com usuários |
| 16 | Cognitive-load | PARCIAL | Sem avaliação com pessoas, compreensão e conforto pendentes |
| 17 | Narrative-flow | PASS técnico | 3 jornadas chegam à conclusão em Chromium |
| 18 | Red-team | PARCIAL | Injeção inválida e pausa testadas; red-team clínico não realizado |
| 19 | Edge-case | PASS técnico | Reinício, descarte, opções inválidas e pausa testados na candidata |
| 20 | Scenario stress | PASS técnico | Diferentes larguras e fluxos; resultados CI atualizados após run |
| 21 | Fact-check | PARCIAL | Revisão bibliográfica clínica específica pendente |
| 22 | Citation | PARCIAL | Referências gerais disponíveis; citações por intervenção pendentes |
| 23 | Source-to-claim | PARCIAL | Alegações de benefício não validadas no jogo |
| 24 | Legal defensibility | PARCIAL | Licença TTS e análise da hospedagem pendentes |
| 25 | Decision-readiness | BLOQUEADO | Faltam gates clínicos, áudio licenciado, leitor de tela e piloto |
| 26 | Publication preflight | PASS técnico | GitHub Pages publicou demo; smoke/E2E HTTPS aprovados |
| 27 | Version-drift | PASS técnico | npm ci, typecheck, build e verificação exata de dist |
| 28 | Canonical-template | PASS técnico | Identidade exclusiva, sem alterações em projetos externos |
| 29 | Duplication/redundancy | PASS técnico | IDs únicos e conteúdo canônico tipado |
| 30 | Terminology | PARCIAL | Revisão clínica/editorial final pendente |

**Consolidação: 15 PASS técnicos, 14 PARCIAIS e 1 BLOQUEADO.** A proporção é informativa e não representa nota de aptidão clínica. Um único controle bloqueante impede a liberação assistencial.

## Procedimento e evidências

1. `npm ci`, typecheck, compilação `tsc`, sincronismo exato `src`→`dist`, testes Node de domínio, privacidade, conteúdo, arquitetura, estado e matriz de 30 controles.
2. `tests/hosted_e2e.py`: testes Chromium Playwright com quatro viewports (320, 390, 768 e 1366 px), três jornadas, escolha, pausa, retomada, conclusão, exportação e descarte. A versão candidata é servida por HTTP a partir do código do PR; a versão pública é consultada separadamente via HTTPS e **não** contém as correções do PR.
3. `tests/wave6_browser.py`: axe-core em 21 cenários, com ausência de violações automáticas detectadas; esse resultado não equivale a conformidade integral WCAG 2.2 AA.
4. `tests/wave7_http_probe.py`: seis recursos HTTP em cada ambiente, respostas 200, recurso inexistente 404, captura de tipos de mídia, hashes, cache e cabeçalhos de proteção. Saída JSON em artifact temporário do GitHub Actions, sem dados de usuários.
5. `tests/wave7_canonic.test.mjs`: auditoria estrutural dos 30 estados, incluindo impedimento de registrar 30 PASS sem os gates profissionais.

## Falhas e correções

### NF-7.1 — Encerramento não descartava respostas (corrigida na candidata)
Antes, `Encerrar esta jornada` era equivalente a sair para a seleção e permitia retomar dados em memória. A ação foi separada: `Encerrar e descartar respostas` agora zera jornada, respostas, etapa e reflexão e sai do diálogo; navegar para início/ajuda/seleção **sem encerrar** ainda permite retomar. A diferença é coberta por E2E HTTP em navegador real e testes de contrato.

### NF-7.2 — Proteção anti-iframe não demonstrada (aberta)
Na inspeção de seis recursos do Pages, a resposta da página apresentou **Strict-Transport-Security**, mas não apresentou cabeçalhos `X-Frame-Options` nem `Content-Security-Policy` enviados pelo servidor. A proteção `frame-ancestors` não funciona por meta CSP; remover sua declaração não equivale a corrigir o risco. É necessária avaliação da hospedagem e eventual migração para servidor que permita configurar cabeçalhos antes da liberação assistencial.

### NF-7.3 — Lacunas dependentes de aprovação (abertas)
Revisão clínica formal de 18 desafios e 54 devolutivas, licenciamento e qualidade dos 12 TTS, testes reais com TalkBack/NVDA/VoiceOver, revisão jurídica/LGPD, testes com celular físico e piloto apropriado. **Nenhum** item foi marcado PASS por inferência de testes funcionais.

## Separação dos ambientes

- **main**: publicação de demonstração existente; testes HTTPS dela não comprovam os hotfixes novos.
- **auditoria/ondas-mvp-20261015**: melhorias testadas em runner com servidor HTTP; sem merge.
- **GitHub Actions**: evidência técnica verificável; não substitui ensaio físico, análise jurídica ou revisão de conteúdo.
- **Onda 8**: não iniciar piloto com pacientes até liberação dos gates anteriores.

## Decisão

**Onda 7: execução técnica de auditoria concluída; gate canônico 30/30 integral ABERTO.** Não mesclar nem publicizar como atendimento assistencial. Não há promessa de eficácia terapêutica ou conformidade completa com LGPD/WCAG.
