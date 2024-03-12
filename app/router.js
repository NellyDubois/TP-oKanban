// Import des modules express et path
const express = require('express');
const path = require('path');

// Import des controllers
const cardController = require("./controllers/cardController");
const listController = require("./controllers/listController");
const labelController = require("./controllers/labelController");

// Création du router
const router = express.Router();

// Route / avec la méthode GET
router.get('/', (req, res) => {
    // on affiche le fichier index.html avec le chemin absolu
    const filePath = path.join(__dirname,'../assets/index.html');
    res.sendFile(filePath);
})

// Route /lists avec les différentes méthodes HTTP
//pour récupérer toutes les listes
router.get("/lists", listController.getAllLists);

// pour créer une liste
router.post("/lists", listController.createList);

// Route /lists/:id avec les différentes méthodes HTTP
//pour récupérer une liste par son id
router.get("/lists/:id", listController.getOneList);

// pour modifier une liste par son id
router.patch("/lists/:id", listController.modifyList);

// pour supprimer une liste via son id
router.delete("/lists/:id", listController.deleteList);

//pour récupérer toutes les cartes d'une liste par l'id de la liste
router.get("/lists/:id/cards", cardController.getCardsInList);

// routes /cards
// pour récupérer toutes les cartes d'une liste
router.get('/cards', cardController.getAllCards);
//pour créer une carte
router.post("/cards", cardController.createCard);

// Route /cards/:id avec les différentes méthodes HTTP
router.get("/cards/:id", cardController.getOneCard);
router.patch("/cards/:id", cardController.modifyCard);
router.delete("/cards/:id", cardController.deleteCard);

// associe un label à une carte par son id
router.post("/cards/:id/label", labelController.associateLabelToCard);
// dissocie un label par son id d'une carte par son id
router.delete("/cards/:card_id/label/:label_id", labelController.removeLabelFromCard);

// Route /labels/ avec les différentes méthodes HTTP
//pour récupérer toutes les étiquettes (labels)
router.get("/labels", labelController.getAllLabels);
//pour créer une étiquette (label)
router.post("/labels", labelController.createLabel);

// Route /labels/:id avec les différentes méthodes HTTP
//pour récupérer une étiquette par son id
router.get('/labels/:id', labelController.getOneLabel);
//pour modifier une étiquette par son id
router.put('/labels/:id', labelController.modifyLabel);
//pour supprimer une étiquette par son id
router.delete('/labels/:id', labelController.deleteLabel);

// Export du router
module.exports = router;