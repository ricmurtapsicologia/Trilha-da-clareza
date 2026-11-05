# Blueprint de produto — Trilha da Clareza UX 2.0
Data: 04/11/2026 | Destinação: demonstração psicoeducativa | URL única: https://ricmurtapsicologia.github.io/Trilha-da-clareza/

## Diagnóstico anterior
Primeira dobra dominada por título ornamental de grande altura e ilustração sem função orientadora. CTAs e diferenciação entre prática e jornada ficavam menos acessíveis. Estilos separados no módulo da prática geravam fragmentação; mensagens de limitação e rodapé tinham redundâncias. O fluxo educativo precisava tornar o próximo passo mais explícito.

## Proposta de valor
Em segundos, a pessoa deve distinguir duas necessidades: trabalhar uma preocupação agora ou aprofundar habilidades com cenários. Todo caminho apresenta o que vai acontecer, permite saída e termina com síntese ou plano de aplicação, sem pontuação clínica.

## Arquitetura de informação
1. Página inicial (welcome/splash integrada, sem atraso nem modal obrigatório).
2. Duas escolhas: prática breve (5 etapas) ou jornadas (3 x 6 desafios).
3. Onboarding contextual de cada percurso com três ações explícitas: escolher, refletir e agir.
4. Prática breve: tema -> fatos/previsões -> pausa opcional -> ação/tempo -> resumo.
5. Jornadas: escolher -> responder a cada desafio -> refletir -> escolher próximo passo -> exportação voluntária.
6. Sobre: o que a ferramenta faz, privacidade, áudio, acessibilidade, limites e urgência.
7. Rodapé editorial com marca, navegação e informações, sem links duplicados ou avisos longos.

## Decisões implementadas
- Um único index.html e a URL histórica preservada; nenhum segundo endereço de atendimento.
- Homepage com título curto, etapa de escolha em cards, microcopy concreto e processo em três ações.
- Visual unificado em tokens CSS, paleta sóbria, escala tipográfica controlada, contraste, espaços e alinhamento.
- Removida a dependência da ilustração ornamental na primeira dobra.
- Prática breve agora inserida no mesmo DOM do aplicativo; estilos da prática usam variáveis globais, não Shadow DOM independente.
- Jornadas continuam com 18 desafios e 54 devolutivas, pausa, narração opcional com transcrição e exportação local.
- Finalização das jornadas com foco em habilidade e próximo passo opcional.
- Privacidade por padrão sem login ou envio automático de respostas.
- Recurso publicamente identificado como ainda não homologado para uso assistencial; aviso condensado no rodapé e detalhes na seção Sobre.

## Matriz P0/P1
| ID | Entrega | Critério |
|---|---|---|
| P0-01 | Entrada orientada | Título e duas escolhas legíveis nos quatro viewports |
| P0-02 | Dois fluxos, uma URL | Nenhuma navegação a pagina HTML independente |
| P0-03 | Onboarding | Explica o que fazer, quantas etapas e o valor ao final |
| P0-04 | Rodapé limpo | Marca, navegação, limites e ausência de duplicações |
| P0-05 | Privacidade | Sem armazenamento ou envio de anotações, exportação voluntária |
| P0-06 | Acessibilidade | Foco, teclado, reduzido movimento, dispositivos assistivos; manual pendente |
| P0-07 | E2E | Regressão dos 18 desafios e novo fluxo breve |
| P1-01 | Design system | Sem styles em Shadow DOM, tokens compartilhados |
| P1-02 | Síntese e ação | Situação e próximo passo explícitos, sem promessa clínica |
| P1-03 | Documentação | Plano de retorno, critérios e riscos registrados |

## Ensaios
Rodar `npm ci --ignore-scripts --no-audit --no-fund`, `npm run typecheck`, `npm run build`, `npm run verify:build`, `npm test`. Executar Playwright E2E em 320, 390, 768 e 1366 px com `tests/hosted_e2e.py`, `tests/quick_e2e.py` e `tests/ux2_e2e.py`. Validar HTTP na candidata e HTTPS no domínio após publicação. Repetir testes de pausa, transcrição, exportação e descarte.

## Portões pendentes antes de uso assistencial
A homologação clínica dos textos, 18 desafios, roteiros e novo módulo, a análise de riscos de violência/coerção, avaliação profissional de ergonomia e usabilidade com pessoas reais, testes assistivos em leitores de tela e dispositivos reais, conformidade da hospedagem profissional, privacidade e controles de headers HTTP permanecem obrigatórios. Teste automático não comprova eficácia clínica nem autoriza envio a pacientes.

## Rollback
Reverter o commit de redesign na branch main com PR e executar pipeline de validação da revisão; congelar distribuição até smoke HTTPS. Não registrar dados reais de pacientes em logs, evidências ou issues.
