# Lazy Components with Angular 17 Builder

Demonstration of an issue with Lazy-loaded components.

## Setup

```bash
# launch mock server with content
$ cd mock-server
$ npm run start

# Prerender the app with the new (esbuild) builder
$ cd lazy-components
$ npm run prerender

# prerender the app with the legacy (webpack) builder
$ npm run legacy-prerender
```

Both pages (`dist/lazy-components/browser/pageA.html` and `dist/lazy-components/browser/pageB.html`) should be pre-rendered correctly.

However, using the new `application` builder, the pageB is not rendered, because it is lazily-loaded (see `dynamic-loader.component.ts`).

Note: this issue only occurs when lazy-loading AND pre-rendering is used.
