# Trilha da Clareza

**Uma jornada entre pensamentos, emoções e escolhas.**

MVP 0.1.0 — recurso psicoeducativo interativo para adultos. A aplicação **não** realiza diagnóstico, atendimento psicológico nem avaliação de risco. **Ainda não está homologada para uso assistencial.**

## Status

- Implementados: 3 jornadas, 18 desafios, 54 alternativas com feedback, tabuleiro responsivo, pausa, navegação, conclusão e exportação local voluntária.
- Preparados: 12 roteiros de áudio, com texto e prévia opcional pela voz do dispositivo (`speechSynthesis`).
- Pendentes: síntese neural TTS pré-gravada, revisão clínica formal, avaliações assistivas e testes da versão publicada em hospedagem real.
- Testados localmente: 11 verificações de unidade e 106 verificações de navegador, sem erros conhecidos nos fluxos cobertos.

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

Os arquivos compilados em `dist/` já acompanham o projeto: hospedagem estática serve `index.html` diretamente, sem processo de build no servidor. Para desenvolver, execute `npm install` e `npm run build`, ou utilize TypeScript globalmente instalado (`tsc -p tsconfig.json`).

Testes:

```sh
node --test tests/domain.test.mjs
python tests/browser_e2e.py
```

O teste de navegador usa um carregador offline para contornar políticas de navegação do ambiente de avaliação. Não substitui o E2E real após hospedagem.

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
- `tests/` — testes unitários e funcionais de navegador.

## Princípios de revisão clínica

Aprovar roteiros e feedbacks antes de qualquer uso assistencial; evitar indução de culpa ou certezas infundadas; não confundir conclusão de jornada com resultado terapêutico; manter alternativa de pausa/saída e materiais de ajuda; documentar intervenções clínicas e mudanças substantivas.

## Autoria

Projeto Trilha da Clareza — Richelmy Murta. Código e conteúdo ainda sem licença de redistribuição atribuída.
