<template>
  <div>
    <h1 class="text-3xl font-bold text-center text-aotter mt-4 mb-6">簡易版電獺少女網站</h1>

    <div class="flex justify-between">
      <border-title title="最新文章"></border-title>
      <div class="text-aotter text-center -top-1 relative m-2 cursor-pointer">
        <span>More</span>
        <arrow-right class="relative -top-1px -ml-1"></arrow-right>
      </div>
    </div>
    <tags class="pb-6"
        v-bind:tags="tags"
        v-bind:withHashTag="true">
    </tags>
    <div class="flex-none md:flex md:flex-wrap" v-if="primaryArticle !== undefined">
      <div class="w-full md:pb-2 lg:pb-0 lg:w-1/3 lg:pr-4">
        <article-main-card
            v-bind:link="`/${primaryArticle._seqId}`"
            v-bind:coverImg="`/aotter-staging/${primaryArticle.coverImg}`"
            v-bind:title="primaryArticle.title"
            v-bind:createdAt="primaryArticle._created"
            v-bind:authorName="primaryArticle.authorName">
        </article-main-card>
      </div>
      <div class="md:px-2 md:w-1/2 lg:w-1/3 lg:px-0" v-for="(articles, i) in articleSlices" v-bind:key="`articles-${i}`">
         <article-card class="pt-4 lg:pt-0 md:h-64 md:mb-16 lg:h-40 lg:mb-0" v-for="(article, j) in articles" v-bind:key="`article-${j}`"
            v-bind:link="`/${article._seqId}`"
            v-bind:coverImg="`/aotter-staging/${article.coverImg}`"
            v-bind:title="article.title"
            v-bind:createdAt="article._created"
            v-bind:authorName="article.authorName">
        </article-card>
      </div>
    </div>
    <div class="text-center text-gray-500 py-24" v-else>目前尚無最新的文章</div>

    <div id="video-anchor" class="flex mt-8">
      <border-title title="最新影片"></border-title>
    </div>
    <div class="py-4 md:pt-8" v-if="videoPost !== undefined">
      <video-card
          v-on:emitOnPlyrReady="onPlyrReady"
          v-bind:videoId="`${videoPost.videoId}`"
          v-bind:link="`/${videoPost._seqId}`"
          v-bind:title="videoPost.title"
          v-bind:createdAt="videoPost._created"
          v-bind:authorName="videoPost.authorName"
          v-bind:triggerPlay="triggerPlay">
      </video-card>
    </div>
    <div class="text-center text-gray-500 py-24" v-else>目前尚無最新的影片</div>
  </div>
</template>

<script>
import ArticleMainCard from '~/components/ArticleMainCard.vue';
import ArticleCard from '~/components/ArticleCard.vue';
import VideoCard from '~/components/VideoCard.vue';
import BorderTitle from '~/components/BorderTitle.vue';
import ArrowRight from '~/components/ArrowRight.vue';
import Tags from '~/components/Tags.vue';

export default {
  head() {
    return {
      title: this.title,
      meta: [
        { hid: 'title', property: 'title', name: 'title', content: this.title },
        { hid: 'description', property: 'description', name: 'description', content: this.description },
        { hid: 'keywords', property: 'keywords', name: 'keywords', content: '簡易版, 電獺, 電獺少女, aot' },
        { hid: 'url', property: 'url', name: 'url', content: this.host },
        { hid: 'og:title', property: 'og:title', name: 'og:title', content: this.title },
        { hid: 'og:description', property: 'og:description', name: 'og:description', content: this.description },
        { hid: 'og:url', property: 'og:url', name: 'og:url', content: this.host }
      ]
    }
  },
  components: {
    ArticleMainCard,
    ArticleCard,
    VideoCard,
    BorderTitle,
    ArrowRight,
    Tags
  },
  data() {
    return {
      triggerPlay: false, // if triggerPlay changed then call player.play()
      isPlyrReady: false
    };
  },
  async asyncData ({ req, $axios, error }) {
    const host = req ? req.headers.host : '';
    const results = await Promise.all([
      $axios.$get(`/aotter-staging/api/post/list?show=7&type=article`),
      $axios.$get(`/aotter-staging/api/post/list?show=1&type=video`)
    ]);
    if (results[0].success === undefined || results[1].success === undefined) {
      return error({ message: 'Server error. Renderer is loaded but not all resources are unavailable.' });
    }

    let videoPost = undefined;
    const articleList = (results[0].success && results[0].success.list) ? results[0].success.list : [];
    const videoList = (results[1].success && results[1].success.list) ? results[1].success.list : [];

    let tags = articleList.reduce((acc, cur) => {
      if (Array.isArray(cur.tags)) {
        acc = acc.concat(cur.tags);
      }
      return acc;
    }, []);
    tags = [...new Set(tags)];

    if (videoList[0] !== undefined && Array.isArray(videoList[0].videos) && videoList[0].videos.length > 0) {
      const query = videoList[0].videos[0].video;
      videoPost = {
        videoId: getQueryVariable('videoId', query),
        _seqId: videoList[0]._seqId,
        title: videoList[0].title,
        _created: videoList[0]._created,
        authorName: videoList[0].authorName
      }
    }

    const articleSlices = articleList.reduce((acc, cur, index) => {
      const data = {
        _seqId: cur._seqId,
        coverImg: cur.coverImg,
        title: cur.title,
        _created: cur._created,
        authorName: cur.authorName
      };
      if (index === 0) {
        acc.primary = data;
        return acc;
      }
      if (index % 2 === 1) {
        acc.slices[0].push(data);
      } else {
        acc.slices[1].push(data);
      }
      return acc;
    }, { primary: undefined, slices: [[], []] });

    return {
      host,
      title: '簡易版電獺少女網站',
      description: '製作目的為考驗良好的學習能力、考驗獨立自主的工作能力、以及考驗對於 Vue 和 JS 的基礎能力',
      primaryArticle: articleSlices.primary,
      articleSlices: articleSlices.slices,
      videoPost,
      tags
    }
  },
  beforeMount () {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    onPlyrReady () {
      console.log('plyr is ready!');
      this.isPlyrReady = true;
    },
    handleScroll () {
      const el = document.getElementById('video-anchor');
      if (isScrolledIntoView(el)) {
        if (this.isPlyrReady) {
          // trigger play event
          this.triggerPlay = true;
        }
      }
    }
  }
}
function getQueryVariable(variable, query) {
    const vars = query.split('&');
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) === variable) {
          pair = pair.slice(1);
          return decodeURIComponent(pair.join(''));
        }
    }
    return '';
}
function isScrolledIntoView(el) {
    const rect = el.getBoundingClientRect();
    const elemTop = rect.top;
    const elemBottom = rect.bottom;
    // Only completely visible elements return true:
    const isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
    // Partially visible elements return true:
    // isVisible = elemTop < window.innerHeight && elemBottom >= 0;
    return isVisible;
}
</script>
