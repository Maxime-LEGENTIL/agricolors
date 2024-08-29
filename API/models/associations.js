const User = require('./User');
const Order = require('./Order');

// Un utilisateur peut avoir plusieurs commandes (Orders)
User.hasMany(Order, {
    foreignKey: 'userId', // La clé étrangère dans le modèle Order
    as: 'orders'          // Alias pour les relations
});

// Une commande appartient à un utilisateur
Order.belongsTo(User, {
    foreignKey: 'userId', // La clé étrangère dans le modèle Order
    as: 'user'            // Alias pour les relations
});
