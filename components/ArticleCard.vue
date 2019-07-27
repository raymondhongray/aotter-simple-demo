<template>
  <div>
    <div class="w-full max-w-full lg:flex shadow md:shadow-none">
      <a v-bind:href="link" target="_blank">
      <div class="h-64 md:h-48 lg:h-32 lg:w-48 flex-none bg-cover text-center overflow-hidden" v-bind:style="'background-image: url(\'' + coverImg + '\')'" title="">
      </div>
      </a>
      <div class="bg-white flex flex-col justify-between leading-normal">
        <p class="text-gray-900 font-bold text-xl md:text-sm pt-4 pb-6 pl-2 lg:pb-4 lg:pt-0 lg:pr-2 mb-2 overflow-hidden md:h-16 lg:h-82px max-w-450px lg:max-w-180px">
          <a v-bind:href="link" target="_blank">{{ title }}</a>
        </p>
        <div class="flex items-center">
          <time-with-author class="pl-2 pb-4 lg:pb-0"
              v-bind:createdAt="createdAt"
              v-bind:authorName="authorName">
          </time-with-author>
        </div>
      </div>
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
