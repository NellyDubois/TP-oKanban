# Etapes du projet oKanban

## Expression de besoins

- /docs/conception/user stories

## Conception

- /docs/conception/MCD
- /docs/conception/MLD
- /docs/conception/MPD
- /docs/conception/dictionnaire_donnees.csv

## Création de la BDD

- /sql/create_table.sql
- /sql/seeding.sql
- /sql/init_DB.md

## Connexion client à la BDD

- installation des modules dotenv, sequelize,
  <!-- pas besoin d'importer pg et pgstore (pour une meilleure sécurité (stockage des sessions utilisateur dans une base de données PostgreSQL plutôt que dans la mémoire du serveur). Sequelize encapsuls les foncionnalités de pg -->
  
  ```bash
  npm install sequelize dotenv
  ```

- définition PGURL dans .env
- app/sequelize-client.js

## Création des Models

- /app/models/List.js
- /app/models/Card.js
- /app/models/Label.js

## Création des associations

- /app/models/index.js

## Création des controllers

- /app/controllers/cardController.js
- /app/controllers/listController.js
- /app/controllers/labelController.js
  