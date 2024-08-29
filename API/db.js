const { Sequelize } = require('sequelize');

// Configuration de la connexion à la base de données MySQL
const sequelize = new Sequelize('agricolors', 'root', '', {
    host: 'localhost', // ou l'adresse IP de votre serveur MySQL
    dialect: 'mysql' // spécifie MySQL comme dialecte
});

// Test de la connexion
sequelize.authenticate()
    .then(() => console.log('Connexion à la base de données MySQL réussie.'))
    .catch(err => console.error('Impossible de se connecter à la base de données:', err));

module.exports = sequelize;