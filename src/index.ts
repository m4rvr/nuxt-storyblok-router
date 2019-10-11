
import { Module } from '@nuxt/types'
import StoryblokClient from 'storyblok-js-client'
import { getPages, getRoutes } from './utils'
import logger from './logger'

interface Options {
  accessToken: string,
  version: string,
  pagesDir: string
}

interface ModuleOptions {
  accessToken?: string,
  version?: string,
  pagesDir?: string
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
    pagesDir: 'pages'
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
    // Disable parsing `pages/`
    this.nuxt.options.build.createRoutes = () => {
      return []
    }

    const client: StoryblokClient = new StoryblokClient({
      accessToken: options.accessToken
    })

    // const space = await client.get('cdn/spaces/me')
    // const { language_codes: languageCodes = [] } = space.data.space

    const pages = await getPages(client, options.version, 5)

    console.log(getRoutes(pages))

    /* this.extendRoutes((routes: RouteConfig[]) => {
      routes.push({
        name: 'jojo'
      })
    }) */
  })
}

export default nuxtStoryblokRouter
export const meta = require('../package.json')
