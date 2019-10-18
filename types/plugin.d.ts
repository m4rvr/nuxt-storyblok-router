export interface StoryblokRouterPlugin {
  getRoutePath: () => string
  validateRoute: () => boolean
}
