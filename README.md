## Descrição do Backend do TailScroll

O backend do TailScroll é um conjunto de serviços e rotas destinados a gerenciar a lógica de negócios e as interações com o banco de dados. Ele proporciona suporte às funcionalidades de criação, armazenamento e acesso às fichas de RPG dos usuários. Este componente é crucial para garantir a segurança e consistência dos dados, além de permitir a integração do frontend com o banco de dados e a lógica do servidor.

### Objetivo do Backend
O objetivo principal do backend do TailScroll é:

- **Gerenciar Usuários:** Registro, autenticação e armazenamento seguro das informações dos usuários.
- **Armazenamento de Fichas:** Manter e gerenciar as fichas de RPG criadas pelos usuários.
- **Lógica de Negócios:** Processamento das requisições do frontend, validações de dados e operações no banco de dados.

### Funcionalidades Oferecidas pelo Backend
1. **Registro e Autenticação de Usuários:**
   - Rota para registro de novos usuários.
   - Rota para autenticação de usuários.

2. **Gerenciamento de Fichas:**
   - Criação e edição de fichas para personagens de RPG.
   - Organização de fichas por usuários e pastas.
   - Recuperação e visualização de fichas salvas.

3. **Relacionamentos de Entidades:**
   - Definição de entidades (Users, Folders, Files) e suas relações no banco de dados.
   - Garantia da integridade referencial entre as entidades.

4. **Interconexão Frontend-Backend:**
   - Criação de endpoints RESTful para comunicação com o frontend.
   - Garantia de segurança e validação de dados nas requisições.

### Fluxo de Dados
O backend do TailScroll recebe requisições do frontend por meio de suas rotas. Ao receber uma requisição, executa operações no banco de dados, retornando os resultados processados ao frontend para exibição ou manipulação das fichas de RPG.

Este componente desempenha um papel fundamental na criação de uma aplicação completa e funcional, fornecendo a estrutura e a lógica necessárias para viabilizar a interação entre os usuários e suas fichas de RPG de maneira segura e eficiente.

## Rotas do Backend

### `/register` - POST
- **Descrição:** Rota para registrar um novo usuário.
- **Body:** Objeto contendo `name`, `email` e `password`.
- **Resposta:** Sem retorno

### `/login` - POST
- **Descrição:** Rota para login de usuário.
- **Body:** Objeto contendo `email` e `password`.
- **Resposta:** Retorna um token de autenticação.

### `/registerFolder` - POST
- **Descrição:** Rota para criar uma nova pasta para um usuário.
- **Body:** Objeto contendo `name`, `path` e `type` 
- **Resposta:** Retorna a pasta recém-criada.

### `/registerFile` - POST
- **Descrição:** Rota para criar um novo arquivo para um usuário.
- **Body:** Objeto contendo `name`, `type` e `path`
- **Resposta:** Retorna o arquivo recém-criado.

### `/viewFolders` - GET
- **Descrição:** Rota para visualizar todas as pastas de um usuário.
- **Resposta:** Retorna todas as pastas do usuário.

### `/viewFiles` - GET
- **Descrição:** Rota para visualizar todos os arquivos de um usuário.
- **Resposta:** Retorna todos os arquivos do usuário.

### `/viewSystem` - GET
- **Descrição:** Rota para visualizar todos os sistemas de RPG disponíveis.
- **Resposta:** Retorna todos os sistemas de RPG cadastrados.

### Entidades e Relacionamentos

#### User
| Coluna   | Tipo     | Descrição                     |
|----------|----------|-------------------------------|
| id       | Integer  | Identificador único           |
| name     | String   | Nome do usuário               |
| email    | String   | Email do usuário              |
| password | String   | Senha do usuário              |
| folders  | Relação  | Pastas do usuário             |
| files    | Relação  | Arquivos do usuário           |

#### Folders
| Coluna   | Tipo     | Descrição                       |
|----------|----------|---------------------------------|
| id       | Integer  | Identificador único             |
| name     | String   | Nome da pasta                   |
| path     | String   | Caminho da pasta                |
| type     | String   | Tipo da pasta                   |
| user     | Relação  | Usuário proprietário da pasta   |
| files    | Relação  | Arquivos dentro da pasta        |

#### Files
| Coluna   | Tipo     | Descrição                         |
|----------|----------|-----------------------------------|
| id       | Integer  | Identificador único               |
| name     | String   | Nome do arquivo                   |
| type     | String   | Tipo do arquivo                   |
| path     | String   | Caminho do arquivo                |
| user     | Relação  | Usuário proprietário do arquivo   |
| folder   | Relação  | Pasta onde o arquivo está         |

#### Rpg_systems
| Coluna   | Tipo     | Descrição                 |
|----------|----------|---------------------------|
| id       | Integer  | Identificador único       |
| name     | String   | Nome do sistema de RPG    |

## Badges
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

## Links

[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/viniciusfialhu/)
[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ViniciusFialhus/TailScroll---Back-End---/)
