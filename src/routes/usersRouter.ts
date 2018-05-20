import { AddUserModel, User } from './../models/users';
import { Router } from 'express';
import { matchedData } from 'express-validator/filter';
import { validationResult } from 'express-validator/check';
import { userValidation } from '../lib/userValidation';
import { Users } from '../controllers/usersController';

export const userRouter = Router();
const userController = new Users.UserController();

userRouter.post('/create', userValidation['createUser'], (req, res) => {
    const err = validationResult(req);

    if(!err.isEmpty()){
        return res.status(422).json(err.array());
    }

    const user = matchedData(req) as AddUserModel;
    const currentUser = userController.createUser(user);
    return currentUser.then(usr => res.json(usr));
})