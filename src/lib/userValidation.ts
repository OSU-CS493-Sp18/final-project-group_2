import { User } from './../models/users';
import * as bcrypt from 'bcrypt';
import { check } from 'express-validator/check';

export const userValidation = {
    createUser: [
        check('email').isEmail().withMessage("Invalid email try again"),
        check('pass').isLength({ min: 5}).withMessage("Password too short"),
        check('username').isString().withMessage("Username invalid"),
        check('dadRating').isNumeric().withMessage("dad rating must be number")
    ]
};