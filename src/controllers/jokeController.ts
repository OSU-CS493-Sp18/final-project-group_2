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
        addJoke(joke: AddJokeModel) {
            return new Promise((resolve, reject) => {
                database.query("INSERT INTO jokes (joke,catId,dadRating,userId,keywords) VALUES (?, ?, ?, ?, ?)", [joke.joke, joke.catId, joke.dadRating, joke.userId, joke.keywords], (err, results) => {
                    return err ? reject(err) : resolve(results);
                });
            });
        }


        getJokeById(id: number) {
            return new Promise((resolve, reject) => {
                database.query(
                    'SELECT * FROM jokes WHERE id = ?',
                    [id],
                    (err, results:JokeModel) => {
                        err ? reject(err) : resolve(results[0])
                    });
            });
        }

        getJokes() {
            return new Promise((resolve, reject) => {
                database.query(
                    'SELECT * FROM jokes',
                    (err, results) => {
                        return err ? reject(err) : resolve(results);
                    });
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
                        return err ? reject(err) : resolve(results[0])
                    });
            });
        }

        updateJoke(joke: JokeModel) {
            return new Promise((resolve, reject) => {
                database.query("UPDATE jokes SET ? WHERE id = ?", [joke, joke.id], (err, results) => {
                    return err ? reject(err) : resolve(results);
                });
            });
        }

        deleteJoke(joke: JokeModel) {
            return new Promise((resolve, reject) => {
                database.query("DELETE FROM jokes WHERE id=?", [joke.id], (err, results) => {
                    err ? reject(err) : resolve(results);
                });
            });
        }

    }
}