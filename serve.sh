#!/bin/bash

# Simple production server
# Serves the dist/ folder on port 4173

PORT=${1:-4173}

if [ ! -d "dist" ]; then
    echo "Error: dist/ folder not found. Run 'npm run build' first."
    exit 1
fi

echo "Serving production build on http://localhost:$PORT"
echo "Press Ctrl+C to stop"
echo ""

# Use npx serve for better SPA support, fallback to other servers
if command -v npx &> /dev/null; then
    cd dist && npx serve -s . -l $PORT
elif command -v python3 &> /dev/null; then
    # For Python, we need to handle SPA routing manually
    echo "Warning: Python server doesn't handle client-side routing well."
    echo "Consider using: npm install -g serve && npx serve -s dist -l $PORT"
    cd dist && python3 -m http.server $PORT
elif command -v python &> /dev/null; then
    echo "Warning: Python server doesn't handle client-side routing well."
    echo "Consider using: npm install -g serve && npx serve -s dist -l $PORT"
    cd dist && python -m SimpleHTTPServer $PORT 2>/dev/null || python -m http.server $PORT
else
    echo "Error: No server found. Install Node.js for best SPA support"
    exit 1
fi

