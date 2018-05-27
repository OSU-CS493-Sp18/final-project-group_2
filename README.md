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
- [ ] GET
    - [x] GET/id*
- [ ] POST 
- [ ] PUT
- [ ] DELETE*

### Jokes
- [x] GET
    - [x] GET/id
    - [ ] GET/:keyword
- [x] POST*
- [ ] PUT*
- [ ] DELETE*

### Categories
- [ ] GET
    - [ ] GET/id    
- [ ] POST
- [ ] PUT
- [ ] DELETE

### Comment
- [ ] GET
    - [ ] GET/:id
    - [ ] GET/:UserID*
    - [ ] GET/:JokeID
- [ ] POST*
- [ ] PUT*
- [ ] DELET*

