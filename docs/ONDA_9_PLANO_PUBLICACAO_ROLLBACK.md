# Onda 9 — Pré-publicação, corte, rollback e estabilização

**Trilha da Clareza · 15/10/2026 · versão candidata documental 0.1.0-rc.1**  
**DECISÃO: NO-GO para pacientes.** Nenhuma publicação clínica, fusão de branches ou recrutamento está autorizada.

## 1. Cenário e finalidade

O GitHub Pages serve uma demonstração estática da branch main. O PR #1, branch auditoria/ondas-mvp-20261015, mantém as correções das ondas anteriores e continua rascunho, sem merge. Não há contas, backend clínico ou telemetria de respostas; o provedor pode manter logs técnicos. Voz neural Faber não foi integrada, pois seu licenciamento e QA permanecem pendentes.

A meta desta onda é preparar decisão auditável de liberação, mecanismos de estabilização e rollback, não executar a publicação assistencial.

## 2. GO/NO-GO automatizado

Executar node scripts/release_preflight.mjs --out wave9-evidence/release-readiness.json para gerar relatório com SHA-256 de seis arquivos, resumo dos 30 controles e pendências dos 12 requisitos da Onda 8 e oito aprovações de liberação.

Executar node scripts/release_preflight.mjs --require-ready para impedir liberação enquanto houver qualquer pendência. O código de saída 2 significa bloqueio correto. O processo não realiza merge, modifica a main ou publica material.

Mesmo um possível status GO_ELIGIBLE_FOR_HUMAN_REVIEW não constitui aprovação clínica; exige aceite **humano explícito, documentado e vinculado ao commit**, fora do repositório público.

## 3. Pré-requisitos cumulativos de lançamento

1. Gate 1: validação clínica completa dos 18 desafios, 54 devolutivas, 12 roteiros e orientações de crise.
2. Gate 2: validação formativa de usabilidade com participantes elegíveis, devidamente autorizada.
3. Gate 5: direitos de TTS demonstrados, voz e narração aprovadas ou alteração formal de escopo para modalidade inteiramente textual.
4. Gate 6: acessibilidade assistiva real, celular físico, privacidade LGPD, hospedagem e mitigação do risco de incorporação em iframe.
5. Gate 7: 30 de 30 critérios aprovados e testes completos na versão candidata e no domínio final.
6. Gate 8: piloto supervisionado após decisões éticas aplicáveis, consentimento, supervisão e proteção de dados; incidentes revisados.
7. Gate 9: documentação de responsáveis, revisão independente, rollback autorizado e autorização específica para a comunicação a pacientes.

Se faltar um requisito ou houver incidente crítico, a decisão é NO-GO.

## 4. Cutover futuro — NÃO executado

Após todas as aprovações, congelar o SHA da versão e arquivar as evidências. Verificar base da main, conflitos e assinatura das mudanças. Executar CI: npm ci, typecheck, build, verify:build, testes Node, E2E Chromium na candidata e teste da hospedagem, auditoria axe e headers. Realizar revisão independente do PR, solicitar autorização de merge e realizar merge manual.

Depois do deploy, conferir os seis recursos, versão efetivamente implantada, os três percursos e o E2E com dispositivos físicos e leitores de tela. Somente divulgar aos destinatários autorizados **após** o smoke pós-publicação e aceite humano final.

Não criar automaticamente release, tag clínica, e-mails ou convites. Não utilizar pacientes nesta preparação.

## 5. Rollback

**Gatilhos:** indisponibilidade, impossibilidade de sair/pausar, exposição de dados, recomendação potencialmente danosa, falha assistiva, riscos jurídicos ou de licença, discrepância da versão aprovada, incidente clínico.

1. Suspender imediatamente a divulgação assistencial, a orientação de uso e novos convites. Encaminhar qualquer pessoa em risco para apoio humano, não para uma automação do site.
2. Registrar o problema em ambiente privado, sem informações identificáveis em issues, PR ou Actions públicos.
3. Comparar o SHA implantado ao último commit funcional previamente homologado.
4. Preparar PR de reversão da mudança problemática, com revisão independente. **Não fazer force push** nem apagar o histórico Git.
5. Após aprovação, mesclar a reversão, aguardar novo build do GitHub Pages e executar smoke/E2E e verificações de privacidade e acessibilidade.
6. Reabrir a distribuição somente após novo aceite técnico e clínico.

**Limitação:** reverter site estático não apaga downloads anteriores, caches de terceiros nem revoga instantaneamente links já distribuídos. A organização deve ter canal humano para suspensão e aviso.

## 6. Estabilização e acompanhamento

Durante a publicação futura, monitorar somente disponibilidade, falhas de build, integridade e erros técnicos com probes sintéticos. Não habilitar cookies analíticos, captação de respostas, monitoramento clínico ou ferramentas pagas por inferência.

Na janela inicial, registrar eventuais dificuldades por canal privado e acionamento humano. Incidentes de segurança e sofrimento geram interrupção imediata e reavaliação. Mudanças após publicação exigem novo PR, revisão e regressão, sem edição silenciosa de produção.

O pipeline atual é apenas de teste. **Não foi ativado monitoramento recorrente, piloto supervisionado ou publicação clínica.**

## 7. Registro de fechamento

A Onda 9 poderá ser tecnicamente encerrada quando documentos, testes fail-closed e evidência de pré-publicação passarem no GitHub Actions. O produto só será liberado clinicamente depois do preenchimento legítimo dos gates e do aceite humano expresso.

**Estado atual: preparação técnica, GO clínico bloqueado, main demonstrativa preservada.**
