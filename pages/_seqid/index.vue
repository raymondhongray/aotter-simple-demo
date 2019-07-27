<template>
  <div>
    <time-with-author class="pt-5 pb-2"
        v-bind:createdAt="createdAt"
        v-bind:authorName="authorName"
        v-bind:setDark="true"
        v-bind:setLgFontSize="true">
    </time-with-author>
    <tags class="pt-2 pb-4 border-b"
        v-bind:tags="tags"
        v-bind:setDarkBg="true">
    </tags>
    <p class="text-center text-darkerAotter text-lg font-semibold py-3 px-4 my-4 bg-lighterGray">{{ summary }}</p>
    <div class="py-4 mb-8 post-content" v-html="content"></div>
  </div>
</template>

<script>
import TimeWithAuthor from '~/components/TimeWithAuthor.vue';
import Tags from '~/components/Tags.vue';

export default {
  components: {
    TimeWithAuthor,
    Tags
  },
  head() {
    return {
      title: this.title,
      meta: [
        { hid: 'title', property: 'title', name: 'title', content: this.title },
        { hid: 'description', property: 'description', name: 'description', content: this.seoDescription },
        { hid: 'keywords', property: 'keywords', name: 'keywords', content: this.seoKeywords },
        { hid: 'type', property: 'type', name: 'type', content: this.type },
        { hid: 'url', property: 'url', name: 'url', content: this.url },
        { hid: 'og:title', property: 'og:title', name: 'og:title', content: this.title },
        { hid: 'og:description', property: 'og:description', name: 'og:description', content: this.seoDescription },
        { hid: 'og:type', property: 'og:type', name: 'og:type', content: this.type },
        { hid: 'og:url', property: 'og:url', name: 'og:url', content: this.url }
      ]
    }
  },
  validate({ params }) {
    return /^\d+$/.test(params.seqid);
  },
  async asyncData ({ req, params, $axios, error }) {
    const host = req ? req.headers.host : '';
    const seqid = params.seqid;
    const result = await $axios.$get(`/aotter-staging/api/post/${seqid}`);

    if (result.error && result.error.code === 404) {
      return error({ statusCode: 404, message: 'Post not found.' });
    }
    if (result.success === undefined) {
      return error({ message: 'Server error. Renderer is loaded but not all resources are unavailable.' });
    }
    const data = result.success || {};

    return {
      url: `${host}/${data._seqId}`,
      _seqId: data._seqId,
      title: data.title,
      summary: data.summary,
      seoTitle: data.seoTitle,
      seoDescription: data.seoDescription,
      seoKeywords: data.seoKeywords,
      content: data.content.replace(/src=\"\/media\//g, 'src="/aotter-staging/media/'),
      createdAt: data._created,
      authorName: data.authorName,
      tags: data.tags,
      type: data.type
    }
  }
}
</script>
