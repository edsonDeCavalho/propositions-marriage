#!/bin/bash

# Script pour arrêter tous les projets

# Fonction pour tuer un processus utilisant un port spécifique
kill_port() {
    local port=$1
    if command -v lsof &> /dev/null; then
        local pid=$(lsof -ti:$port 2>/dev/null)
        if [ ! -z "$pid" ]; then
            echo "🔪 Arrêt du processus sur le port $port (PID: $pid)..."
            kill -9 $pid 2>/dev/null || true
        fi
    elif command -v fuser &> /dev/null; then
        if fuser $port/tcp &> /dev/null; then
            echo "🔪 Arrêt du processus sur le port $port..."
            fuser -k $port/tcp 2>/dev/null || true
        fi
    elif command -v netstat &> /dev/null; then
        local pid=$(netstat -tlnp 2>/dev/null | grep ":$port " | awk '{print $7}' | cut -d'/' -f1 | head -1)
        if [ ! -z "$pid" ] && [ "$pid" != "-" ]; then
            echo "🔪 Arrêt du processus sur le port $port (PID: $pid)..."
            kill -9 $pid 2>/dev/null || true
        fi
    fi
}

echo "🛑 Arrêt de tous les projets..."

# Arrêter les processus PM2
pm2 stop all 2>/dev/null || true
pm2 delete all 2>/dev/null || true

# Libérer les ports au cas où (frontend version1, anciennes versions, backend)
echo "🔍 Libération des ports 90, 91, 92, 93, 8080..."
kill_port 90
kill_port 91
kill_port 92
kill_port 93
kill_port 8080

# Optionnel : arrêter le conteneur MongoDB
if command -v docker &> /dev/null; then
    if docker ps -a --format '{{.Names}}' 2>/dev/null | grep -q 'yannick-mongo'; then
        docker stop yannick-mongo 2>/dev/null && echo "🗄️  Conteneur MongoDB arrêté" || true
    fi
fi

echo "✅ Tous les projets sont arrêtés et les ports sont libérés"
echo ""
echo "Pour redémarrer, utilisez : ./start-all.sh"

