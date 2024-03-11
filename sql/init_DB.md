# Initialisation de la base de données

## Connexion à la base avec psql en tant que super utilisateur postgres

```bash
sudo -i -u postgres psql;
```

## Création de l'utilisateur "admin_okanban" avec le mot de passe "okanban"

```bash
# DROP USER okanban; si on veut supprimer le user s'il existe déjà
CREATE USER admin_okanban WITH PASSWORD 'okanban';
```
<!-- mdp pas sécurisé mais nous sommes en local -->

## Création de la base de données "okanban" et le propriétaire "admin_okanban"

```bash
# DROP DATABASE okanban; si on veut supprimer la BDD si elle existe déjà
CREATE DATABASE okanban WITH OWNER admin_okanban ;
```

## Se déconnecter (du super-utilisateur postgres)
```bash
Ctrl D
```

## Se connecter avec l'utilisateur "admin_okanban" pour exécuter le script de création des tables

```bash
psql -U admin_okanban -d okanban -f ./sql/create_table.sql;
#on ne spécifie pas -p 5432 car c'est le port psql par défaut
# entrer le mot de passe
```

## Exécution du seeding des tables

```bash
psql -U admin_okanban -d okanban -f ./sql/seeding.sql;
```
