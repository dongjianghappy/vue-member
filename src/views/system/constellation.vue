<template>
<div class="container w1100 clearfix">
  <div class="module-wrap">
    <div class="module-head p20">十二星座</div>
    <div class="module-content content-wrap ptb15 pr10 bg-white" style="min-height: 560px">
      <div class="notes-list relative" v-for="(item, index) in dataList" :key="index">
        <div class="notes-content plr5 ptb10" style="background: none; margin-bottom: 0px; border: 0px solid #f3f3f3">
          <div class="pb5 bold">{{item.title}}</div>
          {{item.summary}}
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  useStore,
  ref,
  codings
} from '@/utils'

export default defineComponent({
  name: 'HomeView',
  setup(props, context) {
    const coding: any = codings.common_sense.art
    const store = useStore();
    const dataList: any = ref([])

    function init() {
      store.dispatch('common/Fetch', {
        api: 'commonSenseQuotes',
        data: {
          coding,
          fid: 2
        }
      }).then(res => {

        dataList.value = res.result

      })
    }

    onMounted(() => {
      init()
    })

    return {
      dataList
    }
  }
})
</script>
