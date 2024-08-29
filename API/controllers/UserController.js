const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const SECRET_KEY = 'votre_clé_secrète';  // À remplacer par une variable d'environnement

// Créer un nouvel utilisateur
exports.register = async (req, res) => {
    try {
        const { firstname, lastname, password, email, company, siret, birthday, newsletter, active } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ firstname, lastname, password: hashedPassword, email, company, siret, birthday, newsletter, active });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de l\'inscription.' });
    }
};

// Connexion d'un utilisateur
exports.login = async (req, res) => {
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
};

// Récupérer tous les utilisateurs
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs.' });
    }
};

// Récupérer un utilisateur par ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé.' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération de l\'utilisateur.' });
    }
};

// Mettre à jour un utilisateur
exports.updateUser = async (req, res) => {
    try {
        const { firstname, lastname, password, email, company, siret, birthday, newsletter, active } = req.body;
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé.' });

        let hashedPassword = user.password;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        await user.update({ firstname, lastname, password: hashedPassword, email, company, siret, birthday, newsletter, active });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'utilisateur.' });
    }
};

// Supprimer un utilisateur
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé.' });

        await user.destroy();
        res.json({ message: 'Utilisateur supprimé avec succès.' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression de l\'utilisateur.' });
    }
};
