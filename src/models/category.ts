import { database } from './../db/dbConfig';
import * as Sequelize from 'sequelize';
import { SERVFAIL } from 'dns'

export interface addCategoryModel {
    name: string
};

export interface categoryModel {
    id: number
    name: string
};
