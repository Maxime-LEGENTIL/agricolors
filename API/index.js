const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Order = require('./models/Order');
const Address = require('./models/Address');
const Cart = require('./models/Cart');
const Product = require('./models/Product');
const ProductAccessory = require('./models/ProductAccessory');
const Country = require('./models/Country');
const Category = require('./models/Category');
const sequelize = require('./db');
const app = express();
const port = 3000;

// Middleware pour parser les JSON
app.use(express.json());

// Clé secrète pour signer les tokens JWT (à garder confidentielle et à stocker dans des variables d'environnement)
const SECRET_KEY = 'votre_clé_secrète';

// Endpoint d'inscription
app.post('/register', async (req, res) => {
    try {
        const { firstname, lastname, password, email, company, siret, birthday, newsletter, active } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ firstname, lastname, password: hashedPassword, email, company, siret, birthday, newsletter, active });
        res.status(201).json(user);
    } 
    catch (error) {
        res.status(500).json({ error: 'Erreur lors de l\'inscription.' });
    }
});

// Endpoint de connexion
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Utilisateur ou mot de passe incorrect.' });
    }

    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la connexion.' });
  }
});

// Middleware pour protéger les endpoints
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

// Exemple d'endpoint protégé
app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'Ceci est un endpoint protégé.', user: req.user });
});

// Synchronisation de la base de données et démarrage du serveur
sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Le serveur API démarre sur le port ${port}.`);
    });
    }).catch(err => {
        console.error('Erreur de synchronisation de la base de données:', err);
    });