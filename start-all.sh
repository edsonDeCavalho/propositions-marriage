#!/bin/bash

# Script pour démarrer tous les projets de mariage
# Ce script build et démarre tous les projets en mode production avec PM2

set -e

# Fonction pour tuer un processus utilisant un port spécifique
kill_port() {
    local port=$1
    if command -v lsof &> /dev/null; then
        # macOS et Linux avec lsof
        local pid=$(lsof -ti:$port 2>/dev/null)
        if [ ! -z "$pid" ]; then
            echo "🔪 Arrêt du processus sur le port $port (PID: $pid)..."
            kill -9 $pid 2>/dev/null || true
            sleep 1
        fi
    elif command -v fuser &> /dev/null; then
        # Linux avec fuser
        if fuser $port/tcp &> /dev/null; then
            echo "🔪 Arrêt du processus sur le port $port..."
            fuser -k $port/tcp 2>/dev/null || true
            sleep 1
        fi
    elif command -v netstat &> /dev/null; then
        # Alternative avec netstat (moins fiable)
        local pid=$(netstat -tlnp 2>/dev/null | grep ":$port " | awk '{print $7}' | cut -d'/' -f1 | head -1)
        if [ ! -z "$pid" ] && [ "$pid" != "-" ]; then
            echo "🔪 Arrêt du processus sur le port $port (PID: $pid)..."
            kill -9 $pid 2>/dev/null || true
            sleep 1
        fi
    fi
}

# Fonction pour libérer tous les ports utilisés par les projets
free_ports() {
    echo "🔍 Vérification des ports 90, 91, 92, 93..."
    kill_port 90
    kill_port 91
    kill_port 92
    kill_port 93
    echo "✅ Ports libérés"
}

echo "🚀 Démarrage de tous les projets..."

# Libérer les ports s'ils sont déjà utilisés
free_ports

# Créer le dossier logs s'il n'existe pas
mkdir -p logs

# Vérifier si PM2 est installé
if ! command -v pm2 &> /dev/null; then
    echo "❌ PM2 n'est pas installé. Installation en cours..."
    npm install -g pm2
    echo "✅ PM2 installé avec succès"
fi

# Build tous les projets
echo "📦 Construction des projets..."
cd version1 && npm run build && cd ..
cd version2 && npm run build && cd ..
cd version3 && npm run build && cd ..
cd version4 && npm run build && cd ..

echo "✅ Tous les projets ont été construits"

# Arrêter les processus existants s'ils tournent déjà
echo "🛑 Arrêt des processus existants..."
pm2 delete all 2>/dev/null || true

# Démarrer tous les projets avec PM2
echo "▶️  Démarrage de tous les projets avec PM2..."
pm2 start ecosystem.config.js

# Sauvegarder la configuration PM2 pour le démarrage au boot
pm2 save
pm2 startup

echo ""
echo "✅ Tous les projets sont démarrés !"
echo ""
echo "📊 Statut des projets :"
pm2 status
echo ""
echo "📝 Commandes utiles :"
echo "  - Voir les logs : pm2 logs"
echo "  - Voir le statut : pm2 status"
echo "  - Arrêter tous : pm2 stop all"
echo "  - Redémarrer tous : pm2 restart all"
echo "  - Arrêter et supprimer : pm2 delete all"
echo ""
echo "🌐 Les projets sont accessibles sur :"
echo "  - version1 : http://51.178.142.95:90"
echo "  - version2 : http://51.178.142.95:91"
echo "  - version3 : http://51.178.142.95:92"
echo "  - version4 : http://51.178.142.95:93"

