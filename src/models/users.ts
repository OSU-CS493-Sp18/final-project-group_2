import { database } from './../db/dbConfig';
import * as Sequelize from 'sequelize';
import { SERVFAIL } from 'dns';

export interface AddUserModel {
    username: string
    pass: string
    dadRating: number
    email: string
};

export interface UserModel extends Sequelize.Model<UserModel, AddUserModel> {
    id: number
    username: string
    pass: string
    dadRating: number
    email: string
};

export const User = database.define<UserModel, AddUserModel>('user',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    pass: Sequelize.STRING,
    email: Sequelize.STRING,
    dadRating: Sequelize.INTEGER
});