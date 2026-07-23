@echo off
REM Hunter-Net Local Server - Windows Batch Script
REM Simply double-click this file to start the server

echo.
echo ====================================
echo   Hunter-Net Local Server
echo ====================================
echo.

REM Check if Python is available
python --version >nul 2>&1
if %errorlevel% equ 0 (
    echo Starting server with Python...
    echo.
    python serve.py
) else (
    REM Check for Python3
    python3 --version >nul 2>&1
    if %errorlevel% equ 0 (
        echo Starting server with Python3...
        echo.
        python3 serve.py
    ) else (
        REM Check for Node.js
        node --version >nul 2>&1
        if %errorlevel% equ 0 (
            echo Starting server with Node.js...
            echo.
            node serve.js
        ) else (
            echo.
            echo ERROR: No suitable server found!
            echo.
            echo Please install one of the following:
            echo   - Python 3 (https://www.python.org/downloads)
            echo   - Node.js (https://nodejs.org)
            echo.
            echo Then run this script again.
            echo.
            pause
            exit /b 1
        )
    )
)
