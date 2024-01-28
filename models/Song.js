const { DataTypes, Model } = require('sequelize');
const sequelize = require('../sequelize');

class Song extends Model {}

Song.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    releaseDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    audioURL: {
        type: DataTypes.STRING,
    }
}, {
    sequelize,
    modelName: 'Song',
  });

  module.exports = Song;

