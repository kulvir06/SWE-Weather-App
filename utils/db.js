import Sequelize from 'sequelize';
import user from '../models/user';

const sequelize = new Sequelize('WeatherApp', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

const db ={};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = user(sequelize,Sequelize);

module.exports = db;