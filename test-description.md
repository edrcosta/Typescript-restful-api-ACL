# Desafio Backend

Olá, gostaríamos de dizer que estamos felizes pelo seu interesse em nossa vaga e lhe convidar a participar do nosso desafio técnico. 😁

O que avaliamos:

- Seu código
- Organização
- Boas práticas

### Desafio

Para este teste, você vai criar uma API REST que possibilite um cadastro de usuários e login, com as seguintes funcões:

**Usuários**
- Cadastrar um novo usuário
- Listar informações de um usuário
- Alterar o nome e tipo de um usuário
- Excluir um usuário
- Alterar o status de um usuário(ativo e inativo)

**Tipos**
- Listar todos os tipos cadastrados

### Regras de negócio
- A tabela de usuários deve conter os campos nome, senha, tipo, email e status.
- A tabela de tipos deve a descrição do tipo.
- Um usuário tem apenas um único tipo
- Apenas usuários do tipo root e admin podem cadastrar novos usuários.
- Apenas usuários do tipo root admin podem alterar qualquer informação do usuário(inclusive status);
- Apenas usuários root podem excluir usuários
- Usuários do tipo geral só tem acesso a listar informações de seu próprio usuário, bem como alterar suas próprias informações.
- O login deve ser feito com email e senha.

## Requisitos
- O projeto deve ser documentado, principalmente a arquitetura utilizada e as rotas para cada tarefa.
- O projeto deve ser construído com Typescript
- O projeto deve ter uma cobertura considerável de testes unitários

### 🚫 O que não pode? (por favor 🙏😂)

- usar eslint-disable em qualquer lugar
- usar tipagem any (sem preguiça!)
- deixar qualquer warning ou erros no console do servidor 
- deixar erros do eslint
- códigos comentados
- console logs
- fazer apenas 1 commit com todo código

### Ao final:

Ao terminar, você deve fornecer acesso ao repositório (se o repositório for privado, dar permissão de acesso para @torreslucas13), bem como sinalizar à pessoa que está mantendo o contato com você durante o processo notificando a finalização do teste.
