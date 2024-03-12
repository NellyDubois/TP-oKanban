//Définition du module LabelModule
const labelModule = {
    // Fonction qui crée un Label dans le DOM et l'associe à une carte
    makeLabelInDOM: function(label, id_card) {
        // Création de l'élément span pour représenter le Label
        const labelDom= document.createElement('span');
        // Attribution de l'identifiant du Label en tant que dataset
        labelDom.dataset.labelId = label.id;
        // Attribution du texte du Label
        labelDom.textContent = label.title;
        // Modification de la couleur du Label
        labelDom.style.backgroundColor = label.color;
        // Ajout de la classe "Label" au span
        labelDom.classList.add("label");
        // Ajout d'un écouteur d'événement double clic pour dissocier le Label de la carte
        labelDom.addEventListener("dblclick", labelModule.dissociateLabelFromCard);
        // Récupération de la carte dans le DOM où le Label sera placé
        const card = document.querySelector(`.box[data-card-id="${id_card}"]`);
        card.querySelector('.labels').append(labelDom);
    },
    // Fonction qui dissocie un Label d'une carte
    dissociateLabelFromCard: async function(event) {
        // Récupération de l'identifiant de la carte
        const cardId = event.target.closest('.box').dataset.cardId;
        // Récupération de l'identifiant du Label
        const labelId = event.target.dataset.labelId;
        // Confirmation de la suppression de l'association
        if (confirm("Voulez-vous vraiment supprimer cette association ?")) {
            // Dissociation du Label de la carte via une requête DELETE à l'API
            await fetch(`${utils.base_url}/cards/${cardId}/Label/${labelId}`, {
                method: 'DELETE'
            });
            // Mise à jour des listes dans le DOM après la suppression
            listModule.getListFromApi();
        }
    },
    // Fonction qui traite le formulaire pour associer un Label à une carte
    associateLabelToCard: async function(event) {
        event.preventDefault(); // Blocage du rafraîchissement de la page
        // Récupération des données du formulaire
        const formData = new FormData(event.target);
        const cardId = formData.get("card_id");
        // Envoi des données via une requête POST à l'API pour associer le Label à la carte
        const response = await fetch(`${utils.base_url}/cards/${cardId}/Label`, {
            method: 'POST',
            body: formData
        });
        // Fermeture de la modal après soumission du formulaire
        utils.hideModals();
        // Mise à jour des listes, cartes et Labels dans le DOM
        listModule.getListFromApi();
    },
    // Fonction qui affiche la modal pour associer un Label à une carte
    showAssociateLabelModal: async function(event) {
        // Récupération de la carte cliquée
        const card = event.target.closest('.box');
        // Récupération de l'identifiant de la carte
        const idCard = card.dataset.cardId;
        // Récupération de la modal pour afficher les Labels
        const modal = document.querySelector("#addLabelToCardModal");
        // Attribution de l'identifiant de la carte à l'input hidden dans la modal
        modal.querySelector('input[name="card_id"]').value = idCard;
        // Récupération de tous les Labels via l'API
        const response = await fetch(`${utils.base_url}/labels`, { method: 'GET' });
        const labels = await response.json();
        const select = modal.querySelector("#select-Labels");
        select.innerHTML = '';
        // Affichage des Labels dans la liste déroulante
        for (const label of labels) {
            const option = document.createElement('option');
            option.textContent = label.title;
            option.value = label.id;
            select.append(option);
        }
        // Affichage de la modal
        modal.classList.add('is-active');
    }
}