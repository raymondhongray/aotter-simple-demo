<template>
  <div>
    <div class="max-w-3xl overflow-hidden shadow md:shadow-none mt-0 mr-auto mb-0 ml-auto">
      <a v-bind:href="link" target="_blank">
        <img class="w-full" v-bind:src="coverImg">
      </a>
      <div class="px-2 py-4">
        <div class="font-bold text-xl mb-2"><a v-bind:href="link" target="_blank">{{ title }}</a></div>
      </div>
      <time-with-author class="px-2 pt-5 pb-4"
          v-bind:createdAt="createdAt"
          v-bind:authorName="authorName">
      </time-with-author>
    </div>
  </div>
</template>

<script>
import TimeWithAuthor from '~/components/TimeWithAuthor.vue';

export default {
  components: {
    TimeWithAuthor
  },
  props: {
    link: String,
    coverImg: String,
    title: String,
    createdAt: Number,
    authorName: String
  },
  computed: {
    createdTime: function () {
      return this.$simpleTimeFormat(this.createdAt);
    }
  }
}
</script>
