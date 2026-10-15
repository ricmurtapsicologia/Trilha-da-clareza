# Onda 5 — Narração neural, ritmo, direito de uso e acessibilidade

**Data:** 15/10/2026. **Resultado:** 12/12 prévias V2 tecnicamente processadas e validadas; Gate 5 continua **ABERTO**. Não incorporar áudio à `main`, à página publicada ou a recursos assistenciais.

## Planejamento e realização
1. Inventário dos 12 roteiros de `src/content.ts`: presente, com IDs únicos, transcrições e botão de áudio opcional.
2. V1: Piper `pt_BR-faber-medium`, 11 arquivos de aproximadamente 10–13 segundos e pausa de 23,69 segundos; vocabulário excessivamente rápido para a finalidade.
3. V2: processamento **local**, sem nova chamada a API ou serviço contratado: FFmpeg `atempo=0.65` com preservação de altura, normalização alvo -20 LUFS e áudio mono MP3 96 kbit/s. Em `grounding`, cinco pausas distribuídas totalizando 27 segundos.
4. Duração aferida: 11 orientações entre 15,36 e 19,78 s; `grounding` 63,32 s. Arquivos somam 3.086.315 bytes, com SHA-256 por arquivo em `docs/ONDA_5_PREVIEW_MANIFEST.json`.
5. **O V2 é amostra para escuta comparativa, não versão de distribuição.** Os MP3s permanecem fora do GitHub Pages e do repositório; o manifesto apenas documenta integridade.
6. Regeneração local auditável: `scripts/tts_review_pacing.py`, requer Python, FFmpeg/ffprobe, pydub e o pacote V1 com manifesto e mídias. Não baixa modelos ou grava dados de usuários.
7. Validação local ou externa: `python scripts/verify_audio_previews.py --manifest docs/ONDA_5_PREVIEW_MANIFEST.json --directory /diretorio/dos/mp3`. O CI pode verificar somente o manifesto, **não** o conteúdo perceptual ou direitos de uso.

## Licenciamento — risco bloqueante
A ficha de Faber indica **CC0 para o dataset** e informa fine-tuning a partir de `en_US-lessac-medium`. O estatuto jurídico do modelo-base, dos pesos e do áudio produzido para distribuição/atividade profissional **não foi considerado resolvido**. Nem "CC0 dataset" nem a licença MIT do repositório significam, automaticamente, autorização de publicar o resultado no produto. Documentação:
- https://huggingface.co/rhasspy/piper-voices/tree/v1.0.0/pt/pt_BR/faber/medium
- https://huggingface.co/rhasspy/piper-voices/discussions/111
- https://github.com/rhasspy/piper/discussions/271

## Rubrica perceptiva de aceitação (não executada)
Para cada um dos 12 áudios registrar: (a) compreensão e inteligibilidade (0–5), (b) pronúncia de termos em português brasileiro (0–5), (c) velocidade e pausas (0–5), (d) naturalidade/ausência de artefatos (0–5), (e) tom calmo, não coercitivo e adulto (0–5), (f) equivalência integral entre áudio e roteiro (sim/não). Bloquear em caso de omissão de palavras, fala truncada, instruções involuntariamente imperativas ou desconforto causado por ritmo/voz.

**Atenção:** desacelerar mídia depois da síntese não é o mesmo que produzir narração neural de ritmo naturalmente pausado. Preferir nova síntese com ajuste de `length_scale` no gerador licenciado depois de liberar direitos e validar voz. As pausas do grounding V2 foram inseridas com base nas pausas automáticas da V1; confirmar posição semântica por escuta antes de uso.

## Integração planejada (não realizada)
Player nativo `<audio>` ativado **somente depois de liberar licença e scripts**: nenhum autoplay, controle explícito reproduzir/parar, taxa ajustável, transcrição sempre acessível, `preload=none`, fallback de erro para texto, mudança de etapa cancela áudio, sem TTS remoto ou envio de respostas. Smoke/E2E do player + celular físico + leitor de tela. Não usar MP3 de licença indefinida.

## Gates finais
- [x] 12 arquivos experimentais processados, duração e hash verificados.
- [x] 60–90 segundos na pausa, sem promessa de efeito clínico.
- [ ] Direitos de uso comercial/assistencial do modelo e **arquivo gerado** documentados.
- [ ] Comparação de pelo menos 3 vozes legalmente adequadas e seleção aprovada.
- [ ] Revisão clínica de textos, entonação e pausas.
- [ ] Escuta perceptiva e correções de pronúncia/prosódia.
- [ ] Player acessível integrado, testado no GitHub Pages e celular físico.
- [ ] Autorização final de oferta a pacientes.

**Conclusão:** entrega técnica exploratória concluída; homologação Onda 5 pendente. Sem mudança da página pública.
