# Onda 3 — Engenharia de fundação, rastreabilidade e reprodutibilidade

**Data:** 15/10/2026  
**Base:** Trilha da Clareza, MVP 0.1.0, PR #1 (`auditoria/ondas-mvp-20261015`)  
**Escopo:** sem alteração de dados de pacientes, outras plataformas, custos ou ambiente público de produção.

## 1. Decisão arquitetural (ADR-003)

A aplicação permanece uma **SPA estática, independente, com TypeScript estrito, JavaScript ES modules e CSS nativo**, e não depende de React/Vite em produção. A divergência em relação ao blueprint conceitual foi documentada e é deliberada para o MVP: há apenas três jornadas e nenhum requisito atual que exija uma biblioteca de interface ou dependências em runtime.

Vantagens: menor superfície de manutenção, zero APIs em tempo de execução, ausência de credenciais e deploy por arquivos estáticos. Trade-off: renderização DOM artesanal exige testes explícitos de foco, acessibilidade e mudanças de estado.

**Não migrar automaticamente para React/Vite** nesta onda; reavaliar após piloto, se surgirem requisitos de interface e manutenção suficientes.

## 2. Componentes e limites

| Módulo | Responsabilidade | Interface |
|---|---|---|
| `src/domain.ts` | Tipos de jornadas/desafios, validação e exportação segura de texto | Funções puras |
| `src/content.ts` | Três jornadas, 18 cenários, 54 alternativas e 12 roteiros | Objetos tipados |
| `src/app.ts` | Estado em memória, navegação, renderização, áudio opcional e exportação | DOM |
| `style.css` | Design tokens, acessibilidade visual e responsividade | CSS nativo |
| `dist/` | Artefatos JavaScript compilados que a página serve | ES modules |
| `tests/` | Contratos, qualidade, cenários, E2E e verificações estruturais | Node/Playwright |
| `.github/workflows/` | CI de compilação, checagens, smoke e E2E HTTP/HTTPS | GitHub Actions |

## 3. Não conformidades tratadas

**NF-3.1 — Dependências mutáveis:** `typescript` usava `^5.8.3` sem lockfile. Corrigido para versão exata `5.8.3`, `package-lock.json` com integridade e `npm ci --ignore-scripts --no-audit --no-fund`. Dependências são de desenvolvimento; o navegador não executa packages NPM externos.

**NF-3.2 — Divergência fonte/distribuição:** a etapa inicial de comparação identificou uma diferença de um caractere no arquivo compilado `dist/app.js`. Corrigido e criada verificação permanente `npm run verify:build` que bloqueia alterações não reproduzíveis no CI.

**NF-3.3 — Workflow de importação legado:** `.github/workflows/import-mvp.yml` continha permissão de escrita em `main` para restaurar o pacote inicial. A importação original já terminou e esse workflow foi removido **na ramificação candidata**; esse risco operacional deixa de existir quando a mudança for mesclada, sem afetar a versão pública hoje.

**NF-3.4 — Cobertura estrutural:** novos testes de arquitetura verificam ausência de dependências em runtime, lockfile/versão, três módulos de origem e entrada HTML com arquivos relativos.

## 4. Gates automatizados

- `npm ci` obrigatório com lockfile travado.
- `npm run typecheck` e `npm run build`.
- `npm run verify:build` compara `dist/` rastreado em Git com a saída de `tsc`.
- `npm test` executa testes de domínio, segurança e arquitetura.
- Smoke HTTPS da `main` atual e testes Playwright HTTP na versão candidata e HTTPS no projeto público.
- Sem merge automático e sem publicação dos recursos de áudio não homologados.

## 5. Segurança e manutenção

- Não são incluídos banco de dados, telemetria, autenticação, API externa, segredos ou serviços pagos.
- O conteúdo sobre saúde permanece psicoeducativo e genérico; não registrar respostas individuais nos logs.
- O repositório não terá migração automática nem conexão com Secretary Core e outros produtos.
- PR #1 permanece *draft*, aberto à revisão antes de merge.
- Verificar acessibilidade WCAG 2.2 AA e homologação clínica **fora** do escopo de encerramento técnico da Onda 3.

## 6. Resultado e aceite

**Aceite técnico condicionado ao CI verde no commit final da Onda 3.** Esta onda pode ser tecnicamente fechada se os requisitos acima passarem, sem confundir seu fechamento com aprovação clínica das Ondas 1, 2, 5–9.

O projeto hospedado em `main` permanece inalterado até revisão expressa dos gates.
