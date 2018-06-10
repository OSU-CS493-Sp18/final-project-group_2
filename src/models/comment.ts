import {database} from './../db/dbConfig';
import {SERVFAIL} from 'dns';

export interface AddCommentModel {
    comment: string
    jokeId: number
    userId: number
    dadRating: number
};

export interface CommentModel {
    id: number
    comment: string
    jokeId: number
    userId: number
    dadRating: number
};