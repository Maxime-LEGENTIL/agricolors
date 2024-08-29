const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User'); // Importation du modèle User

const Order = sequelize.define('Order', {
    reference: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // Ajout de la clé étrangère userId
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User, // Nom du modèle référencé
            key: 'id'    // Clé primaire du modèle référencé
        }
    }
    // createdAt et updatedAt sont générés automatiquement par l'ORM Sequelize.
});

module.exports = Order;