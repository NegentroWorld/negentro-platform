# Negentro Platform

The front end for **Piyapi** by Negentro: a sign-in page and the developer dashboard.

| App | Folder | Runs at |
| --- | --- | --- |
| Sign-in page | [`negentro-login/`](negentro-login) | http://localhost:5176 |
| Dashboard | [`negentro-dashboard/`](negentro-dashboard) | http://localhost:5173 |

The two apps link to each other. **Continue as guest** on the sign-in page opens the dashboard, and **Log out** in the dashboard returns to the sign-in page.

## Requirements

- [Node.js](https://nodejs.org) **20.19+** or **22.12+** (check with `node -v`)
- npm (comes with Node.js)

## Quick start

```bash
git clone https://github.com/NegentroWorld/negentro-platform.git
cd negentro-platform
```

Start the sign-in page in one terminal:

```bash
cd negentro-login
npm install
npm run dev
```

Start the dashboard in a second terminal:

```bash
cd negentro-dashboard
npm install
npm run dev
```

Then open http://localhost:5176 and click **Continue as guest**.

> Each app is fixed to its port so the links between them always work. If a port is already in use, `npm run dev` stops with an error instead of switching ports. Close whatever is using that port and try again.

## Scripts

Run these inside `negentro-login/` or `negentro-dashboard/`:

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the dev server with live reload |
| `npm run build` | Type-checks and builds for production into `dist/` |
| `npm run preview` | Serves the production build locally |

## Connecting a backend (optional)

The dashboard works without a backend. It returns sample responses so every page can be clicked through.

To use a real API, create `negentro-dashboard/.env` from the example and set your API address:

```bash
cp negentro-dashboard/.env.example negentro-dashboard/.env
```

```env
VITE_API_BASE_URL=https://api.example.com
```

Restart `npm run dev` after changing `.env`. Never commit `.env`; it's already listed in `.gitignore`.

## Project structure

```
negentro-platform/
├── negentro-login/          Sign-in page (React + Vite)
│   ├── public/              Negentro and Piyapi logos
│   └── src/App.tsx          Sign-in form and layout
└── negentro-dashboard/      Dashboard (React + Vite)
    ├── public/              Piyapi logos (light and dark)
    └── src/
        ├── Dashboard.tsx    All dashboard pages
        ├── ApiKeyDialog.tsx Create API key dialog
        ├── lib/dashboardApi.ts  API client (sample responses when no backend is set)
        └── assets/          Integration, connector and provider logos
```

## Tech stack

React 19, TypeScript, Vite 8, [Lucide](https://lucide.dev) icons, and the DM Sans / DM Mono fonts.
