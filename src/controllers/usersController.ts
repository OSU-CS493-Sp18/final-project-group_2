import * as jwt from 'jsonwebtoken';
import { User, AddUserModel, UserModel } from './../models/users';
import { resolve } from 'url';
import * as MySQL from 'mysql';
import { database } from '../db/dbConfig';
import { matchedData } from 'express-validator/filter';
import * as bcrypt from 'bcrypt';

export module Users {
    export class UserController {
        private saltRounds = 10;
        private jwtSecret = 'jet_fuel_cant_melt_steel_dreams';

        static get userInfo() {
            return ['id', 'username', 'email', 'dadRating'];
        };

        private static currentUser;
        static get loggedInUser() {
            return UserController.currentUser;
        };

        createUser(user: AddUserModel) {
            return new Promise((resolve, reject) => {
                user.pass = bcrypt.hashSync(user.pass, this.saltRounds);

                database.query(`INSERT INTO users SET ?`, user, (err, results) => {
                    console.log(err);
                    err ? reject(err) : resolve(results);
                });
            });
        }

        logInUser(user: AddUserModel) {
            return new Promise((resolve, reject) => {
                this.getUserByname(user.username).then(dbUser => {
                    if (!dbUser || !bcrypt.compareSync(user.pass, dbUser.pass)) {
                        reject(null);
                    } else {
                        const token = jwt.sign(
                            { id: dbUser.username },
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
            }).then((user: UserModel) => {
                console.log(user);
                return user;
            }).catch((err) => {
                return null;
            })
        }

        getUserByname(username: string) {
            return new Promise((resolve, reject) => {
                database.query(
                    'SELECT * FROM users WHERE username = ?',
                    [username],
                    (err, results) => {
                        err ? reject(err) : resolve(results[0])
                    });
            }).then((user: UserModel) => {
                console.log(user);
                return user;
            }).catch((err) => {
                return null;
            })
        }

        updateUser(user: UserModel) {
            user.pass = bcrypt.hashSync(user.pass, this.saltRounds);

            console.log(user.pass);

            return new Promise((resolve, reject) => {
                database.query('UPDATE users SET ? WHERE id = ?', [user, user.id], (err, results) => {
                    err ? reject(err) : resolve(results);
                });
            });
        }

        deleteUser(id: number) {
            return new Promise((resolve, reject) => {
                database.query("DELETE FROM users WHERE id=?", [id], (err, results) => {
                    err ? reject(err) : resolve(results);
                });
            });
        }

        verifyJwt(token: string) {
            return new Promise((resolve, reject) => {
                jwt.verify(token, this.jwtSecret, (err, decoded) => {
                    if (err) {
                        return reject(err);
                    }

                    // UserController.currentUser = User.findById(decoded['id']);
                    return resolve(decoded);
                });
            }) as Promise<string | object>;
        }
    }
}