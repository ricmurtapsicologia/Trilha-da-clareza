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
| 1. Conteúdo clínico | 3 jornadas / 18 desafios / 54 alternativas / 12 roteiros presentes; exame editorial preliminar | Revisão preliminar; aprovação profissional pendente | Aprovação clínica registrada |
| 2. Design Thinking, UX/UI | 8 capturas atuais, correções de leitura/ajuda móvel/foco e 756 verificações candidatas HTTP + 600 verificações públicas HTTPS | Técnica concluída; teste com usuários pendente | Pesquisa formativa supervisionada, acessibilidade assistiva e Gate 1 clínico |
| 3. Fundação técnica | TypeScript 5.8.3 fixado + package-lock, npm ci, contrato de arquivos dist/ recompiláveis, workflow de bootstrap removido do PR, testes de arquitetura e documentação ADR-003 | Concluída tecnicamente após CI | Build determinístico + testes aprovados, sem alterações na main |
| 4. Motor e interface | Funções puras de validação de resposta/etapas, controle da conclusão, retomada em memória e pausa segura; 33 testes Node + E2E candidato com 820 verificações HTTP e 600 públicas HTTPS | Concluída tecnicamente na ramificação candidata | CI verde; sem liberação clínica automática |
| 5. Voz TTS | 12 roteiros; 12 amostras neurais v1 e 12 amostras v2 com duração/SHA verificados, pausa 63,32 s; voz Faber sem licença-base esclarecida; nenhum MP3 na página | Parcial, sem liberação | Licença completa comprovada + escuta/perceptual QA + validação clínica + integração acessível |
| 6. Segurança e acessibilidade | CSP/referrer retificados, descrição de logs de hospedagem, TTS limitado às vozes locais, contraste aprimorado, 21 cenários axe-core sem violação automatizada, 0 cookies/storage/recursos externos no teste; 40 testes Node PASS | Automatização concluída; gate assistivo/privacidade real aberto | Leitor de tela e celular físico, análise de headers/hospedagem e enquadramento LGPD |
| 7. Auditorias | CI, smoke HTTPS e E2E real em 4 viewports, 3 jornadas e controles de navegação aprovados | Parcial | 30/30 integral + leitor de tela e validação clínica |
| 8. Piloto | Não iniciado | Bloqueada | Consentimento, avaliação clínica, governança do piloto |
| 9. Liberação para pacientes | GitHub Pages tecnicamente implantado; produto informa protótipo não homologado | Bloqueada | Gates 1,5,6,7,8 aprovados e autorização expressa |

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
