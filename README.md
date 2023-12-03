# Medication Intake Tracker

### Description
This is a Medication Intake Tracker server built with Node.js and Express.js. It provides functionality for user authentication and managing medications.

#### Installation
```
git clone https://github.com/samartsevigor/medication-server.git
```

#### Install dependencies:
```shell
npm install
```

#### Build Docker Image
```
docker compose up
```

#### Run Migrations 
Before starting the server, run the database migrations to set up the database schema.
```shell
npm run migration:up
```

## Usage
#### Starting the server
#### To start the server in development mode:

```shell
npm run start:dev
```

### Endpoints

#### Authentication
`POST` /api/signup: Create a new user account.   
`POST` /api/login: Log in with existing user credentials.`

#### Medications
`GET` /: Get a list of medications associated with the authenticated user.  
`GET` /:id: Get details of a specific medication by ID.  
`POST` /: Create a new medication for the authenticated user.  
`PUT` /:id: Update details of a specific medication by ID.  
`DELETE` /:id: Delete a specific medication by ID.  

#### Dependencies
* bcrypt
* cors
* dotenv
* express
* express-validator
* jsonwebtoken
* pg


#### Scripts
* **start**: Start the server.
* **migration:up**: Run database migrations.
* **start:dev**: Start the server in development mode using Nodemon.
* **lint**: Run ESLint for code linting.
