# Onda 2 — Design Thinking, UX/UI e validação formativa

**Produto:** Trilha da Clareza · MVP 0.1.0 · 15/10/2026

**Natureza:** documentação de projeto e revisão heurística. **Não representa teste com pessoas, validação clínica nem homologação assistencial.**

## 1. Problema a resolver
Como ajudar uma pessoa adulta a reconhecer diferenças entre fatos, interpretações e escolhas em uma experiência curta, respeitosa, sem avaliação diagnóstica ou competição?

## 2. Design Thinking — hipóteses e artefatos

### Empatizar (hipóteses, não achados de entrevistas)
- A pessoa pode chegar ansiosa, com atenção reduzida ou receio de errar.
- O uso primário pode ser em celular Android, com largura de tela reduzida e ambiente ruidoso.
- A pessoa pode preferir ler, ouvir, combinar modalidades ou não realizar o exercício.
- Não deve ser necessário identificar-se nem fornecer detalhes pessoais.

### Definir
O usuário precisa reconhecer onde está, o que fazer, como voltar, qual conteúdo depende de sua escolha e como encerrar sem penalização.

### Idealizar
Foram consideradas: texto corrido, formulário, percurso em tabuleiro e experiências ramificadas. Seleção inicial: **tabuleiro reflexivo**, três jornadas independentes, seis desafios por jornada, escolha acompanhada por feedback não punitivo e pausa voluntária.

### Prototipar
Fluxo interativo em SPA estática, com:
1. Tela inicial → apresentação de limites e início.
2. Seleção de três jornadas → objetivo explícito e escolha.
3. Desafio → situação, questão, alternativas, feedback e progresso.
4. Pausa ou retorno → controle do ritmo.
5. Conclusão → síntese e exportação local opcional.
6. Ajuda e privacidade → acesso persistente, inclusive no cabeçalho móvel.

### Testar
A presente rodada inclui inspeção heurística, 320/390/768/1366 px, teclado e verificação automatizada de jornadas. **Não houve observação com pacientes, teste com leitor de tela real ou entrevista com usuários.** Essas atividades permanecem gates abertos.

## 3. Mapa da experiência

| Fase | Necessidade | Feedback visível | Saída segura |
|---|---|---|---|
| Descobrir | Compreender o que é e o que não é | Mensagem inicial + nota de não homologação | Ajuda/privacidade |
| Escolher | Identificar o objetivo da jornada | Título, descrição, 6 etapas | Voltar |
| Explorar | Saber o que fazer | Texto de apoio + pergunta + alternativas | Pausar, voltar, sair |
| Refletir | Compreender o efeito da escolha | Feedback contextual + reflexão | Alterar alternativa |
| Avançar | Manter orientação e previsibilidade | Etapa X/6 + tabuleiro | Retornar à etapa anterior |
| Encerrar | Levar uma reflexão à vida real | Síntese não diagnóstica | Concluir sem salvar ou exportar localmente |

## 4. Auditoria heurística desta onda

| ID | Problema | Gravidade | Tratamento | Evidência de teste |
|---|---|---|---|---|
| UX-01 | Selecionar alternativa levava a interface de volta ao topo, interrompendo a leitura | Alta | Removido scroll do rerender geral; scroll apenas ao entrar/mudar etapa | E2E `--candidate` verifica posição |
| UX-02 | Acesso a Sobre/privacidade oculto no cabeçalho de celular | Média | Cabeçalho quebra linha e mantém ajuda visível | E2E de 320 e 390 px |
| UX-03 | Leitura da transcrição perdia o foco do botão | Média | Foco restaurado ao controle após alternar transcrição | E2E por teclado/foco |
| UX-04 | Faltava explicar que é possível trocar a alternativa | Média | Instrução breve antes das escolhas | Verificação de DOM |
| UX-05 | Texto das casas do tabuleiro menor que o desejado no tablet | Média | Aumentada fonte em viewport médio | Inspeção CSS, regressão de layout |
| UX-06 | Alguns controles de áudio tinham alvos de toque pequenos | Média | Altura mínima de 44 px | Inspeção CSS |
| UX-07 | Feedback de escolha pode não ser anunciado adequadamente por leitores de tela | Média | `role=status` e anúncio discreto ao selecionar | **Validação assistiva manual pendente** |
| UX-08 | Ausência de dados primários de usabilidade e compreensão | Bloqueante para gate 2 | Protocolo de teste formativo abaixo | **Pendente** |

## 5. Plano de pesquisa formativa (não executado)

**Participantes:** preferencialmente cinco ou mais adultos voluntários, sem dados clínicos no repositório. Tamanho apenas exploratório, sem alegação de representatividade. Uso em contexto assistencial depende do Gate 1 e de avaliação ética apropriada.

**Roteiro para facilitador:**
1. Abrir página no próprio celular e explicar com suas palavras a finalidade da ferramenta.
2. Encontrar ajuda/privacidade e explicar se as respostas são gravadas automaticamente.
3. Escolher uma jornada e identificar em que etapa está.
4. Selecionar resposta, ler devolutiva e mudar de alternativa.
5. Voltar etapa e encontrar o botão de pausa.
6. Abrir e fechar transcrição sem áudio.
7. Completar uma jornada ou optar por encerrar.
8. Descrever a finalidade e o destino da exportação opcional.

**Observáveis sem identificação pessoal:** sucesso ou dificuldade por tarefa, assistência necessária, barreira visual/motora/cognitiva, dúvidas sobre conteúdo e riscos de desconforto. Nunca transcrever relatos clínicos ou registrar respostas de pacientes em issues/CI.

**Critérios de aceite de design propostos (a confirmar no piloto):**
- Todo participante compreende que não é um instrumento de diagnóstico ou emergência.
- Nenhum participante interpreta a interface como obrigação de prosseguir ou acertar.
- Participantes conseguem encontrar saída, pausa e ajuda.
- Nenhum defeito crítico de legibilidade, clique, foco ou navegação.
- Problemas recorrentes de compreensão geram nova iteração, não "PASS" automático.

## 6. Acessibilidade e segurança

Foco visível, navegação sem cronômetro, áudio opcional e transcrito, movimento reduzido, conteúdos ficcionais, ausência de coleta de dados e retorno seguro. A pausa torna o restante da interface inerte. **WCAG 2.2 AA integral, leitor de tela e dispositivos físicos ainda precisam de verificação humana.**

## 7. Critério de fechamento da Onda 2

**Implementação UX:** pendente da reexecução automatizada da ramificação após hotfixes.

**Gate de pesquisa/validação com pessoas:** NÃO CONCLUÍDO. Para fechar a onda integralmente, registrar sessões de uso formativo, problemas encontrados, alterações realizadas e verificação de regressão.

**Decisão:** manter alterações na ramificação de auditoria; não efetuar merge ou liberar pacientes com base apenas na inspeção heurística.
