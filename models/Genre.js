const { DataTypes, Model } = require('sequelize');
const sequelize = require('../sequelize');

class Genre extends Model {}

Genre.init({
    genreName: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'genre',
});

module.exports = Genre;