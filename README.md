# Gestor de Entregas ACP

Aplicação construída como atividades avaliativas da disciplina de *Tópicos Especiais em Algorítmos* do curso de *Tecnologia em Análise e Desenvolvimento de Sistemas*, com o objetivo de servir como API REST para um sistema de gestão de consultas médicas, utilizando a plataforma **Node.js**.

## Diagrama de Classes

![Diagrama de classes da aplicação](./.github/diagram-class.jpg)

## Diagrama Relacional

![Diagrama relacional da aplicação](./.github/diagram-relational.jpg)

## Endpoints

Os seguintes *endpoints* foram criados para atender aos requisitos:

| Path                      | Método |      Perfil Autoriazado       | Recurso                                                                 |
| :------------------------ | :----: | :---------------------------: | :---------------------------------------------------------------------- |
| `/signin/:role`           |  POST  | `admin`/`associate`/`motoboy` | Autentica um usuário de perfil `:role` com base em *login* e *password* |
| `/associates`             |  GET   |            `admin`            | Listar dados de todos os associados                                     |
| `/associates/{cnpj}`      |  GET   |      `admin`/`associate`      | Acessar dados de associado com CNPJ `{cnpj}`                            |
| `/associates`             |  POST  |             admin             | Cadastrar novo associado                                                |
| `/associates/{id}`        |  PUT   |      `admin`/`associate`      | Atualizar dados de associado com ID `{id}`                              |
| `/associates/{id}`        | DELETE |             admin             | Excluir cadastro de associado com ID `{id}`                             |
| `/customers`              |  GET   |      `admin`/`associate`      | Listar dados de todos os clientes                                       |
| `/customers/{cnpj}`       |  GET   |      `admin`/`associate`      | Acessar dados de cliente com CNPJ `{cnpj}`                              |
| `/customers`              |  POST  |          `associate`          | Cadastrar novo cliente                                                  |
| `/customers/{id}`         |  PUT   |          `associate`          | Atualizar dados de cliente com ID `{id}`                                |
| `/customers/{id}`         | DELETE |          `associate`          | Excluir cadastro de cliente com ID `{id}`                               |
| `/motoboys`               |  GET   |      `admin`/`associate`      | Listar dados de todos os motoboys                                       |
| `/motoboys/{cpf}`         |  GET   | `admin`/`associate`/`motoboy` | Acessar dados de motoboy com CPF `{cpf}`                                |
| `/motoboys`               |  POST  |          `associate`          | Cadastrar novo motoboy                                                  |
| `/motoboys/{id}`          |  PUT   |          `associate`          | Atualizar dados de motoboy com ID `{id}`                                |
| `/motoboys/{id}`          | DELETE |          `associate`          | Excluir cadastro de motoboy com ID `{id}`                               |
| `/orders`                 |  GET   | `admin`/`associate`/`motoboy` | Listar dados de todas as entregas                                       |
| `/orders?status={status}` |  GET   | `admin`/`associate`/`motoboy` | Listar dados de todas as entregas com status `{status}`                 |
| `/orders?motoboy={id}`    |  GET   | `admin`/`associate`/`motoboy` | Listar dados de todas as entregas do motoboy com ID `{id}`              |
| `/orders/{id}`            |  GET   | `admin`/`associate`/`motoboy` | Acessar dados de entrega com ID `{id}`                                  |
| `/orders`                 |  POST  |          `associate`          | Cadastrar nova entrega                                                  |
| `/orders/{id}`            |  PUT   |     `associate`/`motoboy`     | Atualizar dados de entrega pendente com ID `{id}`                       |
| `/orders/{id}`            | DELETE |          `associate`          | Excluir cadastro de entrega pendente com ID `{id}`                      |
| `/reports/admin`          |  GET   |          `associate`          | ??? Dados para relatório administrativo                                 |
| `/reports/fin`            |  GET   |     `associate`/`motoboy`     | ??? Dados para relatório financeiro                                     |

OBS: Apenas os dados pertinentes ao usuário autenticado são acessíveis a ele

## Executar o Projeto

Para executar o projeto é necessário ter a versõa 10 ou superior do [Node.js](https://nodejs.org/en/) e o gerenciador de pacotes NPM (incluso na instalação do *Node*) ou o [Yarn (v1)](https://yarnpkg.com/) para configuração dos pacotes de terceiros. Certifique-se também de que o gerenciador de pacote escolhido está disponível através da linha de comando, executando `npm -v` ou `yarn -v`.

Com os *Node.js* configurado, você poderá instalar as dependências a partir do comando:

```bash
# usando o Npm
$ npm install

# usando o Yarn
$ yarn
```

Antes de executar a aplicação, você também deve configurar as variáveis de ambiente, que serão responsáveis por configurações gerais do servidor e pela conexão com banco de dados. Altere então o arquivo `.env`, na raíz do projeto (se após a instalação não houver um arquivo `.env`, crie-o utilizando como base o arquivo `.env.example`). O SGBD utilizado no desenvolvimento foi o [PostgreSQL](https://www.postgresql.org/), por isso, se você não possui uma versão instalada em sua máquina, é possível fazer uso da versão containerizada, em Docker, através do comando `docker-compose up`.

Para saber se o banco foi configurado com sucesso, execute as rotinas de *migrations* e *seeds*:

```bash
# usando o NPX (acompanha o NPM)
$ npx sequelize db:create      # cria o banco de dados no SGBD
$ npx sequelize db:migrate     # executa as migrações dos esquemas
$ npx sequelize db:seed:all    # (opcional) adiciona dados fakes nas tabelas

# usando o Yarn
$ yarn sequelize db:create     # cria o banco de dados no SGBD
$ yarn sequelize db:migrate    # executa as migrações dos esquemas
$ yarn sequelize db:seed:all   # (opcional) adiciona dados fakes nas tabelas
```

Por fim, para executar o servidor em modo de desenvolvimento (executado pelo pacote *nodemon*), utilize o comando `npm run dev` ou `yarn dev`.
