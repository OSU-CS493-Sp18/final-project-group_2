import { AddJokeModel, JokeModel } from './../models/jokes';
import { Router } from 'express';
import { matchedData } from 'express-validator/filter';
import { validateAgainstSchema, extractValidFields } from '../lib/validation';
import { Joke } from '../controllers/jokeController';
import {UserModel} from '../models/users';
import { checkToken, checkUser } from '../controllers/tokenController';


export const jokesRouter = Router();
const jokesController = new Joke.JokeController();

const jokeSchema = {
  joke: { required: true },
  dadRating: { required: true },
  user: { required: true },
  keywords: { required: true }
};

/// POST joke
jokesRouter.post('/', checkToken, checkUser, (req, res, next) => {
    console.log(req.body);
    const joke:AddJokeModel = req.body;

    if(joke){
        let result = jokesController.addJoke(joke)
            .then((result) => {
            if (result) {
                res.status(201).json(result);
            } else {
                next();
            }
            })
            .catch((err) => {
                res.status(500).json({
                    error: "Unable to post joke.  Please try again later."
                });
            });
    } else {
        res.status(400).json({
            error: "Request body is not a valid joke object. lulz"
        });
    }
});

//get jokes by keyword
jokesRouter.get('/search/:keyword', (req, res, next) => {
    const keyword = req.params['keyword'];
    if(keyword){
        jokesController.getJokesByKeyword(keyword)
        .then(results => {
            res.status(200).json(results);
        })
        .catch(err => {
            res.status(500).json({error: "There was an error getting the jokes"});
        });
    } else {
        next();
    }
});

// GET joke
jokesRouter.get('/:jokeID', (req, res, next) => {
    const jokeID = parseInt(req.params.jokeID);
    if(jokeID){
        jokesController.getJokeById(jokeID)
        .then((joke) => {
            if (joke) {
                res.status(200).json(joke);
            } else {
                res.status(204).json({
                    error: "No Content Found"
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                error: "Unable to fetch joke.  Please try again later. hah ah xd"
            });
        });
    } else {
        res.status(400).json({
            error: "Bad joke id lulz"
        });
    }
});

/// GET jokeZ
jokesRouter.get('/', (req, res, next) => {
    let joke = jokesController.getJokes()
    .then((joke) => {
        if (joke) {
            res.status(200).json(joke);
        } else {
            next();
        }
    })
    .catch((err) => {
        res.status(500).json({
            error: "Unable to fetch jokeZ.  Please try again later. hah ah xd"
        });
    });
});

jokesRouter.put('/', checkToken, checkUser, (req,res,next) => {
    const updatedJoke:JokeModel = req.body;     
    if(updatedJoke) {
        jokesController.updateJoke(updatedJoke).then(results => {
            console.log(results);
            res.status(201).json({ msg: "Updated joke in database" });
        }).catch(err => {
            console.log(err);
            res.status(500).json({ error: "Failed to update user" });
        });
    } else {
        next();
    }
});

jokesRouter.delete('/', checkToken, checkUser, (req,res,next) => {
    const joke:JokeModel = req.body;    
    if(joke) {
        jokesController.deleteJoke(joke).then(results => {
            res.status(204).json({ msg: "deleted joke in database"});
        }).catch(err => {
            console.log(err);
            res.status(500).json({ error: "Failed to delete joke" });
        });
    } else {
        next();
    }
});