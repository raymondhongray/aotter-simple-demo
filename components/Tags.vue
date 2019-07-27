<template>
  <div class="flex flex-wrap text-sm">
    <template v-if="setDarkBg">
      <div class="mr-2 px-2 py-px text-lighterGray bg-lighterGray" v-for="(tag, i) in tags" v-bind:key="`seo-tag-${i}`">{{ tag }}</div>
    </template>
    <template v-else>
      <div class="mr-2 text-gray-600" v-for="(tag, i) in tags" v-bind:key="`seo-tag-${i}`">#{{ tag }}</div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    tags: Array,
    setDarkBg: Boolean,
    withHashTag: Boolean,
    withHashTag: Boolean
  }
}
</script>
