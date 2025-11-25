#!/bin/bash

echo "========================================"
echo "  Auto Deploy to Netlify"
echo "========================================"
echo ""

while true; do
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] Building and deploying..."
    
    npm run build
    if [ $? -ne 0 ]; then
        echo "Build failed! Waiting 5 seconds before retry..."
        sleep 5
        continue
    fi
    
    netlify deploy --prod --dir=dist
    if [ $? -ne 0 ]; then
        echo "Deploy failed! Waiting 5 seconds before retry..."
        sleep 5
        continue
    fi
    
    echo ""
    echo "✅ Successfully deployed!"
    echo ""
    echo "Watching for file changes in src/ directory..."
    echo "Press Ctrl+C to stop"
    echo ""
    
    sleep 10
done

