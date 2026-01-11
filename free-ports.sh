#!/bin/bash

# Script pour libérer les ports 90, 91, 92, 93

# Fonction pour tuer un processus utilisant un port spécifique
kill_port() {
    local port=$1
    if command -v lsof &> /dev/null; then
        local pid=$(lsof -ti:$port 2>/dev/null)
        if [ ! -z "$pid" ]; then
            echo "🔪 Arrêt du processus sur le port $port (PID: $pid)..."
            kill -9 $pid 2>/dev/null || true
            sleep 1
            echo "✅ Port $port libéré"
        else
            echo "✅ Port $port déjà libre"
        fi
    elif command -v fuser &> /dev/null; then
        if fuser $port/tcp &> /dev/null; then
            echo "🔪 Arrêt du processus sur le port $port..."
            fuser -k $port/tcp 2>/dev/null || true
            sleep 1
            echo "✅ Port $port libéré"
        else
            echo "✅ Port $port déjà libre"
        fi
    elif command -v netstat &> /dev/null; then
        local pid=$(netstat -tlnp 2>/dev/null | grep ":$port " | awk '{print $7}' | cut -d'/' -f1 | head -1)
        if [ ! -z "$pid" ] && [ "$pid" != "-" ]; then
            echo "🔪 Arrêt du processus sur le port $port (PID: $pid)..."
            kill -9 $pid 2>/dev/null || true
            sleep 1
            echo "✅ Port $port libéré"
        else
            echo "✅ Port $port déjà libre"
        fi
    else
        echo "⚠️  Aucun outil disponible pour vérifier les ports (lsof, fuser, ou netstat requis)"
    fi
}

echo "🔍 Libération des ports 90, 91, 92, 93..."
echo ""

kill_port 90
kill_port 91
kill_port 92
kill_port 93

echo ""
echo "✅ Tous les ports ont été vérifiés et libérés si nécessaire"

