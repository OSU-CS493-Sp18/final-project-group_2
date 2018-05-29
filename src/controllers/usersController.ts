import * as jwt from 'jsonwebtoken';
import * as Bluebird from 'Bluebird';
import { User, AddUserModel, UserModel } from './../models/users';
import { resolve } from 'url';
import * as MySQL from 'mysql';
import { database } from '../db/dbConfig';
import { matchedData } from 'express-validator/filter';
import * as bcrypt from 'bcrypt';

export module Users {
    export class UserController {
        private saltRounds = 10;
        private jwtSecret = 'supersecure';

        static get userInfo() {
            return ['id', 'username', 'email', 'dadRating'];
        };

        private static currentUser;
        static get loggedInUser() {
            return UserController.currentUser;
        };

        createUser(user: AddUserModel) {
            return new Promise((resolve, reject) => {
                user.pass = bcrypt.hashSync(user.pass, 10);

                database.query(`INSERT INTO users SET ?`, user, (err, results) => {
                    err ? reject(err) : resolve(results);
                });
            });
        }

        logInUser(user: AddUserModel) {
            return new Promise((resolve, reject) => {
                this.getUserByname(user.username).then(dbUser => {
                    if (!dbUser || !bcrypt.compareSync(dbUser.pass,user.pass)) {
                        reject(null);
                    } else {
                        const token = jwt.sign(
                            {id: dbUser.username },
                            this.jwtSecret,
                            { expiresIn: 86400 }
                        );

                        resolve(token);
                    }
                });
            });
        }

        getUser(id: number) {
            return new Promise((resolve, reject) => {
                database.query(
                    'SELECT * FROM users WHERE id = ?',
                    [id],
                    (err, results) => {
                        err ? reject(err) : resolve(results[0])
                    });
            }).then((user) => {
                console.log(user);
                return user as UserModel;
            }).catch((err) => {
                return null;
            })
        }

        getUserByname(username:string) {
            return new Promise((resolve, reject) => {
                database.query(
                    'SELECT * FROM users WHERE username = ?',
                    [username],
                    (err, results) => {
                        err ? reject(err) : resolve(results[0])
                    });
            }).then((user) => {
                console.log(user);
                return user as UserModel;
            }).catch((err) => {
                return null;
            })
        }

        verifyJwt(token: string) {
            return new Promise((resolve, reject) => {
                jwt.verify(token, this.jwtSecret, (err, decoded) => {
                    if (err) {
                        return resolve(false);
                    }

                    // UserController.currentUser = User.findById(decoded['id']);
                    return resolve(true);
                });
            }) as Promise<boolean>;
        }
    }
}