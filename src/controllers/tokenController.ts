import { Users } from './../controllers/usersController';
import * as jwt from 'jsonwebtoken';
import { IncomingHttpHeaders } from 'http';
import { RequestHandler } from 'express';

var userController: Users.UserController = new Users.UserController();

function getToken(header: IncomingHttpHeaders){
    const headerToken = header.authorization as string;
    if(!headerToken){
        return header;
    }

    return headerToken.split(' ')[1];
}

export const checkToken: (() => RequestHandler) = (() => (req, res, next) => {
    let token = getToken(req.headers) || req.query.token || req.body.token || "";
    let isValidUserPromise = userController.verifyJwt(token);

    isValidUserPromise.then( valid => {
        // If invalid send 403
        if(!valid){
            return res.status(403)
            .send({message: 'Invalid user, does not have correct login'});
        }
        // Otherwise valid user & continue
        next();
    });
});


