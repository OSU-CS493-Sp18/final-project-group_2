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
    - [x] GET/id
    - [ ] GET/:keyword
- [x] POST*
- [ ] PUT*
- [ ] DELETE*

### Categories
- [x] GET
    - [x] /id    
    - [x] /   
- [] POST
    - [ ] /   
- [] PUT
    - [ ] /   
- [] DELETE
    - [ ] /   

### Comment
- [ ] GET
    - [ ] GET/:id
    - [ ] GET/:UserID*
    - [ ] GET/:JokeID
- [ ] POST*
- [ ] PUT*
- [ ] DELET*

