# Local Deployment Guide for Hunter-Net

This guide explains how to run Hunter-Net locally on your machine.

## Quick Start

### Option 1: Python (Recommended - No Installation Required)

Most systems come with Python pre-installed.

#### Windows:
```bash
cd path\to\Hunter-Net
python serve.py
```

#### macOS/Linux:
```bash
cd path/to/Hunter-Net
python3 serve.py
```

The server will start at `http://localhost:8000` and open in your browser automatically.

---

### Option 2: Node.js with `http-server`

If you have Node.js installed:

```bash
npm install -g http-server
cd path/to/Hunter-Net
http-server -p 8000
```

---

### Option 3: Using Live Server (VS Code Extension)

1. Install the **Live Server** extension in VS Code
2. Right-click `index.html` → **Open with Live Server**
3. Browser opens automatically at `http://localhost:5500`

---

### Option 4: Manual Browser (File System Access - Limited)

Open the project folder and drag `index.html` into your browser. 

⚠️ **Note**: This method has limitations with relative paths and may not work properly. **Not recommended**.

---

## What Each Option Does

| Method | Pros | Cons |
|--------|------|------|
| **Python** | Built-in, no setup | Requires Python |
| **Node.js** | Fast, feature-rich | Requires installation |
| **Live Server** | Easy, live reload | Requires VS Code |
| **Direct Browser** | No setup needed | Limited functionality |

---

## Accessing the Site

1. **Landing Page**: Navigate to `http://localhost:8000`
2. **Enter Password**: The default password is `reckoning`
3. **Browse Site**: Explore all pages locally

### Password Hint
> What Do We Fight For?

---

## Offline Mode

The site is **fully functional offline** once loaded:

- ✓ All pages work without internet
- ✓ All images and PDFs load locally
- ✓ Navigation works completely offline
- ⚠️ External services on contact page won't work offline (map and chat)

---

## Troubleshooting

### "Address already in use" error
The port 8000 is already in use. Either:
- Close other applications using port 8000
- Modify the server script to use a different port (e.g., 8080, 9000)

### Images not loading
- Ensure you're using a server (not file:// protocol)
- Check that the `assets/images/` folder exists with files

### Password not working
- Make sure you enter `reckoning` exactly (case-sensitive)
- Clear browser cache and reload

### External services not available
- Map and chat on the Contact page require internet
- These show fallback messages when offline

---

## File Structure for Local Serving

```
Hunter-Net/
├── index.html           ← Start here (http://localhost:8000)
├── 404.html
├── signup.html
├── serve.py            ← Python server script
├── README.md
├── SETUP.md            ← This file
├── pages/              ← All content pages
│   ├── main.html
│   ├── monsters.html
│   ├── contact.html
│   ├── sheet.html
│   ├── quickplay.html
│   └── credits.html
└── assets/
    ├── css/
    │   └── style.css
    ├── js/
    │   ├── loader.js
    │   └── nav.js
    └── images/         ← All images and PDFs
```

---

## Development

To make changes and test locally:

1. Edit HTML/CSS/JS files
2. Save changes
3. Refresh browser (F5 or Cmd+R)
4. Changes appear immediately

---

## Deployment to GitHub Pages

To deploy to GitHub Pages:

1. Push to a GitHub repository
2. Go to Settings → Pages
3. Select "Deploy from a branch"
4. Choose `main` branch
5. Site goes live at `https://yourusername.github.io/Hunter-Net`

---

## Questions or Issues?

For more help, see:
- [README.md](README.md) - Project overview
- [Hunter-Net Organization](https://github.com/Hunter-Net) - Community resources
