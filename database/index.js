const { Sequelize } = require('sequelize');
const config = require('./config.json');

const sequelize = new Sequelize(config);

module.exports = sequelize;