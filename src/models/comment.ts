import {database} from './../db/dbConfig';
import {SERVFAIL} from 'dns';

export interface addCommentModel {
    comment: string
    jokeId: number
    userId: number
    dadRating: number
};

export interface commentModel {
    id: number
    comment: string
    jokeId: number
    userId: number
    dadRating: number
};