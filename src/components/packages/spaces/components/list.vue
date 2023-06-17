<template>
<perfect-scrollbar style="padding:0 10px">
<template v-for="(item, index) in history" :key="index">
<div class="col-md-2" :class="className" v-for="(img, i) in item.image" :key="i">
  <div class="m5 relative">
    <img :src="img" height="140" style="border-radius: 8px; width: 100%" @click="handleChoose(img)" />
    <i class="iconfont icon-checkbox m0 cl-red" style="right: 0px; top: 0px; padding: 2px; z-index: 1;" v-if="img === currentImg"></i>
  </div>
</div>
</template>
</perfect-scrollbar>
</template>

<script lang="ts">
import {
  defineComponent,
  useStore,
  ref,
  getUid,
  onMounted,
  computed
} from '@/utils'

export default defineComponent({
  name: 'v-Button',
  props: {
    type: {
      type: String,
      default: "album"
    },
    kind: {
      type: String,
      default: "photos"
    },
    className: {
      type: String,
      default: "col-md-3"
    }
  },
  emits: ['update:currentImg'],
  setup(props, context) {
    const store = useStore();
    const history: any = ref([])
    const currentImg: any = ref("")

    function getHistory() {

      store.dispatch('common/Fetch', {
        api: "spaceImage",
        data: {
          kind: props.kind
        }
      }).then(res => {
        history.value = res.result

      })
    }

    function handleChoose(param: any) {
      currentImg.value = param
      context.emit('update:currentImg', param)
    }

    onMounted(getHistory)

    return {
      currentImg,
      history,
      handleChoose
    }
  }
})
</script>

<style scoped>
.ps {
  height: 500px;
}
</style>