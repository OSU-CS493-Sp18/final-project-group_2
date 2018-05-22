import { userRouter } from './routes/usersRouter';
import { database } from './db/dbConfig';
import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser'
import { checkToken } from './controllers/tokenController';
import * as Sequelize from 'sequelize';
// Reference: https://gorrion.io/blog/node-express-js-typescript-sequelize/

// Initialize server
const app = express();
const PORT = 8000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

console.log("=== DB NAME == " + process.env.MYSQL_DATABASE);
console.log("=== USER == " + process.env.MYSQL_USER);
console.log("=== PASS == " + process.env.MYSQL_PASSWORD);

// Register routes
//app.use('/', userRouter);

// Landing Page
app.get('/', (req, res, next) => {
    res.json("Welcome to Joke API! lol XD");

    const db = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {dialect: 'mysql'});

    db.authenticate().then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
});

// Start server
app.listen(PORT, () => {
    console.log('Server is running on port:' + PORT);
})
