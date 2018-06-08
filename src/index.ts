import { userRouter } from './routes/usersRouter';
import { jokesRouter } from './routes/jokeRouter'
import { database } from './db/dbConfig';
import * as Sequelize from 'sequelize';
import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser'
import { checkToken } from './controllers/tokenController';
import * as MySQL from 'mysql';
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
app.use('/users', userRouter);
app.use('/jokes', jokesRouter);

// Landing Page
app.get('/', (req, res, next) => {
    res.json("Welcome to Joke API! lol XD");
});


//gets the database connection and starts the server.
function getDataBaseConnection(){
    database.getConnection((err, connection) =>{
        if(!err){
            console.log("== Connected to Database.");
            console.log("== Sever is listening on port: ", PORT);
            app.listen(PORT);
        } else {
            setTimeout(() => {
               getDataBaseConnection(); 
            }, 4000);
        }
    });
}
getDataBaseConnection();
