const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Country = sequelize.define('Country', {
    isoCode: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // createdAt et updatedAt sont générés automatiquement par l'ORM Sequelize.
});

module.exports = Country;