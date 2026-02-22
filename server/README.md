# Serveur RSVP — Mariage Yannick & Lydia

API minimaliste qui enregistre les confirmations de présence en CSV et les expose pour l’admin.

## Installation

```bash
npm install
```

## Lancement

```bash
npm run dev
```

Le serveur écoute sur **http://localhost:3001**.

## Endpoints

- **POST /api/rsvp** — Enregistre une confirmation. Body JSON : `name` ou `nom`, `email`, `telephone`, `attendance` ou `presence`, `plusUn`, `dietary` ou `preferencesAlimentaires`, `hasEnfants`, `enfants` (tableau), `message`, `version` (optionnel). Chaque enregistrement est ajouté à `admin/data/rsvp-submissions.csv`.

- **GET /api/rsvp** — Retourne la liste de toutes les confirmations (lecture du CSV en JSON).

## Fichier CSV

Le fichier est créé automatiquement à : `admin/data/rsvp-submissions.csv`.  
Colonnes : date, version, nom, email, telephone, presence, plusUn, preferencesAlimentaires, aDesEnfants, enfants (JSON), message.
