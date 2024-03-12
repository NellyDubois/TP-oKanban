const utils = {
    // Fonction pour fermer une modale active
    closeModals: function(){
      // On récupère tous les éléments avec la classe .modal.is-active  
      const activeModals = document.querySelectorAll('.modal.is-active');
      //pour chaque élément avec la classe .modal.is-active
      for (const activeModal of activeModals){
        // on retire la classe .is-active
        activeModal.classList.remove('is-active');
      }
    },
    base_url: 'http://localhost:3000' // On stocke l'URL de base de l'API dans une variable pour le fetch
};
