import { Sequelize } from 'sequelize';

const db = new Sequelize('database_bananacocktails', 'root','',{
    host: 'localhost',
    dialect: 'mysql'
    });

    export default db;