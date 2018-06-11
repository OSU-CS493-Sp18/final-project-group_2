# Joke API Group 2 CS 493 Spring 2018

### Install types:
```
npm i -D typescript @types/bcrypt @types/body-parser @types/cookie-parser @types/cors @types/es6-promise @types/express @types/express-validator @types/jsonwebtoken @types/node @types/sequelize
```
### Install dependencies
`npm i -S express sequelize mysql2`
```
npm i -S body-parser cookie-parser cors express-validator
npm i -S jsonwebtoken bcrypt
```

compile with `tsc -p .`

### Running

Run `npm start` to compile ts
Run `npm run dev` to start server

### Running Notes
If you do not have type script installed but you do have docker and docker-compose installed you can run this application by running docker-compose up --build. To do this you need not follow any of the previous steps.


## TO DO's

NOTE: * Requires Authorization

### Users
- [x] GET
    - [x] /id*
- [x] POST
    - [x] /login
    - [x] /
- [x] PUT
    - [x] /
- [x] DELETE*
    - [x] /

### Jokes
- [x] GET
    - [x] GET/id/:id
    - [x] GET/search/:keyword
- [x] POST*
- [x] PUT*
- [x] DELETE*

### Categories
- [x] GET
    - [x] /id    
    - [x] /   
- [X] POST
    - [X] /   
- [X] PUT
    - [X] /   
- [X] DELETE
    - [X] /   

### Comment
- [x] GET
    - [x] GET/:UserId*
    - [x] GET/:JokeId
- [x] POST*
- [x] PUT*
- [x] DELETE*

