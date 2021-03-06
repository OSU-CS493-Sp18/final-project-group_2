import * as MySQL from 'mysql';
import { database } from '../db/dbConfig';
import { reject } from 'bluebird';
import { categoryModel, addCategoryModel } from '../models/category';

export module Categories {
    export class CategoryController {
        create(cate: categoryModel) {
            return new Promise((resolve, reject) => {
                database.query("INSERT INTO categories SET ?", [cate], (err, result) => {
                    err ? reject(err) : resolve(result);
                });
            });
        }

        update(cate: categoryModel) {
            return new Promise((resolve, reject) => {
                database.query("UPDATE categories SET ? WHERE name = ?", [cate, cate.name], (err, result) => {
                    err ? reject(err) : resolve(result);
                });
            });
        }

        delete(cate: Number) {
            return new Promise((resolve, reject) => {
                database.query("DELETE FROM categories WHERE id=?", [cate], (err, result) => {
                    err ? reject(err) : resolve(result);
                });
            });
        }

        get(id: number) {
            return new Promise((resolve, reject) => {
                database.query("SELECT * FROM categories WHERE id = ?", [id], (err, result) => {
                    err ? reject(err) : resolve(result[0]);
                });
            });
        }

        getAll() {
            return new Promise((resolve, reject) => {
                database.query("SELECT * FROM categories", (err, results) => {
                    err ? reject(err) : resolve(results);
                });
            });
        }
    }
}