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
│   │   └── style.css      # Shared and page-specific presentation
│   ├── js/
│   │   ├── auth.js        # Landing-page access behavior
│   │   ├── contact.js     # External-service fallback behavior
│   │   ├── loader.js      # Shared page loader
│   │   ├── nav.js         # Shared navigation behavior
│   │   ├── sheet.js       # Character-sheet state and persistence
│   │   └── signup.js      # Signup form behavior
│   └── images/            # Images and PDF resources
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

## Architecture

Hunter-Net is a static frontend. It currently has no backend or persistent user account service.

- **HTML** contains page content and declarative `data-*` hooks.
- **CSS** contains shared layout, component, and character-sheet presentation.
- **JavaScript** contains browser behavior, separated by feature instead of embedded in HTML.
- **serve.py** and **serve.js** are local development servers only; GitHub Pages serves the static files directly.

The shared navigation supports a temporary name-only session. A visitor can enter a display name without verification; it is stored in browser `localStorage` under `hunter-net-session-name`, restored on later page loads, and removed by **Log out**. This is a convenience identity, not authentication, and it is limited to the current browser profile.

The signup form is intentionally a frontend placeholder. It validates the form locally and directs users to the Contact page because no account API exists yet.

## File Organization

- **Root**: Contains only the main entry points (index.html, 404.html, signup.html)
- **pages/**: Contains all secondary content pages
- **assets/css/**: Centralized stylesheets
- **assets/js/**: Feature-scoped browser modules
- **assets/images/**: Images and PDF documents
