# Modèle Logique de Données (MLD)

CARTE ( <u>code_carte</u>, titre, couleur, position, #code_liste)

ETIQUETTE (<u> code_étiquette</u>, nom, couleur )

LISTE ( <u>code_liste</u>, nom, position )

POSSEDER ( <u>#code_carte</u>,  <u>#code_étiquette</u> )

## Comment le MLD a été construit à partir du MCD

- Toute entité du MCD devient une table du MLD.
- Les propriétés de ces entités deviennent les colonnes des tables.
- Le discriminant de l’entité devient une colonne comme les autres, simplement assortie d’une contrainte d’unicité.
- Si l’une des cardinalités maximum vaut 1, une clé étrangère(colonne préfixée par un #) est créée du côté de l’entité où se trouve le 1.Cette clé étrangère fera référence à l’identifiant dans la table associée.
- Si les deux cardinalités maximum sont N, la relation devient une table à part entière en relation avec les deux entités. On parle de table de liaison, d’association, dejonction ou de correspondance. Cette table de liaison contient 2 clefs étrangères vers les 2 tables à lier: par exemple, la table POSSEDER

