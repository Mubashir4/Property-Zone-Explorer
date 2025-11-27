#!/bin/bash

echo "Installing dependencies..."
npm install

echo ""
echo "Building project with environment variables..."
echo "Make sure .env.local exists with required variables"
echo ""

# Ensure .env.local exists
if [ ! -f ".env.local" ]; then
    echo "⚠️  Warning: .env.local not found. Creating default..."
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
fi

npm run build

echo ""
echo "Build complete! Output in dist/ folder"
echo ""
echo "To test the build locally:"
echo "  npm run preview              # Best option - handles routing correctly"
echo "  ./serve.sh                   # Alternative - uses serve with SPA support"
echo ""
echo "⚠️  If you see a blank page:"
echo "  1. Make sure you're using 'npm run preview' or './serve.sh'"
echo "  2. Avoid using simple HTTP servers like python -m http.server"
echo "  3. Open DevTools (F12) → Application → Service Workers → Unregister"
echo "  4. Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)"
echo "  5. Check Console tab for errors"
echo ""
echo "For production deployment:"
echo "  • Netlify/Vercel: Automatically handles SPA routing"
echo "  • Apache/Nginx: Configure fallback to index.html"
echo "  • Other servers: Use 'serve -s' or similar SPA-aware server"

