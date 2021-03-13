## NODE Typescritp api 

Typescritp Restfull API

[Descrição do teste](test-description.md)

## Observations

1. as migrações foram feitas com o CLI do Sequelize, e apesar de existir uma versão Typescript a versão JS funcionou "out of the box" num cenário real acredito que valesse a pena investir um pouco mais na versão TS para não precisar "duplicar" os models" por hora isolei como uma aplicação a parte completamente *autogerada* pelo CLI.

2. para configurações foi utilizado o formato .json ao invés de .env (preferencia pessoal), json é um formato nativo do node...

3. O banco de dados que escolhi foi o Mysql por se tratarem de dados simples e estruturados porém graças ao Sequelize a troca de banco de dados pode ser feita apenas alterando as configurações de conexão e instalação do driver adequado para o sequelize.

4. Não utilizei docker por questão de "tempo" mas ao concluir o projeto acredito que vou tomar um tempo para adicionar um docker-compose e um dockerfile

5. Adicionei as tabelas created_at e updated_at para manter o histórico de modificação de registros e a base utiliza soft delete (deleção lógica).

6. para armazenamento de senhas utilizei password_hash e passord_salt garantindo anomimato e maior segurança (https://www.youtube.com/watch?v=8ZtInClXe1Q). 

## Dependencies 

- [Node JS version 14+](https://nodejs.org/)
- [Mysql](https://www.mysql.com/downloads/)

### Build 

- *Just build:* `npm run build`
- *Build and watch files:* `npm run build-watch`

### Migrations 

the first time you execute this API you need to install run migrations 

1. create an database on mysql 
2. copy env-sample.json and rename to env.json
3. put your 

### Running the API 

1. clone this repo.
2. on terminal type and run `npm install`
3. after install packages run `npm start`

### Lint 

- *checking* `npm run lint`
- *fix files* `npm run lint-fix`

### Running Tests 

@Todo


