import * as jwt from 'jsonwebtoken';
import { AddJokeModel, JokeModel } from './../models/jokes';
import { resolve } from 'url';
import * as MySQL from 'mysql';
import { database } from '../db/dbConfig';
import { matchedData } from 'express-validator/filter';
import * as bcrypt from 'bcrypt';
import { UserModel } from '../models/users';

export module Joke {
    export class JokeController {
        private saltRounds = 10;
        private jwtSecret = 'jet_fuel_cant_melt_steel_dreams';


        addJoke(joke: AddJokeModel, user: UserModel) {
            var newJoke: JokeModel = joke as JokeModel;
            newJoke.id = null;

            return this.verifyJwt(user.token).then((decoded: any) => {
                return new Promise((resolve, reject) => {
                    this.getUserByname(user.username).then(dbUser => {
                        if (!dbUser || !bcrypt.compareSync(user.pass, dbUser.pass)) {
                            reject(null);
                        } else {
                            database.query("INSERT INTO jokes SET ?", [newJoke], (err, results) => {
                                err ? reject(err) : resolve(results);
                            });
                        }
                    });
                });
            });
        }


        getJokeById(id: number) {
            return new Promise((resolve, reject) => {
                database.query(
                    'SELECT * FROM jokes WHERE id = ?',
                    [id],
                    (err, results) => {
                        err ? reject(err) : resolve(results[0])
                    });
            }).then((user) => {
                console.log(user);
                return user as JokeModel;
            }).catch((err) => {
                return null;
            });
        }

        getJokes() {
            return new Promise((resolve, reject) => {
                database.query(
                    'SELECT * FROM jokes',
                    (err, results) => {
                        err ? reject(err) : resolve(results);
                    });
            }).then((jokes) => {
                console.log(jokes);
                return jokes;
            }).catch((err) => {
                return null;
            });
        }

        getJokeCount(mysqlPool) {
            return new Promise((resolve, reject) => {
                mysqlPool.query('SELECT COUNT(*) AS count FROM jokes', function (err, results) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results[0].count);
                    }
                });
            });
        }

        getJokesByKeyword(keyword: string) {
            return new Promise((resolve, reject) => {
                database.query('SELECT * FROM jokes WHERE keywords LIKE ?', ['%' + keyword + '%'], (err, results) => {
                        err ? reject(err) : resolve(results[0])
                    });
            }).then((joke) => {
                console.log(joke);
                return joke as JokeModel;
            }).catch((err) => {
                return null;
            });
        }

        updateJoke(joke: JokeModel, user: UserModel) {
            return this.verifyJwt(user.token).then((decoded: any) => {
                user.dadRating = Number(user.dadRating);
                user.pass = bcrypt.hashSync(user.pass, this.saltRounds);

                return new Promise((resolve, reject) => {
                    this.getUserByname(user.username).then(dbUser => {
                        if (!dbUser || !bcrypt.compareSync(user.pass, dbUser.pass)) {
                            reject(null);
                        } else {
                            return new Promise((resolve, reject) => {
                                this.getJokeById(joke.id).then(dbJoke =>{
                                    if(!dbJoke || dbJoke.userId != dbUser.id)
                                        reject(null);
                                    else{
                                        database.query("UPDATE jokes SET joke = ?, catId = ?, dadRating = ?, keywords = ? WHERE id=?", [joke.joke, joke.catId, joke.dadRating, joke.keywords, dbJoke.id], (err, results) => {
                                            err ? reject(err) : resolve(results);
                                        });
                                    }
                                });
    
                            });
                        }
                    });
                });
            });
        }

        deleteJoke(joke: JokeModel, user: UserModel) {
            return this.verifyJwt(user.token).then((decoded: any) => {
                return new Promise((resolve, reject) => {
                    this.validateChangeUser(joke.id, user).then(dbUser => {
                        if (!dbUser) {
                            reject(null);
                        } else {
                            database.query("DELETE FROM jokes WHERE id=?", [joke.id], (err, results) => {
                                err ? reject(err) : resolve(results);
                            });
                        }
                    });
                });
            });
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

        validateChangeUser(jokeId: number, user: UserModel){
            return new Promise((resolve, reject) => {
                this.getUserByname(user.username).then(dbUser => {
                    if (!dbUser || !bcrypt.compareSync(user.pass, dbUser.pass)) {
                        reject(null);
                    } else {
                            this.getJokeById(jokeId).then(dbJoke =>{
                                if(!dbJoke || dbJoke.userId != dbUser.id)
                                    reject(null);
                                else{
                                    return dbUser;
                                    }
                            });
                    }
                });
            })
        }

        verifyJwt(token: string) {
            return new Promise((resolve, reject) => {
                jwt.verify(token, this.jwtSecret, (err, decoded) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(decoded);
                });
            }) as Promise<string | object>;
        }
    }
}