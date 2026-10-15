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
| 2. Design Thinking, UX/UI | Interface responsiva e prévias locais; feedback real de usuários não registrado | Parcial | Testes supervisionados de compreensão e acessibilidade |
| 3. Fundação técnica | TS estrito, módulos isolados, compilação e CI GitHub Actions bem-sucedidos | Concluída tecnicamente | CI verde |
| 4. Motor e interface | 11 testes unitários + 106 checagens em navegador no carregador offline | Concluída no escopo testado | Cobertura adicional dos fluxos negativos |
| 5. Voz TTS | 12 roteiros + síntese opcional no dispositivo, que não corresponde à voz neural licenciada | Bloqueada para conclusão | Arquivos neurais, licença, QA de áudio |
| 6. Segurança e acessibilidade | Sem APIs nem banco de respostas; CSP declarada; testes WCAG com leitor de tela e mobile físico faltam | Parcial | Evidências de privacidade e acessibilidade |
| 7. Auditorias | CI e testes locais aprovados; E2E real HTTPS não atestado | Parcial | 30 testes canônicos + smoke real + E2E real |
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
- Local: `npm run typecheck`, `npm run build` e `npm test` aprovados; 11/11 testes.
- Local: `python tests/browser_e2e.py` aprovada com 106 verificações, via carregador offline.
- Tentativa de servidor local HTTP com Chromium: bloqueada por política do ambiente (`ERR_BLOCKED_BY_ADMINISTRATOR`). **Não é teste aprovado nem falha da aplicação.**
- Abertura externa de URL via ferramenta web: indisponível nesta avaliação; ausência de evidência de renderização HTTPS efetiva.

## Decisão
Autorizar continuidade de desenvolvimento e documentação. **Não** autorizar homologação clínica ou distribuição a pacientes nesta fase.
