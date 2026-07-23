#!/bin/bash
# Hunter-Net Local Server - macOS/Linux Shell Script
# Make executable: chmod +x serve.sh
# Run: ./serve.sh

echo ""
echo "===================================="
echo "  Hunter-Net Local Server"
echo "===================================="
echo ""

# Check for Python3 (preferred)
if command -v python3 &> /dev/null; then
    echo "Starting server with Python3..."
    echo ""
    python3 serve.py
# Check for Python
elif command -v python &> /dev/null; then
    echo "Starting server with Python..."
    echo ""
    python serve.py
# Check for Node.js
elif command -v node &> /dev/null; then
    echo "Starting server with Node.js..."
    echo ""
    node serve.js
else
    echo ""
    echo "ERROR: No suitable server found!"
    echo ""
    echo "Please install one of the following:"
    echo "  - Python 3: brew install python3 (macOS) or apt install python3 (Linux)"
    echo "  - Node.js: brew install node (macOS) or apt install nodejs (Linux)"
    echo ""
    echo "Then run this script again."
    echo ""
    exit 1
fi
