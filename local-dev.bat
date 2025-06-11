@echo off
REM Local Development Startup Script for Windows

echo Setting up local development environment...

REM Check Node.js version
for /f "tokens=1 delims=v" %%i in ('node --version') do set NODE_VERSION=%%i
for /f "tokens=1 delims=." %%i in ("%NODE_VERSION:~1%") do set NODE_MAJOR=%%i

if %NODE_MAJOR% LSS 18 (
    echo Error: Node.js 18+ is required. Current version: %NODE_VERSION%
    pause
    exit /b 1
)

REM Check if dependencies are installed
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
    if errorlevel 1 (
        echo Failed to install dependencies
        pause
        exit /b 1
    )
)

REM Set environment variables for local development
set NODE_ENV=development
if not defined PORT set PORT=5000

echo Starting development server on port %PORT%...
echo Open http://localhost:%PORT% in your browser

REM Use compatibility mode for older Node.js versions
if %NODE_MAJOR% LSS 20 (
    echo Using compatibility mode for Node.js %NODE_VERSION%
    node start-local.js
) else (
    npm run dev
)