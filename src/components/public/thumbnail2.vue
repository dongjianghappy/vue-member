<template>
<v-button v-model:show="isShow" class="relative">
  <i class="iconfont" :class="`icon-${icon}`" @click="showImg(data)" v-if="icon" />
  <div style=" background: #252632; border-radius: 8px; overflow:hidden; height:300px" v-else>
    <div style="height: 220px; overflow: hidden;">
      <img :src="data.cover || data.image[0]" style="width: 100%; height: 220px;" />
    </div>
    <div class="ptb15 plr10">
      <div class="mb10" v-html="data.summary"></div>
      <div class="flex font12">
        <div class="cl-666" style="flex: 1">@{{data.nickname}}</div>
        <div class="cl-666" style="flex: 1">{{data.times}}</div>
      </div>
    </div>
  </div>
</v-button>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useStore,
} from '@/utils'
export default defineComponent({
  name: 'v-Thumbnail',
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    type: {
      type: String,
      default: "image"
    },
    coding: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: ""
    },
    hasInfo: {
      type: Boolean,
      default: false
    },
    hasComment: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    const store = useStore()
    const isShow: any = ref(false)
    const detail: any = ref({})
    const drawer: any = ref(null)
    const showFlag = ref(false)

    function showImg(param: any, i: any) {
      showFlag.value = !showFlag.value
    }

    function getNeighbor(type: any, callBack: any) {
      store.dispatch('common/Fetch', {
        api: "getNeighbor",
        data: {
          coding: props.coding,
          type: type,
          id: detail.value.id || props.data.id
        }
      }).then(res => {
        detail.value = res.result
      })
    }

    return {
      isShow,
      detail,
      drawer,
      showFlag,
      showImg,
      getNeighbor
    }
  }
})
</script>
