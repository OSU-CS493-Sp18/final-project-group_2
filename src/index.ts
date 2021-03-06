import { userRouter } from './routes/usersRouter';
import { jokesRouter } from './routes/jokeRouter'
import { database } from './db/dbConfig';
import * as Sequelize from 'sequelize';
import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser'
import { checkToken } from './controllers/tokenController';
import * as MySQL from 'mysql';
import { categoriesRouter } from './routes/categoryRouter';
import { commentsRouter } from './routes/commentRouter';
// Reference: https://gorrion.io/blog/node-express-js-typescript-sequelize/

// Initialize server
const app = express();
const PORT = 8001;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

console.log("=== DB NAME == " + process.env.MYSQL_DATABASE);
console.log("=== USER == " + process.env.MYSQL_USER);
console.log("=== PASS == " + process.env.MYSQL_PASSWORD);

// Register routes
app.use('/users', userRouter);
app.use('/jokes', jokesRouter);
app.use('/categories', categoriesRouter);
app.use('/comments', commentsRouter);

// Landing Page
app.get('/', (req, res, next) => {
    res.json("Welcome to Joke API! lol XD");
});

// Start server
app.listen(PORT, () => {
    console.log('Server is running on port:' + PORT);
    
    // Test connection
    setTimeout(testConnection, 4000);
});


function testConnection(){
    database.getConnection((err, connection) => {
        if(err){
            console.log("== SQL Connection error:", err);
            setTimeout(testConnection, 4000);
        } else {
            console.log("== Connected to the SQL Database");
        }
    });
}