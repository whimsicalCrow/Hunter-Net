# Hunter-Net

Hunter-Net is a static Hunter: The Reckoning fan site hosted on GitHub Pages. Supabase provides authentication, shared archive storage, and realtime chat.

## Pages and Features

- `index.html` at the repository root redirects to `pages/index.html`, the username/password sign-in page.
- `signup.html` creates username-based accounts. Supabase uses a reserved `example.com` alias internally; users do not provide an email address.
- `pages/monsters.html` displays the Quarry and Organizations archive from Supabase. Signed-in users can add and manage custom entries and folders.
- `pages/contact.html` contains the community map and authenticated realtime chat.
- `pages/sheet.html` is the character sheet; its changes are stored in the current browser.
- `pages/main.html`, `pages/quickplay.html`, and `pages/credits.html` contain the remaining site pages.

## Run Locally

From the repository root, start the Python server:

```bash
python3 serve.py
```

Open `http://localhost:8000`. The root page redirects to the sign-in page. The app requires an internet connection for Supabase, the map embed, and the Supabase JavaScript library.

For account setup, Supabase settings, and deployment details, see [SETUP.md](SETUP.md).

## Supabase

The browser client is configured in `assets/js/supabase-client.js` with the project URL and publishable key. A publishable key is intended for browser use; row-level security (RLS) policies must remain enabled.

The database needs the `profiles`, `archive_entries`, and `chat_messages` tables and their RLS policies. SQL migrations in `supabase/` update archive titles and add username support to profiles. Apply them in the Supabase SQL Editor after the base schema is installed.

Username-only signup requires **Allow new users to sign up** enabled, the Email provider enabled, and email confirmation disabled. Generated aliases cannot receive confirmation or password-reset email. Existing email-based accounts are not automatically converted.

## Project Structure

```text
Hunter-Net/
├── index.html                 # Redirect to pages/index.html
├── signup.html                # Username/password account creation
├── 404.html
├── serve.py                   # Local development server
├── serve.js                   # Alternate local server
├── pages/                     # Login and site pages
├── assets/css/style.css       # Shared and page-specific styles
├── assets/js/                 # Auth, navigation, archive, chat, and sheet behavior
├── assets/images/             # Images and PDF resources
└── supabase/                  # SQL migrations
```
