
// Import de la fonction config du module dotenv pour charger les variables d'environnement
const { config } = require('dotenv');
config();

//Import de la classe Sequelize du module sequelize
const { Sequelize } = require('sequelize');

console.log(process.env.PG_URL);

//Création d'une instance de Sequelize avec l'url de connexion à la base de données postgreSQL okanban stockée dans .env
const sequelize = new Sequelize(process.env.PG_URL, {
  define: {
    underscored: true,//Pour que les noms des colonnes soient en snake_case (convention de nommage en postgreSQL)
    createdAt: 'created_at',//Pour que le nom de la colonne de création soit aussi en snake_case
    updatedAt: 'updated_at',//Pour que le nom de la colonne de mise à jour soit aussi en snake_case
  }
});

//Export de l'instance de Sequelize
module.exports = sequelize;