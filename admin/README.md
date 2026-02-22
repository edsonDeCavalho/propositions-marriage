# Admin — Confirmations de présence

Interface d’administration pour consulter les réponses RSVP du mariage et les exporter en Excel.

## Lancer l’admin

1. **Démarrer le serveur RSVP** (à la racine du projet) :
   ```bash
   cd server && npm install && npm run dev
   ```
   Le serveur tourne sur `http://localhost:3001` et enregistre les saisies dans `admin/data/rsvp-submissions.csv`.

2. **Lancer l’admin** :
   ```bash
   cd admin && npm install && npm run dev
   ```
   L’admin est disponible sur `http://localhost:5174`.

En développement, les appels à `/api/rsvp` sont proxyfiés vers le serveur (voir `vite.config.js`).

## Fonctionnalités

- Liste des confirmations (date, nom, email, téléphone, présence, +1, préférences alimentaires, enfants, message).
- Rafraîchissement manuel et auto toutes les 30 s.
- **Exporter en Excel** : télécharge un fichier `.xlsx` avec toutes les données.

## Production

- Définir `VITE_RSVP_API_URL` vers l’URL de votre API (ex. `https://api.example.com`) au build.
- Les sites (version1, version2, version3) doivent aussi avoir `VITE_RSVP_API_URL` pointant vers la même API.
