<template>
<div class="col-sm-6" :class="className" v-for="(img, i) in history" :key="i">
  <div class="m5 relative">
    <img :src="img || require('@/assets/image/default.png')" height="140" style="border-radius: 8px; width: 100%" @click="handleChoose(img)" />
    <i class="iconfont icon-checkbox m0 cl-red" style="right: 0px; top: 0px; padding: 2px; z-index: 1;" v-if="img === loginuser[kind]"></i>
  </div>
</div>
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
  setup(props, context) {
    const store = useStore();
    const history: any = ref([])
    const loginuser = computed(() => store.getters['user/loginuser']);

    function getHistory() {

      store.dispatch('common/Fetch', {
        api: "GetHistoryPhotos",
        data: {
          type: props.type,
          kind: props.kind,
          uid: getUid()
        }
      }).then(res => {
        history.value = res.result

      })
    }

    function handleChoose(param: any) {
      debugger
      store.dispatch('common/Fetch', {
        api: 'choosePhotos',
        data: {
          field: props.kind,
          img: param
        }
      }).then(res => {
        store.dispatch('user/Detect')
      })
    }

    onMounted(getHistory)

    return {
      loginuser,
      history,
      handleChoose
    }
  }
})
</script>
