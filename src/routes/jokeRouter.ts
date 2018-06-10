import { AddJokeModel } from './../models/jokes';
import { Router } from 'express';
import { matchedData } from 'express-validator/filter';
import { validateAgainstSchema, extractValidFields } from '../lib/validation';
import { Joke } from '../controllers/jokeController';

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
        let joke = jokesController.getJoke(jokeID)
        .then((joke) => {
        if (joke) {
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

});

jokesRouter.delete('/', (req,res,next) => {
    
});