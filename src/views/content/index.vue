<template>
<div class="container w1100 clearfix">
  <div class="w180 left">
    <v-aside :data="module.content" title="管理中心">
      <template v-slot:aside>
      </template>
    </v-aside>
  </div>
  <div class="m0 right" style="width: 910px">
    <Channel v-if="component === 'channel'" />
    <Visitor v-else-if="component === 'visitor'" />
    <Mood v-else-if="component === 'mood'" />
    <Statistics v-else-if="component === 'statistics'" />
    <Contribution v-else-if="component === 'contribution'" />
    <Index v-else />

  </div>
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
import Channel from './components/channel.vue'
import Visitor from './visitor/index.vue'
import Mood from './components/mood.vue'
import Statistics from './statistics/index.vue'
import Contribution from './components/contribution.vue'
import {
  useRouter,
  useRoute
} from 'vue-router'

export default defineComponent({
  name: 'IndexView1',
  components: {
    Index,
    Channel,
    Visitor,
    Mood,
    Statistics,
    Contribution
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const module: any = computed(() => {
      let site = store.getters['user/config_talk']
      site.content && site.content.map((item: any) => {
        item.path = `/content${item.value}`
      })
      return site
    });
    const component = computed(() => route.query.mod);

    onMounted(() => {
      // const side = module.value.content.filter((item: any) => item.default === '1')
      // if(side.length > 0){
      //   router.push(window.location.pathname + side[0].value)
      // }
    })

    return {
      component,
      module,
    }
  }
})
</script>

<style lang="less" scoped>
/deep/ .collapse {
  background: none !important;

  .collapse-head {
    background: none !important;
  }

  .aside-list {
    background: none !important;
  }
}
</style>
