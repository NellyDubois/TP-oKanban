// Import des modules express et path
const express = require('express');
...
// Import du controller
const cardController = require("./controllers/cardController");
...
// Création du router
const router = express.Router();
...
//pour récupérer toutes les cartes d'une liste par l'id de la liste
router.get("/lists/:id/cards", cardController.getCardsInList);
...
// Export du router
module.exports = router;