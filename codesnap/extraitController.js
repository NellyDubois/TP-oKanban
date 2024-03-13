// Import du model Card
const { Card } = require('../models')
// ...
// Définition du module cardController
const cardController = {
    //Méthode pour récupérer toutes les cartes d'une liste
    getCardsInList: async (req, res) => {
        try {
            // Récupération de l'id de la liste depuis les paramètres de la requête
            const listId = req.params.id; 
            // On utilise la méthode findAll() (héritée de la classe Model de Sequelize) du modèle Card 
            //pour récupérer toutes les cartes qui ont un list_id égal à listId
            const cards = await Card.findAll({ 
                where: { 
                    list_id: listId
                },
                include: 'labels' //  pour inclure les labels associés à chaque carte
            });
            if (!cards) { // Si aucune carte n'est trouvée, on renvoie un message d'erreur
                res.status(404).json('Aucune carte trouvée dans la liste');
            } else {
                res.status(200).json(cards);// on renvoie les cartes au format json
            }
        } catch(error) {
            res.status(500).json({ message: 'Erreur interne du serveur' });
        }
        
    },
// ...
}
//export du module cardController
module.exports = cardController;