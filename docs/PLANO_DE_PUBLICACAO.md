# Gates de publicação

## Gate A — Código (executado)

- `tsc -p tsconfig.json`: aprovado.
- `node --test`: 11/11 testes aprovados.
- `python tests/browser_e2e.py`: 106/106 verificações aprovadas, em renderização de navegador via carregador offline.
- Imagens de desktop, mobile, tela de jornadas e tabuleiro criadas.

## Gate B — Conteúdo clínico (pendente)

- Revisão técnica dos 18 desafios, 54 feedbacks e 12 roteiros por psicólogo responsável.
- Checagem de adequação de exercícios, linguagem, situações sensíveis e limites de uso.
- Aprovação explícita para uso assistencial.

## Gate C — Áudio de produção (pendente)

- Seleção de voz neural com licença e custos aprovados.
- Produção dos 12 arquivos pré-gravados, revisão da pronúncia, normalização e verificação no celular.
- Preservar transcrições. A voz do dispositivo disponível na versão atual é somente uma prévia opcional.

## Gate D — Hospedagem e segurança real (pendente)

- Criação de repositório independente.
- Publicação em hospedagem autorizada.
- Teste de rede, console e restrições CSP em URL real.
- Checagem de acessibilidade com leitor de tela e validação em dispositivo físico.
- Confirmar termos de hospedagem para a finalidade profissional.
- Homologação final por responsável.

## Limitação da integração do GitHub

A integração conectada permite editar arquivos em repositórios existentes, mas não oferece uma operação de criação de novos repositórios. Como independência é requisito obrigatório, a publicação deve aguardar um repositório vazio criado pelo proprietário. Não reutilizar `emocao360`, `plataforma.terapeutica` ou outros repositórios existentes como base da página.
