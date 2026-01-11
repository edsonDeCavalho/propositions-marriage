# 🚀 Guide de Déploiement Serveur

Ce guide explique comment déployer et gérer tous les projets de mariage sur le serveur.

## 📋 Prérequis

- Node.js et npm installés
- PM2 installé globalement (sera installé automatiquement par le script)

## 🛠️ Installation

1. **Installer les dépendances pour tous les projets :**
```bash
cd version1 && npm install && cd ..
cd version2 && npm install && cd ..
cd version3 && npm install && cd ..
cd version4 && npm install && cd ..
```

2. **Rendre les scripts exécutables :**
```bash
chmod +x start-all.sh stop-all.sh restart-all.sh free-ports.sh
```

## ▶️ Démarrage

**Pour démarrer tous les projets :**
```bash
./start-all.sh
```

Ce script va :
- **Libérer automatiquement les ports 90, 91, 92, 93** s'ils sont déjà utilisés
- Construire tous les projets (build)
- Démarrer tous les projets avec PM2
- Configurer PM2 pour démarrer au boot du serveur
- Les projets continueront à tourner même si vous fermez le terminal

## 🛑 Arrêt

**Pour arrêter tous les projets :**
```bash
./stop-all.sh
```

## 🔄 Redémarrage

**Pour redémarrer tous les projets :**
```bash
./restart-all.sh
```

## 🔌 Libération des Ports

**Pour libérer manuellement les ports 90, 91, 92, 93 :**
```bash
./free-ports.sh
```

Ce script est utile si vous avez des processus qui bloquent les ports et que vous voulez les libérer sans arrêter PM2. Le script `start-all.sh` libère automatiquement les ports avant de démarrer.

## 📊 Commandes PM2 Utiles

**Voir le statut de tous les projets :**
```bash
pm2 status
```

**Voir les logs en temps réel :**
```bash
pm2 logs
```

**Voir les logs d'un projet spécifique :**
```bash
pm2 logs version1
pm2 logs version2
pm2 logs version3
pm2 logs version4
```

**Redémarrer un projet spécifique :**
```bash
pm2 restart version1
```

**Arrêter un projet spécifique :**
```bash
pm2 stop version1
```

**Supprimer tous les processus :**
```bash
pm2 delete all
```

**Moniteur interactif :**
```bash
pm2 monit
```

## 🌐 Accès aux Projets

Une fois démarrés, les projets sont accessibles sur :

- **version1** : http://51.178.142.95:90 ou http://v1marige.shareprinto.com
- **version2** : http://51.178.142.95:91 ou http://v2marige.shareprinto.com
- **version3** : http://51.178.142.95:92 ou http://v3marige.shareprinto.com
- **version4** : http://51.178.142.95:93 ou http://v4marige.shareprinto.com

## 📝 Logs

Les logs sont sauvegardés dans le dossier `logs/` :
- `logs/version1-error.log` et `logs/version1-out.log`
- `logs/version2-error.log` et `logs/version2-out.log`
- `logs/version3-error.log` et `logs/version3-out.log`
- `logs/version4-error.log` et `logs/version4-out.log`

## 🔄 Mise à Jour

Pour mettre à jour les projets après des modifications :

1. **Arrêter les projets :**
```bash
./stop-all.sh
```

2. **Faire vos modifications dans le code**

3. **Redémarrer (le script rebuild automatiquement) :**
```bash
./start-all.sh
```

Ou simplement redémarrer sans rebuild :
```bash
pm2 restart all
```

## ⚠️ Notes Importantes

- Les projets tournent en mode **production** (preview) après un build
- PM2 redémarre automatiquement les projets en cas de crash
- Les projets démarrent automatiquement au boot du serveur grâce à `pm2 startup`
- Pour utiliser les ports 90-93, vous devrez peut-être utiliser `sudo` ou configurer les permissions système

## 🔧 Dépannage

**Si un projet ne démarre pas :**
```bash
pm2 logs [nom-du-projet]
```

**Pour voir les détails d'un processus :**
```bash
pm2 describe [nom-du-projet]
```

**Pour redémarrer PM2 complètement :**
```bash
pm2 kill
./start-all.sh
```

