export default (ctx) => {
  ctx.app.storyblokRouter = {}
  ctx.$storyblokRouter = {
    startSlug: '<%= options.startSlug %>'
  }
}
