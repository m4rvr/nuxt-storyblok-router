import { ModuleThis } from '@nuxt/types/config/module'
import logger from './logger'

export interface Options {
  accessToken?: string
  version?: string
  pagesDir?: string
  startSlug?: string,
  generateDefaultPaths?: boolean
  defaultLanguage?: string,
  sitemap?: boolean | object
}

export const defaults: Options = {
  accessToken: '',
  version: 'published',
  pagesDir: 'pages',
  startSlug: 'page',
  generateDefaultPaths: true,
  defaultLanguage: '',
  sitemap: false
}

export default function initOptions (this: ModuleThis, moduleOptions?: Options): Required<Options> {
  const options = {
    ...defaults,
    ...this.options.storyblok,
    ...this.options.storyblokRouter,
    ...moduleOptions
  } as Required<Options>

  const getAccessToken = (): string => {
    if (options.accessToken === '') {
      const storyblokModule = this.requiredModules.nuxtStoryblok
      const storyblokOptions = this.options.storyblok
      let token = ''

      if (storyblokOptions && storyblokOptions.accessToken !== '') {
        token = storyblokOptions.accessToken
      } else if (storyblokModule && storyblokModule.options.accessToken !== '') {
        token = storyblokModule.options.accessToken
      } else {
        logger.error('No access token was set!')
      }

      return token
    }

    return options.accessToken
  }

  options.accessToken = getAccessToken()

  return options
}
