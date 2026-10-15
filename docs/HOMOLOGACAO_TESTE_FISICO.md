# Homologação — ensaio assistivo e teste físico: roteiro de execução

**Status: NÃO EXECUTADO.** A prova em Chromium/axe não substitui este roteiro com humanos e dispositivos, e a página pública `main` não contém as correções do PR.

## Preparação (somente após autorização de avaliação técnica não clínica)

- Fixar commit e ambiente candidato aprovado; **não usar o GitHub Pages main como evidência de hotfixes ainda não mesclados**.
- Testar em aparelho físico de uso autorizado, preferencialmente Android Chrome/TalkBack, e Windows Chrome/Firefox com NVDA; VoiceOver/Safari conforme escopo.
- Usar somente tarefas fictícias. Sem nome, relato clínico, dados reais ou gravação de participante no repositório.
- Para leitura em voz alta, garantir acesso ao **texto/transcrição** mesmo quando a voz local não existir.

## Procedimento obrigatório (cada combinação dispositivo/leitor)

| ID | Tarefa e critério de passagem | Resultado |
|---|---|---|
| AT-01 | Zoom 200%: sem conteúdo cortado, sobreposto ou inacessível | PENDENTE |
| AT-02 | Zoom 400% ou reflow equivalente: conclusão e ajuda ainda acessíveis | PENDENTE |
| AT-03 | Tab/Shift+Tab, Enter e Space: atingir todas as opções | PENDENTE |
| AT-04 | Primeiro foco por teclado no atalho de pular conteúdo; foco visível | PENDENTE |
| AT-05 | Selecionar resposta: anúncio e feedback sem salto de leitura | PENDENTE |
| AT-06 | Pausar: foco vai ao modal; fundo não é lido/navegado | PENDENTE |
| AT-07 | Fechar pausa com ESC/voltar: foco retorna ao controle previsível | PENDENTE |
| AT-08 | Encerrar e descartar: confirmação sem dados persistidos ou retomada | PENDENTE |
| AT-09 | Transcrição: abrir/fechar, leitura do conteúdo e foco previsível | PENDENTE |
| AT-10 | Sem TTS local: nenhuma chamada remota deliberada; texto disponível | PENDENTE |
| AT-11 | Paisagem/retrato, fontes grandes, tema de alto contraste e movimento reduzido | PENDENTE |
| AT-12 | Sem rede no meio da sessão: erro compreensível, sem perda de dados em servidor | PENDENTE |

## Registro e decisão

Preencher resultados somente **após** execução em ambiente privado apropriado. Registrar dispositivo, sistema, navegador, leitor de tela, configuração, etapa e defeito sem dados identificáveis. Classificar falhas críticas, altas, médias e baixas. Qualquer falha que impeça interromper ou exponha dados bloqueia piloto e divulgação.

**Nunca preencher automaticamente este quadro como aprovado porque o axe retornou zero violações.**
