// Import des classes Datatypes et Model du module sequelize
const { DataTypes, Model } = require('sequelize');
// Import de l'instance sequelize utilisée pour la connexion à la base de données
const sequelize = require('../sequelize-client');

// Création de la classe Label qui étend la classe Model du module sequelize
class Label extends Model {}

// Initialisation de la classe Label
Label.init({  
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '#FFFFFF',
  },
}, {  
  sequelize,
  modelName: 'Label',
  tableName: 'label',
});

module.exports = Label;