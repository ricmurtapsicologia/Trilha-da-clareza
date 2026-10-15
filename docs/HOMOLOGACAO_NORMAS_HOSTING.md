# Homologação — privacidade, enquadramento profissional e hospedagem

**Data: 15/10/2026. Documento de triagem normativa; não constitui parecer jurídico, ético ou de segurança.**

## Achados verificáveis em fontes oficiais

1. **GitHub Pages:** a documentação oficial limita o uso do Pages como hospedagem gratuita para operar negócio online, operações predominantemente comerciais ou SaaS; também desaconselha transações sensíveis. **Um protótipo educativo sem operações comerciais não é automaticamente proibido**, mas a oferta assistencial/profissional exige avaliação específica dos termos, finalidade e riscos. Fonte: https://docs.github.com/pt/pages/getting-started-with-github-pages/github-pages-limits
2. **Cabeçalhos de segurança:** sondagem HTTPS da Onda 7 identificou `Strict-Transport-Security`, mas não `X-Frame-Options` nem `Content-Security-Policy` no header. A diretiva `frame-ancestors` em `<meta>` não funciona. Sem resposta de hospedagem/configuração, não declarar mitigação de clickjacking.
3. **ANPD e dados sensíveis:** dados relacionados à saúde têm proteção especial. O guia da ANPD esclarece que `legítimo interesse` não é hipótese legal para dados pessoais sensíveis; um eventual piloto com relatos, registros e dados de saúde exige análise das bases do artigo 11 da LGPD e das medidas correspondentes. O aplicativo não transmite respostas no fluxo testado, mas a hospedagem pode registrar dados técnicos de acesso. Fonte: https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia_legitimo_interesse.pdf
4. **Psicologia por TDIC:** informações do Sistema Conselhos de Psicologia apontam a Resolução CFP nº 009/2024 como normativa para serviços psicológicos mediados por TDIC, com as mesmas exigências éticas e técnicas dos presenciais, quando aplicável. Fonte: https://transparencia.cfp.org.br/crp16/pergunta-frequente/atendimento-online/
5. **Pesquisa envolvendo pessoas:** a Resolução CNS nº 510/2016 disciplina pesquisas em Ciências Humanas e Sociais. **Não presumir** que pesquisa formativa, auditoria interna ou piloto assistencial tenham o mesmo enquadramento; fazer avaliação motivada e, quando devido, apreciação ética prévia. Fonte: https://www.gov.br/conselho-nacional-de-saude/pt-br/atos-normativos/resolucoes/2016/resolucao-no-510.pdf/view

## Decisões objetivas para fechar esta etapa

| Pendência | Caminho seguro | Aceite exigido |
|---|---|---|
| GitHub Pages como serviço profissional | Manter apenas demo; avaliar plataforma de hospedagem que permita headers administráveis e termos compatíveis; validar ausência de custo antes de contratar/migrar | Avaliação jurídica/contratual |
| Segurança anti-iframe | Implantar CSP **no cabeçalho HTTP** com `frame-ancestors`, ou `X-Frame-Options` na hospedagem de destino | Teste HTTP real e revisão técnica |
| Dados de pesquisa/piloto | Nenhuma informação clínica em GitHub, logs de teste ou formulários públicos; definir finalidade, retenção, acesso e base legal antes de coletar | Responsável LGPD |
| Voz neural Faber | Não publicar MP3 não homologado; optar por voz com direitos comprovados ou deliberar formalmente um escopo inteiramente textual | Licença + parecer clínico |
| Liberação a pacientes | Não iniciar recrutamento nem divulgar até avaliação clínica, assistiva e de piloto | Autorizações humanas formais |

**Conclusão:** critérios legais, finalidade da hospedagem, voz neural e anti-iframe permanecem **pendentes**. Esta revisão identificou riscos concretos e orienta decisões, mas não os aprova por inferência.
