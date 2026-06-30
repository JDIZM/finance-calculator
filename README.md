# finance-calculator

Free, browser-only finance calculators — compound interest, mortgage, savings goal, early mortgage payoff, FIRE number. Every calculation runs through [`@jdizm/finance-calculator`](https://www.npmjs.com/package/@jdizm/finance-calculator) on npm.

## Stack

- [Vue 3](https://vuejs.org/) + [TypeScript 5.9](https://www.typescriptlang.org/)
- [Vike](https://vike.dev/) 0.4 + [vike-vue](https://vike.dev/vike-vue) — file-based routing, prerendered SSG for `/` and `/404`, client-side rendering for calculator routes via `+config.ts { prerender: false }`. Client routing is enabled in the root `pages/+config.ts`.
- [Vite](https://vitejs.dev/) 7 dev + build
- [Tailwind CSS v3](https://tailwindcss.com/) with the chunky Montserrat design system. Self-hosted fonts via `@fontsource-variable/montserrat` (latin subset only, variable weight) + `@fontsource/poppins` (latin subset, weights 400/500/600/700).
- [VueUse](https://vueuse.org/) for reactive helpers
- [Chart.js](https://www.chartjs.org/) via [vue-chartjs](https://vue-chartjs.org/) for the compound-interest projection chart (dynamically imported on client mount)
- [Storybook 8.6](https://storybook.js.org/) for UI primitives + design-review catalog
- [Vitest 4](https://vitest.dev/) unit tests + [Cypress 13](https://www.cypress.io/) smoke suite
- [GitHub Actions](.github/workflows) for CI

Not used anymore (removed during the Montserrat rebuild): Pinia, SASS, dark-mode / `useColorMode`, Inter.

## Requirements

- Node.js 24 (managed via [Volta](https://volta.sh/))
- [pnpm](https://pnpm.io/) 9+ (Corepack-managed via `packageManager` field)

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
| `pnpm test:unit` | Vitest unit tests with Istanbul coverage |
| `pnpm test:e2e` | Cypress smoke suite against `pnpm preview` |
| `pnpm test:e2e:dev` | Cypress in open mode against the dev server |
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

Imports from `@jdizm/finance-calculator` now resolve to the local source via the symlink in `node_modules`. Rebuild the library (`npm run build`) whenever you change it; Vite's dev server picks up the new output on next reload.

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
| `/404` | `pages/_error/+Page.vue` | 404 / error fallback with chunky hero + all 5 calculator cards |

The landing page and 404 are prerendered (SSG). Calculator pages opt out of prerender via `+config.ts { prerender: false }` since they're purely client-reactive.

**Titles + meta** live in each page's `+config.ts` (as `title` and `description`) so Vike updates them on both SSR and client-side route changes. Per-page `+Head.vue` files add OG, Twitter, canonical, and JSON-LD (`SoftwareApplication` per calculator, `WebSite` + `Organization` + `WebApplication@graph` on `/`, `FAQPage` on `/fire`).

## Design system

UI primitives under `src/components/ui/`:

- `Card` — tier-palette surfaces (`cream` default, `subtle`, `emerald-950`, `ink-950`, `accent-indigo`)
- `Button` — primary / secondary / ghost, sm / md / lg
- `NumberInput` — light input with £/% prefix, null-safe clear, hover + focus rings
- `ResultTile` — chunky tabular-nums number with K/M abbreviation above 10K (or 1M when `decimals > 0`)
- `Pill` — light / emerald / indigo / cream / ink tones
- `Section` — tone-aware page section wrapper
- `SectionLabel` — uppercase tracking-widest heading (h2/h3/h4/p, sm/lg)
- `SegmentedToggle` — two-segment toggle with `aria-pressed`

Marketing primitives under `src/components/marketing/`:
- `CalculatorCard` — homepage/404 tier card
- `RelatedCalculators` — cross-link grid on each calculator page

Layout under `src/components/layout/`:
- `NavBar` — sticky top bar, pathname-reactive active pill via `vike-vue/usePageContext`, mobile horizontal-scroll nav
- `Footer` — two-tier cream band with calc links + built-by credit linking to jamesdonnelly.dev with UTM params

Typography: [Montserrat Variable](https://fonts.google.com/specimen/Montserrat) (display, weights 100–900, variable axis) + [Poppins](https://fonts.google.com/specimen/Poppins) (body, 400/500/600/700), self-hosted via fontsource, latin-only subset.

Palette (`tailwind.config.ts`):
- `emerald` 500 / 700 / 950
- `ink` 900 / 950
- `accent.indigo`
- `surface.cream` / `off-white` / `rule`

## Chart.js on SSR

Chart.js can't prerender (canvas is DOM-dependent). The compound-interest page dynamically imports `ChartCmp` in `onMounted` and keeps a `shallowRef` for the resolved component, so it only ships to the client and the initial JS is smaller. A cream animate-pulse placeholder fills the chart area during SSR / before mount.

## Testing strategy

We use three layers and they have distinct jobs — don't double-test the same concern across tools.

### 1. Unit tests — Vitest + `@vue/test-utils`

In `src/**/*.spec.ts`. Test **logic and contracts**: what a component emits, what it renders given props, which classes it maps to which variant. Use `mount()` from `@vue/test-utils` and assert on `w.text()`, `w.emitted()`, `w.classes()`, `w.find(...)`. Mock external composables (e.g. `vike-vue/usePageContext`) with `vi.mock` at the top of the file.

What lives here:
- `ResultTile.spec.ts` — the K/M abbreviation formatter across every threshold
- `NumberInput.spec.ts` — emit null on empty, emit number on valid input, prefix/hint/min/max forwarding
- `Button.spec.ts` — renders `<a>` vs `<button>` based on `to`, variant + size class mapping
- `Pill.spec.ts` — tone → class matrix
- `Card.spec.ts` — tone → class matrix, inner-glow only on dark tones, slot passthrough
- `SegmentedToggle.spec.ts` — aria-pressed reflects `modelValue`, click emits `update:modelValue`, `label` falls back to `aria-label`
- `NavBar.spec.ts` — mocks `vike-vue/usePageContext`, asserts the active link gets `aria-current="page"`

### 2. Visual catalog — Storybook

Every primitive has `*.stories.ts` next to it. Stories are the **variant gallery** — a human looks at them in Storybook to confirm tones/sizes look right. We don't duplicate the unit tests as `play` functions here because the unit tests already cover the logic and don't need a browser.

When to add a story instead of a test:
- New visual variant (tone, size, state)
- A combination that's hard to reason about from classes alone (hover, focus, overlap)
- Marketing/layout components that are mostly composition

When to add both:
- Stateful UI with accessible semantics (e.g. `SegmentedToggle`): story shows it; spec asserts `aria-pressed`.

### 3. E2E smoke — Cypress

`cypress/e2e/smoke.cy.ts` visits each of the six routes and asserts the hero H1 + at least one computed result tile is present. Catches:
- Pages that fail to SSR/hydrate
- Broken routes
- Calculator output regressions (toggles, default inputs)

E2E is intentionally thin. Anything more granular lives in unit tests.

### Running locally

```sh
pnpm type-check    # vue-tsc
pnpm lint          # eslint --fix
pnpm test:unit     # all vitest specs with coverage
pnpm test:e2e      # builds + previews + runs cypress
pnpm build-storybook
```

All of these run in CI via `.github/workflows/node.yml` on every push/PR.

## CI

`.github/workflows/node.yml` runs `pnpm install`, type-check, lint, format:check, unit tests, and build on every push and PR against a Node 24 matrix.

## Licence

ISC.
