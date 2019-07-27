<template>
  <div v-bind:class="{ 'text-sm': !setLgFontSize, 'text-base': setLgFontSize }">
    <span class="inline-block py-1 font-semibold mr-2"
        v-bind:class="{ 'text-gray-500': !setDark, 'text-gray-700': setDark }">
        {{ createdTime }}
    </span>
    <span class="inline-block py-1 font-semibold text-aotter mr-2">by {{ authorName }}</span>
  </div>
</template>

<script>
export default {
  props: {
    createdAt: Number,
    authorName: String,
    setDark: Boolean,
    setLgFontSize: Boolean
  },
  computed: {
    createdTime: function () {
      return this.$simpleTimeFormat(this.createdAt);
    }
  }
}
</script>
