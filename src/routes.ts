import { ModuleThis } from '@nuxt/types/config/module'
import { NuxtRouteConfig } from '@nuxt/types/config/router'
import { NuxtConfigurationGenerateRoute } from '@nuxt/types/config/generate'
import StoryblokClient, { StoryData, StoryblokResult } from 'storyblok-js-client'
import { Options } from './options'
import { pascalCase, normalizeName } from './utils'

export default async function setupRoutes (this: ModuleThis, options: Options) {
  // Disable parsing `pages/`
  this.nuxt.options.build.createRoutes = () => {
    return []
  }

  const client: StoryblokClient = new StoryblokClient({
    accessToken: options.accessToken
  })

  const space = await client.get('cdn/spaces/me')
  const { language_codes: languageCodes = [] } = space.data.space

  const getPages = async function (): Promise<StoryData[]> {
    let total: number | null = null
    let page = 0
    const perPage = 5
    const pages: StoryData[] = []

    while (total === null || total > page * perPage) {
      page = page + 1

      const response: StoryblokResult = await client.get('cdn/stories', {
        version: options.version,
        page,
        per_page: perPage,
        starts_with: options.startSlug
      })

      pages.push(...response.data.stories)
      total = response.total
    }

    return pages
  }

  const buildRoutes = function (): NuxtRouteConfig[] {
    if (languageCodes.length && options.defaultLanguage && !options.generateDefaultPaths) {
      languageCodes.unshift(options.defaultLanguage)
    } else {
      options.generateDefaultPaths = true
    }

    const langPrefix = languageCodes.length > 0 ? '/:lang([a-z]{2})?' : ''

    const routes: NuxtRouteConfig[] = pages.map((story: StoryData) => {
      const name = story.is_startpage ? `${story.full_slug}/index` : story.full_slug
      const path = `${langPrefix}${story.full_slug.replace(options.startSlug!, '')}`
      const component = `${options.pagesDir}/${pascalCase(story.content.component)}`

      return {
        name: normalizeName(name.replace(options.startSlug!, '')),
        path,
        component,
        chunkName: component,
        props: {
          storyUuid: story.uuid
        }
      }
    })

    return routes
  }

  const buildDynamicRoutes = function (): NuxtConfigurationGenerateRoute[] {
    const dynamicRoutes: NuxtConfigurationGenerateRoute[] = []

    pages.forEach((story: StoryData) => {
      if (options.generateDefaultPaths) {
        dynamicRoutes.push({
          route: story.full_slug.replace(options.startSlug!, ''),
          payload: null
        })
      }

      languageCodes.forEach((lang: string) => {
        dynamicRoutes.push({
          route: `/${lang}${
            story.full_slug.replace(options.startSlug!, '')
          }`,
          payload: null
        })
      })
    })

    return dynamicRoutes
  }

  const pages: StoryData[] = await getPages()
  const storyblokRoutes = buildRoutes()

  this.extendRoutes((routes: NuxtRouteConfig[]) => {
    storyblokRoutes.forEach((route: NuxtRouteConfig) => {
      routes.push(route)
    })
  })

  this.nuxt.hook('generate:extendRoutes', (routes: NuxtConfigurationGenerateRoute[]) => {
    const dynamicRoutes: NuxtConfigurationGenerateRoute[] = buildDynamicRoutes()

    routes.splice(0, routes.length)
    routes.push(...dynamicRoutes)
  })
}
