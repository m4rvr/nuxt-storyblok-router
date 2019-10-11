# nuxt-storyblok-router

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Circle CI][circle-ci-src]][circle-ci-href]
[![Codecov][codecov-src]][codecov-href]
[![License][license-src]][license-href]

> Nuxt.js module to use storyblok routes instead of pages/ directory

[📖 **Release Notes**](./CHANGELOG.md)

## Setup

1. Add `nuxt-storyblok-router` dependency to your project

```bash
yarn add nuxt-storyblok-router # or npm install nuxt-storyblok-router
```

2. Add `nuxt-storyblok-router` to the `modules` section of `nuxt.config.js`

```js
{
  modules: [
    // Simple usage
    'nuxt-storyblok-router',

    // With options
    ['nuxt-storyblok-router', { /* module options */ }]
  ]
}
```

## Development

1. Clone this repository
2. Install dependencies using `yarn install` or `npm install`
3. Start development server using `npm run dev`

## License

[MIT License](./LICENSE)

Copyright (c) Marvin Rudolph <info@marvin-rudolph.de>

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-storyblok-router/latest.svg?style=flat-square
[npm-version-href]: https://npmjs.com/package/nuxt-storyblok-router

[npm-downloads-src]: https://img.shields.io/npm/dt/nuxt-storyblok-router.svg?style=flat-square
[npm-downloads-href]: https://npmjs.com/package/nuxt-storyblok-router

[circle-ci-src]: https://img.shields.io/circleci/project/github/https://github.com/MarvinRudolph/nuxt-storyblok-router.svg?style=flat-square
[circle-ci-href]: https://circleci.com/gh/https://github.com/MarvinRudolph/nuxt-storyblok-router

[codecov-src]: https://img.shields.io/codecov/c/github/https://github.com/MarvinRudolph/nuxt-storyblok-router.svg?style=flat-square
[codecov-href]: https://codecov.io/gh/https://github.com/MarvinRudolph/nuxt-storyblok-router

[license-src]: https://img.shields.io/npm/l/nuxt-storyblok-router.svg?style=flat-square
[license-href]: https://npmjs.com/package/nuxt-storyblok-router
