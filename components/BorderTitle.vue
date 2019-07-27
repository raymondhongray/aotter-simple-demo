<template>
  <div class="text-gray-700 block font-bold text-lg border-aotter border-t-2 relative">
    <div class="absolute -top-1 right-0 w-1/2 h-1 bg-white"></div>
    <span>{{ title }}</span>
  </div>
</template>

<script>
export default {
  props: {
    title: String
  }
}
</script>
