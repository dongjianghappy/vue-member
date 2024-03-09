<template>
<div class="theme-cate">
  <span v-for="(item, index) in themeList" :key="index" @click="handleClick(item, index)">{{item.name}}</span>
</div>
<div class="theme-wrap">
  <div class="theme-list left" v-for="(item, index) in currentCate" :key="index" @click="chooseTheme('theme', item)">
    <div class="relative" style="width: 100%; height: 80px" :style="`background: ${item.background_color}`">
      <img :src="item.image" style="width: 100%; height: 80px" v-if="item.image">
      <i class="iconfont icon-checkbox checkbox" v-if="item.id === currentData.theme"></i>
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
  name: 'v-Theme',
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
    },
    type: {
      type: String,
      default: "theme"
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
        api: 'Theme',
        data: {
          type: props.type
        }
      }).then(res => {
        themeList.value = res.result
        currentCate.value = res.result.length > 0 ? res.result[0].list : []
      })
    }

    function handleClick(param: any, index: any) {
      currentCate.value = param.list || []
    }

    // function chooseTheme(param: any) {
    //   currentIndex.value = param.id
    //   context.emit('onClick', {type: 'theme', id: param.id})
    // }

    onMounted(init)

    return {
      currentCate,
      currentIndex,
      themeList,
      handleClick,
      // chooseTheme
    }
  }
})
</script>
