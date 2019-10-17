import { Plugin } from '@nuxt/types'

export interface StoryblokRouterPlugin {
  getRoutePath: () => string
  validateRoute: () => boolean
}

const storyblokRouterPlugin: Plugin = function (context) {
  const pluginData: StoryblokRouterPlugin = {
    getRoutePath: () => {
      const { route } = context
      const routeLang = route.params.lang
      const lang = routeLang && routeLang !== 'de' ? `${routeLang}/` : ''
      const path = routeLang ? route.path.replace(`/${routeLang}`, '') : route.path

      return `${lang}<%= options.startSlug %>${path}`
    },
    validateRoute: () => {
      const languageCodes = `<%= JSON.stringify(options.languageCodes) %>`
      const { route: { params } } = context

      return typeof params.lang === 'undefined' || languageCodes.includes(params.lang)
    }
  }

  context.app.$storyblokRouter = {
    ...pluginData
  }

  context.$storyblokRouter = {
    ...pluginData
  }
}

export default storyblokRouterPlugin
