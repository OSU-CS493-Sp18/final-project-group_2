"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
//Database credentials
const dbName = 'expressapp';
const dbUsername = 'root';
const dbPass = 'root';
//Create database 
exports.database = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    dialect: 'mysql',
    port: 3306
});
const sequelize = new Sequelize('db', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false
});
exports.database.authenticate()
    .then(() => {
    console.log('Connection has been established successfully.');
})
    .catch(err => {
    console.error('Unable to connect to the database:', err);
});
//# sourceMappingURL=dbConfig.js.map