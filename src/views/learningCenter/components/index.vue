<template>
<div class="container w1100 clearfix">
  <Article v-if="route.query.item" />
  <List v-else />
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  computed,
  onMounted
} from 'vue'
import {
  useStore
} from 'vuex'
import List from './list.vue'
import Article from './article.vue'
import {
  useRouter,
  useRoute
} from 'vue-router'

export default defineComponent({
  name: 'IndexView1',
  components: {
    List,
    Article
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const route = useRoute();

    return {
      route
    }
  }
})
</script>
