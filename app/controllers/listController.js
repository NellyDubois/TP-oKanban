// Import du modèle List
const { List } = require('../models'); 

// Définition du module listController
const listController = {
    // Méthode pour récupérer toutes les listes
    getAllLists: async (req, res) => {
        try {// On utilise la méthode findAll() (héritée de la classe Model de Sequelize) du modèle List pour récupérer toutes les listes
            const data = await List.findAll({
                // pour inclure les cartes et les labels associés à chaque liste
                include: {
                    association: 'cards',
                    include: 'labels'
                },
                // pour trier les listes par position ascendante et les cartes par position ascendante
                order: [                         
                    ['position', 'ASC'],         
                    ['cards', 'position', 'ASC'] 
                ]
            });
            res.status(200).json(data); // on renvoie les listes au format json
        }
        catch(error) {
            res.status(500).json({ message: 'Erreur interne du serveur'});
        }
    },
    // Méthode pour créer une liste 
    createList: async(req, res) => {
        try {
            // On recupere title et position du body de la requête grâce a la destructuration
            const { title, position } = req.body;
            // On crée une liste avec les données récupérées avec la méthode create() (héritée de la classe Model de Sequelize) du modèle List
            const result = await List.create({title, position});
            res.status(201).json(result);
        }
        catch(error) {
            res.status(500).json({ message: 'Erreur interne du serveur'});
        }
    },
    //Méthode pour récupérer une liste par son id
    getOneList: async(req, res) => {
        try {
            // Récupération de l'id de la liste depuis les paramètres de la requête
            const listId = req.params.id;
            // On utilise la méthode findByPk() pour récupérer la liste avec l'id listId
            const list = await List.findByPk(listId)
            res.status(200).json(list);// on renvoie la liste au format json
        }
        catch(error) {
            res.status(500).json({ message: 'Erreur interne du serveur'});
        }
    },
    //Méthode pour modifier une liste
    modifyList: async(req, res) => {
        try {
            // Récupération de l'id de la liste depuis les paramètres de la requête
            const listId = req.params.id;
            // On utilise la méthode findByPk() pour récupérer la liste avec l'id listId
            const list = await List.findByPk(listId)
            // On récupère les données du titre et de la position depuis le corps de la requête
            const { title, position } = req.body;
            if (title) { // si title existe dans le body, on modifie le titre de la liste
                list.title = title;
            } 
            if (position) { // si position existe dans le body, on modifie la position de la liste
                list.position = position;
            }
            // enregistrement des modifications de la liste dans la base de données
            await list.save();
            res.status(200).json(list);// on renvoie la liste modifiée au format json
        }
        catch(error){
            res.status(500).json({ message: 'Erreur interne du serveur'});
        }
    },
    //Méthode pour supprimer une liste
    deleteList: async(req, res) => {
        try {// Récupération de l'id de la liste depuis les paramètres de la requête
            const listId = req.params.id;
            // On utilise la méthode findByPk() pour récupérer la liste avec l'id listId
            const list = await List.findByPk(listId)
            // Suppression de la liste de la base de données avec la méthode sequelize destroy()
            await list.destroy(); 
            // on renvoie un code 204 avec un message de succès
            res.status(204).json("OK, l'élément est bien supprimé"); 
        }
        catch(error) {
            res.status(500).json({ message: 'Erreur interne du serveur'});
        }
    }
}
//export du module listController
module.exports = listController;