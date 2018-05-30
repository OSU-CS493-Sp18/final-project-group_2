import * as jwt from 'jsonwebtoken';
import { AddJokeModel, JokeModel } from './../models/jokes';
import { resolve } from 'url';
import * as MySQL from 'mysql';
import { database } from '../db/dbConfig';
import { matchedData } from 'express-validator/filter';

export module Joke {
    export class JokeController {

        addJoke(joke: AddJokeModel) {
            var newJoke: JokeModel = joke as JokeModel;
            newJoke.id = null;

            return new Promise((resolve, reject) => {
                database.query(
                    'INSERT INTO jokes SET ?',
                    newJoke,
                    (err, results) => {
                        err ? reject(err) : resolve(results)
                    });
            });
        }

        getJoke(id: number) {
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
    }
}