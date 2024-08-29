const express = require('express');
const sequelize = require('./db');
const userRoutes = require('./routes/UserRoutes');
const app = express();
const port = 3000; // Port d'exécution de l'API

// Middleware pour parser les JSON
app.use(express.json());

// Utiliser les routes de l'utilisateur
app.use('/api', userRoutes);

// Synchronisation de la base de données et démarrage du serveur
sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Le serveur API démarre sur le port ${port}.`);
    });
}).catch(err => {
    console.error('Erreur de synchronisation de la base de données:', err);
});
