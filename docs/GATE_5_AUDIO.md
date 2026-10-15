# Onda 5 — Produção sonora e gate de TTS
Status: **roteiros disponíveis; áudio neural de produção pendente**. Sem contratação e sem upload de dados clínicos.

## Inventário dos 12 roteiros
`welcome`, `intro-pensamentos`, `intro-controle`, `intro-acao`, `skill-fatos`, `skill-controle`, `skill-passo`, `skill-palavras`, `skill-incerteza`, `skill-escolhas`, `grounding`, `ending`.

**Fonte única de conteúdo:** `src/content.ts`. Cada roteiro contém identificador, título, duração estimada e texto. O áudio `grounding` é opcional e não deve forçar fechamento dos olhos ou controle respiratório.

## Critérios de produção
1. Revisão clínica do texto, da intencionalidade, das pausas e da associação áudio-tela.
2. Licença compatível com finalidade real de publicação; plano gratuito só se licitamente aplicável.
3. Três amostras de voz com teste cego de naturalidade em português brasileiro.
4. Voz adulta única, ritmo conversacional, volume normalizado, sem dramatização ou trilha obrigatória.
5. Gerar arquivos estáticos **antes** do deploy. Não solicitar TTS remoto no navegador com respostas do usuário.
6. Arquivos individuais nomeados por ID e manifest versionado; sem download automático de toda a biblioteca.
7. Transcrição sempre disponível; nenhuma reprodução automática; experiência íntegra sem som.
8. Conferir duração real, pronúncias, pausas, recortes, variação de dispositivos e sincronização entre roteiro/áudio.
9. Incluir estado de falha e fallback para transcrição se arquivo não carregar.
10. Documentar nome, versão e licença do motor TTS, data da geração e checksum dos arquivos.

## O que existe no protótipo
- Prévia opcional por `speechSynthesis` do dispositivo, com voz variável.
- Transcrições textuais e roteiros estruturados.
- **Nenhum** arquivo neural pré-gravado homologado no repositório.
- A voz do dispositivo pode depender do mecanismo de voz instalado pelo usuário; não prometer qualidade neural homogênea.

## Critério de saída do Gate 5
12 arquivos efetivos + QA por arquivo + licença comprovada + revisão profissional e teste de reprodução mobile. **Bloqueado nesta etapa.**

## Experimento neural documentado — 15/10/2026

- Motor: Piper TTS 1.3.0 em GitHub Actions com voz pt_BR-faber-medium, modelo baixado temporariamente; nenhum modelo ou arquivo gerado foi integrado ao site.
- Execução: https://github.com/ricmurtapsicologia/Trilha-da-clareza/actions/runs/38734672917 — **SUCCESS**.
- Artefato temporário: `trilha-da-clareza-amostras-neurais-NAO-HOMOLOGADAS`, ID `11972930115`, retenção de sete dias.
- Quantidade: 12 MP3; arquivo de manifesto com SHA-256 e duração real. Volume dos MP3: aproximadamente 1,8 MB.
- **Inconformidade de prosódia/ritmo:** duração típica dos trechos ficou na faixa de 10–13 segundos, abaixo da meta de 15–35 segundos; `grounding` ficou em cerca de 23,69 segundos, abaixo da meta de 60–90 segundos. Requer reedição de ritmo e inclusão de pausas naturais antes de integrar.
- **Licença:** a ficha do conjunto de dados cita CC0, mas há questionamento público sobre a licença dos pesos/modelo-base. Referências: https://huggingface.co/rhasspy/piper-voices/tree/v1.0.0/pt/pt_BR/faber/medium e https://huggingface.co/rhasspy/piper-voices/discussions/111 . Uso profissional/comercial permanece **sem liberação** até esclarecimento.
- **Validação perceptiva:** ainda não realizada por pessoa responsável; sucesso técnico do encoder não significa naturalidade ou adequação clínica.
- Resultado do Gate 5: **PARCIAL**; produção técnica de amostras comprovada, aceitação e licença pendentes.

## Onda 5 — Segunda geração de amostras (revisão privada)

- Fonte: as 12 amostras temporárias da execução 38734672917, não um serviço TTS conectado a pacientes.
- Transformação local FFmpeg: alteração de tempo preservando altura (`atempo=0.65`), normalização para alvo -20 LUFS e codificação MP3 mono 96 kbps; pausa `grounding` com 27 segundos de silêncio distribuídos em 5 intervalos.
- Resultado: 12/12 arquivos com integridade SHA-256 e duração verificada; 11 narrações entre 15 e 20 segundos e `grounding` com 63,32 segundos. Artefato V2 de avaliação somente na conversa, **não incorporado ao GitHub Pages**.
- Evidência machine-readable: `docs/ONDA_5_PREVIEW_MANIFEST.json`, de amostras experimentais; script de pós-processamento `scripts/tts_review_pacing.py`, script independente de verificação `scripts/verify_audio_previews.py`.
- O Piper Faber foi ajustado a partir da base Lessac; a ficha do modelo afirma CC0 para o **dataset** e não resolve o estatuto de distribuição/uso profissional dos **pesos/áudio gerado**. Discussões: https://huggingface.co/rhasspy/piper-voices/discussions/111 ; https://github.com/rhasspy/piper/discussions/271 . Por prudência, nenhuma licença comercial é presumida.
- Percepção e qualidade: a duração automática foi comprovada, mas naturalidade, artefatos da redução de tempo, pronúncia e conforto emocional **não foram aprovados** por escuta humana.
- Gate 5: **PARCIAL / NÃO LIBERADO**, até seleção de modelo comprovadamente licenciado, avaliação perceptiva, aprovação clínica do texto e áudio e testes acessíveis na interface final.
