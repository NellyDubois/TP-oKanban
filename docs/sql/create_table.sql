-- Création des tables SQL oKanban basées sur le MPD

-- Début de la transaction SQL: s'il y a une erreur entre BEGIN et COMMIT, on annule tout
BEGIN;

-- D'abord, on supprime les tables si elles existent déjà

DROP TABLE IF EXISTS "list", "card", "label", "card_has_label";

-- Ensuite, on crée les tables

CREATE TABLE "list" (
  "id" INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL,
  "position" INTEGER NOT NULL DEFAULT 1,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP, -- OU DEFAULT NOW()
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "card" (
  "id" INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "content" TEXT NOT NULL,
  "color" TEXT NOT NULL DEFAULT '#FFFFFF',
  "position" INTEGER NOT NULL DEFAULT 1,
  "list_id" INTEGER NOT NULL REFERENCES "list"("id") ON DELETE CASCADE, -- ON A UNE ASSOCIATION 11, ce champ est donc obligatoire, et on indique qu'il référence le champ id de al table list
  -- ON DELETE CASCADE permet de maintenir l'intégrité référentielle entre la table card et la table list. Si une liste est supprimée, toutes les cartes liées à elles seront automatiquement supprimée par le SGBD (Système de Gestion de Base de Donnée - postgres quoi !)
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "label" (
  "id" INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL,
  "color" TEXT NOT NULL DEFAULT '#FFFFFF',
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "card_has_label"(
  "card_id" INTEGER NOT NULL REFERENCES "card"("id") ON DELETE CASCADE,
  "label_id" INTEGER NOT NULL REFERENCES "label"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("card_id", "label_id") -- ou : UNIQUE ("card_id", "label_id") 
  -- On ajoute ici une contrainte d'unicité ou de clé primaire pour s'assurer qu'on ne puisse pas avoir une association en double entre un même label et une même carte.
);