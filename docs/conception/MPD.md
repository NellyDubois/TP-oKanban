# Modèle Physique des Données

**list** (id INTEGER PK, name TEXT, position INTEGER, created_at TIMESTAMPTZ, updated_at TIMESTAMPTZ)

**card** (id INTEGER PK, content TEXT, color TEXT, position INTEGER, list_id INTEGER FK list(id), created_at TIMESTAMPTZ, updated_at TIMESTAMPTZ)

**label** (id INTEGER PK, name TEXT, color TEXT, created_at TIMESTAMPTZ, updated_at TIMESTAMPTZ)

**card_has_label** (card_id INTEGER FK card(id), label_id INTEGER FK tag(id), created_at TIMESTAMPTZ, UNIQUE : (card_id, label_id))

## Comment le MPD a été construit à partir du MLD

- J'ai traduit le nom des tables et des champs en anglais
- Les discrimnants deviennent des id 
- Le nom des clés étrangères intègre le nom de la table
- On spécifie le type de données pour chaque champ
- On ajoute les champs techniques created_at, updated_at
- Enfin on spécifie les contraintes d'unicité, de clé primaire et de clé étrangère


