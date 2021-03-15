## NODE Typescritp api 

Typescritp Restfull API

[Descrição do teste](test-description.md)

## Dependencies 

- [Node JS version 14+](https://nodejs.org/)
- [Mysql](https://www.mysql.com/downloads/)

### Development & Build 

*Single Build*

- *Just build:* `npm run build`

*For develpment*

- *Build and watch files:* `npm run build-watch`

## SETUP the project 

### 1 - Migrations 

if you dont setup this before do:

1. create an database on mysql 
2. copy migrations\config\config-sample.json and rename to migrations\config\config.json
4. on your terminal navegate at this project main folder 
5. run `npm run migrate`
6. your database must be ready 

### 2 - Running the API 

1. clone this repo.
2. copy env-sample.json and rename to env.json
3. edit env.json file to your database name, user, password, host, port...
2. on terminal type and run `npm install`
3. after install packages run `npm start`

### Lint 

- *checking* `npm run lint`
- *fix files* `npm run lint-fix`

### Running Tests 

@Todo Ao longo do dia.

## Documentations 

inside the folder docs you will find 

1. Postman collection with endpoints and parameters
2. Database schema image 
3. Database mysql worckbench model 
