<template>
<div class="container w1100 clearfix">
  <div class="w180 left">
    <v-aside :data="menu" title="管理中心">
      <template v-slot:aside>

        <!-- <v-collapse title="私信管理">
          <ul>
            <li class="aside"><i class="iconfont font20 icon-dot"></i>自媒体</li>
            <li class="aside"><i class="iconfont font20 icon-dot"></i> 博客网站</li>
            <li class="aside"><i class="iconfont font20 icon-dot"></i> 素材网站</li>
            <li class="aside"><i class="iconfont font20 icon-dot"></i> 图片网站</li>
          </ul>
        </v-collapse> -->
      </template>
    </v-aside>
  </div>
  <div class="m0 right" style="width: 910px">
    <Channel v-if="component === 'channel'" />
    <Visitor v-else-if="component === 'visitor'" />
    <Mood v-else-if="component === 'mood'" />
    <Index v-else />

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
import Channel from './components/channel.vue'
import Visitor from './visitor/index.vue'
import Mood from './components/mood.vue'
import {
  content,
  information
} from '@/assets/const'
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
    Mood
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const menu: any = content
    menu.map((item: any) => {
      item.path = `/content?mod=${item.url}`
    })
    const component = computed(() => route.query.mod);

    return {
      component,
      menu,
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
