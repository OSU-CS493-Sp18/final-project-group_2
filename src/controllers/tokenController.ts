import { Users } from './../controllers/usersController';
import * as jwt from 'jsonwebtoken';
import { IncomingHttpHeaders } from 'http';
import { RequestHandler } from 'express';
import { UserModel } from '../models/users';

var userController: Users.UserController = new Users.UserController();

function getToken(header: IncomingHttpHeaders){
    const headerToken = header.authorization as string;
    if(!headerToken){
        return header;
    }

    return headerToken.split(' ')[1];
}

export const checkToken: RequestHandler = (req, res, next) => {
    const authHeader = req.get('Authorization') || ''; 
    const authParts:string[] = authHeader.split(' ');
    const token = authParts[0] === 'Bearer' ? authParts[1] : null;
    if(token){
        console.log("Authorizing Token");
        userController.verifyJwt(token).then(valid => {
            // If invalid send 403
            if(!valid){
                res.status(403).send({message: 'Invalid user, does not have correct login'});
            } else {
                req.params.userActual = valid['id'];
                next();
            }
        }).catch(err => {
            console.log(err);
            res.status(500).json({error: "There was an error"});
        }); 
    } else {
        res.status(403).json({error: "Invalid auth token."})
    }
};

export const checkUser: RequestHandler = (req, res, next) => {
    const userActual = req.params['userActual'];
    const userId = req.params['userId'] ? parseInt(req.params['userId']) : parseInt(req.query['userId']);
    userController.getUser(userId).then(user => {
        console.log(user.username, userActual);
        if(user.username !==  userActual){
            res.status(401).json({error: "You are not authorized to preform that action"});
        } else {
            next();
        }
    }).catch(err => {
        res.status(401).json({error: "Unauthorized"} );
    });
};

