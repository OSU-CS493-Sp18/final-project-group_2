"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbConfig_1 = require("./../db/dbConfig");
const Sequelize = require("sequelize");
;
;
exports.User = dbConfig_1.database.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    pass: Sequelize.STRING,
    email: Sequelize.STRING,
    dadRating: Sequelize.INTEGER
});
//# sourceMappingURL=users.js.map