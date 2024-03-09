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

        <div v-html="item.title" style="min-height: 30px"></div>
        <div v-if="item.image.length === 1" style="overflow:hidden; border-radius: 8px;width: 168px; height: 224px; cursor: zoom-in;">
          <v-img :src="item.image[0]" onerror="this.src='http://yunxi10.com/source/public/images/noimage.png'" @click="showImg(item, img)" />
        </div>
        <ul v-else class="img-grid smallimg-wrap clearfix">
          <li v-for="(img, k) in item.image" :key="k" style="border-radius: 8px; overflow:hidden;">
            <v-img :src="img" @click="showImg(item, img)" />
          </li>
        </ul>
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
