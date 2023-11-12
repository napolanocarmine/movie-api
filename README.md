# nestjs-movie-api
In this challenge, I have to create a Movie REST API using NestJS, a typescript framework for building efficient and scalable Node.js applications. I will be implementing CRUD operations for movies and related genres.
## Database Setup
### Prerequisites
Before setting up the database, make sure you have [PostgreSQL](https://www.postgresql.org/) installed on your machine.
### Configuration
Update the database connection details in the `src/ormconfig.json` file with your PostgreSQL credentials:
```typescript
// src/ormconfig.json
{
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "postgres",
    "password": "postgres",
    "database": "cinema_catalog",
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

## Test

# Movie API Postman Collection

The file "challenge-movie-api-calls.postman_collection.json" contains a Postman collection with pre-configured API requests for testing the Movie API. Follow the steps below to get started.

1. **Install Postman:**
   - If you don't have Postman installed, download and install it from [Postman's official website](https://www.postman.com/downloads/).

2. **Download the Collection:**
   - Clone or download this repository to your local machine.

3. **Import Collection in Postman:**
   - Open Postman and click on the "Import" button.
   - Select the downloaded JSON file (`movie-api.postman_collection.json`).

4. **Set Environment Variables:**
   - The collection uses environment variables for better flexibility.
   - Click on the gear icon in the top right corner and select "Manage Environments."
   - Import the environment file (`movie-api.postman_environment.json`).

5. **Run Requests:**
   - Open the imported collection.
   - Choose the desired request and make sure the environment variables are set correctly.

6. **Execute Requests:**
   - Click on the "Send" button to execute the selected request.
   - Review the response to ensure the API is working as expected.
