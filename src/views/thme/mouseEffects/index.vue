<template>
<div class="theme-wrap pt15">
  <div class="theme-list left align_center" v-for="(item, index) in themeList" :key="index" @click="chooseTheme('mouse_effects', item)">
    <div class="relative p15" style="height: 50px">
      <img :src="item.file">
    <i class="iconfont icon-checkbox checkbox" v-if="item.id === currentData.mouse_effects || item.file === currentData.mouse_effects"></i>
    </div>
    <div class="theme-name ptb10 font12">{{item.name}}</div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  useStore
} from '@/utils'
export default defineComponent({
  name: 'v-Cursor',

  props: {
    currentData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    chooseTheme: {
      type: Function,
      default: () => {
        return
      }
    }
  },
  emits: ['onClick'],
  setup(props, context) {
    const store = useStore();
    const currentCate = ref([])
    const currentIndex: any = ref()
    const themeList: any = ref([])

    function init() {
      store.dispatch('common/Fetch', {
        api: 'mouseEffects',
      }).then(res => {
        themeList.value = res.result
      })
    }

    function handleClick(param: any, index: any) {
      currentCate.value = param.list || []
    }

    onMounted(() => {
      init()
    })

    return {
      currentCate,
      currentIndex,
      themeList,
      handleClick
    }
  }
})
</script>
