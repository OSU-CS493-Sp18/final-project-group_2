import * as MySQL from 'mysql';
import {database} from '../db/dbConfig';
import { reject } from 'bluebird';
import {commentModel, addCommentModel} from '../models/comment';

export module Comments {
    export class CommentController {
        create(comment: addCommentModel){

        }

        update(comment: commentModel){

        }

        delete(id: number){

        }

        get(userId: number){

        }

        getAll(){

        }
    }
};