# Lysei api
Api desenvolvida durante o Code/Station Hackathon | Rocketseat 2021.\
O projeto se trata de uma aplicação/rede social para publicação de problemas urbanos com o intuito de chamar a atenção das autoridades políticas para solução e urgência dos mesmos.


# Cadastro de usuários civis

**RF**
- Deve ser possível cadastrar um novo usuário.

**RN**
- Não deve ser possível cadastrar um novo usuário com um cpf já em uso.


# Cadastro de usuários políticos

**RF**
- Deve ser possível cadastrar um novo político.

**RN**
- Não deve ser possível cadastrar um novo político com um cpf já em uso.
- O cargo deve ser informado.


# Cadastro de problemas

- Deve ser possível criar publicações de problemas urbanos com texto, upload de vídeo e imagens.
- Deve ser possível curtir publicações.
- Deve ser possível favoritar publicações.
- Deve ser possível compartilhar publicações.

**RN**
- O usuário deve estar logado na aplicação.
- Problemas urbanos não devem possuir opção de descurtir.

# Cadastro de projetos de lei

- Deve ser possível publicar projetos de lei.
- Deve ser possível curtir ou descurtir projetos de lei.
- Deve ser possível favoritar projetos de lei.

**RN**
- Somente administradores ou políticos podem cadastrar projetos de lei.
- Os usuários atrelados às curtidas e descurtidas devem permanecer anônimos.
- Não deve ser possível curtir e descurtir um projeto de lei.