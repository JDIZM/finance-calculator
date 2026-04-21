# finance-calculator

Free, browser-only finance calculators — compound interest, mortgage, savings goal, early mortgage payoff, FIRE number. Every calculation runs through [`@jdizm/finance-calculator`](https://www.npmjs.com/package/@jdizm/finance-calculator) on npm.

## Stack

- [Vue 3](https://vuejs.org/) + [TypeScript](https://www.typescriptlang.org/)
- [Vike](https://vike.dev/) (file-based routing, prerendered SSG with per-page opt-out)
- [Vite](https://vitejs.dev/) for dev + build
- [Tailwind CSS v3](https://tailwindcss.com/) with the chunky Montserrat design system (`@fontsource-variable/montserrat` + `@fontsource/poppins`)
- [Pinia](https://pinia.vuejs.org/) + [VueUse](https://vueuse.org/)
- [Chart.js](https://www.chartjs.org/) via [vue-chartjs](https://vue-chartjs.org/) for projection charts (client-only)
- [Storybook 8](https://storybook.js.org/) for UI primitives
- [Vitest](https://vitest.dev/) unit tests + [Cypress](https://www.cypress.io/) e2e smoke suite
- [GitHub Actions](.github/workflows) for CI

## Requirements

- Node.js (managed via [Volta](https://volta.sh/))
- [pnpm](https://pnpm.io/) 9+

```sh
curl https://get.volta.sh | bash
corepack enable pnpm
```

## Project Setup

```sh
pnpm install
```

### Scripts

| Command | What it does |
|---|---|
| `pnpm dev` | Vike dev server with HMR |
| `pnpm build` | Type-check + production build + prerender |
| `pnpm preview` | Serve the production build |
| `pnpm test:unit` | Vitest (with coverage) |
| `pnpm test:e2e` | Cypress smoke suite against `pnpm preview` |
| `pnpm test:e2e:dev` | Cypress in open mode against dev server |
| `pnpm lint` | ESLint with `--fix` |
| `pnpm format` | Prettier write |
| `pnpm type-check` | `vue-tsc --noEmit` |
| `pnpm storybook` | Storybook dev on port 6006 |
| `pnpm build-storybook` | Static Storybook in `storybook-static/` |

## Local development against `@jdizm/finance-calculator`

This app depends on the published npm package [`@jdizm/finance-calculator`](https://www.npmjs.com/package/@jdizm/finance-calculator). The source lives in a sibling repo, typically at `../compound-interest`.

To iterate on the library and the app together without publishing:

```sh
# from the library repo, build once
cd ../compound-interest
npm install
npm run build

# from this repo, link the local build
cd ../finance-calculator
pnpm link ../compound-interest
```

Now imports from `@jdizm/finance-calculator` resolve to your local source via the symlink in `node_modules`. Rebuild the library (`npm run build`) whenever you change it — Vite's dev server will pick up the new output on next reload.

To go back to the published version:

```sh
pnpm install   # re-resolves @jdizm/finance-calculator from the registry
```

**Note on `pnpm install` errors:** if `package.json` is pinned to a version of `@jdizm/finance-calculator` that isn't on npm yet (e.g. you bumped locally but haven't released), `pnpm install` will fail with `ERR_PNPM_NO_MATCHING_VERSION`. Either keep the previous pin until after release, or keep the link active.

### Library release flow

The library auto-publishes on GitHub Release:

1. Open a PR on `JDIZM/compound-interest` with the new calc + version bump.
2. Merge to main.
3. Create a GitHub Release tagged `vX.Y.Z`. The `release.yml` workflow runs tests, updates `package.json`, and `npm publish`es.
4. Bump this repo's `@jdizm/finance-calculator` pin in `package.json` and `pnpm install`.

## Pages

| Route | File | What it does |
|---|---|---|
| `/` | `pages/index/+Page.vue` | Landing with five tier-palette calculator cards |
| `/compound-interest` | `pages/compound-interest/+Page.vue` | Investment growth with monthly contributions + chart |
| `/mortgage` | `pages/mortgage/+Page.vue` | Repayment or interest-only mortgage |
| `/savings-goal` | `pages/savings-goal/+Page.vue` | Solve for monthly amount, or years needed |
| `/early-payoff` | `pages/early-payoff/+Page.vue` | Extra monthly payments vs baseline |
| `/fire` | `pages/fire/+Page.vue` | FIRE number + years to FIRE |

The landing page is prerendered (SSG). Calculator pages opt out of prerender via `+config.ts { prerender: false }` since they're purely client-reactive. Every page ships a `+Head.vue` with unique meta + a `SoftwareApplication` JSON-LD block.

## Design system

UI primitives under `src/components/ui/`:

- `Card` — tier-palette surfaces (`cream` default, `subtle`, `emerald-950`, `ink-950`, `accent-indigo`)
- `Button` — primary / secondary / ghost, sm / md / lg
- `NumberInput` — light input with £/% prefix, null-safe clear
- `ResultTile` — chunky tabular-nums number with K/M abbreviation above 10K (or 1M when `decimals > 0`)
- `Pill`, `Section`, `SectionLabel`, `SegmentedToggle`

Typography: [Montserrat Variable](https://fonts.google.com/specimen/Montserrat) (display, weights 600–900) + [Poppins](https://fonts.google.com/specimen/Poppins) (body, 400–700), both self-hosted via fontsource.

Palette (`tailwind.config.ts`):

- `emerald` 500 / 700 / 950
- `ink` 900 / 950
- `accent.indigo`
- `surface.cream` / `off-white` / `rule`

## Vike + Chart.js

Chart.js can't prerender (canvas is DOM-dependent). Compound-interest page wraps the chart in `<div v-if="isClient">` with a skeleton fallback during SSR, flipped to `true` in `onMounted`.

## Storybook

```sh
pnpm storybook
```

Storybook runs outside Vike (the plugin is conditionally loaded). Every UI primitive + `CalculatorCard` has stories covering tone / variant / coming-soon permutations.

## CI

- `.github/workflows/node.yml` — lint, format, type-check, test, build on push/PR.

## Licence

ISC.
