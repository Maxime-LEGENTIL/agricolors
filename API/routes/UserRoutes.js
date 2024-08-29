const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const authenticateToken = require('../middlewares/authMiddleware');

// Routes de l'utilisateur
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/users', authenticateToken, userController.getAllUsers);
router.get('/users/:id', authenticateToken, userController.getUserById);
router.put('/users/:id', authenticateToken, userController.updateUser);
router.delete('/users/:id', authenticateToken, userController.deleteUser);

module.exports = router;