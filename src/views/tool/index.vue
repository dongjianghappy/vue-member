<template>
<div class="container w1100 clearfix">
  <ToolVideo v-if="route.query.item" />
  <Index v-else />
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
import Index from './components/index.vue'
import ToolVideo from './components/video.vue'
import {
  useRouter,
  useRoute
} from 'vue-router'

export default defineComponent({
  name: 'IndexView1',
  components: {
    Index,
    ToolVideo
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
