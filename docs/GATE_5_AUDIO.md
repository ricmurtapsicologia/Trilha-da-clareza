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
