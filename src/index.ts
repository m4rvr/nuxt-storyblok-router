
import { Module } from '@nuxt/types'
import { StoryblokRouterPlugin } from './plugin'
import initOptions, { Options } from './options'
import setupRoutes from './routes'

declare module '@nuxt/types' {
  interface Configuration {
    storyblokRouter?: Options
  }

  interface Context {
    $storyblokRouter: StoryblokRouterPlugin
  }
}

const nuxtStoryblokRouter: Module<Options> = function (moduleOptions) {
  this.nuxt.hook('build:before', async () => {
    const options = initOptions.call(this, moduleOptions)
    await setupRoutes.call(this, options)
  })
}

export default nuxtStoryblokRouter
export const meta = require('../package.json')
