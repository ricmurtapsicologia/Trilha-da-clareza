# Hotfix executivo — Trilha da Clareza
Data de elaboração: 05/11/2026. Escopo: programa psicoeducativo genérico, página única.

## Meta de valor
Ajudar uma pessoa a percorrer um texto adulto, compreender seu argumento, escolher uma ação pequena em contexto viável, antecipar obstáculo e revisar uma tentativa. A plataforma não avalia TDAH ou eficácia terapêutica.

## Conclusões técnicas e intervenções
| ID | Alteração executada | Verificação |
|---|---|---|
| HF-01 | Seleções de interpretação e ação não remontam formulário nem perdem foco | E2E focus/radio |
| HF-02 | Estado da leitura mantido em variável de módulo ao trocar de tela na mesma aba; sem armazenamento persistente | E2E ida e retorno |
| HF-03 | Barra de 6 etapas, inclusive interpretação, planejamento e síntese | E2E aria-valuenow/valuemax |
| HF-04 | Plano com ação observável, ocasião situacional, momento opcional e instrução se–então | Teste da síntese |
| HF-05 | Barreiras previsíveis e alternativas seguras: tempo, energia, amplitude, interrupção e contexto inadequado | Testes por opção |
| HF-06 | Tela independente para revisão posterior, inclusive quando a leitura foi encerrada | E2E home → revisão |
| HF-07 | Devolutiva imediata para alternativas e justificativa opcional; sem texto livre obrigatório | E2E estado de foco |
| HF-08 | Biblioteca de quatro temas em progressão sugerida, sem cronograma automático ou gamificação | Testes catálogo |
| HF-09 | Modo leitura, TXT de todas as partes e impressão/PDF nativo via CSS print | E2E arquivo e CSS print |
| HF-10 | Protocolo para observar utilidade com usuário elegível | Ver docs/PROTOCOLO_VALIDACAO_USABILIDADE.md |
| HF-11 | Contrato de integração clínica protegida, sem conexão ativa ou dados identificáveis no site público | Ver docs/INTEGRACAO_CLINICA_SEGURA.md |
| HF-12 | CI com TypeScript, integridade, testes Node/Playwright e escaneamento WCAG automatizado | Evidência do PR |

## Critérios de valor comportamental
Sem telemetria identificável: a pessoa compreende o mecanismo, escolhe ação segura, vincula a ocasião, escolhe alternativa, relata o que tentou e identifica um ajuste. A adesão, melhora ou eficácia não podem ser inferidas dos cliques.

## Privacidade
Estados simples ficam exclusivamente na memória JS da aba: conteúdo selecionado, orientação, ação, ocasião, barreira, resultado e ajuste. O navegador descarta ao recarregar/fechar. Não há localStorage, sessionStorage, API, cookies de produto ou envio automático. TXT, impressão e cópia ocorrem somente por ação explícita.

## Limites técnicos e clínicos
Retomada existe **entre telas da mesma aba**, e não após recarregar ou fechar. Persistência entre sessões e integração autenticada não podem ser acrescentadas a um site público sem avaliação jurídica, clínica e de infraestrutura. A biblioteca é conteúdo genérico; não foi escrita como intervenção individualizada.
Aprovação clínica individual, testes assistivos em dispositivos reais e observação com participantes continuam pendentes; automação não os substitui.
