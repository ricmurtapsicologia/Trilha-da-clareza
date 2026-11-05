# Blueprint executivo — Leitura semanal e aplicação (versão candidata)
Data: 05/11/2026 | Produto: Trilha da Clareza | Único acesso: `index.html`

## Diagnóstico de ergonomia
Um fluxo que oferece muitos desafios, estímulos ou exercícios abstratos pode ter baixa transferência comportamental. A ferramenta deve oferecer linguagem adulta, fundamentada e suficientemente técnica, com interatividade limitada e uma única tarefa definida por semana. A participação é voluntária, sem ranking, gamificação ou pontuação.

## Jornada de valor
1. Home: entrada recomendada "Leitura da semana"; alternativas discretas "Prática breve", "Jornadas" e "Sobre".
2. Leitura: três partes editoriais navegadas uma de cada vez; explicação funcional sobre o ciclo saber–agir, flexibilidade de planejamento e experimento comportamental.
3. Interpretação: pergunta com três alternativas e feedback explicativo; não é avaliação psicológica.
4. Aplicação: escolha de somente um experimento comportamental pequeno, seguro e verificável. Momento de execução opcional.
5. Síntese: objetivo concreto, quando e três questões de revisão. Cópia ou arquivo .txt só mediante ação.
6. Saída: recomeçar sem persistência; nenhum cadastro ou envio automático.

## Características do conteúdo
- Texto no estilo artigo de revista, com termos técnicos explicados no contexto.
- Sem infantilização, frases motivacionais vazias, exposição de relatos pessoais ou estímulos visuais concorrentes.
- 3 seções em linguagem técnica intermediária, com começo, desenvolvimento e aplicação.
- Uma única ação semanal; não criar metas diárias nem cobrar sequência.
- Exemplos genéricos e seguros: iniciar tarefa curta, dividir demanda em passos, compreender comunicação não urgente. A iniciativa de contato em situação ameaçadora não é orientada.
- Sem indicação medicamentosa e sem inferência de diagnóstico.

## Engenharia e privacidade
- `leitura-semanal.js` contém material genérico e uma pequena máquina de estados em memória da página.
- CSS compartilha tokens com `style.css` da aplicação principal.
- O estado `weekly` entra pelo mesmo mecanismo `src/app.ts`; não há segunda URL, cadastro, banco de dados, endpoint ou telemetry.
- `readingSummary` trabalha apenas com opções padronizadas. Não inclui campos livres de dados pessoais; download voluntário local.

## Critérios técnicos e revisão
- `npm run typecheck && npm run build && npm run verify:build && npm test`.
- `python tests/weekly_e2e.py --url http://127.0.0.1:8765/` e demais E2E originais: prática, jornada, experiência inicial, áudio e offline.
- Cenários responsivos 320 / 390 / 768 / 1366 px, teclado, contraste e axe-core.
- Controle de inexistência de armazenamento persistente, POST externo, dados privados ou URLs alternativas.
- Publicar via PR apenas após CI aprovado, smoke HTTPS e rollback disponível.

## Limite clínico
A concepção é psicoeducativa. Seleção de habilidades, tarefas de exposição, riscos, mudanças de medicação e ajuste individual precisam ser avaliados pelo profissional responsável. O conteúdo não substitui prontuário, sessão clínica ou avaliação de risco. Para oferta assistencial, exige-se homologação clínica e acessibilidade em dispositivos reais.

## Indicador de valor a observar, sem coleta automática
Ao final, o usuário consegue (a) identificar a ideia central, (b) escolher uma ação executável, (c) definir quando tentá-la ou por que não seria apropriado, e (d) revisar as barreiras numa conversa posterior. Não é indicador de eficácia clínica.
