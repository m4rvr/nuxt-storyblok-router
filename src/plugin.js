export default (context) => {
  const pluginData = {
    getRoutePath: () => {
      const { route } = context
      const routeLang = route.params.lang
      const lang = routeLang ? `${routeLang}/` : ''
      const path = routeLang ? route.path.replace(`/${routeLang}`, '') : route.path

      return `${lang}<%= options.startSlug %>${path}`
    }
  }

  context.app.$storyblokRouter = {
    ...pluginData
  }

  context.$storyblokRouter = {
    ...pluginData
  }
}
