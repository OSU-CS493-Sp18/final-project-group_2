import { database } from './../db/dbConfig';
import * as Sequelize from 'sequelize';
import { SERVFAIL } from 'dns';

export interface AddJokeModel {
    joke: string
    dadRating: number
    user: string
    keywords: string
};

export interface JokeModel extends Sequelize.Model<JokeModel, AddJokeModel> {
    id: number
    joke: string
    dadRating: number
    user: string
    keywords: string
};
