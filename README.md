# finance-calculator-vue-spa

This template should help get you started developing with Vue 3 in Vite.

## Built with:

- [Vue 3](https://vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/) because why not?
- [Vite](https://vitejs.dev/) for development and production builds
- [VueUse](https://vueuse.org/) A Collection of Vue Composition Utilities
- [Pinia](https://pinia.esm.dev/) State Management
- [Storybook](https://storybook.js.org/) UI Component Development Environment
  - see the [Storybook Docs](https://storybook.js.org/docs/vue/writing-docs/introduction) on how to write stories and document your components.
- Testing see the [Testing section](#testing) for more information.
  - [Vitest](https://vitest.dev/)
  - [@storybook/testing-library](https://storybook.js.org/docs/writing-tests/interaction-testing)
  - [@storybook/testing-vue3](https://github.com/storybookjs/testing-vue3)
  - [@testing-library/vue](https://github.com/testing-library/vue-testing-library)
  - [@pinia/testing](https://pinia.esm.dev/testing/)
  - [Cypress](https://www.cypress.io/) for end-to-end tests
- Github Actions for CI/CD workflows.
- SCSS/SASS with [Dart Sass](https://sass-lang.com/dart-sass)

## Requirements

This project requires node.js to be installed. This project uses volta to manage node versions.

To install volta run the following command in the terminal.

```sh
curl https://get.volta.sh | bash
```

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Testing

There are multiple ways to test your components, stories and stores.

This project uses:

- [Vitest](https://vitest.dev/) to run the unit tests.
- [@storybook/testing-vue3](https://github.com/storybookjs/testing-vue3) and [@testing-library/vue](https://github.com/testing-library/vue-testing-library) to test the components and stories.
- [@pinia/testing](https://pinia.esm.dev/testing/) to test and mock the `pinia` stores.
- Alternatively you can use [@storybook/testing-library](https://storybook.js.org/docs/writing-tests/interaction-testing) to test UI interactions within the stories.

Read the docs for [Vue Testing Library](https://testing-library.com/docs/vue-testing-library/intro/#this-solution) and how to use it with [Storybook](https://storybook.js.org/docs/vue/workflows/unit-testing).

`Vue Testing Library` is a very light-weight solution for testing Vue components. It provides light utility functions on top of `@vue/test-utils`, in a way that encourages better testing practices.

## Storybook Composition

Composition allows you to browse components from any Storybook accessible via URL inside your local Storybook. You can compose any Storybook published online or running locally no matter the view layer, tech stack, or dependencies.

see: https://storybook.js.org/docs/sharing/storybook-composition
