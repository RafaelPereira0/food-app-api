# API Food App

API em Node.js e TypeScript para aplicativo de comida, com gerenciamento de usuários, autenticação, restaurantes, produtos e pedidos. Permite cadastro de clientes e restaurantes, criação de cardápios e controle de pedidos.


## Tecnologias

- Node.js
- TypeScript
- Express
- Prisma
- PostgreSQL
- bcrypt
- JWT (JSON Web Token)

## Funcionalidades

- Registro e login de usuários (CLIENT e RESTAURANT)
- Criação e gerenciamento de restaurantes
- Cadastro de produtos por restaurante
- Criação e acompanhamento de pedidos
- Autenticação com JWT

## Estrutura do Projeto

- src/
  - controllers/ → lógica dos endpoints
  - dtos/ → objetos de transferência de dados
  - prisma/ → cliente Prisma
  - routes/ → definição das rotas
  - services/ → regras de negócio
  - middlewares/  → middlewares (auth, ownrestaurant, etc)
  - errors/ → erros AppError 
  - types/ → tipos e interfaces TypeScript (types, enums, etc.)
  - schemas/ → validações (Zod)
  - app.ts → ponto de entrada

## Contato
Projeto em andamento, sugestões são bem-vindas! <br>
Email: rafael_pereira5@outlook.com <br>
WhatsApp: (17) 99706-6101 <br>
Desenvolvido por Rafael Pereira.
