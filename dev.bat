@echo off
REM Banner17 - Quick Development Setup (Windows)
REM Double-click this file to start the app

echo ═══════════════════════════════════════════════════════════════
echo BANNER17 - Starting Development Server
echo ═══════════════════════════════════════════════════════════════
echo.

REM Check if node_modules exists
if not exist node_modules (
    echo 📦 Installing dependencies...
    call npm install
    echo ✅ Dependencies installed
    echo.
)

REM Start development server
echo 🚀 Starting Vite development server...
echo.
echo The app will open automatically at: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.
echo ═══════════════════════════════════════════════════════════════

call npm run dev

