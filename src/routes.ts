import { ModuleThis } from '@nuxt/types/config/module'
import { NuxtRouteConfig } from '@nuxt/types/config/router'
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

  const buildRoutes = async function (): Promise<NuxtRouteConfig[]> {
    const pages: StoryData[] = await getPages()
    const routes: NuxtRouteConfig[] = pages.map((story: StoryData) => {
      const name = story.is_startpage ? `${story.full_slug}-index` : story.full_slug
      const path = story.full_slug
      const component = `${options.pagesDir}/${pascalCase(story.content.component)}`

      return {
        name: normalizeName(name),
        path,
        component,
        chunkName: component
      }
    })

    return routes
  }

  const storyblokRoutes = await buildRoutes()

  this.extendRoutes((routes: NuxtRouteConfig[]) => {
    storyblokRoutes.forEach((route: NuxtRouteConfig) => {
      routes.push(route)
    })
  })

  // const space = await client.get('cdn/spaces/me')
  // const { language_codes: languageCodes = [] } = space.data.space
}
