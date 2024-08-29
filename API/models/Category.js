const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Category = sequelize.define('Category', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    parentCategoryId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }
    // createdAt et updatedAt sont générés automatiquement par l'ORM Sequelize.
});

module.exports = Category;