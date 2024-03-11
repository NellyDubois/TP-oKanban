// Import du model Card
const { Card } = require('../models')

// Définition du module cardController
const cardController = {
    //Méthode pour récupérer toutes les cartes d'une liste
    getCardsInList: async (req, res) => {
        try {
            // Récupération de l'id de la liste depuis les paramètres de la requête
            const listId = req.params.id; 
            // On utilise la méthode findAll() (héritée de la classe Model de Sequelize) du modèle Card pour récupérer toutes les cartes qui ont un list_id égal à listId
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
    //Méthode pour récupérer toutes les cartes
    getAllCards: async (req, res) => {
        try {
            // On utilise la méthode findAll() (héritée de la classe Model de Sequelize) du modèle Card pour récupérer toutes les cartes avec les labels associés
            const cards = await Card.findAll({include:'labels'}); 
            res.status(200).json(cards);// on renvoie les cartes au format json
        } catch(error) {
            res.status(500).json({ message: 'Erreur interne du serveur' });
        }
    },
    //Méthode pour récupérer une carte par son id
    getOneCard: async (req, res) => {
        try {
            // Récupération de l'id de la carte depuis les paramètres de la requête
            const cardId = req.params.id;
            // On utilise la méthode findByPk() pour récupérer la carte avec l'id cardId avec les labels associés
            const card = await Card.findByPk(cardId,{include:'labels'})
            res.status(200).json(card);// on renvoie la carte au format json
        } catch(error) {
            res.status(500).json({ message: 'Erreur interne du serveur' });
        }
    },
    //Méthode pour créer une carte
    createCard: async (req, res) => {
        try {
            // Récupération des champs title, color, position et list_id depuis le corps de la requête
            const { title, color, position, list_id } = req.body;
            // Si title n'est pas défini, on renvoie un message d'erreur
            if (!title) { res.status(400).json({ message: 'title pas défini' }); }
            // Si list_id n'est pas défini, on renvoie un message d'erreur
            else if (!list_id) { res.status(400).json({ message: 'list_id pas défini' }); }
            else {
                const newCard =  Card.build({title, list_id}); // On crée une instance de Card avec les données récupérées
                if (color) { newCard.color = color; } // Si color est définie, on modifie la valeur de newCard.color par color
                if (position) { newCard.position = position; } // Si position est définie, on modifie la valeur de newCard.position par position
                await newCard.save(); // On sauvegarde la nouvelle carte dans la base de données
                res.status(200).json(newCard);// on renvoie la carte créée au format json
            }
        } catch(error) {
            res.status(500).json({ message: 'Erreur interne du serveur' });
        }
    },
    //Méthode pour modifier une carte
    modifyCard: async (req, res) => {
        try {
            // Récupération de l'id de la carte depuis les paramètres de la requête
            const cardId = req.params.id;
            // Récupération des champs title, color, position et list_id depuis le corps de la requête
            const { title, color, position, list_id } = req.body;
            // On utilise la méthode findByPk() pour récupérer la carte avec l'id cardId
            const card = await Card.findByPk(cardId); 
            //Si title est défini dans le corps de la requête, on modifie le titre de la carte
            if (title) { card.title = title } ;
            if (color) { card.color = color };//si color est définie dans le corps de la requête, on modifie la couleur de la carte
            if (position) { card.position = position };//si position est définie dans le corps de la requête, on modifie la position de la carte
            if (list_id) { card.list_id = list_id };//si list_id est défini dans le corps de la requête, on modifie la liste de la carte
            await card.save();//On sauvegarde les modifications dans la base de données
            res.status(200).json(card);// on renvoie la carte modifiée au format json
        } catch(error) {
            res.status(500).json({ message: 'Erreur interne du serveur' });
        }
    },
    //Méthode pour supprimer une carte
    deleteCard: async (req, res) => {
        try {
            // Récupération de l'id de la carte depuis les paramètres de la requête
            const cardId = req.params.id;
            // On utilise la méthode findByPk() pour récupérer la carte avec l'id cardId
            const card = await Card.findByPk(cardId);
            // On utilise la méthode destroy() pour supprimer la carte de la base de données
            await card.destroy();
            // on renvoie un code 204 avec un message de succès
            res.status(204).json("L'élément est bien supprimé");
        } catch(error) {
            res.status(500).json({ message: 'Erreur interne du serveur' });
        }
    }
}
//export du module cardController
module.exports = cardController;