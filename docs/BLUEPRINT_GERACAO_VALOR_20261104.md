# Blueprint executivo de valor — Trilha da Clareza
Data: 04/11/2026 | Versão candidata: prática breve 0.2 (apenas demonstração)

## Objetivo
Transformar aprendizagem em habilidade aplicável: perceber uma situação, orientar-se, escolher uma ação proporcional e revisar o próximo passo. Não prometer alívio imediato, diagnóstico, tratamento ou eficácia.

## Implementação
- Acesso à prática breve na página inicial, preservando as três jornadas e seus 18 desafios.
- Módulo de prática breve incorporado à página principal, com cinco etapas: Escolher, Perceber, Orientar-se, Agir e Revisar.
- Três temas: antecipação/incerteza, autocobrança e conflitos/limites; nenhum exemplo identificável de paciente.
- Orientação breve de atenção ao ambiente, facultativa e sem impor modificação de respiração.
- Três microações por tema e plano com adaptação e momento opcionais.
- Percepção momentânea 0–10 antes/depois opcional, sem valor de teste psicológico ou inferência de melhora.
- Cópia de resumo neutro sem anotações ou valores; download detalhado somente por ação explícita.
- Sem cadastro, cookies próprios, analytics, requisições externas, armazenamento persistente ou envio de respostas.
- Testes unitários, script E2E e workflow de verificação técnica.

## Arquitetura
JS modular nativo: pratica-core.js para regras puras e pratica.js para interface encapsulada em Shadow DOM; apenas index.html é público como página da aplicação. O aplicativo antigo permanece em TypeScript. As anotações são mantidas apenas na memória da página até fechamento/recarregamento; um arquivo voluntariamente baixado passa a ser controlado pelo usuário. Não houve integração à plataforma clínica.

## Critérios de aceite técnico
1. Instalar dependências fixadas com npm ci --ignore-scripts --no-audit --no-fund.
2. Executar npm run typecheck, npm run build, npm run verify:build e npm test.
3. Servir por HTTP e executar testes/quick_e2e.py em Chromium com quatro larguras: 320, 390, 768 e 1366 px.
4. Confirmar três temas, cinco etapas, seleção obrigatória de ação, navegar e voltar, resumo, download, descarte e ausência de rolagem horizontal.
5. Confirmar regressões das jornadas existentes: seleção, seis etapas, retorno, pausa, reinício, exportação, narração e leitura de transcrições.
6. Confirmar ausência de POST, domínios externos, persistência e compartilhamento automático.
7. Validar manualmente TalkBack, NVDA/VoiceOver, dispositivos reais e requisitos WCAG 2.2 AA.
8. Após eventual merge, executar smoke e E2E em HTTPS no endereço publicado.

## Gate clínico NÃO CONCLUÍDO
Permanecem pendentes: revisão item a item dos textos originais e novos; riscos de violência, coerção, crise e verificação; exercícios de atenção ao ambiente; avaliação do significado de percepção 0–10; testes assistivos e formativos com pessoas; hospedagem apropriada, privacidade e cabeçalhos anti-iframe; qualidade e direitos de áudios; piloto supervisionado quando cabível; aprovação profissional explícita, assinada e vinculada ao SHA aprovado. Nenhuma dessas aprovações é inferida de testes automáticos.

## Geração de valor
Indicadores propostos somente para estudo autorizado: conclusão sem assistência, compreensão da habilidade, formulação de próximo passo, utilidade percebida e incidentes de privacidade. Metas iniciais propostas (não medidas): 90% de conclusão autônoma e 80% de compreensão/aplicação. Não coletar telemetria de pacientes para esses indicadores.

## Ordem executiva e rollback
P0: preservar main estável, privacidade, avisos, testes, rollback.
P1: fluxo breve, ações, síntese neutra, exportação voluntária, responsividade.
P2: percepções opcionais e eventual evolução segura após validação.
Publicar código apenas via PR revisado. Qualquer publicação demonstrativa deve manter avisos de protótipo e não equivale a liberação assistencial. Em falha crítica: suspender distribuição, não registrar dados pessoais em issues, reverter por PR e repetir todos os testes.

## Riscos remanescentes
GitHub Pages não está homologado para oferta assistencial; proteção anti-iframe deve ser conferida por cabeçalhos HTTP e não por meta-CSP. Nenhuma alteração nesta branch remove bloqueios clínicos documentados.
