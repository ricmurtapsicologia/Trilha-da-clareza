# Onda 6 — Segurança, privacidade e acessibilidade

**Data:** 15/10/2026 · **Escopo:** MVP da Trilha da Clareza · **Status:** controles automatizados aprovados; gate de homologação aberto.

## 1. Modelo de ameaça e privacidade

| Risco | Impacto | Verificação/mitigação | Residual |
|---|---|---|---|
| Identificação de pacientes | Alto | Conteúdo ficcional; sem credenciais, nomes de pacientes ou prontuários; nenhum cadastro | Não pedir dados sensíveis em piloto; revisão humana |
| Transmissão de escolhas | Alto | Sem API, fetch, formulário, analytics, armazenamento da jornada ou cookies próprios; testes de rede e storage | Download local voluntário continua sob controle do usuário |
| Voz sintetizada por serviço remoto | Médio/alto | O protótipo só seleciona voz `pt-BR` quando `localService=true`; caso contrário recomenda ler a transcrição | Confiança no sinal do navegador e nas políticas do sistema operacional; avaliar dispositivo |
| Coleta pelo serviço de hospedagem | Médio | Transparência: GitHub Pages pode registrar IP e horário de acesso | Governança, termos, aviso de privacidade e avaliação LGPD pendentes |
| Script injetado e links externos | Alto | CSP `script-src 'self'`, `connect-src 'none'`, `object-src 'none'`, sanitização de conteúdo textual, nenhum script externo na aplicação | Revisão de supply-chain e testes independentes ainda necessários |
| Clickjacking (iframe) | Médio | Removida diretiva sem efeito `frame-ancestors` da meta CSP; não declarar mitigação inexistente | GitHub Pages não permite definir livremente cabeçalho CSP e X-Frame-Options; aferir cabeçalhos reais ou migrar hospedagem conforme análise |
| Fuga por Referer | Baixo/médio | Meta `referrer=no-referrer`; não há envio voluntário externo no app | Conferir comportamento real da hospedagem |
| Ruptura de acessibilidade | Alto | Roteiros em texto, foco visível, botão de pausa, teclado, `inert`, ausência de tempo limite e animações reduzidas | Teste humano TalkBack/NVDA/VoiceOver, zoom 200/400% e dispositivos reais |
| Publicação do protótipo como terapia | Alto | Avisos explícitos "protótipo não homologado" e liberação separada das ondas 1/8/9 | Revisão clínica e contexto de aplicação pendentes |

## 2. Hotfixes executados

1. `index.html`: política de encaminhamento `no-referrer` e retirada de `frame-ancestors` da tag `meta` por **ineficácia nessa forma**. Não alegar proteção anti-iframe.
2. `src/app.ts` e `dist/app.js`: a prévia `speechSynthesis` não seleciona vozes que o navegador não identifica como locais; instrui a consultar transcrição quando indisponível.
3. Tela "Sobre e privacidade": esclarece que **não transmitimos respostas**, mas o serviço GitHub Pages pode registrar informações técnicas de acesso, como IP e horário.
4. `style.css`: terracota mais escuro (`#ac5953`) melhora contraste de identificadores visuais. O diagnóstico automático não substitui inspeção manual de semântica.

## 3. Auditoria automatizada reproduzível

- CI GitHub Actions com Chromium Playwright. Utiliza `axe-core 4.10.3` em arquivo baixado **apenas no runner de auditoria**, não dentro do site publicado.
- Contexto do navegador de teste usa `bypass_csp=True` **somente para inserir o motor de auditoria**; o teste da meta CSP ocorre à parte. Portanto, o axe não é uma demonstração de que scripts de terceiros rodam na página normal.
- 21 varreduras: 3 larguras (320, 390 e 1366 pixels) × 7 estados (início, seleção, desafio vazio, desafio respondido, pausa, conclusão e ajuda).
- Tags verificadas: `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa` e `wcag22aa`.
- Em execução aprovada de referência [38749949880](https://github.com/ricmurtapsicologia/Trilha-da-clareza/actions/runs/38749949880): **0 violações automatizadas detectadas**, 0 cookies, 0 entradas em `localStorage`/`sessionStorage` e 0 requisições externas no fluxo de teste.
- E2E do mesmo run: 820 verificações na versão candidata HTTP e 600 na versão pública HTTPS, sem atribuir os hotfixes ainda não mesclados à versão pública.
- 40 testes Node (domínio, arquitetura, privacidade e segurança) aprovados. Alteração de contraste após o run exige reexecução antes de certificar o commit final.
- Recurso: `tests/wave6_browser.py`; evidência: artifact `onda6-axe-privacidade-nao-homologado`, disponível temporariamente no GitHub Actions.

## 4. Pendências de homologação (não substituíveis por axe)

- [ ] Leitor de tela em português: TalkBack + Chrome Android, NVDA + Chrome/Firefox Windows, VoiceOver + Safari iOS; verificar nome, papel, estado, ordenação, anúncio de feedback e transcrição.
- [ ] Teclado físico: Tab/Shift+Tab, Enter/Espaço, Esc, tratamento de foco nas transições, pausa e modal; validação manual.
- [ ] Zoom 200% e 400%, orientação e reflow, tamanho de toque, foco não obscurecido, contraste de todos os estados (incluindo desabilitados quando relevante).
- [ ] Celular físico e áudio opcional: sem áudio, com voz local, falha da voz, headset, interrupção e transcrição, preferências de movimento reduzido.
- [ ] Revisão de conteúdo clínico e sinais de desconforto, inclusive possibilidade de interromper sem prejuízo.
- [ ] Análise jurídica/LGPD e termos de serviço da hospedagem, inclusive logs e políticas de retenção do provedor.
- [ ] Revisão de headers HTTP reais, clickjacking/anti-frame e infraestrutura; avaliar hospedagem com cabeçalhos gerenciáveis antes de uso assistencial.
- [ ] Evidência de testes assistivos com participantes autorizados e protocolo formativo após Gate 1.

## 5. Decisão

**Subetapa técnica automatizada concluída. Gate 6 global = PARCIAL/ABERTO.** Preservar PR em rascunho, não mesclar, não enviar página a pacientes e não declarar conformidade integral WCAG ou LGPD.
