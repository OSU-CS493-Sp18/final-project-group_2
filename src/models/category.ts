import { database } from './../db/dbConfig';
import * as Sequelize from 'sequelize';
import { SERVFAIL } from 'dns'

export interface categoryModel {
    name:string
};
