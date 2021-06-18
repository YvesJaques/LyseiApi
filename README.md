# Lysei api
Api desenvolvida durante o Code/Station Hackathon | Rocketseat 2021.\
O projeto se trata de uma aplicação/rede social para publicação de problemas urbanos com o intuito de chamar a atenção das autoridades políticas para solução e urgência dos mesmos.


# Cadastro de usuários civis

**RF**
- [x] Deve ser possível cadastrar um novo usuário.

**RN**
- [x] Não deve ser possível cadastrar um novo usuário com um cpf ou email já em uso.


# Cadastro de usuários políticos

**RF**
- [x] Deve ser possível cadastrar um novo político.

**RN**
- [x] Não deve ser possível cadastrar um novo político com um cpf ou email já em uso.
- [] O cargo deve ser informado.

# Atualização de dados

**RF**
- [] Deve ser possível consultar os dados de usuário
- [] Deve ser possível atualizar dados de usuário
- [] Deve ser possível mudar a senha

**RN**
- [] O usuário deve estar logado
- [] O usuário só pode realizar estas operações na própria conta

# Cadastro de problemas

- [x] Deve ser possível criar publicações de problemas urbanos com texto
- [x] Deve ser possível anexar imagens.
- Deve ser possível anexar vídeos.
- [x] Deve ser possível curtir/descurtir publicações.
- Deve ser possível favoritar publicações.
- Deve ser possível compartilhar publicações.

**RN**
- [x] O usuário deve estar logado na aplicação.
- Problemas urbanos podem ser marcados como concluídos por usuários políticos.