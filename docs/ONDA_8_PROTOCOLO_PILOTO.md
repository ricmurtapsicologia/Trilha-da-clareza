# Onda 8 — Protocolo de pré-piloto e piloto supervisionado

**Trilha da Clareza · versão-base MVP 0.1.0 · 15/10/2026**  
**Status: PREPARAÇÃO DOCUMENTAL E TÉCNICA. Nenhum piloto humano iniciado. Não homologado para uso com pacientes.**

## 1. Pergunta, finalidade e limites

A finalidade **formativa** é verificar se a interface está compreensível, acessível, utilizável e segura para exploração psicoeducativa breve; NÃO medir melhora de ansiedade, resultado de psicoterapia, diagnóstico, eficácia clínica ou desempenho psicométrico. O produto não presta atendimento de crise, não avalia risco e não deve ser usado como substituto de atendimento.

O piloto proposto tem três estágios, com permissões distintas:

| Estágio | Participantes | Quando | Autoriza |
|---|---|---|---|
| A. Ensaio sintético | **Nenhuma pessoa**; robô Chromium com escolhas fictícias | Pode executar agora na ramificação de auditoria | Apenas avaliar fluxos e invariantes técnicos |
| B. Formativo não assistencial | Pessoas adultas voluntárias, se elegíveis, sem relação de cuidado e sem recrutamento coercitivo | Somente após revisão clínica do conteúdo, acessibilidade essencial, informação/consentimento, segurança, privacidade e deliberação ética do desenho | Observar navegação, compreensão e barreiras, sem alegações clínicas |
| C. Piloto supervisionado em contexto assistencial | Adultos, exclusivamente após avaliação de risco e elegibilidade por psicólogo responsável e demais aprovações | Somente após gates 1, 2, 5, 6, 7 aprovados e autorizações aplicáveis | Avaliação monitorada e limitada do uso, nunca automonitoramento de risco pelo site |

**Nenhum voluntário ou paciente é recrutado, contatado ou testado neste estágio.**

## 2. Responsabilidades e decisões obrigatórias

O profissional responsável decide a adequação clínica, os riscos, critérios de elegibilidade e interrupção. Responsável por privacidade analisa finalidade, hipóteses legais, retenção, proteção e eventuais dados sensíveis. Responsável técnico testa navegação, acessibilidade e infraestrutura. Caso haja projeto de pesquisa, o enquadramento e possível revisão por CEP/CONEP devem ser avaliados **antes** do recrutamento; não presumir aprovação ou dispensa.

**Referências para verificação profissional:** Resolução CFP nº 9/2024 (exercício da Psicologia mediado por TDIC); Resolução CNS nº 510/2016 (pesquisa em Ciências Humanas e Sociais); LGPD e orientações da ANPD, inclusive dados de saúde sensíveis. Esses links não são parecer jurídico ou ético:
- https://atosoficiais.com.br/lei/orientacao-psicologica-pela-internet-cfp?origin=instituicao
- https://www.gov.br/conselho-nacional-de-saude/pt-br/atos-normativos/resolucoes/2016/resolucao-no-510.pdf/view
- https://www.gov.br/anpd/pt-br/acesso-a-informacao/perguntas-frequentes/perguntas-frequentes

## 3. Gates pré-recrutamento: todos obrigatórios

1. Revisão e aceite clínico dos 18 desafios, 54 devolutivas, 12 roteiros e exercício de pausa, com versão congelada.
2. Ajustes UX e validação de tecnologias assistivas com protocolo independente; alternativa íntegra sem áudio; testes em dispositivo real.
3. TTS: comprovação de licenças e QA da versão que será exposta. Se o desenho alterar uso de áudio, reavaliar gate e versão; **não apresentar MP3 Faber não licenciado**.
4. Revisão de cabeçalhos, hospedagem, logs, medidas anti-iframe, termos de serviço e tratamento de dados. A ausência de armazenamento na app **não elimina** registros do provedor.
5. Segurança e interrupção: canal humano durante sessão, orientação de encaminhamento, disponibilidade de apoio, procedimentos diante de desconforto e critérios para suspender.
6. Definição da natureza do estudo (melhoria interna x pesquisa com participantes) e decisão documentada sobre obrigações éticas e regulatórias. Obter parecer/registro quando necessário.
7. Documento de informações e consentimento validado e modo de revogação/retirada sem consequências.
8. Proteção de dados: somente observações mínimas, sem conteúdo íntimo, sem captura identificável, local de armazenamento privado apropriado, controle de acesso e prazo de eliminação formalmente definidos.
9. Aceite explícito dos responsáveis, fixando commit/versão, local do teste, duração e pessoas autorizadas.
10. **Autorização escrita específica para iniciar o recrutamento e outra para começar o piloto**, após comprovação de todos os itens.

Estados estruturados desses requisitos em `docs/ONDA_8_READINESS.json`. A execução de teste sintético **não** modifica essa liberação.

## 4. Elegibilidade e proteção

Somente considerar adultos capazes de consentir livremente e usar o dispositivo; nunca confundir a participação com obrigação de tratamento. Para a fase B, evitar relações de dependência, subordinação ou pressão. Para a fase C, a elegibilidade depende de avaliação individual pelo profissional. **Não incluir, nesta fase exploratória:** menores, pessoas em crise aguda, com ideação/risco suicida atual, sofrimento intenso sem apoio apropriado, incapacidade atual para consentir, risco imediato ou situações em que o exercício possa induzir exposição a violência. A exclusão é medida de segurança do piloto, não juízo sobre capacidade permanente de usar recursos digitais.

**Atenção:** o site não monitora sinais de risco; não adotar aplicativo como mecanismo de avaliação nem de acompanhamento de segurança.

## 5. Processo de uma sessão presencial ou remota supervisionada — AINDA NÃO AUTORIZADA

- Antes (5–10 min): conferir versão/URL, explicar finalidade e limites, voluntariedade, privacidade, possibilidade de encerrar, ausência de monitoramento de crise; verificar entendimento; consentimento conforme protocolo aprovado.
- Atividades (10–20 min): tarefas de navegação na tela inicial, ajuda/privacidade, uma jornada, feedback, transcrição, pausa, retomada, descarte e saída. Não induzir relato de vivências pessoais nem solicitar escolha de opções clinicamente verdadeiras.
- Depois (5–10 min): percepção da clareza das instruções, esforço de navegação, conforto e dificuldades; não realizar escalas diagnósticas nem prometer benefício.
- Encerramento: agradecer sem coerção e reforçar que interromper é permitido a qualquer instante.

A duração é um **limite de planejamento**, não tempo exigido; encerrar antecipadamente é permitido. Na fase C, o profissional define adaptações clínicas.

## 6. Critérios de parada

Interromper prontamente, suspender gravações/observações e oferecer suporte humano se houver sofrimento, agitação significativa, pedido de retirada, conflito de segurança, falha de foco que impeça saída, exposição de dados, vazamento, conteúdo inadequado ou suspeita de dano. Diante de risco imediato, seguir o procedimento presencial/local de emergência estabelecido pelo profissional; não depender da página ou de notificação automática.

Nenhum evento de sofrimento ou questão clínica deve ser descrito em GitHub Issues, PR, Actions, planilhas públicas ou documentação de código.

## 7. Indicadores e regras de decisão

**Sem dados reais hoje.** Quando autorizado, a análise descritiva deve distinguir:
- Percentual de tarefas concluídas sem ajuda; tarefas fracassadas e causa observável.
- Capacidade de localizar ajuda, pausa, descarte e saída.
- Capacidade de explicar, em linguagem própria, que não é terapia, diagnóstico ou serviço de emergência.
- Dificuldades de leitura, foco, teclado, leitor de tela e uso mobile.
- Relatos voluntários de desconforto, sem transcrição íntima ou dado sensível nos relatórios técnicos.

Critérios **propostos e revisáveis**, nunca equivalentes à validação clínica: 100% das pessoas avaliadas precisam localizar um mecanismo de interrupção com ajuda apropriada; nenhuma falha crítica de privacidade, saída ou bloqueio; objetivo de pelo menos 90% de conclusão autônoma das tarefas essenciais. Uma amostra pequena de usabilidade não sustenta inferências de eficácia. Qualquer evento adverso leva à reavaliação, independentemente da taxa de êxito.

## 8. Controle de versões e evidências

Um registro privado do piloto, se autorizado, indicará: hash do commit, URL, data, responsáveis, protocolo/versão, eventuais aprovações, incidentes e plano de correção. Não inserir nomes, CRPs, contatos, gravações, imagens de pessoas, prontuários ou informações sensíveis no repositório público. Para avaliações públicas de software, usar **somente dados fictícios e agregados sem identificação**.

## 9. Conclusão desta onda

**Preparação: realizável em desenvolvimento. Piloto com pessoas: NÃO INICIADO E NÃO AUTORIZADO.** Nenhuma intervenção clínica foi testada; não declarar validade, eficácia ou segurança humana. O Gate 8 permanece bloqueado até decisão fundamentada de profissionais, regularização dos gates anteriores e efetiva realização do piloto apropriado.
