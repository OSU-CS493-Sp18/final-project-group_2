import * as Sequelize from 'sequelize';

//Database credentials
const dbName = 'expressapp';
const dbUsername = 'root';
const dbPass = 'root';

//Create database 
export const database = new Sequelize(dbName, dbUsername, dbPass, {
    dialect: 'mysql',
    port: 3307,
    host: 'localhost'
});

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false
});
sequelize.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});