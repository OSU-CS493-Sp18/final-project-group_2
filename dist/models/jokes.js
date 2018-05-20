"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbConfig_1 = require("./../db/dbConfig");
const Sequelize = require("sequelize");
;
;
exports.Joke = dbConfig_1.database.define('joke', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    joke: Sequelize.STRING,
    dadRating: Sequelize.INTEGER,
    user: Sequelize.STRING,
    keywords: Sequelize.STRING
});
//# sourceMappingURL=jokes.js.map