import { AddJokeModel } from './../models/jokes';
import * as bcrypt from 'bcrypt';
import { check } from 'express-validator/check';

export const jokeValidation = {
    createJoke: [
        check('joke').isString().withMessage("Joke invalid"),
        check('dadRating').isNumeric().withMessage("dad rating must be number"),
        check('user').isString().withMessage("Invalid username"),
        check("keywords").isString().withMessage("Invalid keywords")
    ]
};