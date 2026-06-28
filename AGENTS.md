# AGENTS.md

Guidance for AI agents and contributors working in this repo. See `README.md` for the
fuller project overview and component/test notes.

## What this is

A Vue 3 single-page app with five financial calculators (compound interest, mortgage,
savings goal, early payoff, FIRE). Built on **Vike** (file-based routing + SSG), **Tailwind**,
and **Chart.js**. The calculator maths come from the **`@jdizm/finance-calculator`** library
(sibling repo `compound-interest`).

## Setup & tooling

- **Package manager: pnpm** (`pnpm@9.7.0` via corepack).
- **Node: 24** (pinned via Volta).

## Commands

```bash
pnpm install
pnpm dev             # vike dev server
pnpm build           # vike build (SSG output in dist/)
pnpm preview         # serve the build
pnpm test:unit       # vitest --run --coverage (UI primitives)
pnpm test:e2e        # cypress against a preview build
pnpm type-check      # vue-tsc
pnpm lint            # eslint --fix
pnpm format:check    # prettier check
pnpm storybook       # component workshop on :6006
pnpm build-storybook # static Storybook (also what Chromatic publishes)
```

CI (`.github/workflows/node.yml`) runs `lint`, `format:check`, `type-check`, `build`, and
`test:unit` on Node 24. `chromatic.yml` publishes Storybook for visual regression. Run the
same locally before pushing.

## Layout

- `pages/` — Vike routes: `index`, `compound-interest`, `mortgage`, `savings-goal`,
  `early-payoff`, `fire`, plus `_error`, `+Layout.vue`, `+config.ts`. Each calculator page owns
  its form state and calls the library.
- `src/components/` — `ui/` (primitives, unit-tested), `layout/`, `marketing/`. Storybook
  stories live alongside components.

## Conventions

- **Rates are entered as whole percentages** (e.g. `5` for 5%); the library normalises them.
- Sanitise inputs before calling the library: it throws on invalid input, and pages catch and
  show an error / fall back. e.g. the compound page floors `years` to a whole number because
  the library indexes its yearly matrix by integer keys.
- Keep `ui/` primitives covered by unit tests; cover visual changes via Storybook/Chromatic.

## Library dependency (important)

The committed `pnpm-lock.yaml` must resolve `@jdizm/finance-calculator` from the **npm
registry** (e.g. `^1.5.0`) so CI and production builds work on a clean checkout.

To develop against unreleased library changes, link the sibling repo locally
(`link:../compound-interest`, with its `dist/` built via `npm run build` there) — but **do not
commit that link**. A `link:` in the lockfile breaks CI/Vercel/Cloudflare (no sibling repo on
the runner). After a library release, run `pnpm install` to re-resolve to the published version
and commit the updated lockfile.

## Deployment

Currently deployed on **Vercel** (`vercel.json`). Migrating to **Cloudflare Pages** (build:
`pnpm build`, output: `dist/client`); the Vercel integration/config will be removed as part of
that move.
