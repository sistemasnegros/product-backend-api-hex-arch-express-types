# product-backend-api-hex-arch-express-types

<p align="center">
  <a href="" rel="noopener">
 <img width=500px height=350px src="https://1.bp.blogspot.com/-PmNwKrQjdLY/YTDU_RQVwAI/AAAAAAAAIQA/I3aVBdzrLFkBGP5FGwWydqX7ib09eGoOQCLcBGAsYHQ/s1080/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy84NDI5MTgwLTg4NzVlMjRlNDEyYjQ2Njc.png" alt="Project logo">
 </a>
</p>

<h3 align="center"> Back-End Full-Stack Development Test</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues-pr/kylelobo/The-Documentation-Compendium.svg)](https://github.com/sistemasnegros/product-backend-api-hex-arch-express-types/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/kylelobo/The-Documentation-Compendium.svg)](https://github.com/sistemasnegros/product-backend-api-hex-arch-express-types/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> This repository contains an solution for Development Test.
    <br> 
</p>

- Clean Architecture by Uncle Bob.
- Onion Architecture.
- Separate infrastructure from business logic.
- Inputs and outputs in border the our design.

## Definitions

- Entities: Represent business objects.
- Interactors: Business logic, Class or functions that interact with entities.
- Repositories: Interface operations with entities for example getbyId, getAll, save.
- Transport Layer: Communication methods, for example: http or SQS (Input andOutput).
- Data Sources: Class that implement the functions the repositories.

## Table of Contents

- [About](#about)
- [Tree Project](#tree_project)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## About <a name = "about"></a>

This repository contains an example of Development Test. implement Typescript + Express + Sequelize + Mysql + Jwt + Jest + Supertest. using design patterns and clean code.

## Tree Project <a name = "tree_project"></a>

```
product-backend-api-hex-arch-express-types

├─ src
│  ├─ const
│  │  ├─ errors.ts
│  │  └─ url.ts
│  ├─ controllers
│  │  └─ http
│  │     ├─ middlewares
│  │     │  └─ auth.ts
│  │     ├─ ProductController.ts
│  │     ├─ UserController.ts
│  │     ├─ utils
│  │     │  └─ index.ts
│  │     └─ validator
│  │        ├─ product
│  │        │  └─ index.ts
│  │        ├─ user
│  │        │  ├─ validatorLogin.ts
│  │        │  └─ validatorUser.ts
│  │        └─ utils
│  │           └─ index.ts
│  ├─ core
│  │  ├─ entities
│  │  │  ├─ generic
│  │  │  │  └─ Search.ts
│  │  │  ├─ product
│  │  │  │  ├─ Product.ts
│  │  │  │  └─ ProductSearch.ts
│  │  │  └─ user
│  │  │     ├─ User.ts
│  │  │     └─ UserSearch.ts
│  │  ├─ interactors
│  │  │  ├─ index.ts
│  │  │  ├─ productInteractor.ts
│  │  │  └─ userInteractor.ts
│  │  └─ repositories
│  │     ├─ productRepository.ts
│  │     └─ userRepository.ts
│  ├─ dataSources
│  │  ├─ ProductDataSource.ts
│  │  ├─ sequelize
│  │  │  ├─ index.ts
│  │  │  ├─ models
│  │  │  │  ├─ ProductModel.ts
│  │  │  │  └─ UserModel.ts
│  │  │  ├─ sync.ts
│  │  │  └─ utils
│  │  │     ├─ paginator.ts
│  │  │     └─ utils.ts
│  │  └─ UserDataSource.ts
│  ├─ server
│  │  └─ index.ts
│  ├─ test
│  │  ├─ api.product.test.ts
│  │  ├─ api.start.test.ts
│  │  ├─ api.user.test.ts
│  │  └─ db.test.ts
│  └─ utils
│     └─ index.ts
```

## Getting Started <a name = "getting_started"></a>

### Prerequisites

```
node v14.17.6
Mysql or MariaDB
```

Create DB in the CLI mysql.

```
create database productdb_dev;
create database productdb_test;
create database productdb_pro;
```

Note: DB: productdb_pro is optional,

Create User in the CLI mysql;

```
CREATE USER 'username'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON `productdb\_%`.*  TO 'username'@'localhost';
flush privileges;
```

Note: you can use root or other superuser.

### Clone Repository

```
git clone https://github.com/sistemasnegros/product-backend-api-hex-arch-express-types
```

### Install Dependencies

```
cd product-backend-api-hex-arch-express-types
npm install
```

### Config .env, set credentials DB and SECRET_KEY

```
DB_URI_DEV="mysql://username:password@localhost:3306/productdb_dev"
DB_URI_TEST="mysql://username:password@localhost:3306/productdb_test"
DB_URI_PRO="mysql://username:password@localhost:3306/productdb_pro"

SECRET_KEY="mySecrect....."
```

### Create the tables in DB.

```
npm run sync:dev
npm run sync:test
```

## Usage <a name = "usage"></a>

### Start the app in the development mode.

```
npm run dev
```

### Run test.

```
npm run test
```

Outout Test OK

```
 PASS  src/test/api.start.test.ts
  GET / - Starting API
    √ Response status 200/  (14 ms)

 PASS  src/test/db.test.ts
  DB Test
    √ conect DB (20 ms)

 PASS  src/test/api.product.test.ts
  Endpoint /api/v1/products - product CRUD
    √ POST - Create product (86 ms)
    √ GET - READ Filter product for name (24 ms)
    √ GET - READ all product in a array (24 ms)
    √ PUT - UPDATE a product (26 ms)
    √ GET - READ a product in (16 ms)
    √ DELETE - DELETE a product (15 ms)

PASS  src/test/api.user.test.ts
  Endpoint /api/v1/users - user CRUD
    √ POST - Create user (118 ms)
    √ GET - READ Filter user for username (21 ms)
    √ GET - READ all user in a array (20 ms)
    √ POST - Login user (77 ms)
    √ PUT - UPDATE a user (74 ms)
    √ GET - READ a user in (15 ms)
    √ DELETE - DELETE a user (13 ms)

Test Suites: 4 passed, 4 total
Tests:       15 passed, 15 total
Snapshots:   0 total
Time:        4.43 s
```

## ✍️ Authors <a name = "authors"></a>

- [@sistemasnegros](https://github.com/sistemasnegros) - Idea & Initial work
