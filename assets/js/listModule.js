const listModule = {
    // Méthode qui récupère toutes les listes via l'API et met à jour le conteneur de toutes les listes
    getListFromApi: async function() {
        // Récupération du conteneur des listes
        const listContainer = document.querySelector('#lists-container');
        // Vidage du conteneur pour supprimer toutes les données en HTML
        listContainer.innerHTML = '';
        // Utilisation de fetch pour faire une requête HTTP GET sur l'API
        const result = await fetch(`${utils.base_url}/lists`, { method: 'GET' });
        const response = await result.json(); // Transformation de la réponse en tableau JavaScript
        // Parcours du tableau de listes
        for (const list of response) {
            // Ajout de chaque liste dans le DOM
            listModule.makeListInDOM(list);
            // Parcours des cartes associées à chaque liste pour les afficher dans le DOM
            for (const card of list.cards) {
                cardModule.makeCardInDOM(card);
                // Affichage des labels associés à chaque carte
                for (const label of card.labels) {
                    labelModule.makeLabelInDOM(label, card.id);
                }
            }
        }
    },
    // Méthode lorsque le formulaire "Ajouter une liste" est soumis
    handleAddListForm: async function(event) {
        event.preventDefault(); // Blocage du rechargement de la page
        const formData = new FormData(event.target); // Récupération des données du formulaire
        await fetch(`${utils.base_url}/lists`, { method: 'POST', body: formData }); // Envoi des données via une requête POST à l'API pour créer une liste
        listModule.getListFromApi(); // Mise à jour du conteneur de toutes les listes dans le DOM
    },
    // Ajoute une liste dans le DOM
    makeListInDOM: function(list) {
        // Récupération de la template de liste
        const template = document.getElementById('template-list');
        const newList = document.importNode(template.content, true); // Copie du template
        // Attribution du titre de la liste
        newList.querySelector('h2').textContent = list.title;
        // Attribution de l'identifiant de la liste à l'input hidden
        newList.querySelector('#id_list').value = list.id;
        // Ajout d'un écouteur d'événement sur le titre pour afficher le formulaire d'édition
        newList.querySelector('h2').addEventListener("dblclick", listModule.displayEditList);
        // Ajout d'un écouteur d'événement sur le formulaire pour valider l'édition
        newList.querySelector('form').addEventListener("submit", listModule.validateEditForm);
        // Attribution de l'identifiant de la liste en tant que dataset
        newList.querySelector('.panel').dataset.listId = list.id;
        // Ajout d'un écouteur d'événement sur le bouton "+" pour ajouter une carte
        newList.querySelector('.button-add-card').addEventListener('click', cardModule.showAddCardModal);
        listModule.sortable(newList.querySelector('.panel-block')); // Activation du drag and drop pour les cartes
        const listContainer = document.querySelector('#lists-container');
        listContainer.append(newList); // Ajout de la nouvelle liste au conteneur
    },
    // Méthode qui traite le formulaire d'édition de liste
    validateEditForm: async function(event) {
        event.preventDefault(); // Blocage du rechargement de la page
        const formData = new FormData(event.target); // Récupération des données du formulaire
        const id = formData.get("list-id"); // Récupération de l'identifiant de la liste à éditer
        try {
            const response = await fetch(`${utils.base_url}/lists/` + id, {
                method: 'PATCH',
                body: formData
            });
            if (!response.ok) {
                alert('Erreur dans la requête');
            }
            listModule.getListFromApi(); // Mise à jour du conteneur de toutes les listes dans le DOM
        } catch(error) {
            alert('Erreur : ' + error);
        }
    },
    // Affiche la modal pour ajouter une liste
    showAddListModal: function() {
        const modal = document.getElementById("addListModal"); // Récupération de la modal
        modal.classList.add('is-active'); // Ajout de la classe pour afficher la modal
    },
    // Affiche le formulaire pour modifier le titre d'une liste
    displayEditList: function(event) {
        event.target.classList.add('is-hidden'); // Masquage du titre de la liste
        //l'élément suivant du même niveau hiérarchique dans le DOM que l'élément ciblé (h2)
        event.target.nextElementSibling.classList.remove("is-hidden"); // Affichage du formulaire d'édition
    },
    // Active le drag and drop pour les cartes
    //Fonction sortable prend le paramètre list
    sortable: list => {
        new Sortable(list, { //initialisation d'un objet Sortable
            animation: 150, //durée de l'animation en millisecondes lors du déplacement des éléments.
            group: "elementGroup", //spécifie à quel groupe cet élément appartient pour permettre le déplacement d'éléments entre différentes listes du même groupe
            ghostClass: 'blue-background-class',//classe CSS à appliquer à l'élément fantôme (l'élément en cours de déplacement) pendant le déplacement
            onEnd: cardModule.sortInDatabase //fonction callback appelée lorsque le glisser-déposer est terminé (réarrangement des cartes et sauvegarde dans la base de données)
        });
    }
}