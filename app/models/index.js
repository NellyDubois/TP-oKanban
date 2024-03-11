//Import des Models Card, List et Label
const List = require ('./List');
const Card = require ('./Card');
const Label = require ('./Label');

// Définition de la relation One-to-Many entre List et Card
List.hasMany(Card, {
  as: 'cards', //alias pour l'accès aux cards depuis List
  foreignKey: 'list_id', // nom de la clé étrangère permettant la liaison
});

// Définition de la relation inverse de la précédente
Card.belongsTo(List, {
  as: 'list', //alias pour l'accès à la liste à laquelle appartient une carte
  foreignKey: 'list_id',// nom de la clé étrangère permettant la liaison
});

// Définition de la realtion Many-to-Many entre Card et Label
Card.belongsToMany(Label, { 
  through: 'card_has_label', // Nom de la table de liaison
  foreignKey: 'card_id', // Clé étrangère pour ce côté de l'association
  as: 'labels', //alias pour l'accès aux labels depuis une carte
  timestamps: false, // pour ne pas ajouter de colonnes createdAt et updatedAt à la table de liaison
  createdAt: 'created_at', // renommage en snake_case de la colonne createdAt
});

Tag.belongsToMany(Card, { 
  through: 'card_has_label',// Nom de la table de liaison
  foreignKey: 'label_id',// Clé étrangère pour ce côté de l'association
  as: 'cards', //Alias pour l'acccès aux cartes depuis un label
  timestamps: false, // on indique que l'on ne gère pas de timestamps
  createdAt: 'created_at', // renommage en snake_case de la colonne createdAt
});

// Export des modèles
module.exports = {
  List,
  Card,
  Label
};