import * as jwt from 'jsonwebtoken';
import * as Bluebird from 'Bluebird';
import { User, AddUserModel, UserModel } from './../models/users';
import { resolve } from 'url';
import * as MySQL from 'mysql';
import { database } from '../db/dbConfig';
import {matchedData } from 'express-validator/filter';

export module Users {
    export class UserController {
        private saltRounds = 10;
        private jwtSecret = 'supersecure';

        static get userInfo() {
            return ['id', 'username','email', 'dadRating'];
        };

        private static currentUser;
        static get loggedInUser() {
            return UserController.currentUser;
        };

        createUser({username, email, dadRating, pass}: AddUserModel) {
            // return User.create({username, email, dadRating, pass: "pass"})
            //         .then(user => this.getUser(user!.id));
                //}
            return "";
        }

        // logInUser({username, email}: AddUserModel) {
        //     return User.findOne({ where: { username, email}})
        //     .then(user => {
        //         const {id, email} = user!;
        //         return {token: jwt.sign({ id, email }, this.jwtSecret)}
        //     });
        // }

        getUser(id : number) {
            return new Promise((resolve, reject) => {
                database.query(
                'SELECT * FROM users WHERE id = ?',
                [ id ],
                (err, results) =>
            {
                err ? reject(err) : resolve(results[0])
            });
            }).then((user) => {
                console.log(user);
                return user as UserModel;
            }).catch((err) => {
                return null;
            })
        }

        verifyJwt(token: string){
            return new Promise((resolve, reject) => {
                jwt.verify(token, this.jwtSecret, (err, decoded) => {
                    if(err) {
                        return resolve(false);
                    }

                    // UserController.currentUser = User.findById(decoded['id']);
                    return resolve(true);
                });
            }) as Promise<boolean>;
        }
    }
}