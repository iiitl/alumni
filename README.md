# IIITL Alumni Network

A community-built alumni platform for **IIIT Lucknow** — a central hub where graduates and current students can find each other, share opportunities, and stay connected after college. Built by [Axios, IIITL](https://github.com/MrImmortal09/alumni).

> **Project status:** Early — help wanted! See [open issues](https://github.com/MrImmortal09/alumni/issues) to contribute.

---

## Screenshots

> _Screenshots will be added once the UI stabilises. Below are placeholder descriptions of the key pages._

| Page | Description |
|------|-------------|
| **Home** | Hero section, upcoming events, alumni spotlight, latest news |
| **Directory** | Searchable alumni list filtered by batch, branch, company, or city |
| **Events** | Reunions, meetups, and community calls |
| **Jobs board** | Roles and internships shared by IIITL alumni |
| **Giving** | Donate to scholarships and student innovation funds |

---

## Local Setup

### Prerequisites

- **Node.js** ≥ 18
- **pnpm** ≥ 8 (`npm install -g pnpm`)
- **Git**

### 1 — Clone the repo

```bash
git clone https://github.com/MrImmortal09/alumni.git
cd alumni
```

### 2 — Install dependencies

```bash
pnpm install
```

### 3 — Configure environment variables

Copy the example file and fill in values (see [Environment Variables](#environment-variables) below):

```bash
cp .env.example .env.local
```

### 4 — Start the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

Create a `.env.local` file at the project root (never commit this file). The table below lists all recognised variables:

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | No | Canonical URL of the deployment (e.g. `https://alumni.iiitl.ac.in`) |

> Additional variables will be listed here as backend/auth integrations are added.

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start Next.js dev server with hot-reload |
| `pnpm build` | Production build |
| `pnpm start` | Start production server (requires `pnpm build` first) |
| `pnpm lint` | Run ESLint across the project |

---

## Running Tests

> The test suite is being set up — tracking issue coming soon.

Once tests are added, run them with:

```bash
pnpm test
```

Lint checks (which CI enforces) can be run at any time:

```bash
pnpm lint
```

---

## Project Structure

```
alumni/
├── app/                  # Next.js App Router pages & layouts
│   ├── layout.tsx        # Root layout (fonts, Navbar, Footer)
│   ├── page.tsx          # Home page
│   ├── about/
│   ├── directory/
│   ├── events/
│   ├── jobs/
│   ├── news/
│   └── ...
├── components/           # Shared UI primitives
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── Section.tsx
├── lib/                  # Data helpers and utilities
└── public/               # Static assets
```

---

## Design System

Color tokens, typography, and component patterns are documented in **[docs/design-system.md](docs/design-system.md)** (tracked in [Issue #4](https://github.com/MrImmortal09/alumni/issues/4)).

---

## Contributing

Please read **[CONTRIBUTING.md](CONTRIBUTING.md)** before opening a pull request. It covers branch naming, commit style, code style, and how to pick up issues.

---

## License

This project is open-source under the [MIT License](LICENSE).
