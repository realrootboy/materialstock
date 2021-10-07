# MaterialStock
## _Controle de objetos de locação_

O projeto Material Stock é um sistema multiplataforma de lançamento de dados referentes a locação de objetos. Nele é possivel cadastrar materiais, objetos compostos desses mesmos materiais, colaboradores, clientes e ordens de serviço de locação. O intuito é facilitar o registro e a consulta de informações referentes a esses registros.

## Features

- Cadastro de Materiais
- Cadastro de Objetos Compostos
- Gerência de Ordens de Serviço

## Tech FrontEnd

- ReactJS - O React é uma biblioteca JavaScript de código aberto com foco em criar interfaces de usuário em páginas web.
- Material UI - O MUI fornece uma biblioteca simples, personalizável e acessível de componentes React.
- Electron - O Electron permite desenvolver aplicações para desktop GUI usando componentes front end e back end originalmente criados para aplicações web
- Axios - Axios é um cliente HTTP promise-based para node.js e para o navegador.

## Tech BackEnd

- Node.js - Node.js é um software de código aberto, multiplataforma, baseado no interpretador V8 do Google e que permite a execução de códigos JavaScript fora de um navegador web. 
- Express - Framework web rápido, flexível e minimalista para Node.js.
- SQLite - SQLite é uma biblioteca em linguagem C que implementa um banco de dados SQL embutido.
- Sequelize - Sequelize  é um Node.js ORM promise-based para Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server.

## Instalação

MaterialStock precisa de [Node.js](https://nodejs.org/) v10+ para executar. O sistema é dividido em duas partes, o backend e o frontend. O backend se encontra na pasta raiz do repositório. O frontend se encontra na pasta app dentro do repositório.

Instale as dependências e inicie o servidor do backend.

```sh
npm i
npm start
```

Instale as dependências do frontend, dê o build na aplicação e inicie o Electron

```sh
cd app
npm i
npm run build
npm run electron
```

## Documentação

api docs...

```sh
npm i
npm start
```

acessar url tal...
