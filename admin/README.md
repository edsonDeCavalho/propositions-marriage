# Admin — Confirmations de présence (Next.js)

Interface d’administration pour consulter les réponses RSVP du mariage (MongoDB) et les exporter en Excel.

## Prérequis

- Le **backend Kotlin** doit tourner et exposer `GET /api/rsvp` (par défaut `http://localhost:8080`).
- MongoDB doit être démarré (le backend s’y connecte).

## Lancer l’admin

1. **Démarrer le backend** (à la racine du projet) :
   ```bash
   cd backend && ./gradlew bootRun
   ```

2. **Configurer l’URL de l’API** (optionnel en dev) :
   ```bash
   cp .env.local.example .env.local
   # Éditer .env.local si besoin : NEXT_PUBLIC_RSVP_API_URL=http://localhost:8080
   ```

3. **Lancer l’admin** :
   ```bash
   cd admin && npm install && npm run dev
   ```
   L’admin est disponible sur **http://localhost:3000**.

## Build production

```bash
cd admin
npm run build
npm start
```

Définir `NEXT_PUBLIC_RSVP_API_URL` vers l’URL de votre API au build (ou dans `.env.production`).

## Fonctionnalités

- Liste de toutes les personnes (RsvpEntity) : date, nom, email, téléphone, présence, +1 (nom, relation), préférences alimentaires, enfants, message.
- Rafraîchissement manuel et automatique toutes les 30 s.
- **Exporter en Excel** : télécharge un fichier `.xlsx` avec toutes les données.
