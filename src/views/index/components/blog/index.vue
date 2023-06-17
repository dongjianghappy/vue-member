<template>
<div>
  <div class="module-wrap">
    <div class="module-head" style="height: 50px;">
      <span class="right">
        <Detail :data="coding" /></span>
    </div>
    <div class="module-content p15">
      <div class="bg-f9f9f9 mb10 p15 h150" style="border-radius: 8px;" v-for="(item, index) in dataList" :key="index">
        <div class="flex">
          <div class="mr15" style="width: 64px">
            <img :src="item.photos" style="border-radius: 50%; width: 64px; height: 64px;" />

          </div>
          <div class="font16" style="flex: 1; line-height: 64px;">
            {{item.nickname}}
            <span class="right" @click="visit(item)">
              <button class="nobg font12" style="border-radius: 30px; width: 70px; padding: 5px 10px; border: 1px solid rgb(255, 130, 0); height: 30px; line-height: 20px; color: rgb(255, 130, 0);"> 前往 </button>
            </span>
          </div>
        </div>
        <div class="mt15 font12">
          <div class="mb5">
            <span>博客号: {{item.account}}</span>
          </div>
          <div class="cl-999">
            <span>博客: {{item.name}}({{item.description}})</span>
          </div>

        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  getUid
} from '@/utils';
import {
  defineComponent,
  getCurrentInstance,
  computed,
  ref,
  codings
} from '@/utils'
import {
  useStore
} from 'vuex'
import Graph from '../../../graph/components/graph.vue'
import Detail from './components/detail.vue'
export default defineComponent({
  name: 'HomeViews',
  components: {
    Graph,
    Detail
  },
  props: {
    channel: {
      type: String,
      default: ""
    },
    dataList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const coding: any = codings
    const store = useStore();
    const loginuser = computed(() => store.getters['user/loginuser']);

    function visit(param: any) {
      const {
        id
      } = param

      store.dispatch('common/Fetch', {
        api: "VisitCommunity",
        data: {
          coding: coding.user.blog_extend,
          id
        }
      }).then(res => {
        window.open(param.url)

      })
    }

    return {
      coding,
      loginuser,
      visit
    }
  }
})
</script>
