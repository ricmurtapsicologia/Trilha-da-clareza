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
- [ ] Confronto dos 30 testes próprios com o protocolo canônico de auditoria 30/30.
- [ ] Análise dos termos da hospedagem para a finalidade profissional pretendida.
- [ ] Aceite clínico documentado e aprovação expressa para compartilhar com pacientes.

**Regra:** testes de software aprovados não constituem evidência de eficácia terapêutica. O uso experimental deve ser voluntário e supervisionado; registros identificáveis não devem ser inseridos no repositório, issues ou workflows.
