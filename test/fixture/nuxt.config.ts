import path from 'path'
import { Configuration } from '@nuxt/types'
import typescriptModule from '@nuxt/typescript-build'
import storyblokRouterModule from '../../src'

const config: Partial<Configuration> = {
  rootDir: path.resolve(__dirname, '../..'),
  buildDIr: path.resolve(__dirname, '.nuxt'),
  srcDir: __dirname,

  buildModules: [typescriptModule, storyblokRouterModule],
  modules: [
    ['storyblok-nuxt', {
      accessToken: ''
    }]
  ],
  storyblokRouter: {
    pagesDir: 'test/fixture/pages',
    defaultLanguage: 'de'
  }
}

export default config
