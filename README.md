# To‑Do List (Simple)

This is a small, offline, single-file To‑Do web app for quickly tracking tasks. Changes are persisted in your browser using localStorage.

## Files changed / added
- `index.html` — main app UI and markup
- `style.css` — modern, responsive layout and theme
- `app_scipt.js` — app logic: add, edit, delete, toggle complete, and persistence

## How to run
You can open `index.html` directly in any modern browser (double-click the file).

Or run a simple static server from the project folder, e.g. with Python 3:

```powershell
# from project root
python -m http.server 8000; Start-Process http://localhost:8000
```

Then open http://localhost:8000 in your browser.

## Features
- Add tasks (via the form)
- Mark tasks complete (checkbox)
- Edit and delete tasks
- Tasks are persisted using localStorage
- Keyboard and accessibility friendly

## Login
- A simple `login.html` was added. Enter any username to sign in (demo only — no real authentication).
- The app stores the username in `localStorage` under the key `todo_user` and redirects to `index.html`.

---
If you'd like, I can add features such as drag-and-drop reordering, due dates, filtering (completed/active), or sync with a backend.
