
import path from 'path'
import { Module } from '@nuxt/types'
import initOptions, { Options } from './options'
import setupRoutes from './routes'

declare module '@nuxt/types' {
  interface Configuration {
    storyblokRouter?: Options
  }
}

const nuxtStoryblokRouter: Module<Options> = function (moduleOptions) {
  this.nuxt.hook('build:before', async () => {
    const options = initOptions.call(this, moduleOptions)
    await setupRoutes.call(this, options)

    this.addPlugin({
      src: path.resolve(__dirname, 'plugin.js'),
      options: {
        startSlug: options.startSlug
      }
    })
  })
}

export default nuxtStoryblokRouter
export const meta = require('../package.json')
