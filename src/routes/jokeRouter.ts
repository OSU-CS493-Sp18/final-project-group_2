import { AddJokeModel, JokeModel } from './../models/jokes';
import { Router } from 'express';
import { matchedData } from 'express-validator/filter';
import { validateAgainstSchema, extractValidFields } from '../lib/validation';
import { Joke } from '../controllers/jokeController';
import { UserModel } from '../models/users';

export const jokesRouter = Router();
const jokesController = new Joke.JokeController();

const jokeSchema = {
  joke: { required: true },
  dadRating: { required: true },
  user: { required: true },
  keywords: { required: true }
};

/// POST joke
jokesRouter.post('/', (req, res, next) => {
    console.log(req.body);
    if(validateAgainstSchema(req.body, jokeSchema)){
        let joke = extractValidFields(req.body,jokeSchema) as AddJokeModel;
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
                    error: "Unable to fetch joke.  Please try again later."
                });
            });
    } else {
        res.status(400).json({
            error: "Request body is not a valid joke object. lulz"
        });
    }
});

/// GET joke
jokesRouter.get('/id/:jokeID', (req, res, next) => {
    const jokeID = parseInt(req.params.jokeID);
    if(jokeID){
        let joke = jokesController.getJokeById(jokeID)
        .then((joke) => {
        if(joke)
            if (!isNaN(joke)) { //Checking if the return is a number or not
                res.status(200).json(joke);
            } else {
                next();
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

/// GET joke
jokesRouter.get('/keyword/:jokeKeyword', (req, res, next) => {
    const jokeKeyword = req.params.jokeKeyword;
    if(jokeKeyword){
        let joke = jokesController.getJokeByKeyword(jokeKeyword)
        .then((joke) => {
        if (joke) {
            res.status(200).json(joke);
        } else {
            next();
        }
        })
        .catch((err) => {
            res.status(500).json({
                error: "Unable to fetch jokes with that keyword.  Please try again later. hah ah xd"
            });
        });
    } else {
        res.status(400).json({
            error: "Bad joke keyword lulz"
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

jokesRouter.put('/', (req,res,next) => {
    const user:UserModel = req.body.user;
    const updatedJoke:JokeModel = req.body.joke;     
    if(updatedJoke) {
        jokesController.updateJoke(updatedJoke, user).then(results => {
            console.log(results);
            res.status(201).json({ msg: "Updated joke in database" });
        }).catch(err => {
            res.status(500).json({ error: "Failed to update user" });
        });
    } else {
        next();
    }
});

jokesRouter.delete('/', (req,res,next) => {
    const user:UserModel = req.body.user;
    const joke:JokeModel = req.body.joke;    
    if(joke) {
        jokesController.deleteJoke(joke, user).then(results => {
            res.status(204).json({ msg: "deleted joke in database" });
        }).catch(err => {
            console.log(err);
            res.status(500).json({ error: "Failed to delete joke" });
        });
    } else {
        next();
    }
});