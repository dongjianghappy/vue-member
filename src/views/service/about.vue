<template>
<div class="container w1100 clearfix">
  <div class="module-wrap">
    <div class="module-content basic-info" style="height: 560px;">
      <div class="mb25 font20 bold">关于博客</div>
      <div class="notes-list relative" v-for="(item, index) in dataList" :key="index">
        <div class="notes-content plr5 ptb10 font18" style="background: none; margin-bottom: 0px; border: 0px solid #f3f3f3">
          <div class="pb5 font14">{{item.time}}</div>
          {{item.title}}
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
  ref,
  computed,
  useStore,
  onMounted,
  codings
} from '@/utils'
import Detail from '../about/components/detail.vue'

export default defineComponent({
  name: 'AsideView',
  components: {
    Detail
  },
  setup(props, context) {
    const {
      ctx
    }: any = getCurrentInstance();
    const store: any = useStore()
    const isShow: any = ref(false)
    const dataList: any = ref({})
    const coding: any = codings.service.history

    function handleclick() {
      isShow.value = true
    }

    function init() {
      store.dispatch('common/Fetch', {
        data: {
          coding
        }
      }).then((res: any) => {
        dataList.value = res.result
      })
    }

    onMounted(init)
    return {
      handleclick,
      init,
      dataList
    }
  }
})
</script>
