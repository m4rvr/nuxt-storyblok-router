
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
        uuid: options.startSlug
      }
    })
  })
}

export default nuxtStoryblokRouter
export const meta = require('../package.json')

/* interface Options {
  accessToken: string,
  version: string,
  pagesDir: string,
  pageSlug: string
}

interface ModuleOptions {
  accessToken?: string,
  version?: string,
  pagesDir?: string,
  pageSlug?: string
}

declare module '@nuxt/types' {
  interface Configuration {
    storyblokRouter?: ModuleOptions
  }
}

const nuxtStoryblokRouter: Module<ModuleOptions> = function (moduleOptions) {
  const defaultOptions: Options = {
    accessToken: '',
    version: 'published',
    pagesDir: 'pages',
    pageSlug: 'page/'
  }

  const options: Options = {
    ...defaultOptions,
    ...this.options.storyblokRouter,
    ...moduleOptions
  }

  this.nuxt.hook('modules:done', () => {
    if (options.accessToken === '') {
      const storyblokNuxtModule = this.requiredModules.nuxtStoryblok
      const accessToken = (this.options.storyblok && this.options.storyblok.accessToken !== '')
        ? this.options.storyblok.accessToken
        : storyblokNuxtModule.options.accessToken

      if (storyblokNuxtModule && accessToken !== '') {
        options.accessToken = accessToken
        logger.warn('No `accessToken` set, fallback to `storyblok-nuxt`')
      } else {
        logger.warn('No `accessToken` was set!')
      }
    }
  })

  this.nuxt.hook('build:before', async () => {
    Disable parsing `pages/`
    this.nuxt.options.build.createRoutes = () => {
      return []
    }

    const client: StoryblokClient = new StoryblokClient({
      accessToken: options.accessToken
    })

    const space = await client.get('cdn/spaces/me')
    const { language_codes: languageCodes = [] } = space.data.space

    const pages = await getPages(client, options.version, 5)
    const filteredRoutes = getRoutes(pages)

    this.extendRoutes((routes: NuxtRouteConfig[]) => {
      filteredRoutes.forEach((route) => {
        routes.push(route)
      })
    })
  })
}

export default nuxtStoryblokRouter
export const meta = require('../package.json') */
