-- Création de données de test

BEGIN;

INSERT INTO "list" ("name", "position")
VALUES ('BACKLOG', 1),
       ('TO DO', 2),
       ('IN PROGRESS', 3),
       ('DONE', 4);

INSERT INTO "card" ("content","position","color", "list_id")
VALUES ('Concevoir le modèle de données', 1,'#fff696', 1),
       ('Créer les tables', 2,'#c1e7ff', 1),
       ('Insérer des données de test', 1,'#ff96ff', 2);

INSERT INTO "label" ("name", "color")
VALUES ('Urgent', 'red'),
       ('priorité normale', 'orange');

INSERT INTO "card_has_label" ("card_id", "label_id")
VALUES (1,1), -- La carte 1 aura l'étiquette' 1 "Urgent"
       (1,2), -- La carte 1 aura l'étiquette 2 "priorité normale"
       (2,2), -- La carte 2 aura l'étiquette 2 "priorité normale"
       (3,1); -- La carte 3 aura l'étiquette 1 "Urgent"

COMMIT;