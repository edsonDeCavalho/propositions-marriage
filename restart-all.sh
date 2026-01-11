#!/bin/bash

# Script pour redémarrer tous les projets

echo "🔄 Redémarrage de tous les projets..."

pm2 restart all

echo "✅ Tous les projets ont été redémarrés"
pm2 status

