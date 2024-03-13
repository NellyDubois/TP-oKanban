# Etapes du projet oKanban

## BACK-END

Pour développer le back-end de l'application oKanban, j'ai suivi plusieurs étapes :

### Expression de besoins

J'ai commencé par exprimer les besoins de l'application à travers des user stories, définissant ainsi les fonctionnalités attendues:

- /docs/conception/user stories

### Conception

En utilisant des outils comme le modèle conceptuel de données (MCD), le modèle logique de données (MLD) et le modèle physique de données (MPD), j'ai conçu la structure de la base de données. J'ai également créé un dictionnaire de données pour détailler les différentes entités et leurs attributs:

- /docs/conception/MCD
- /docs/conception/MLD
- /docs/conception/MPD
- /docs/conception/dictionnaire_donnees.csv

### Création de la BDD

J'ai écrit des scripts SQL pour initialiser la structure de la base de données et y insérer des données de départ, facilitant ainsi le démarrage de l'application avec une base de données fonctionnelle:

- /sql/create_table.sql
- /sql/seeding.sql
- /sql/init_DB.md

### Connexion client à la BDD

J'ai configuré l'accès à la base de données depuis l'application Node.js en utilisant Sequelize. Cela m'a permis d'établir une connexion sécurisée avec la base de données et d'effectuer des opérations de lecture et d'écriture:

- installation des modules dotenv, sequelize,
  <!-- pas besoin d'importer pg et pgstore (pour une meilleure sécurité (stockage des sessions utilisateur dans une base de données PostgreSQL plutôt que dans la mémoire du serveur). Sequelize encapsuls les foncionnalités de pg -->
  
  ```bash
  npm install sequelize dotenv
  ```

- définition PGURL dans .env
- app/sequelize-client.js

### Création des Models

J'ai créé des modèles pour chaque entité de l'application (List, Card, Label) en définissant leurs attributs et leurs relations. Ces modèles servent à représenter les données dans l'application et à effectuer des opérations CRUD (Create, Read, Update, Delete) sur ces données:

- /app/models/List.js
- /app/models/Card.js
- /app/models/Label.js

### Création des associations

J'ai défini les relations entre les différentes entités de l'application en utilisant Sequelize, ce qui m'a permis de naviguer facilement entre les entités et d'effectuer des opérations sur les données liées:

- /app/models/index.js

### Création des controllers

J'ai créé des contrôleurs pour chaque entité de l'application (ListController, CardController, LabelController) afin de gérer les requêtes HTTP et les opérations sur les données. Ces contrôleurs contiennent les méthodes pour traiter les différentes actions telles que la récupération de toutes les cartes d'une liste ou la création d'une nouvelle carte:

- /app/controllers/cardController.js
- /app/controllers/listController.js
- /app/controllers/labelController.js
  
### Création du router

J'ai créé un routeur pour définir les routes de mon API et associer chaque route à un contrôleur spécifique. Le routeur écoute les requêtes HTTP entrantes et les dirige vers les méthodes appropriées des contrôleurs.

- /app/router.js

### index.js

Enfin, j'ai créé un fichier index.js pour démarrer mon serveur Express. Ce fichier configure Express pour utiliser le routeur, gérer les requêtes HTTP et démarrer le serveur sur un port spécifié.

--> pour lancer le back:

```bash
node index.js
```

## FRONT

Concernant le front-end, l'application utilise des fichiers statiques (HTML, CSS, JavaScript) pour construire l'interface utilisateur.
Le front-end est appelé depuis le dossier public 'assets' du back-end, ce qui signifie que le back-end sert également les fichiers statiques du front-end.

Initialement, le back-end était configuré pour autoriser les requêtes CORS depuis le front qui tournait sur un autre serveur
grâce à :

```js
app.use(cors('5174'));
```

Cependant, puisque le front-end est sur le même serveur que le back-end, il n'y a pas de problème de cross-origin

En ce qui concerne le front-end:

- index.js va chercher les fichiers statiques via:
  
  ```js
  app.use(express.static('assets'));
  ```

- le fichier html appelle les fichiers css et les scripts JS 

- app.js est le script qui initialise l'application, au moment du chargement de la page. Il place notamment tous les écouteurs d'vénements de type clic pour ouvrir et fermer les modales.
  