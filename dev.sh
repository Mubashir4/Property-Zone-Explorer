#!/bin/bash

# Banner17 - Quick Development Setup
# Run this script to start the app in development mode

echo "═══════════════════════════════════════════════════════════════"
echo "BANNER17 - Starting Development Server"
echo "═══════════════════════════════════════════════════════════════"
echo ""

# Navigate to project directory
cd "$(dirname "$0")"

# Create .env.local if it doesn't exist
if [ ! -f ".env.local" ]; then
    echo "📝 Creating environment configuration..."
    cat > .env.local << 'EOF'
VITE_API_BASE_URL=http://localhost:3001/api
VITE_USE_MOCK_DATA=true
VITE_ENABLE_DEV_TOOLS=true
VITE_MAP_DEFAULT_LAT=-33.8688
VITE_MAP_DEFAULT_LNG=151.2093
VITE_MAP_DEFAULT_ZOOM=12
VITE_ENABLE_SCHOOLS=true
VITE_ENABLE_AMENITIES=true
VITE_ENABLE_RISK_OVERLAYS=true
VITE_ENABLE_DRAWING_TOOLS=true
EOF
    echo "✅ Environment file created (.env.local)"
    echo ""
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo "✅ Dependencies installed"
    echo ""
fi

# Kill any processes on ports 3000-3002
echo "🧹 Cleaning up ports..."
lsof -ti:3000,3001,3002 2>/dev/null | xargs kill -9 2>/dev/null
sleep 1

# Start development server
echo "🚀 Starting Vite development server..."
echo ""
echo "✅ Mock data enabled (5 properties, 6 schools, 17 amenities)"
echo "✅ All features enabled"
echo ""
echo "The app will open at: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""
echo "═══════════════════════════════════════════════════════════════"

npm run dev
