#!/bin/bash

# Script pour démarrer le site mariage (version 1), le backend Kotlin et MongoDB
# Libère aussi les ports des anciennes versions (91, 92, 93)

set -e

kill_port() {
    local port=$1
    if command -v lsof &> /dev/null; then
        local pid=$(lsof -ti:$port 2>/dev/null)
        if [ ! -z "$pid" ]; then
            echo "🔪 Arrêt du processus sur le port $port (PID: $pid)..."
            kill -9 $pid 2>/dev/null || true
            sleep 1
        fi
    elif command -v fuser &> /dev/null; then
        if fuser $port/tcp &> /dev/null; then
            echo "🔪 Arrêt du processus sur le port $port..."
            fuser -k $port/tcp 2>/dev/null || true
            sleep 1
        fi
    fi
}

echo "🚀 Démarrage du site mariage (version 1) + backend + base de données..."

# Libérer le port du frontend (version 1) et des anciennes versions
echo "🔍 Libération des ports 90 (version1), 91, 92, 93 (anciennes versions), 8080 (backend)..."
kill_port 90
kill_port 91
kill_port 92
kill_port 93
kill_port 8080
echo "✅ Ports libérés"

mkdir -p logs

if ! command -v pm2 &> /dev/null; then
    echo "❌ PM2 n'est pas installé. Installation en cours..."
    npm install -g pm2
    echo "✅ PM2 installé avec succès"
fi

# —— MongoDB ——
echo ""
echo "🗄️  Base de données MongoDB..."
if command -v docker &> /dev/null; then
    if docker ps -a --format '{{.Names}}' 2>/dev/null | grep -q 'yannick-mongo'; then
        docker start yannick-mongo 2>/dev/null && echo "✅ Conteneur MongoDB (yannick-mongo) démarré" || true
    else
        if ! docker ps --format '{{.Ports}}' 2>/dev/null | grep -q '27017'; then
            echo "   Création du conteneur MongoDB sur le port 27017..."
            docker run -d --name yannick-mongo -p 27017:27017 mongo:7 2>/dev/null && echo "✅ MongoDB démarré (conteneur yannick-mongo)" || echo "   (MongoDB déjà en cours ou erreur)"
        else
            echo "✅ MongoDB semble déjà tourner sur 27017"
        fi
    fi
    sleep 2
else
    echo "   Docker non trouvé. Assurez-vous que MongoDB tourne sur localhost:27017"
fi

# —— Backend Kotlin ——
echo ""
echo "📦 Construction du backend..."
cd backend
if [ ! -f ./gradlew ]; then
    echo "❌ Gradle wrapper absent dans backend/. Exécutez 'gradle wrapper' depuis backend/"
    exit 1
fi
./gradlew build -x test --no-daemon -q
cd ..
echo "✅ Backend construit"

# —— Frontend version 1 ——
echo ""
echo "📦 Construction du projet frontend (version 1)..."
cd version1 && npm run build && cd ..
echo "✅ Projet frontend construit"

echo ""
echo "🛑 Arrêt des processus PM2 existants..."
pm2 delete all 2>/dev/null || true

echo ""
echo "▶️  Démarrage avec PM2 (mariage + backend)..."
pm2 start ecosystem.config.js

# Démarrer le backend après le frontend pour que les logs restent lisibles
pm2 save 2>/dev/null || true

echo ""
echo "✅ Tout est démarré !"
echo ""
echo "📊 Statut :"
pm2 status
echo ""
echo "🌐 Frontend (version 1) : http://localhost:90 (ou votre domaine)"
echo "🔧 Backend API         : http://localhost:8080"
echo "🗄️  MongoDB             : localhost:27017"
echo ""
