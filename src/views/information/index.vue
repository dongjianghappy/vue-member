<template>
<div class="container w1100 clearfix">
  <div class="180 left">
    <v-aside :data="module" title="消息管理" />
  </div>
  <div class="m0 right" style="width: 910px; min-height: 500px;">
    <Index :title="component || 'system'" />
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  computed
} from 'vue'
import {
  useStore
} from 'vuex'
import Index from './components/index.vue'
import {
  useRouter,
  useRoute
} from 'vue-router'

export default defineComponent({
  name: 'IndexView1',
  components: {
    Index
  },
  setup(props, context) {
    const {
      ctx
    }: any = getCurrentInstance();
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const module = computed(() => store.getters['user/config_talk'].message);
    

    const component = computed(() => route.query.mod);

    return {
      component,
      module
    }
  }
})
</script>
