import * as MySQL from 'mysql';
import {database} from '../db/dbConfig';
import { reject } from 'bluebird';
import {commentModel, addCommentModel} from '../models/comment';

export module Comments {
    export class CommentController {
        create(comment: addCommentModel){
            return new Promise((resolve, reject) => {
                database.query("INSERT INTO comments SET ?", [comment], (err, result) =>{
                    return err ? reject(err) : resolve(result);
                });
            });
        }

        update(comment: commentModel){
            return new Promise((resolve, reject) => {
                database.query("UPDATE comments SET ? WHERE id = ?", [comment, comment.id], (err, result) => {
                    return err ? reject(err) : resolve(result);
                })
            });
        }

        delete(id: number){
            return new Promise((resolve, reject) => {
                database.query("DELETE FROM comments WHERE id = ?", [id], (err, result) => {
                    return err ? reject(err) : resolve(result);
                });
            });
        }

        getByUser(userId: number){
            return  new Promise((resolve, reject) => {
                database.query("SELECT *  FROM comments WHERE userId = ?", [userId], (err, result) => {
                    return err ? reject(err) : resolve(result);
                });
            });
        }

        getByJoke(jokeId: number){
            return new Promise((resolve, reject) => {
                database.query("SELECT * FROM comments WHERE jokeId = ?", [jokeId], (err, result) =>{
                    return err ? reject(err) : resolve(result);
                });
            });
        }
    }
};