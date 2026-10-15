# Gate de liberação — Trilha da Clareza

**Versão:** MVP 0.1.0. **Situação:** desenvolvimento e demonstração técnica; NÃO HOMOLOGADO para uso assistencial com pacientes.

## Concluído / evidência disponível
- Código-fonte e build estático independentes em GitHub.
- Três jornadas, dezoito desafios, cinquenta e quatro opções e doze roteiros.
- Sem cadastro, analytics ou transmissão deliberada das escolhas.
- GitHub Actions: 40 testes Node e 21 cenários axe-core sem violação automática, mais E2E HTTP candidato e HTTPS público em 4 larguras de tela; **não** representam homologação assistencial.
- Revisão de identificadores pessoais no conteúdo local: nenhum nome de paciente incluído.

## Pendências bloqueantes de liberação clínica
- [ ] Revisão profissional linha a linha dos cenários, perguntas e feedbacks, incluindo proteção contra danos.
- [ ] Áudios TTS neurais pré-gravados, licenciamento, análise da voz, correspondência com transcrições (a versão atual oferece prévia opcional pela voz do dispositivo).
- [x] Triagem automatizada axe-core (21 cenários, nenhum achado A/AA detectado; não substitui WCAG integral).
- [ ] Auditoria de acessibilidade WCAG 2.2 AA com tecnologias assistivas reais (NVDA/TalkBack/VoiceOver e zoom/foco), no aparelho físico.
- [x] Smoke estático candidato de CSP, referrer, rede externa, cookies e armazenamento local (automação no GitHub Actions).
- [ ] Avaliação complementar da hospedagem final (cabeçalhos HTTP, anti-iframe, LGPD, logs do provedor, termos de serviço e telemetria inadvertida).
- [ ] E2E e smoke no endereço hospedado, em pelo menos um celular real.
- [x] Confronto documentado dos 30 controles canônicos com evidências (15 PASS técnicos, 14 PARCIAIS, 1 BLOQUEADO).
- [ ] Fechamento integral 30/30 com revisão clínica, TTS licenciado, leitores de tela, testes físicos, privacidade/hospedagem e piloto aprovados.
- [ ] Análise dos termos da hospedagem para a finalidade profissional pretendida.
- [x] Protocolo e instrumentos **modelos** do piloto elaborados sem dados de pessoas; simulador automático sem participação humana (Onda 8).
- [ ] Deliberação prévia sobre necessidade de apreciação ética/CEP para o desenho e finalidade do estudo, quando aplicável.
- [ ] Recrutamento/consentimento e execução supervisionada de piloto com participantes elegíveis, somente após todos os gates prévios.
- [x] Onda 9: matriz GO/NO-GO, verificador fail-closed, hashes de distribuição e roteiro de rollback preparados na ramificação de auditoria.
- [ ] Testar efetivamente a versão após um eventual merge autorizado, com equipamentos físicos, headers e monitoramento da estabilização.
- [ ] Aceite clínico documentado e aprovação expressa para compartilhar com pacientes.

**Regra:** testes de software aprovados não constituem evidência de eficácia terapêutica. O uso experimental deve ser voluntário e supervisionado; registros identificáveis não devem ser inseridos no repositório, issues ou workflows.
