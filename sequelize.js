const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('music_track', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;


