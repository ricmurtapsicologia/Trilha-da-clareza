# Trilha da Clareza

**Uma jornada entre pensamentos, emoções e escolhas.**

MVP 0.1.0 — recurso psicoeducativo interativo para adultos. A aplicação **não** realiza diagnóstico, atendimento psicológico nem avaliação de risco. **Ainda não está homologada para uso assistencial.**

## Status

- Implementados: 3 jornadas, 18 desafios, 54 alternativas com feedback, tabuleiro responsivo, pausa, navegação, conclusão e exportação local voluntária.
- Preparados: 12 roteiros de áudio, com texto e prévia opcional pela voz do dispositivo (`speechSynthesis`).
- Pendentes: áudios neurais com licença e ritmo homologados, revisão clínica formal, avaliação de usabilidade com pessoas reais, auditoria assistiva e piloto supervisionado.
- Validações automatizadas: testes de domínio, qualidade e arquitetura; E2E Playwright por HTTP na versão candidata e HTTPS na página publicada, em quatro larguras de tela. Resultados e runs atualizados constam do PR #1. Os testes não demonstram eficácia clínica.

## Privacidade

- Sem login ou cadastro.
- Sem API, banco de dados ou envio de respostas.
- Sem analytics e sem cookies próprios.
- Escolhas mantidas apenas na memória da página e descartadas ao recarregar.
- Resumo gerado localmente mediante ação explícita do usuário.
- Textos e cenários fictícios; nenhum prontuário incluído.

## Arquitetura e decisão técnica

**Aplicação independente** com TypeScript estrito, CSS e módulos ES nativos. O blueprint inicial citava React/Vite. Para este primeiro MVP, adotou-se uma arquitetura DOM modular sem bibliotecas em tempo de execução; a alteração deve ser revista antes de uma eventual expansão. Benefícios: nenhuma dependência runtime, menos superfície de ataque, builds estáticos menores e portabilidade ao GitHub Pages. O motor de conteúdo e regras permanece tipado e separado da interface.

## Execução

Os arquivos compilados em `dist/` já acompanham o projeto: a hospedagem estática serve `index.html` diretamente. Para reproduzir a compilação, execute `npm ci --ignore-scripts --no-audit --no-fund`, `npm run typecheck`, `npm run build` e `npm run verify:build`. O `package-lock.json` fixa TypeScript 5.8.3. Atualizações em `src/` exigem recompilar e versionar `dist/`.

Testes:

```sh
node --test tests/domain.test.mjs
python tests/browser_e2e.py
```

Os testes offline complementam `tests/hosted_e2e.py`, executado com Chromium real em HTTP (candidato) e HTTPS (página pública). A aprovação da suíte não substitui avaliação de acessibilidade assistiva e revisão clínica.

## Publicação no GitHub Pages

1. Criar **novo repositório independente** com nome `trilha-da-clareza` na conta que será proprietária da página.
2. Adicionar o conteúdo deste projeto na raiz, preservando as pastas `src/`, `dist/`, `assets/`, `tests/` e `docs/`.
3. Em Settings > Pages, selecionar `Deploy from a branch`, branch `main`, pasta `/ (root)`, e salvar.
4. Aguardar e confirmar a URL informada pelo GitHub. Não presumir URL nem publicação concluída sem verificação.
5. Validar recursos, navegação, áudio, exportação, layout mobile, CSP, console e rede na URL pública antes de liberar uso.

**Atenção:** verificar o enquadramento dos termos do GitHub Pages para a finalidade clínica/profissional. A página não deve ser entregue a pacientes antes do gate clínico e dos testes reais.

## Organização

- `src/content.ts` — narrativas, alternativas, feedback e 12 roteiros.
- `src/domain.ts` — contratos e validações de conteúdo, resumo, segurança de texto.
- `src/app.ts` — navegação, estados, interações, síntese de fala opcional e exportação.
- `style.css` — identidade responsiva própria.
- `dist/` — JavaScript compilado.
- `docs/` — evidências visuais e relatório de validação.
- `tests/` — testes unitários, qualidade, arquitetura e E2E em navegador HTTP/HTTPS.
- `scripts/verify-build.mjs` — controle de sincronismo entre fonte e build.
- `package-lock.json` — versões reproduzíveis de ferramentas.
- `docs/ONDA_3_ARQUITETURA_REPRODUTIBILIDADE.md` — decisão arquitetural e auditoria da Onda 3.

## Princípios de revisão clínica

Aprovar roteiros e feedbacks antes de qualquer uso assistencial; evitar indução de culpa ou certezas infundadas; não confundir conclusão de jornada com resultado terapêutico; manter alternativa de pausa/saída e materiais de ajuda; documentar intervenções clínicas e mudanças substantivas.

## Autoria

Projeto Trilha da Clareza — Richelmy Murta. Código e conteúdo ainda sem licença de redistribuição atribuída.
