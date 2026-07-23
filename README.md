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

1. Clone the repository
2. Serve the files locally (e.g., using a local web server)
3. Access `index.html` as the entry point
4. Use password: `reckoning` to proceed

## File Organization

- **Root**: Contains only the main entry points (index.html, 404.html, signup.html)
- **pages/**: Contains all secondary content pages
- **assets/css/**: Centralized stylesheets
- **assets/js/**: JavaScript utilities
- **assets/images/**: All images and PDF documents
