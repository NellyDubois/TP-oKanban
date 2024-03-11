# Initialisation de la base de données

## Connexion à la base avec psql en tant que super utilisateur postgres

```bash
sudo -i -u postgres psql;
```

## Création de l'utilisateur "admin_okanban" avec le mot de passe "okanban"

```bash
CREATE USER admin_okanban WITH PASSWORD 'okanban';
```
<!-- mdp pas sécurisé mais nous sommes en local -->

## Création de la base de données "okanban" et le propriétaire "admin_okanban"

```bash
CREATE DATABASE okanban WITH OWNER admin_okanban ;
```

## Se connecter avec l'utilisateur "admin_okanban"

```bash
psql -U admin_okanban -d okanban ;
```

## Création des tables

```bash
psql -d okanban -p 5433 -f ./create_tables.sql;
```

## Exécution du seeding des tables

```bash
psql -U okanban_u -d okanban_db -f ./seeding.sql;
```
