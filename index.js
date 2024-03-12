//Import du module dotenv et de sa méthode config pour utiliser les variables d'environnement pour charger les variables d'environnement
require('dotenv').config();

// Import du module CORS (Cross-Origin Resource Sharing) indispensable pour que le front puisse communiquer avec le back (car serveurs différents)
const cors = require('cors');

// Import du module express
const express = require('express');

// Import du router
const router = require('./app/router');

//Création de l'instant express
const app = express();

//Définition du port d'écoute du serveur back
const port = process.env.PORT;

//Configuration d'Express pour aller chercher les fichiers statiques dans le dossier dist
app.use(express.static('assets'));

//Configuration de CORS pour autoriser les requêtes depuis le front qui tourne sur le port 5174
app.use(cors('*'));

// Configuration d'Express pour traiter les données envoyées par le front sous format de formulaire
app.use(express.urlencoded({ extended: true}));

// Configuration d'Express pour parser les données envoyées par le front sous format JSON
app.use(express.json());

// Configuration d'Express pour utiliser le router
app.use(router);

// Ecout du serveur sur le port défini
app.listen(port, () => {
  console.log(`Listening on the port http://localhost:${port}`);
});