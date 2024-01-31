const { DataTypes, Model } = require('sequelize');
const sequelize = require('../sequelize');

class Artist extends Model {}

Artist.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    artistURL: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'artist',
});

module.exports = Artist;