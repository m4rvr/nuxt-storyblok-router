# [WIP] nuxt-storyblok-router

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

> Nuxt.js module to use storyblok routes instead of pages/ directory

## Important!
This module is rewritten in TypeScript with a slightly different functionality. Based on the module [@wearewondrous/nuxt-storyblok-router](https://github.com/wearewondrous/nuxt-storyblok-router).
Some functions are missing or work differently because it should work for my personal use. Missing functions will be added.

**It's not recommended to use it in production at the moment because it's WIP!**

[📖 **Release Notes**](./CHANGELOG.md)

## Setup

1. Add the `@marvinrudolph/nuxt-storyblok-router` dependency with yarn or npm to your project
2. Add `@marvinrudolph/nuxt-storyblok-router` to the modules section of `nuxt.config.js` or `nuxt.config.ts`
3. Configure it
```js
// nuxt.config.js/nuxt.config.ts
{
  modules: [
    ['@marvinrudolph/nuxt-storyblok-router', {
      // Module option here
    }]
  ]
}
```

### Using top level options
```js
// nuxt.config.js/nuxt.config.ts
{
  modules: [
    '@marvinrudolph/nuxt-storyblok-router'
  ],
  storyblokRouter: [
    // Module options here
  ]
}
```

## Options
### `accessToken`
- Default: `this.options.storyblok || ''`

Access token for the Storyblok API. Not needed if you already have installed the [Storyblok Nuxt.js module](https://github.com/storyblok/storyblok-nuxt).

### `version`
- Default `'published'`
Version of the Storyblok Content. Use `'draft' for the preview access token.`

### `pagesDir`
- Default `'pages'`

Directory where all pages/content types are loaded from.

### `startSlug`
- Default `'page'`

Storyblok folder where all pages are in

### `generateDefaultPaths`
- Default `true`

If your Storyblok Site has multiple languages and generateDefaultPaths is set, paths without language code will be generated for the default language. For example if 'defaultLanguage' is 'en', '/about' and '/en/about' will be generated.

### `defaultLanguage`
- Default `''`

If your Storyblok Site has multiple languages, set defaultLanguage to the key of your Storyblok default language.

### `sitemap`
- Default `false`

Integration with the [Nuxt Sitemap Module](https://github.com/nuxt-community/sitemap-module#readme). Use a Object to configure the Module with [Options](https://github.com/nuxt-community/sitemap-module#sitemap-options).

### Usage
When enabled, this module will disable the traditional Nuxt router. The Router file will be generated according to your Storyblok routes.

##### Helpers
`nuxt-storyblok-router` provides some helper functions so you can easily implement it into your template. They are accessible through `context` or `context.app`.

###### `$storyblokRouter.getRoutePath()`
Returns the path for the Storyblok API based on your current router location. Automatically adds `startSlug` and `language code`.
Pattern is something like this: `{languageCode}/{startSlug}/{pathWithoutLanguageCode}`

**Examples**:
* `https://my-page.com/` => `page/`
* `https://my-page.com/awesome/subfolder` => `page/awesome/subfolder`
* `https://my-page.com/en/different/language` => `en/page/different/language`

###### `$storyblokRouter.validateRoute()`
If you want to validate your current route and check if the language is available.
This only works for **whole** language codes created in Storyblok - **not per route!** (atm)

**Examples:**
Languages from Storyblok `['de', 'en']`

* `https://my-page.com/`
	* Resolves to: `true` (because it's `defaultLanguage`)
* `https://my-page.com/en/something`
   	* Resolves to `true`
* `https://my-page.com/it/not-available`
	* Resolves to `false` because `it` isn't an available language from Storyblok

#### Content Types
In Storyblok all pages need a [Content Type](https://www.storyblok.com/docs/Guides/root-blocks).
1. Create a Content Type in Storyblok e.g. `page`.
2. The Storyblok Content Type can be inside a folder like defined in `startSlug` option e.g. `'page'`. So the full path for the route would be: `page/page`. Will be `pages/Page.vue` in Nuxt.  
3. Create a Vue Component with the same name, which will act as a Content Type, in the `pages/` directory. These Components have all the native Nuxt featutes like `asyncData`, `fetch`, `head`, etc.


##### Usage with [storyblok-nuxt](https://github.com/storyblok/storyblok-nuxt)
```html
// pages/Page.vue
<template>
  <h1>{{ story.content.title }}</h1>
</template>

<script>
export default {
  validate ({ $storyblokRouter }) {
    return $storyblokRouter.validateRoute()
  },
  async asyncData({ app }) {
    const response = await app.$storyapi.get(`cdn/stories/${app.$storyblokRouter.getRoutePath()}`)

    return {
      story: response.data.story
    }
  }
}
</script>
```

#### Languages
The Router will automaticly detect if you use multiple language. If you have multiple languages, the router will use an optional [dynamic parameter](https://router.vuejs.org/guide/essentials/dynamic-matching.html) on each route. The dynamic parameter is optional, so if no language is specified the default languag can be used.

```js
const router = new VueRouter({
  routes: [
    // dynamic segments start with a colon
    { path: '/:lang?/about', component: ContentType }
  ]
})
```


## Development

1. Clone this repository
2. Install dependencies using `yarn install` or `npm install`
3. Start development server using `npm run dev`

## License

[MIT License](./LICENSE)

Copyright (c) Marvin Rudolph <info@marvin-rudolph.de>

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@marvinrudolph/nuxt-storyblok-router/latest.svg?style=flat-square
[npm-version-href]: https://www.npmjs.com/package/@marvinrudolph/nuxt-storyblok-router

[npm-downloads-src]: https://img.shields.io/npm/dt/@marvinrudolph/nuxt-storyblok-router.svg?style=flat-square
[npm-downloads-href]: https://npmjs.com/package/@marvinrudolph/nuxt-storyblok-router

[license-src]: https://img.shields.io/npm/l/@marvinrudolph/nuxt-storyblok-router.svg?style=flat-square
[license-href]: https://npmjs.com/package/@marvinrudolph/nuxt-storyblok-router
