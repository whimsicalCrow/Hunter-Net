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

1. Navigate to `http://localhost:8000`; the root redirects to `pages/index.html`.
2. Sign in with your Supabase username and password, or create an account at `signup.html`.
3. Browse the site. Shared archives and chat require an authenticated Supabase session.

---

## Online Services

The site needs an internet connection for:

- Supabase authentication, shared archive data, and realtime chat.
- The map embed on the Contact page.
- The Supabase JavaScript client loaded from its CDN.

The character sheet itself stores edits in the current browser.

---

## Troubleshooting

### "Address already in use" error
The port 8000 is already in use. Either:
- Close other applications using port 8000
- Modify the server script to use a different port (e.g., 8080, 9000)

### Images not loading
- Ensure you're using a server (not file:// protocol)
- Check that the `assets/images/` folder exists with files

### Sign-in or sign-up not working
- Confirm the Supabase username-auth setup in [Supabase Username Accounts](#supabase-username-accounts).
- Make sure **Allow new users to sign up** is enabled for new registrations.
- Clear browser cache and reload after deploying frontend changes.

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
├── pages/              ← Login and content pages
│   ├── main.html
│   ├── monsters.html
│   ├── contact.html
│   ├── sheet.html
│   ├── quickplay.html
│   └── credits.html
├── supabase/           ← Database migrations
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

## Supabase Username Accounts

The login and sign-up forms accept usernames and passwords only. Supabase Auth requires an email-shaped identifier internally, so Hunter-Net maps each username to a reserved `example.com` alias; passwords remain managed by Supabase Auth.

Before using username-only sign-up:

1. Run [`supabase/username-auth-migration.sql`](supabase/username-auth-migration.sql) in the Supabase SQL Editor after the main Hunter-Net schema has been installed.
2. In Supabase Authentication settings, turn on **Allow new users to sign up**, keep the Email provider enabled, and turn **Confirm email** off. These generated addresses cannot receive confirmation or password-reset messages.
3. Add `https://yourusername.github.io/Hunter-Net/pages/main.html` to the Supabase Auth redirect URL allow list.
4. Usernames must be 3-24 letters, numbers, or underscores. They are stored lowercase and must be unique.

Existing accounts created with real email addresses are not automatically converted to username aliases. Migrate them deliberately or create new accounts after applying the username migration. Since there is no recovery email, lost passwords require administrator intervention.

---

## Questions or Issues?

For more help, see:
- [README.md](README.md) - Project overview
- [Hunter-Net Organization](https://github.com/Hunter-Net) - Community resources
