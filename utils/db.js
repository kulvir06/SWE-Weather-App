import Sequelize from 'sequelize';
import user from '../models/user';
import data from '../models/data';

const sequelize = new Sequelize('WeatherApp', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

const db ={};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = user(sequelize,Sequelize);
db.data = data(sequelize,Sequelize);

module.exports = db;