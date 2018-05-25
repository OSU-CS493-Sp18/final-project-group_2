import * as Sequelize from 'sequelize';
import * as MySQL from 'mysql';
//Database credentials
const dbName : string =  process.env.MYSQL_DATABASE;
const dbUsername : string  = process.env.MYSQL_USER;
const dbPass : string = process.env.MYSQL_PASSWORD;
const mysqlHost : string = process.env.MYSQL_HOST;
const mysqlPort : number = 3306;
const maxConnections : number = 10;



//Create database 
export const database = MySQL.createPool({
    connectionLimit: maxConnections,
    host: mysqlHost,
    port: mysqlPort,
    database: dbName,
    user: dbUsername,
    password: dbPass
});

