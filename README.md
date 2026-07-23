# Hunter-Net

Static GitHub Pages project site for the Hunter: The Reckoning TTRPG.

## Directory Structure

```
Hunter-Net/
├── index.html              # Landing page (password protected)
├── signup.html             # Sign up page
├── 404.html                # Error page
├── README.md               # This file
├── .git/                   # Git repository
├── .gitignore
├── assets/
│   ├── css/
│   │   └── style.css      # Main stylesheet
│   ├── js/
│   │   ├── loader.js      # Page loader script
│   │   └── nav.js         # Navigation script
│   └── images/            # All images and PDFs
│       ├── *.png
│       ├── *.gif
│       └── *.pdf
└── pages/                 # Secondary pages
    ├── main.html          # Main content page
    ├── monsters.html      # Creature database
    ├── sheet.html         # Character sheet
    ├── quickplay.html     # Quick play rules
    ├── credits.html       # Credits page
    └── contact.html       # Contact page
```

## Getting Started

### Quick Local Deployment

**Option 1: Python (Recommended)**
```bash
python serve.py
```

**Option 2: Node.js**
```bash
npx http-server -p 8000
```

**Option 3: VS Code Live Server**
- Install Live Server extension
- Right-click `index.html` → Open with Live Server

Then navigate to `http://localhost:8000` and enter password: `reckoning`

For detailed setup instructions, see [SETUP.md](SETUP.md)

### Accessing the Site

1. Open `http://localhost:8000` in your browser
2. Enter password: `reckoning` (Hint: What Do We Fight For?)
3. Browse and explore the site

**Offline Mode**: The site is fully functional offline once loaded. External services (map, chat) on the Contact page require internet.

## File Organization

- **Root**: Contains only the main entry points (index.html, 404.html, signup.html)
- **pages/**: Contains all secondary content pages
- **assets/css/**: Centralized stylesheets
- **assets/js/**: JavaScript utilities
- **assets/images/**: All images and PDF documents
