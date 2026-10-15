# Auditoria preliminar 30/30 — Trilha da Clareza v0.1.0

**Nota:** este é um checklist específico do produto. A equivalência com os 30 testes canônicos do ecossistema ainda precisa ser confrontada. Itens pendentes não podem ser considerados aprovados. Os testes em navegador usaram carregador offline, não uma hospedagem final.

| Nº | Critério | Situação | Evidência / pendência |
|---:|---|---|---|
| 01 | Compilação TypeScript | Aprovado | `tsc -p tsconfig.json` |
| 02 | Conteúdo de 3 jornadas | Aprovado | teste de unidade |
| 03 | 6 desafios por jornada | Aprovado | teste de unidade |
| 04 | 18 IDs de desafio exclusivos | Aprovado | teste de unidade |
| 05 | 54 alternativas completas | Aprovado | teste de unidade |
| 06 | Feedback contextual | Aprovado | 18 etapas exercitadas no navegador |
| 07 | Progresso visual | Aprovado | E2E e teste de domínio |
| 08 | Encerramento das três jornadas | Aprovado | E2E |
| 09 | Retorno e revisão de escolhas | Parcial | código implementado; validar fluxo específico |
| 10 | Pausa funcional | Aprovado | E2E desktop e mobile |
| 11 | Foco e teclado em modal | Parcial | implementado; validar leitor de tela |
| 12 | Exportação voluntária | Aprovado | download E2E |
| 13 | Descarte do estado ao recarregar | Aprovado | E2E |
| 14 | Ausência de erros JavaScript em navegador | Aprovado | E2E desktop |
| 15 | Layout desktop | Aprovado | captura visual desktop |
| 16 | Layout mobile | Aprovado | captura visual mobile |
| 17 | Ausência de rolagem horizontal mobile | Aprovado | E2E mobile |
| 18 | 12 roteiros de áudio | Aprovado | teste de unidade |
| 19 | Transcrições legíveis | Aprovado | E2E |
| 20 | Voz neural natural em produção | Pendente | nenhum áudio neural pré-gerado |
| 21 | Reprodução de arquivos MP3 em produção | Pendente | arquivos não produzidos |
| 22 | Aprovação clínica formal | Pendente | exige revisão profissional |
| 23 | Auditoria WCAG 2.2 AA | Pendente | avaliar com tecnologias assistivas |
| 24 | Teste de rede no endereço hospedado | Pendente | GitHub Pages ainda não configurado |
| 25 | Revisão de dependências/ambiente hospedado | Parcial | sem dependências runtime; falta ambiente remoto |
| 26 | Ausência de dados de pacientes nos arquivos | Aprovado | inspeção de conteúdo e busca textual |
| 27 | Ausência de tokens e acessos embutidos | Aprovado | inspeção de arquivos de aplicação |
| 28 | Avisos de privacidade e limites | Aprovado | telas implementadas |
| 29 | Rollback executado | Pendente | depende de primeiro deploy |
| 30 | Homologação E2E em produção | Pendente | depende da URL real |

**Conclusão:** o conjunto 30/30 permanece **não concluído**. Testes unitários e funcionais locais foram aprovados; publicação e homologação assistencial seguem bloqueadas.
