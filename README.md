# Lysei api
Api desenvolvida durante o Code/Station Hackathon | Rocketseat 2021.\
O projeto se trata de uma aplicação/rede social para publicação de problemas urbanos com o intuito de chamar a atenção das autoridades políticas para solução e urgência dos mesmos.


# Cadastro de usuários civis

**RF**
- [x] Deve ser possível cadastrar um novo usuário. :checkmark:

**RN**
- [x] Não deve ser possível cadastrar um novo usuário com um cpf ou email já em uso.


# Cadastro de usuários políticos

**RF**
- Deve ser possível cadastrar um novo político.

**RN**
- [x] Não deve ser possível cadastrar um novo político com um cpf ou email já em uso.
- O cargo deve ser informado.


# Cadastro de problemas

- Deve ser possível criar publicações de problemas urbanos com texto, upload de vídeo e imagens.
- Deve ser possível curtir publicações.
- Deve ser possível favoritar publicações.
- Deve ser possível compartilhar publicações.

**RN**
- O usuário deve estar logado na aplicação.
- Problemas urbanos não devem possuir opção de descurtir.
- Problemas urbanos podem ser dados como concluídos por usuários políticos.

# Cadastro de projetos de lei

- Deve ser possível publicar projetos de lei.
- Deve ser possível curtir ou descurtir projetos de lei.
- Deve ser possível favoritar projetos de lei.

**RN**
- O usuário deve estar logado na aplicação.
- Somente administradores ou políticos podem cadastrar projetos de lei.
- Os usuários atrelados às curtidas e descurtidas devem permanecer anônimos.
- Não deve ser possível curtir e descurtir um projeto de lei.