# Execução por ondas — Trilha da Clareza

Data de referência: 15/10/2026. Versão-base: MVP 0.1.0. Esta documentação **não representa autorização de uso clínico**.

## Governança
- Repositório próprio: `ricmurtapsicologia/Trilha-da-clareza`; nenhuma alteração nos demais projetos.
- Produção principal: `main`. Revisões em `auditoria/ondas-mvp-20261015` até nova homologação.
- Não utilizar dados, nomes, textos de sessão ou prontuários de pacientes.
- Não ativar serviços pagos, dados persistentes, telemetria ou TTS remoto sem análise de riscos e autorização.
- Somente após revisão clínica e aprovação explícita considerar envio da página para pacientes.

## Matriz de ondas e gates

| Onda | Evidência verificada | Situação | Critério para avançar |
|---|---|---|---|
| 0. Governança | Arquitetura isolada, GitHub público sem dados clínicos, gates de liberação documentados | Concluída para desenvolvimento | Documentação e rastreabilidade |
| 1. Conteúdo clínico | Triagem editorial adicional de 18 desafios e 12 roteiros, riscos p4/c2/c3/a3 e grounding documentados; 54 devolutivas na folha integral | Triagem preparada, aceite clínico formal pendente | Responsável avalia todos os textos e aprova versão/SHA em ambiente apropriado |
| 2. Design Thinking, UX/UI | UX corrigida; prévia offline independente HTML com 81 verificações sintéticas em 3 viewports para facilitar inspeção física | Técnica concluída; validação humana ainda pendente | Testar em dispositivo físico autorizado; pesquisa formativa após liberação dos gates aplicáveis |
| 3. Fundação técnica | TypeScript 5.8.3 fixado + package-lock, npm ci, contrato de arquivos dist/ recompiláveis, workflow de bootstrap removido do PR, testes de arquitetura e documentação ADR-003 | Concluída tecnicamente após CI | Build determinístico + testes aprovados, sem alterações na main |
| 4. Motor e interface | Funções puras de validação de resposta/etapas, controle da conclusão, retomada em memória e pausa segura; 33 testes Node + E2E candidato com 820 verificações HTTP e 600 públicas HTTPS | Concluída tecnicamente na ramificação candidata | CI verde; sem liberação clínica automática |
| 5. Voz TTS | 12 roteiros; 12 amostras neurais v1 e 12 amostras v2 com duração/SHA verificados, pausa 63,32 s; voz Faber sem licença-base esclarecida; nenhum MP3 na página | Parcial, sem liberação | Licença completa comprovada + escuta/perceptual QA + validação clínica + integração acessível |
| 6. Segurança e acessibilidade | CSP/referrer retificados, descrição de logs de hospedagem, TTS limitado às vozes locais, contraste aprimorado, 21 cenários axe-core sem violação automatizada, 0 cookies/storage/recursos externos no teste; 40 testes Node PASS | Automatização concluída; gate assistivo/privacidade real aberto | Leitor de tela e celular físico, análise de headers/hospedagem e enquadramento LGPD |
| 7. Auditorias | 30 controles rastreados em JSON, correção de descarte, E2E HTTP/HTTPS em quatro larguras, axe-core em 21 cenários e sondagem de cabeçalhos HTTPS; 15 PASS, 14 PARCIAL, 1 BLOQUEADO | Execução técnica de auditoria concluída; gate 30/30 integral aberto | Gates clínico/áudio/assistivo/hospedagem/piloto e novos testes na main após merge autorizado |
| 8. Piloto | Protocolo de piloto, consentimento modelo, checklist de prontidão e roteiro de ensaio sintético preparados; nenhum participante ou paciente envolvido | Preparação executada; piloto humano BLOQUEADO | Aprovação clínica, segurança/acessibilidade, licença, LGPD, decisão ética, consentimento e supervisão antes de qualquer recrutamento |
| 9. Liberação para pacientes | Checklist GO/NO-GO, verificador fail-closed, hashes SHA-256, fluxo de corte e rollback documentados, sem alterações em main | Preparação técnica concluída sob CI; distribuição clínica BLOQUEADA | Fechar gates clínicos/assistivos/privacidade/áudio/piloto, obter aceite e autorizar publicação específica |

## Riscos monitorados
- **Alto:** publicação da demo ser interpretada como oferta assistencial homologada. Controle: manter aviso explícito e não divulgar a pacientes.
- **Alto:** técnicas e devolutivas clínicas divulgadas sem revisão profissional. Controle: gate clínico.
- **Médio:** voz do navegador variar ou depender de serviços do dispositivo. Controle: manter narração opcional e transcrição; TTS neural somente após aprovação/licença.
- **Médio:** navegação inacessível por teclado/leitor de tela no fluxo de pausa. Controle: testes assistivos e ajustes antes da liberação.
- **Médio:** CSP por meta não implementa `frame-ancestors`; GitHub Pages não oferece cabeçalhos customizados por arquivo. Controle: não afirmar proteção anti-iframe confirmada.
- **Médio:** E2E offline não reflete integralmente hospedagem. Controle: teste remoto e celular real.
- **Baixo:** mudanças involuntárias em projetos externos. Controle: mudanças somente neste repositório.

## Evidências disponíveis
- Workflow GitHub "Validar MVP": aprovado em 15/10/2026.
- Workflow GitHub "pages build and deployment": aprovado em 15/10/2026.
- GitHub Actions: `npm run typecheck`, `npm run build` e `npm test` aprovados; 21/21 testes unitários/de qualidade registrados.
- Local: `python tests/browser_e2e.py` aprovada com 106 verificações, via carregador offline.
- Tentativa de servidor local HTTP com Chromium: bloqueada por política do ambiente (`ERR_BLOCKED_BY_ADMINISTRATOR`). **Não é teste aprovado nem falha da aplicação.**
- Smoke HTTPS da versão pública executado pelo GitHub Actions: **PASS**, seis recursos e verificações mínimas, run 38732817549.
- E2E Chromium por HTTP local da versão candidata: **756 verificações PASS**; E2E Chromium HTTPS da versão pública: **600 verificações PASS**, em 320/390/768/1366 px, run 38738542007.
- Evidência visual: 8 screenshots em artifact GitHub `onda2-ux-mobile-desktop-nao-homologado`, ID 11974704300.
- E2E do navegador executado nos runners do GitHub Actions; **não** constitui validação com leitor de tela ou aparelho físico.
- Ambiente de navegador externo original continua restrito; esse bloqueio não invalida a evidência de navegador do runner.

## Decisão
Autorizar continuidade de desenvolvimento e documentação. **Não** autorizar homologação clínica ou distribuição a pacientes nesta fase.

## Onda 3 — Reconciliação arquitetural
- Decisão: manter SPA estática com TypeScript e ES modules; React/Vite não são pré-requisitos para o MVP, conforme `docs/ONDA_3_ARQUITETURA_REPRODUTIBILIDADE.md`.
- Identificada e corrigida divergência de formatação de 1 byte entre `src/app.ts` compilado e `dist/app.js` rastreado.
- Automação agora executa `npm ci`, `npm run typecheck`, `npm run build` e `npm run verify:build`.
- Workflow de bootstrap com escopo `contents:write` excluído da ramificação de revisão, não ainda de `main`.
- Teste Node de arquitetura incorporado ao `npm test`.
- Gate técnico em princípio atendido, condicionado à verificação de CI no último commit; os gates clínicos/assistivos de outras ondas permanecem inalterados.

## Onda 4 — Contratos de estado e regressão
- `src/domain.ts`: `validChoice`, `recordChoice`, `canAdvance`, `canVisit` e `journeyComplete`; módulo compilado sincronizado.
- `src/app.ts`: impedidos avanços sem resposta e conclusões incompletas, bloqueados cliques no fundo da pausa, acrescentada retomada de jornada ativa em início/ajuda/seleção.
- `tests/engine.test.mjs`: sete testes de invariantes, erros de índice, imutabilidade, conclusão e revisão de escolhas.
- `tests/hosted_e2e.py`: casos novos de retomada, reinício, resposta forjada, pausa e continuidade em 4 larguras.
- Run [38743040272](https://github.com/ricmurtapsicologia/Trilha-da-clareza/actions/runs/38743040272): **33/33 testes Node**, **820 verificações HTTP da candidata**, **600 verificações HTTPS na main atual**, verificação de equivalência `src/`→`dist/` aprovada.
- Critérios e transições detalhados em `docs/ONDA_4_MOTOR_DE_ESTADOS.md`.
- **Gate 4: tecnicamente fechado; sem merge e sem homologação para pacientes.**

## Onda 6 — Segurança, privacidade e acessibilidade (15/10/2026)
- Código modificado **somente na ramificação candidata**: referrer `no-referrer` explícito; retirada da falsa garantia de `frame-ancestors` em meta CSP (não funciona nesse contexto); CSP continua bloqueando `connect-src` e JavaScript externo.
- Os avisos esclarecem que a hospedagem GitHub Pages pode registrar dados técnicos de acesso (IP e horário), embora **nenhuma escolha do jogo seja enviada pelo aplicativo**.
- Prévia de narração `speechSynthesis` agora exige voz `pt-BR` com `localService=true`; ausência oferece orientação para a transcrição, evitando seleção deliberada de voz remota.
- Correção de contraste no token terracota `--clay` (`#ac5953`), além das melhorias anteriores de foco e caixa modal.
- Auditoria axe-core 4.10.3, tags WCAG 2.0/2.1/2.2 A/AA, `bypass_csp` **apenas para injetar o motor de testes**: 21 cenários (3 viewports × 7 telas/estados), **0 violações detectadas automaticamente**. Esse achado não certifica WCAG 2.2 AA nem acessibilidade com leitor de tela real.
- Smoke de privacidade no navegador candidato: nenhum cookie, armazenamento local/de sessão vazio e nenhuma requisição a host externo no fluxo ensaiado. Requisições normais ao GitHub Pages e seus eventuais logs técnicos continuam fora do controle do aplicativo.
- CI [38750691926](https://github.com/ricmurtapsicologia/Trilha-da-clareza/actions/runs/38750691926) após correção de contraste: 40/40 Node, 21 cenários axe sem violação automática, 820 E2E HTTP candidato e 600 E2E HTTPS main, jobs integralmente aprovados.
- Evidências detalhadas e limites: `docs/ONDA_6_SEGURANCA_PRIVACIDADE_ACESSIBILIDADE.md`.
- **Gate 6 permanece aberto** para teste assistivo humano, mobile físico, análise LGPD/hospedagem e verificação de cabeçalhos no domínio final. Nenhum merge e nenhuma autorização de uso clínico.

## Onda 7 — Auditoria 30/30 e hotfix de encerramento
- Documento de referência: `docs/AUDITORIA_CANONICA_30_20261015.md` e matriz legível para máquina `docs/AUDITORIA_ONDA7_MACHINE.json`.
- Controles avaliados: **30/30**, dos quais **15 PASS técnicos, 14 PARCIAIS e 1 BLOQUEADO**; não equivale a 30/30 aprovados.
- Hotfix: ao clicar em `Encerrar e descartar respostas`, informações da jornada ativa são descartadas da memória; navegação simples permite retomar, quando intencional. E2E real da candidata cobre ambas as decisões.
- Sondeamento HTTP (seis recursos 200 e ausente 404) no Pages: HSTS presente, sem cabeçalhos CSP e X-Frame-Options observados na resposta; o HTML possui meta CSP parcial. Anti-iframe permanece lacuna de infraestrutura.
- Evidências automatizadas completas: compilação, controle de dist, Node, Playwright candidato e hospedado, 21 cenários axe e relatório de cabeçalhos gerados no CI.
- **Sem merge em main; sem homologação clínica.**

## Onda 8 — Preparação do piloto supervisionado
- Artefatos: `docs/ONDA_8_PROTOCOLO_PILOTO.md`, `docs/ONDA_8_INSTRUMENTOS.md`, `docs/ONDA_8_READINESS.json`.
- Teste sintético sem pessoas: `tests/wave8_synthetic.py`; evidencia apenas o funcionamento dos fluxos e o descarte em memória, **não** compreensão, aceitabilidade, segurança clínica ou eficácia.
- Governança: sem recrutamento, convite, pacientes, dados pessoais, formulários reais, registros em sistemas externos ou consentimentos coletados.
- Critérios clínicos, licenças TTS, acessibilidade assistiva, hospedagem e enquadramento ético/legal continuam pendentes.
- **Gate 8: NÃO INICIADO para seres humanos; preparação documental e técnica em execução e sujeita à validação CI.**

## Onda 9 — Pré-publicação e estabilização
- Documentados `docs/ONDA_9_PLANO_PUBLICACAO_ROLLBACK.md`, `docs/ONDA_9_GO_NO_GO.json`, `scripts/release_preflight.mjs` e `tests/wave9_release_gate.test.mjs`.
- Critério **NO-GO**: 12 gates da Onda 8, 30/30 controles canônicos, 8 autorizações de release e piloto humano apropriado pendentes. Ferramenta produz relatório sem dados pessoais e SHA-256 de 6 arquivos estáticos.
- `node scripts/release_preflight.mjs --require-ready` falha por desenho enquanto a liberação não estiver legitimamente autorizada. Nenhuma ferramenta modifica main, mescla PR, envia mensagens, recruta participantes ou distribui página clínica.
- Rollback planejado por PR de reversão, sem force push, sem dados de pacientes em issues ou logs. O GitHub Pages permanece uma demonstração.
- **Onda 9: execução de pré-publicação técnica sujeita ao último CI; o GO clínico permanece bloqueado.**

## Homologação cruzada — primeira rodada de fechamento (15/10/2026)
- Triagem de 18 desafios e 12 scripts em `docs/HOMOLOGACAO_TRIAGEM_CLINICA.json`, com comentários por ID e riscos de coação, violência, risco real e pausa somática. Todos os itens continuam **PENDENTE** de aceite profissional.
- Fontes normativas e limites de GitHub Pages: `docs/HOMOLOGACAO_NORMAS_HOSTING.md`. Docs oficiais limitam uso como hospedagem gratuita de negócio/SaaS; não declarar que o demo gratuito atual seja automaticamente irregular, mas exigir análise de finalidade profissional.
- Protocolo assistivo/físico com 12 tarefas ainda sem execução: `docs/HOMOLOGACAO_TESTE_FISICO.md`.
- Prévia **offline**, autocontida com CSP hash, gerada em `scripts/build_review_offline.mjs`. Testes `tests/offline_review_package.test.mjs` e `tests/offline_review_e2e.py`; Chromium arquivo local sem requisições externas. A prévia é para **revisor**, não paciente, e não prova o funcionamento dos cabeçalhos de Pages.
- Status geral sem mudanças artificiais: 15 PASS técnicos, 14 PARCIAIS, 1 BLOQUEADO; 12/12 gates de piloto e 8/8 autorizações finais continuam pendentes.
- Liberação em `main`: **não realizada**. PR #1 permanece rascunho; manter **NO-GO** clínico até coleta e aceite de evidências reais.

## Decisão de distribuição do código para demonstração pública
- Em 15/10/2026, o proprietário autorizou colocar **a versão tecnicamente mais completa no GitHub**. Tal solicitação autoriza atualizar a demonstração GitHub Pages, **não** iniciar piloto, fornecer a pacientes nem alegar homologação clínica.
- A existência do gate `merge_authorized=false` em `ONDA_9_GO_NO_GO.json` refere-se à **autorização de lançamento clínico**, não à manutenção técnica da demo pública já existente. Manter `NO_GO` para pacientes, sem exceção.
- Os resultados de CI na candidata e o smoke pós-merge devem ser documentados separadamente. Atualizações na `main` não comprovam eficácia, segurança clínica ou adequação contratual do GitHub Pages.
