// Import des modèles Label et Card
const { Label, Card }= require('../models')

// Définition de l'objet labelController
const labelController = {
    // Méthode pour récupérer tous les labels
    getAllLabels: async (req, res) => {
        try {
            const labels = await Label.findAll();// on utilise la méthode findAll() (héritée de la classe Model de Sequelize) du modèle Label pour récupérer tous les labels
            res.status(200).json(labels);// on renvoie les labels au format json
        } catch(error) {
            res.status(500).json({ message: 'Erreur interne du serveur'});
        }
    },
    // Méthode pour associer un label (déjà existant) à une carte (déjà existante)
    associateLabelToCard: async (req, res) => {
        try {
            // On récupère l'id du label depuis le corps de la requête
            const labelId = req.body.Label_id; 
            // On récupère l'id de la carte depuis les paramètres de la requête
            const cardId = req.params.id;
            // On utilise la méthode findByPk() (héritée de la classe Model de Sequelize) du modèle Label pour récupérer le label avec l'id labelId
            let Label = await Label.findByPk(labelId); 
            // On utilise la méthode findByPk() du modèle Card pour récupérer la carte avec l'id cardId
            let card = await Card.findByPk(cardId); 
            await card.addLabel(Label); // On associe Label à card grâce à la méthode addLabel() (générée automatiquement par Sequelize) qui ajoute une association entre deux éléments
            // On récupère la carte à jour avec les labels associés 
            card = await Card.findByPk(cardId, {include: 'Labels'}); 
            res.status(200).json(card);
        } catch (error) {
            res.status(500).json({ message: 'Erreur interne du serveur'});
        }
    },
    //Méthode pour dissocier un label (déjà existant) d'une carte (déjà existante)
    removeLabelFromCard: async(req, res) => {
        try {
            // On récupère l'id de la carte et l'id du label depuis les paramètres de la requête
            const { card_id, label_id } = req.params;
            // On utilise la méthode findByPk() du modèle Card pour récupérer la carte avec l'id card_id
            let card = await Card.findByPk(card_id);
            // On utilise la méthode findByPk() du modèle Label pour récupérer le label avec l'id label_id
            let Label = await Label.findByPk(label_id);
            // On dissocie Label de card grâce à la méthode removeLabel() (générée automatiquement par Sequelize) qui supprime une association entre deux éléments
            await card.removeLabel(Label); 
            // On récupère la carte à jour avec les labels associés
            card = await Card.findByPk(card_id, {include: 'Labels'}); 
            res.status(200).json(card)            
        } catch (error) {
            res.status(500).json({ message: 'Erreur interne du serveur'});
        }
    },
    //Méthode pour récupérer un label par son id
    getOneLabel: async (req, res) => {
        try { //On récupère l'id du label depuis les paramètres de la requête
            const labelId = req.params.id;
            //On utilise la méthode findByPk() pour récupérer le label avec l'id labelId avec les cartes associées
            const label = await Label.findByPk(labelId, {
                include: 'cards'
            });
            if(!Label) {
                res.status(404).json('Can not find Label with id ' + labelId);
            } else {
                res.status(200).json(Label);
            }
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },
     // Méthode pour associer un label à une carte (U de CRUD)
     modifyLabel: async (req, res) => {
        try {
            // On récupère l'id du label depuis les paramètres de la requête
            const labelId = req.params.id;
            // On récupère les données du label depuis le corps de la requête
            const { name, color } = req.body;
            let Label = await Label.findByPk(labelId); // on utilise la méthode findByPk() (héritée de la classe
            // Model de Sequelize) du modèle Label pour récupérer le label avec l'id labelId 
            //Si le label n'existe pas, on renvoie un code 404 avec un message d'erreur
            if (!Label) {
                res.status(404).json('Can not find Label with id : ' + labelId);
            } else {
                //Si le label existe, on modifie ses données avec les données du corps de la requête
                if (name) { Label.name = name }
                if (color) { Label.color = color }
                //On sauvegarde les modifications dans la base de données
                await Label.save();
                res.status(200).json(Label);// on renvoie le label modifié au format json
            }
        } catch (error) { //Si une erreur se produit, on renvoie un code 500 avec un message d'erreur
            console.log(error);
            res.status(500).json(error);
        }
    },
    // Méthode pour supprimer un label (D de CRUD)
    deleteLabel: async (req, res) => {
        try { //On récupère l'id du label depuis les paramètres de la requête
            const labelId = req.params.id;
            //On utilise la méthode findByPk() pour récupérer le label avec l'id labelId
            const label = await Label.findByPk(labelId);
            //Si le label n'existe pas, on renvoie un code 404 avec un message d'erreur
            if(!Label){
                res.status(404).json('Can not find Label with id : ' + labelId);
            } else { //Si le label existe, on le supprime de la base de données
                await Label.destroy();
                res.status(200).json('OK');// on renvoie un message de succès
            }
        } catch (error) {//Si une erreur se produit, on renvoie un code 500 avec un message d'erreur
            console.log(error);
            res.status(500).json(error);
        }
    },
    // Méthode pour créer un nouveau label (C de CRUD)
    createLabel: async (req, res) => {
        try {
            // On récupère les données du label depuis le corps de la requête
            const { name, color } = req.body;
            //initialisation d'un tableau pour stocker les erreurs
            let bodyErrors = [];
            //si name ou color est vide, on ajoute un message d'erreur au tableau bodyErrors
            if(!name) { bodyErrors.push('name can not be empty !') }
            if(!color) { bodyErrors.push('color can not be empty !') }

            //si le tableau bodyErrors n'est pas vide, on renvoie un code 422 avec le tableau bodyErrors
            //Ce code d'erreur est utilisé lorsque le serveur comprend la requête client, 
            //mais celle-ci ne peut pas être traitée en raison d'une erreur dans les données fournies. 
            if(bodyErrors.length) {
                res.status(422).json(bodyErrors);
            } else { //sinon, on crée un nouveau label et on le sauvegarde dans la base de données
                let newLabel = Label.build({ title, color });
                await newLabel.save(); 
                res.status(200).json(newLabel);
                //j'ai choisi d'utiliser les méthodes build() et save() pour créer et sauvegarder un 
                //nouveau label dans la base de données plutôt que create() par prudence. En effet, 
                //avec build et save, on peut vérifier les données avant de les sauvegarder dans la base de données.
            }
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },
}
//Export de l'objet labelController
module.exports = labelController;