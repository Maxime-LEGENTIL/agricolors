const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Category = require('./Category'); // Importation du modèle User

const Product = sequelize.define('Product', {
    referenceConstructeur: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    // Ajout de la clé étrangère categoryId
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Category, // Nom du modèle référencé
            key: 'id'    // Clé primaire du modèle référencé
        }
    }
    // createdAt et updatedAt sont générés automatiquement par l'ORM Sequelize.
});

module.exports = Product;