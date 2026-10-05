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

Hunter-Net is a static frontend hosted on GitHub Pages, with Supabase providing authentication, archive storage, and realtime chat.

- **HTML** contains page content and declarative `data-*` hooks.
- **CSS** contains shared layout, component, and character-sheet presentation.
- **JavaScript** contains browser behavior, separated by feature instead of embedded in HTML.
- **serve.py** and **serve.js** are local development servers only; GitHub Pages serves the static files directly.

The shared navigation reads the current Supabase Auth session and profile. Sign-up and login accept a username and password; Supabase Auth uses a generated reserved `example.com` alias internally because its password provider requires an email-shaped identifier. See [SETUP.md](SETUP.md) for the required confirmation settings and existing-account limitations.

The Archives page reads and updates `archive_entries` with realtime subscriptions. The Contact page uses `chat_messages` for signed-in users. Row-level security policies control database access; the browser publishable key is not an authorization secret.

## File Organization

- **Root**: Contains only the main entry points (index.html, 404.html, signup.html)
- **pages/**: Contains all secondary content pages
- **assets/css/**: Centralized stylesheets
- **assets/js/**: Feature-scoped browser modules
- **assets/images/**: Images and PDF documents
