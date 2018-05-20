"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const usersRouter_1 = require("./routes/usersRouter");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
// Reference: https://gorrion.io/blog/node-express-js-typescript-sequelize/
// Initialize server
const app = express();
const PORT = 42069;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// Register routes
app.use('/', usersRouter_1.userRouter);
// Landing Page
app.get('/', (req, res, next) => {
    res.json("Welcome to Joke API! lol XD");
});
// Start server
app.listen(PORT, () => {
    console.log('Server is running on port:' + PORT);
});
//# sourceMappingURL=index.js.map