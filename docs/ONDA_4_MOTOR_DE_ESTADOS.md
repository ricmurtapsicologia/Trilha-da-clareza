# Onda 4 — Motor interativo e máquina de estados

**Projeto:** Trilha da Clareza · MVP 0.1.0  
**Data:** 15/10/2026  
**Ambiente:** `auditoria/ondas-mvp-20261015`, PR #1. Sem merge e sem modificação da `main` hospedada.

## 1. Objetivo

Garantir uma experiência psicoeducativa não competitiva com três jornadas independentes, seis desafios por jornada, alternativas reflexivas, pausa voluntária, retomada temporária e encerramento condicionado à conclusão lógica das seis etapas. Não registrar respostas em servidor.

## 2. Desenho do domínio

`src/domain.ts` contém funções puras e testáveis, sem dependências de DOM nem E/S:

| Função | Contrato | Falha segura |
|---|---|---|
| `validChoice(choice,total)` | Alternativa é inteiro entre 0 e total-1 | Falso para NaN, Infinity, índice negativo, fora da faixa ou texto |
| `recordChoice(answers,step,choice,total)` | Retorna nova coleção com resposta válida | `null` e coleção original inalterada |
| `canAdvance(answers,step,total)` | Próxima etapa somente após resposta válida | Falso, incluindo etapa inexistente |
| `canVisit(answers,current,target)` | Voltar apenas a etapa já alcançada | Falso para etapa futura/fora da faixa |
| `journeyComplete(answers,expected,total)` | Seis respostas válidas antes de finalizar | Falso para sequência incompleta ou adulterada |

O módulo `src/app.ts` executa a navegação na interface, mas consulta essas funções antes de permitir escolhas, mudança de etapa e conclusão.

## 3. Matriz de transições

| Estado inicial | Evento | Pré-condição | Resultado |
|---|---|---|---|
| Início | Explorar jornadas | Sempre | Seleção |
| Seleção | Começar jornada | ID existente | Jogo, etapa 1; respostas vazias |
| Jogo | Escolher alternativa | Índice e etapa válidos | Feedback contextual, sem alterar as demais respostas |
| Jogo | Próxima etapa | Resposta válida, etapa 1–5 | Etapa seguinte |
| Jogo | Concluir | Etapa 6 e seis respostas válidas | Síntese final |
| Jogo | Voltar | Etapa anterior já alcançada | Retorno com escolha preservada |
| Jogo | Tentar saltar para o futuro | Nunca permitido | Permanece na etapa |
| Jogo | Pausa | Sempre | Diálogo modal; fundo inerte |
| Pausa | Clicar fundo | Não autorizado | Nenhuma navegação |
| Pausa | Continuar / Esc | Sempre | Volta à etapa e escolhas atuais |
| Jogo | Voltar para início, ajuda ou seleção | Sempre | Sessão preservada só na memória desta aba |
| Início/ajuda/seleção | Retomar jornada | Jornada iniciada e ainda não concluída | Retorno à etapa salva, sem recomeçar |
| Seleção | Começar outra jornada | ID existente | Nova sessão em memória; respostas antigas descartadas |
| Conclusão | Explorar outra jornada | Sempre | Seleção sem opção de retomar jornada já concluída |
| Conclusão | Repetir | Jornada conhecida | Etapa 1 com respostas vazias |
| Conclusão | Exportar reflexão | Ação voluntária | `.txt` gerado localmente; sem envio |
| Qualquer | Recarregar | Sempre | Reinício, nenhuma persistência |

## 4. Casos negativos testados

- Índices negativos, fracionários, fora da faixa, `NaN` e `Infinity`.
- Acesso a etapas futuras e inexistentes.
- Tentativa de conclusão com apenas cinco respostas ou opção inválida.
- Mudança de alternativa em etapa já respondida sem apagar outras respostas.
- Retomada após saída para seleção, ajuda e início.
- Reinício da jornada sem contaminação de escolhas anteriores.
- Tentativa de interação com o fundo durante o diálogo de pausa.
- Manutenção de privacidade: respostas apenas em RAM; arquivo gerado por download local voluntário.

## 5. Regressão automatizada

- `tests/engine.test.mjs`: contratos e invariantes da máquina de estados.
- `tests/hosted_e2e.py`: rotas completas, retomada, reinício, entradas forjadas, pausa e exportação, em quatro viewports.
- `tests/quality_gates.test.mjs`: guardrails gerais.
- `npm run verify:build`: código `src` recompilado igual ao `dist` versionado.
- E2E da versão candidata HTTP e smoke/E2E da versão pública HTTPS são separados: testes da versão pública não provam que hotfixes ainda em PR estão disponíveis nela.

## 6. Riscos residuais e gate

A Onda 4 só será considerada **tecnicamente concluída** após CI verde no commit final, incluindo os testes E2E candidatos. Não há alegações de eficácia psicológica, avaliação clínica, validade psicométrica ou acessibilidade certificada.

**Não liberar para pacientes:** continuam pendentes os gates clínicos (Onda 1), de pesquisa com usuários (Onda 2), TTS licenciado (Onda 5), acessibilidade assistiva (Onda 6), auditoria 30/30 integral (Onda 7) e piloto (Onda 8). O Pull Request permanece em rascunho.
