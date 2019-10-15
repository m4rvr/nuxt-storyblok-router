<template>
  <div>
    <h1>Works!</h1>
  </div>
</template>

<script>
export default {
  validate ({ params }) {
    const languages = ['de', 'en']
    return typeof params.lang === 'undefined' || languages.includes(params.lang)
  },
  asyncData (context) {
    console.log(context)
    /* const story = await app.$storyapi.get(`cdn/stories/${route.path}`)

    console.log(story) */
  }
}
</script>
