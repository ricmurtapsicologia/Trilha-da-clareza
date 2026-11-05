# Integração eventual com plataforma clínica — especificação, NÃO IMPLEMENTADA
Data: 05/11/2026. Estado: bloqueada por dependências de autenticação e revisão clínica.

## Princípio
A Trilha da Clareza permanece estática, genérica e sem dados de pacientes. Não usar query string com identidade, link público individualizado, cookies de sessão clínica compartilhados, API key no JavaScript, coletor analítico ou GitHub Actions para transportar dados de saúde.

## Arquitetura segura (somente quando autorizada)
1. O profissional entra na **plataforma clínica autenticada**, não no site público.
2. A seleção do paciente ocorre dentro do cofre, sob autorização de função e controle de acesso.
3. O usuário pode apresentar voluntariamente uma síntese neutra e sem identificadores. O profissional decide se é clinicamente pertinente registrar o conteúdo.
4. Se houver importação futura, ela deverá ocorrer do lado servidor da plataforma clínica, em sessão autenticada e com validações de origem, escopo, esquema, tamanho, auditoria e criptografia em trânsito/repouso.
5. Guardar versão e proveniência do conteúdo e registrar quem validou a incorporação; jamais sobrepor registro clínico anterior.
6. Definir retenção, direitos, base legal apropriada, DPIA/RIPD quando aplicável, gerenciamento de incidentes e acesso a registros.
7. Testar controle de acesso horizontal/vertical, exposição acidental, replay, logs, backups e sincronização cifrada antes de habilitar.

## Contrato de dados sugerido — não é endpoint ativo
Objeto interno, criado exclusivamente no ambiente autenticado: content_version, exercise_type, self_reported_attempt, obstacle, adjustment, reviewed_by, reviewed_at. Identidade do paciente pertence somente ao contexto autenticado da clínica. O objeto não transita para o domínio do GitHub Pages.

## Alternativa disponível agora
Download de resumo TXT **não identificado** e compartilhamento voluntário, seguido de discussão e registro profissional no prontuário protegido, se apropriado. Não há sincronização, importação automática, vínculo de paciente ou prontuário alterado.
