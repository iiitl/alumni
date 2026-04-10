# Contributing to IIITL Alumni Network

Thank you for wanting to help! This guide will get you from zero to a merged pull request as quickly as possible.

---

## Table of Contents

1. [How to pick an issue](#how-to-pick-an-issue)
2. [Branch naming](#branch-naming)
3. [Commit style](#commit-style)
4. [Code style](#code-style)
5. [Pull request process](#pull-request-process)
6. [Who to ping for help](#who-to-ping-for-help)

---

## How to Pick an Issue

1. Browse [open issues](https://github.com/MrImmortal09/alumni/issues) and filter by the **`good first issue`** label if you are new.
2. Leave a comment on the issue you want to work on — e.g. _"I'd like to take this."_ — so others know it is claimed.
3. Wait for a maintainer to assign you or give a thumbs-up before you start coding. This avoids duplicate work.
4. If an issue has been inactive for more than 7 days with no PR, it is fair game again.

---

## Branch Naming

Branch names must follow this pattern:

```
<type>/<short-description>
```

| Type | When to use |
|------|-------------|
| `feat` | New feature or page |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `style` | Formatting, whitespace — no logic change |
| `refactor` | Code restructure without behaviour change |
| `chore` | Tooling, dependencies, CI |

**Examples:**

```
feat/alumni-directory-search
fix/navbar-mobile-overflow
docs/contributing-guide
chore/upgrade-tailwind-v4
```

Branch names should use **kebab-case** and be ≤ 50 characters.

---

## Commit Style

We follow a simplified version of [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<optional scope>): <short imperative summary>
```

**Rules:**

- Use the **imperative mood** in the summary: _"add filter"_ not _"added filter"_.
- Keep the summary ≤ 72 characters.
- Reference the related issue at the end of the body: `Closes #34`.

**Examples:**

```
feat(directory): add batch-year filter
fix(navbar): correct active link highlight on mobile
docs: add CONTRIBUTING guide
chore(deps): upgrade next to 16.2.3
```

---

## Code Style

This project uses **TypeScript**, **React (App Router)**, and **Tailwind CSS v4**.

| Rule | Detail |
|------|--------|
| **Formatter** | Prettier (default settings). Run `pnpm format` if configured. |
| **Linter** | ESLint — run `pnpm lint` before pushing. CI will block PRs with lint errors. |
| **TypeScript** | Strict mode is enabled. Avoid `any`; prefer explicit types. |
| **Tailwind** | Use design-system tokens (`text-brand`, `bg-surface`, etc.) defined in `app/globals.css`. Do **not** add arbitrary hex values. See the [Design System](docs/design-system.md) (tracked in [Issue #4](https://github.com/MrImmortal09/alumni/issues/4)). |
| **Components** | Reuse primitives from `components/` (e.g. `Section`, `SectionHeading`). Create a new component if a pattern is used in ≥ 2 places. |
| **File naming** | PascalCase for React components (`MyComponent.tsx`), kebab-case for route segments (`app/my-page/page.tsx`). |
| **Imports** | Use `@/` alias for project-root imports. No relative `../../` imports. |

---

## Pull Request Process

1. **Fork** the repo and create your branch from `main`.
2. Make your changes, following the code style above.
3. Run `pnpm lint` and fix any errors.
4. Open a PR against `main` using the [PR template](.github/PULL_REQUEST_TEMPLATE.md). Fill in every section of the checklist.
5. Link the related issue in the PR description (e.g. `Closes #34`).
6. Wait for at least **one approving review** from a maintainer before merging.
7. Squash-merge is preferred; the maintainer will do this when merging.

---

## Who to Ping for Help

| Area | Contact |
|------|---------|
| General / architecture | [@MrImmortal09](https://github.com/MrImmortal09) |
| UI / design system | Tag the **`design`** label on your issue and mention it in the PR |
| CI / infra | Open an issue with the **`chore`** label |

You can also start a discussion in the [GitHub Discussions](https://github.com/MrImmortal09/alumni/discussions) tab (if enabled) or reach out via the project's communication channel shared in your onboarding.

---

_Thank you for contributing — every PR counts! 🎓_
