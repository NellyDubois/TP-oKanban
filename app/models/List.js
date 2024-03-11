// Import des classes Datatypes et Model du module sequelize
const { DataTypes, Model } = require('sequelize');
// Import de l'instance sequelize utilisée pour la connexion à la base de données
const sequelize = require('../sequelize-client');

// Création de la classe List qui étend la classe Model du module sequelize
class List extends Model {}

List.init({  
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  position: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
}, {
  sequelize, 
  modelName: 'List',
  tableName: 'list',
});

module.exports = List;