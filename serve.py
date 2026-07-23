#!/usr/bin/env python3
"""
Simple local HTTP server for Hunter-Net project.
Serves the project on http://localhost:8000/

Usage:
    python serve.py
"""

import http.server
import socketserver
import os
import webbrowser
from pathlib import Path

PORT = 8000
HANDLER = http.server.SimpleHTTPRequestHandler

def start_server():
    """Start a simple HTTP server."""
    # Change to the script directory
    script_dir = Path(__file__).parent
    os.chdir(script_dir)
    
    with socketserver.TCPServer(("", PORT), HANDLER) as httpd:
        url = f"http://localhost:{PORT}"
        print(f"✓ Starting Hunter-Net local server...")
        print(f"✓ Server running at: {url}")
        print(f"✓ Press Ctrl+C to stop the server")
        print()
        
        # Try to open browser
        try:
            webbrowser.open(url)
            print(f"✓ Opening browser...")
        except Exception as e:
            print(f"! Could not open browser: {e}")
            print(f"  Please manually navigate to: {url}")
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n✓ Server stopped.")

if __name__ == "__main__":
    start_server()
