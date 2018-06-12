import { database } from './../db/dbConfig';
import * as Sequelize from 'sequelize';
import { SERVFAIL } from 'dns';

export interface AddUserModel {
    username: string
    pass: string
    email: string
    token?:string
};

export interface UserModel extends Sequelize.Model<UserModel, AddUserModel> {
    id: number
    username: string
    pass: string
    email: string
    token?:string
};

export interface User { 
}