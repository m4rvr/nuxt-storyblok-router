import StoryblokClient, { StoryData, StoryblokResult } from 'storyblok-js-client'
import { NuxtRouteConfig } from '@nuxt/types/config/router'
import camelCase from 'lodash/camelCase'
import upperFirst from 'lodash/upperFirst'

/* const getClient = function (accessToken: string): StoryblokClient {
  return new StoryblokClient({
    accessToken
  })
} */

const pascalCase = function (value: string): string {
  return upperFirst(camelCase(value))
}

const getPages = async function (client: StoryblokClient, version: string, perPage = 5): Promise<StoryData[]> {
  let total = 0
  let page = 0
  const pages: StoryData[] = []

  while (!total || total > page * perPage) {
    page = page + 1

    const response: StoryblokResult = await client.get('cdn/stories', {
      version,
      page,
      per_page: perPage
    })

    pages.push(...response.data.stories)
    total = response.total
  }

  return pages
}

const getRoutes = function (pages: StoryData[]): NuxtRouteConfig[] {
  const routes: NuxtRouteConfig[] = pages.map((story: StoryData) => {
    const name = story.name
    const path = story.full_slug
    const component = pascalCase(story.content.component)

    return {
      name,
      path,
      component
    }
  })

  return routes
}

export {
  getPages,
  getRoutes
}
