# Hotfix — Áudio do Android (15/10/2026)

**Diagnóstico:** no `src/app.ts`, a versão pública exigia que `speechSynthesis.getVoices()` retornasse imediatamente uma voz `pt-BR` com `localService === true`. Em navegadores móveis, a lista pode começar vazia ou conter somente uma voz do sintetizador Google identificada como não local. Nesses casos, o código abortava `playAudio()` antes de chamar `speak()`, sem erro visível na interface.

## Escopo e correção

- O app disponibiliza **12 roteiros textuais únicos** em `src/content.ts`, reutilizados nas três jornadas, conclusão, abertura e pausa. **Nenhum MP3/AAC/OGG está integrado**. Os áudios neurais Faber experimentais da Onda 5 continuam fora do site por direitos/QA não liberados.
- A narração **não é o podcast Girando a Ampulheta da Vida** e não usa arquivos nem locução dele: usa a API de síntese de fala `SpeechSynthesisUtterance` do navegador.
- Na escolha de voz, prioriza `pt-BR` local; se não houver, permite `pt-BR` do sistema/navegador (inclusive Google); se a lista ainda estiver vazia, chama `speak` **sem atribuir voz explicitamente**, com `lang='pt-BR'`, permitindo que o sistema decida a voz padrão.
- Se `onerror` ocorrer, informa **visivelmente** que a narração falhou, sugere verificar volume de mídia/TTS do Android e mantém a transcrição.
- Na tela e em ajuda/privacidade, informa que o sintetizador pode usar infraestrutura do Google/rede. **Somente o texto fixo do roteiro** é enviado ao sintetizador; nenhuma escolha/reflexão digitada é incluída em `a.text`. O aplicativo não introduz API própria nem captura de dados.
- O áudio depende do motor de voz e configurações do usuário, conexão e permissão do navegador; **não há como garantir audibilidade real num dispositivo que não está conectado ao teste**.

## Teste e critério

- `tests/audio_android.test.mjs`: 12 IDs, uso de Web Speech API, fallback e informação de privacidade.
- `tests/audio_android_e2e.py`: engine WebSpeech **simulada** em Chromium, em 390/1366 px, cobrindo quatro condições: lista vazia, voz Google `localService=false`, preferência de voz local e erro visível.
- `npm run typecheck`, `npm run verify:build` e E2E HTTP/HTTPS permanecem obrigatórios.
- Teste físico ainda pendente: Motorola/Android/Chrome com volume de mídia ligado, modo silencioso/mídia, Configurações → Idioma e entrada → Saída de conversão de texto em voz, voz português (Brasil). Se continuar sem som, registrar versão Chrome, engine TTS e erro visível; não colocar dados pessoais em issues.

**Gate 5/6 clínico:** não homologado. A correção destina-se à demonstração pública, não constitui liberação assistencial nem equipara narração ao podcast.
