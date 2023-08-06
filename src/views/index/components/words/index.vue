<template>
<div>
  <div class="con-list" v-for="(item, index) in dataList" :key="index">
    <div class="con-wrap">
      <div class="photos">
        <v-photo :data="item" :style="{width: '50px', height: '50px', borderRadius: '50%'}" v-if="loginuser.account === item.uid" />
        <v-photos :sourceData="item" v-else />
      </div>
      <div class="user_info pb5"><span class="username">{{item.nickname}}</span></div>
      <div class="user_from pb5">
        {{item.times}}
      </div>
      <div :id="`content_${item.id}`" class="user_text">
        <div class="pb5">
          <div class="mb10">
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
