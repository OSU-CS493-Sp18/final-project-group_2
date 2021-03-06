import { AddUserModel, UserModel } from './../models/users';
import { Router } from 'express';
import { matchedData } from 'express-validator/filter';
import { validationResult } from 'express-validator/check';
import { userValidation } from '../lib/userValidation';
import { Users } from '../controllers/usersController';
import {checkToken, checkUser} from '../controllers/tokenController';

export const userRouter = Router();
const userController = new Users.UserController();

/// GET user
userRouter.get('/:userId', checkToken, checkUser, (req, res, next) => {
    const userID = parseInt(req.params.userId);
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

//login or get jwt token
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

//create new user
userRouter.post("/", (req, res, next) => {
    const newUser = req.body;
    if (newUser) {
        userController.createUser(newUser).then(results => {
            res.status(201).json({ msg: "New user added to database" });
        }).catch(err => {
            res.status(500).json({ error: "Failed to insert new user" });
        });
    } else {
        next();
    }
});

//update user
userRouter.put("/:userId", checkToken, checkUser,(req, res, next) => {
    const updatedUser:UserModel = req.body;

    if(updatedUser) {
        userController.updateUser(updatedUser).then(results => {
            console.log(results);
            res.status(201).json({ msg: "Updated user in database" });
        }).catch(err => {
            console.log(err);
            res.status(500).json({ error: "Failed to update user" });
        });
    } else {
        next();
    }
});

//Delete user
userRouter.delete("/:userId", checkToken, checkUser,(req, res, next) => {
    const id: number = parseInt(req.params['userId']);
    if(id) {
        userController.deleteUser(id).then(results => {
            res.status(204).json({ msg: "deleted user in database" });
        }).catch(err => {
            console.log(err);
            res.status(500).json({ error: "Failed to delete user" });
        });
    } else {
        next();
    }
});