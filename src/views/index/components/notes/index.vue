<template>
<div>
  <div class="con-list" v-for="(item, index) in dataList" :key="index">
    <div class="con-wrap">
      <div class="photos">
        <v-photo :data="item" :style="{width: '50px', height: '50px', borderRadius: '50%'}" v-if="loginuser.account === item.uid" />
        <v-photos :sourceData="item" v-else />
      </div>
      <div class="user_info pb5"><span class="username">{{item.nickname}}</span></div>
      <span class="right span-icon">
        <v-popover content="<i class='iconfont icon-down font18 icon-btn'></i>" arrow="tb" offset="right" :move="-50" :keys="`popover-${item.id}`">
          <div class="p15 align_center" style="width: 80px; height: 100px">
            <ul class="font14" style="display: block">
              <li style="height: 32px" @click="onClick({ api: 'Collect', data: { coding: 'A110005', artid: item.id }})">收藏</li>
              <li style="height: 32px">
                <v-drawing :querySelector="`content_${item.id}`">截图</v-drawing>
              </li>
            </ul>
          </div>
        </v-popover>
      </span>
      <div class="user_from pb5">
        {{item.times}}
      </div>
      <div :id="`content_${item.id}`" class="user_text">

        <div class="pb5">
          <div>
            <h3 class="mb10 mr5" style="display: inline;" v-html="item.title"></h3><span>
              <Graph :data="item.graph" v-if="item.graph" /></span>
          </div>
          <span v-html="item.content"></span>
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
  ref
} from 'vue'
import {
  useStore
} from 'vuex'
import Graph from '../../../graph/components/graph.vue'
export default defineComponent({
  name: 'HomeViews',
  components: {
    Graph
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
    const store = useStore();
    const loginuser = computed(() => store.getters['user/loginuser']);

    function onClick(param: any) {
      store.dispatch('common/Fetch', param).then(res => {
        proxy.$hlj.message({
          msg: res.returnMessage
        })
      })
    }

    return {
      loginuser,
      onClick
    }
  }
})
</script>
