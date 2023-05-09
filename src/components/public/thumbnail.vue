<template>
<v-button v-model:show="isShow" class="relative">
  <i class="iconfont" :class="`icon-${icon}`" @click="showImg(data)" v-if="icon" />
  <img :src="data.cover || data.image[0]" style="border-radius: 8px; width: 100%; height: 150px;" @click="showImg(data)" v-else>
  <v-audio :data="data" :hasMusic="true" v-if="data.background_music" />
</v-button>
<v-layer v-model:isShow="showFlag" :data="Object.keys(detail).length > 0 ? detail : data" @prevOrNext="prevOrNext" v-if="showFlag" :type="type" :getNeighbor="getNeighbor" :hasInfo="hasInfo" :hasComment="hasComment" />
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
