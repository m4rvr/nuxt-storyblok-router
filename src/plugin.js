export default (ctx) => {
  ctx.app.storyblokRouter = {}
  ctx.$storyblokRouter = {
    test: 123
  }

  console.log(ctx)
}
