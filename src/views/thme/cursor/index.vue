<template>
<div class="theme-wrap pt15">
  <div class="theme-list left align_center" v-for="(item, index) in themeList" :key="index" @click="chooseTheme('cursor', item)">
    <div class="relative p15" style="height: 50px">
      <img :src="item.file">
    <i class="iconfont icon-checkbox checkbox" v-if="item.id === currentData.cursor || item.file === currentData.cursor"></i>
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
        api: 'Cursor',
      }).then(res => {
        themeList.value = res.result
      })
    }

    function handleClick(param: any, index: any) {
      currentCate.value = param.list || []
    }

    // function chooseTheme(param: any) {
    //   currentIndex.value = param.id
    //   context.emit('onClick', {
    //     type: 'cursor',
    //     id: param.id
    //   })
    // }

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
