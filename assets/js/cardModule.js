// Définition du module cardModule
const cardModule = {

    // Méthode qui s'exécute lors de la soumission du formulaire pour ajouter une carte
    handleAddCardForm: async function(event) {
        event.preventDefault(); // On arrête le comportement par défaut de l'événement
        // On récupère les informations du formulaire
        const formData = new FormData(event.target);
        // On POST la carte via l'API avec les données du formulaire
        await fetch(`${utils.base_url}/cards`, {
            method: 'POST', // Requête en méthode POST
            body: formData // On passe les données du formulaire
        });
        // Une fois les données de la carte postées, on va mettre à jour toutes nos listes
        listModule.getListFromApi();
        // On ferme les modales
        utils.hideModals();
    },

    // Méthode qui crée une carte dans le DOM
    makeCardInDOM: function(card) {
        // On récupère la template de carte
        const template = document.getElementById('template-card');
        // On crée une copie de la template
        const newCard = document.importNode(template.content, true);
        // On change les valeurs, notamment le nom de la carte
        newCard.querySelector('.card-name').textContent = card.content;
        // On attribue un identifiant unique à la carte
        newCard.querySelector(".box").dataset.cardId = card.id;
        // On attribue à l'input caché (hidden) id_card la valeur de l'id de la carte
        newCard.querySelector("#id_card").value = card.id;
        // On détermine la couleur du fond de la carte
        newCard.querySelector(".box").style.backgroundColor = card.color;

        // On place des écouteurs d'événements sur les boutons de la carte (éditer, supprimer, associer un label)
        newCard.querySelector('.edit-card').addEventListener("click", cardModule.displayEditCard);
        newCard.querySelector('.delete-card').addEventListener("click", cardModule.deleteCard);
        newCard.querySelector('.associate-label').addEventListener("click", labelModule.showAssociateLabelModal);

        // Insertion de la carte dans la bonne liste
        const rightList = document.querySelector(`[data-list-id="${card.list_id}"]`);
        rightList.querySelector('.panel-block').append(newCard);
    },

    // Méthode qui affiche le formulaire pour modifier le titre d'une carte
    displayEditCard: function(event) {
        const card = event.target.closest('.box'); // On récupère la carte la plus proche
        card.querySelector('.card-name').classList.add("is-hidden"); // On cache le nom actuel de la carte
        card.querySelector('form').classList.remove("is-hidden"); // On affiche le formulaire pour modifier la carte
        card.querySelector('form').addEventListener('submit', cardModule.validateEditCard); // On ajoute un écouteur d'événement sur le formulaire
    },

    // Méthode qui supprime une carte
    deleteCard: async function(event) {
        if (confirm('Êtes-vous sûr de vouloir supprimer la carte ?')) { // On demande confirmation à l'utilisateur
            const card = event.target.closest('.box'); // On récupère toute la carte
            const form = card.querySelector('form'); // On récupère le formulaire
            const formData = new FormData(form); // On crée un objet FormData avec les données du formulaire
            const id = formData.get("card-id"); // On récupère l'id de la carte
            await fetch(`${utils.base_url}/cards/` + id, { method: 'DELETE' }); // On envoie une requête DELETE pour supprimer la carte
            listModule.getListFromApi(); // Une fois la carte supprimée, on met à jour toutes les listes
        }
    },

    // Méthode qui valide la modification d'une carte
    validateEditCard: async function(event) {
        event.preventDefault();
        const formData = new FormData(event.target); // On récupère les données du formulaire
        const id = formData.get("card-id"); // On stocke l'id de la carte
        try {
            const response = await fetch(`${utils.base_url}/cards/` + id, {
                method: 'PATCH',
                body: formData
            });
            // Si la requête échoue
            if (!response.ok) {
                alert('Erreur dans la requête');
            }
            // Une fois la requête effectuée, on affiche les dernières modifications sur le DOM
            listModule.getListFromApi();
        } catch(error) {
            alert('Erreur : ' + error);
        }
    },

    // Méthode qui affiche la modal pour créer une carte
    showAddCardModal: function(event) {
        const listElement = event.target.closest('.panel'); // On récupère l'élément le plus proche qui a pour classe panel
        const listId = listElement.dataset.listId; // On récupère l'ID de la liste
        const modal = document.getElementById('addCardModal'); // On récupère la modal pour ajouter une carte
        const input = modal.querySelector('input[name="list_id"]'); // On récupère l'input qui a pour nom "list_id"
        input.value = listId; // On attribue la valeur de l'ID de la liste à cet input
        modal.classList.add('is-active'); // On affiche la modal
    },

    // Méthode qui trie les cartes dans la base de données après un déplacement
    sortInDatabase: async function() {
        const allCards = document.querySelectorAll(".box"); // On récupère toutes les cartes de la page
        let i = 0; // Initialisation du compteur
        for (const card of allCards) {
            const idCard = card.dataset.cardId; // On récupère l'ID de la carte
            i++; // Incrémentation du compteur
            const formData = new FormData(); // On crée un objet FormData pour envoyer la nouvelle position de la carte à la base de données
            formData.append("position", i); // On ajoute la position à l'objet FormData
            const listId = card.closest(".panel").dataset.listId; // On récupère l'ID de la liste
            formData.append("list_id", listId); // On ajoute l'ID de la liste à l'objet FormData
            await fetch(`${utils.base_url}/cards/` + idCard, {
                method: 'PATCH', // Méthode PATCH pour modifier la carte
                body: formData // Les données à envoyer
            });
        }
    }
};