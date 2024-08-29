const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Product = require('./Product'); // Importation du modèle Product

const ProductAccessory = sequelize.define('ProductAccessory', {
    // Ajout de la clé étrangère productId
    product1: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product, // Nom du modèle référencé
            key: 'id'    // Clé primaire du modèle référencé
        }
    },
    product2: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product, // Nom du modèle référencé
            key: 'id'    // Clé primaire du modèle référencé
        }
    }
    // createdAt et updatedAt sont générés automatiquement par l'ORM Sequelize.
});

module.exports = ProductAccessory;