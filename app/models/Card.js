// Import des classes Datatypes et Model du module sequelize
const { DataTypes, Model } = require('sequelize');
// Import de l'instance sequelize utilisée pour la connexion à la base de données
const sequelize = require('../sequelize-client');

// Création de la classe Card qui étend la classe Model du module sequelize
class Card extends Model{}

// Initialisation de la classe Card 
Card.init({  
    content: {
      type: DataTypes.STRING,//attribut content de type STRING
      allowNull: false //la valeur ne peut pas être nulle
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,//la valeur par défaut est 1
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '#FFFFFF',
    },
    }, {  
    sequelize,//clé sequelize spécifie l'instance de sequelize à utiliser
    modelName: 'Card', // spécifie le nom du modèle
    tableName: 'card', // spécifie le nom de la table dans la base de données
  });
  //export du modèle Card afin qu'il puisse être utilisé dans d'autres fichiers
  module.exports = Card;