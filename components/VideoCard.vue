<template>
  <div>
    <div class="w-full shadow md:shadow-none mt-0 mr-auto mb-0 ml-auto">
      <vue-plyr ref="plyr">
        <div data-plyr-provider="youtube" v-bind:data-plyr-embed-id="videoId"></div>
      </vue-plyr>
      <div class="px-2 pt-2">
        <div class="font-bold text-xl mb-2"><a v-bind:href="link" target="_blank">{{ title }}</a></div>
      </div>
      <time-with-author class="px-2 pb-4"
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
    videoId: String,
    title: String,
    createdAt: Number,
    authorName: String,
    triggerPlay: Boolean
  },
  mounted () {
    this.player.on('ready', () => {
      this.$emit('emitOnPlyrReady');
    });
  },
  computed: {
    createdTime: function () {
      return this.$simpleTimeFormat(this.createdAt);
    },
    player () { return this.$refs.plyr.player }
  },
  watch: {
    triggerPlay: function (val) {
      this.player.play();
    }
  }
}
</script>
