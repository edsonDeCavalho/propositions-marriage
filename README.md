# Mariage Yannick & Lydia

Site web du mariage — **version 1** uniquement.

## Structure

- **version1/** — Site principal (React + Vite), port 90
- **server/** — API RSVP (enregistrement des confirmations en CSV), port 3001
- **admin/** — Interface d’administration (liste RSVP, export Excel)
- **backend/db/** — Connexion MongoDB (optionnel)

## Démarrer le site

```bash
./start-all.sh
```

Build la version 1 et lance le site avec PM2 sur le port 90.

En développement (sans PM2) :

```bash
cd version1 && npm install && npm run dev
```

## Déploiement

Après `git push`, sur le serveur : `./start-all.sh` (ou `pm2 restart mariage` après un build).

Les dossiers version2, version3, version4 restent dans le dépôt mais ne sont plus utilisés ni démarrés par les scripts.
