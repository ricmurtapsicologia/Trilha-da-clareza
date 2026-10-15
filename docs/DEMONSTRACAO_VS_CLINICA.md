# Demonstração pública versus liberação clínica

**Decisão específica:** a versão técnica mais recente pode substituir a demo atual em `main` por solicitação do proprietário em 15/10/2026.

| Uso | Autorização | Estado |
|---|---|---|
| Hospedar código estático e abrir página demonstrativa já existente | Atualização técnica autorizada pelo proprietário | Aguardando merge e validação Pages |
| Partilhar como recurso de atendimento psicológico a pacientes | Não concedida | **NO-GO** |
| Recrutar participantes, executar estudo/piloto | Não concedida | **NO-GO** |
| Utilizar voz neural Faber sem cadeia de licença comprovada | Não concedida | **NO-GO** |
| Alegar segurança integral, conformidade WCAG/LGPD ou eficácia | Sem evidência | **NO-GO** |

O código preserva avisos de que se trata de um protótipo não homologado. O módulo TTS neural não está presente na página; há texto e prévia de voz local opcional do dispositivo. Logs de hospedagem, riscos de clickjacking, termos do GitHub Pages e revisão humana continuam pendentes.

A matriz `ONDA_9_GO_NO_GO.json` descreve **prontidão de uso assistencial**, que permanece com `merge_authorized=false` para uma *liberação clínica*. A autorização de atualização da demo é delimitada e não altera os requisitos nem atribui aprovação retroativa aos gates.

Após atualizar `main`, verificar GitHub Actions, Pages HTTPS, hashes/módulos, fluxos e ausência de remotos indesejados. Se houver regressão, restaurar via PR de reversão, sem force push.
