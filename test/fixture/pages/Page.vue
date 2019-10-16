<template>
  <div>
    <h1>Works!</h1>
    <h2>{{ story.content.title }}</h2>
  </div>
</template>

<script>
export default {
  validate ({ params }) {
    const languages = ['de', 'en']
    return typeof params.lang === 'undefined' || languages.includes(params.lang)
  },
  async asyncData ({ app }) {
    const response = await app.$storyapi.get(`cdn/stories/${app.$storyblokRouter.getRoutePath()}`)

    return {
      story: response.data.story
    }
  }
}
</script>
