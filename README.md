# nestjs-movie-api
In this challenge, I have to create a Movie REST API using NestJS, a typescript framework for building efficient and scalable Node.js applications. I will be implementing CRUD operations for movies and related genres.

## Database Setup

### Prerequisites
Before setting up the database, make sure you have [PostgreSQL](https://www.postgresql.org/) installed on your machine.

### Configuration
Update the database connection details in the `src/database.config.ts` file with your PostgreSQL credentials:

```typescript
// src/ormconfig.json

{
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "postgres",
    "password": "postgres",
    "database": "cinema_catalog_2",
    "entities": ["dist/**/*.entity.js"],
    "synchronize": true
  }

Remember to replace 'postgres', 'postgres', and 'cinema_catalog' with your actual PostgreSQL credentials. Feel free to adapt the commands based on the structure and specific requirements of your project. Let us know if you need further customization or clarification!

See "create-db.sql" to learn how to create the tables I use in my application. Remember to change the db name in that file.

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
