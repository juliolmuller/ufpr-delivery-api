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
| `/signin/{role}`           |  POST  | `admin`/`associate`/`motoboy` | Autentica um usuário de perfil `{role}` com base em *login* e *password* |
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
