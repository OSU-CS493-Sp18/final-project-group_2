import { database } from './../db/dbConfig';
import { SERVFAIL } from 'dns';

export interface AddJokeModel {
    joke: string
    catId: number
    dadRating: number
    userId: number
    keywords: string
};

export interface JokeModel {
    id: number
    joke: string
    catId: number
    dadRating: number
    userId: number
    keywords: string
};
