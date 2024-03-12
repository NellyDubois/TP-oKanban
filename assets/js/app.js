//Définition de l'objet app
const app={

    // Fonction d'initialisation de l'app, appelée au chargement de la page
    init: function () {
      // Ecoute tous les événements grâce à la méthode addListenerToActions()
      app.addListenerToActions();
  
      // Appel de la méthode getListFromApi() qui va mettre a jour toutes mes listes
      listModule.getListFromApi();
    },
    // Fonction pour ajouter des écouteurs d'événments sur différents éléments de la page (tels que les boutons pour ajouter une liste ou une carte
    addListenerToActions: function () {
      // Sélection du bouton "Créer une liste"
      const addListButton = document.getElementById('addListButton');
      // Ajout d'un écouteur d'événement sur le bouton
      addListButton.addEventListener('click', listModule.showAddListModal) 
  
      // Ajout d'un écouteur d'événement sur tous les boutons '+' pour ajouter une carte à une liste
      const addCardButton = document.querySelectorAll(".button-add-card");
      for (const button of addCardButton) { // On boucle sur tous les boutons
        // Ajout d'un écouteur d'événement sur le bouton
        button.addEventListener('click', cardModule.showAddCardModal);
      }
  
      // Récupération du formulaire "associer un label à une carte"
      const associateLabelForm = document.querySelector("#addLabelToCardModal form")
      // Ajout d'un écouteur d'événement au traitement du formulaire pour ajouter un label à une carte
      associateLabelForm.addEventListener("submit", labelModule.associateLabelToCard)
  
      // Sélection de tous les boutons pour fermer les modales
      const closeModalButtons = document.querySelectorAll('.close')
        // Ajout d'écouteurs d'événement sur tous les boutons close pour masquer les modales      
        for (const button of closeModalButtons) {
        button.addEventListener('click', utils.hideModals); 
      }
  
      // Sélection du formulaire "ajouter une liste"
      const addListForm = document.querySelector("#addListModal form") // Ici on selectionne le <form> qu'il y a dans la div qui a pour id addListModal
      // Ajout d'un écouteur d'événement sur la soumission du formulaire "ajouter une liste"
      addListForm.addEventListener("submit", listModule.handleAddListForm);

      // Récupération du formulaire pour ajouter une carte
      const addCardForm = document.querySelector('#addCardModal form');
      // Ajout d'un écouteur d'événement sur la soumission du formulaire "ajouter une carte"
      addCardForm.addEventListener("submit", cardModule.handleAddCardForm);
    }
};

// Accrochage d'un écouteur d'événement sur le document : quand le chargement de la page est terminé, on lance app.init
document.addEventListener('DOMContentLoaded', app.init);


