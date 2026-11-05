# Integração eventual com a Plataforma Clínica — especificação de segurança
Data: 05/11/2026 | Estado: BLOQUEADA, NÃO IMPLEMENTADA.

## Arquitetura real verificada
A Plataforma Clínica publica somente código no GitHub Pages e mantém o conteúdo do prontuário num cofre local cifrado (IndexedDB) sincronizado de forma privada pelo Google Drive appDataFolder, também cifrado com AES-256-GCM. O acesso à conta e o desbloqueio do cofre são prerrequisitos para mudanças clínicas. A reconciliação com Gemini produz rascunhos a serem validados pelo profissional; não encerra prontuários automaticamente.

O README da plataforma registra gates ainda pendentes no dispositivo do usuário: backup, restore isolado, sincronização notebook ↔ celular e confirmação dos fluxos clínicos reais. Portanto **não é seguro declarar integração clínica concluída por uma alteração em GitHub**, nem operar em dados sem a sessão autenticada e o cofre desbloqueado.

## Limites de fronteira
- Trilha da Clareza é um domínio público com conteúdo psicoeducativo genérico.
- Não transportar nome, e-mail, ID de paciente, diagnóstico, respostas ou transcrição por URL, query string, postMessage aberto, repositório, issue, commit, analytics ou webhook.
- Não implementar API token no frontend estático, cookie clínico entre domínios ou sincronização automática da Trilha para o Google Drive.
- Não adicionar armazenamento clínico público nem reaproveitar o backend legado GitHub bloqueado.

## Integração recomendada no momento — revisão humana
1. Usuário gera, somente se desejar, uma síntese neutra na Trilha, sem identificação.
2. Profissional acessa a plataforma clínica autenticada e desbloqueia o cofre de dados.
3. Profissional seleciona paciente correto **dentro** do ambiente clínico e revisa a pertinência do conteúdo, podendo ignorá-lo.
4. Se adequado, incorpora uma observação como adendo, sem substituir documentos ou dados históricos.
5. Salva com validação clínica e verifica readback do cofre cifrado e, quando autorizado, sincronização entre dispositivos.

## Adaptação futura ao modelo local-first (não ativa)
Somente após resolver os gates de backup, restore e sincronização:
- Implementar no workspace do paciente uma função privada de importação manual de texto neutro, nunca chamada automaticamente pelo site público.
- Confirmar papel/permissões, paciente selecionado, origem, data da revisão, versão do conteúdo e consentimentos aplicáveis.
- Validar tamanho, estrutura e conteúdo antes de converter em rascunho, mantendo trilha auditável.
- Persistir apenas dentro do cofre cifrado existente; nunca em GitHub, Calendar ou logs externos.
- Conferir leitura pós-gravação, backup, restore e sincronização de ida e volta, incluindo conflito real.
- Realizar revisão profissional explícita antes de transformar rascunho em anotação final.
- Avaliar LGPD, segurança, testes de acesso, resíduos em cache/clipboard, direitos e retenção.

## Estado entregue
A Trilha disponibiliza um resumo TXT não identificado e voluntário e uma revisão opcional local. **Nenhum arquivo do prontuário, dados do Fábio ou da Plataforma Clínica foi alterado**, e nenhum envio, importação ou associação automática foi habilitado.
