import { userRouter } from './routes/usersRouter';
import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser'
import { checkToken } from './controllers/tokenController';
// Reference: https://gorrion.io/blog/node-express-js-typescript-sequelize/

// Initialize server
const app = express();
const PORT = 42069;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

// Register routes
app.use('/', userRouter);

// Landing Page
app.get('/', (req, res, next) => {
    res.json("Welcome to Joke API! lol XD");
});

// Start server
app.listen(PORT, () => {
    console.log('Server is running on port:' + PORT);
})
