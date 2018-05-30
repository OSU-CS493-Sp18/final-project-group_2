import { AddUserModel, UserModel } from './../models/users';
import { Router } from 'express';
import { matchedData } from 'express-validator/filter';
import { validationResult } from 'express-validator/check';
import { userValidation } from '../lib/userValidation';
import { Users } from '../controllers/usersController';

export const userRouter = Router();
const userController = new Users.UserController();

/// GET user
userRouter.get('/:userID', (req, res, next) => {
    const userID = parseInt(req.params.userID);
    if (userID) {
        let user = userController.getUser(userID)
            .then((user) => {
                if (user) {
                    res.status(200).json(user);
                } else {
                    next();
                }
            })
            .catch((err) => {
                res.status(500).json({
                    error: "Unable to fetch user.  Please try again later."
                });
            });
    }
});

userRouter.post("/login", (req,res,next) => {
    const user:UserModel = req.body;

    if (user) {
        userController.logInUser(user).then(token => {
            res.status(201).json({ msg: "You Logged in!", token: token });
        }).catch(err => {
            res.status(500).json({ error: "Failed to login user." });
        });
    } else {
        next();
    }
});

userRouter.post("/", (req, res, next) => {
    const newUser = req.body;
    if (newUser) {
        console.log(newUser);

        userController.createUser(newUser).then(results => {
            res.status(201).json({ msg: "New user added to database" });
        }).catch(err => {
            res.status(500).json({ error: "Failed to insert new user" });
        });
    } else {
        next();
    }
});

userRouter.put("/", (req, res, next) => {

});

userRouter.delete("/", (req, res, next) => {

});