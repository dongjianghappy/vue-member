<template>
<div class="module-wrap">
  <div class="module-content p15" style="padding-bottom: 25px !important; min-height: 510px">
    <div class="mb15 font18 bold">数据概览</div>
    <div  class="col-md-3 p10"><v-cards :data="{title: '昨日阅读', value: '0'}" /></div>
    <div  class="col-md-3 p10"><v-cards :data="{title: '昨日播放', value: '0'}" /></div>
    <div  class="col-md-3 p10"><v-cards :data="{title: '昨日转评赞', value: '0'}" /></div>
    <div  class="col-md-3 p10"><v-cards :data="{title: '新增粉丝', value: '0'}" /></div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  ref,
  getUid
} from '@/utils'
import {
  useStore
} from 'vuex'

export default defineComponent({
  name: 'AsideView',
  setup(props, context) {
    const {
      ctx,
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const dataList: any = ref([])

    function init() {
      store.dispatch('common/Fetch', {
        api: 'visitorList',
        data: {
          uid: getUid()
        }
      }).then(res => {
        dataList.value = res.result
      })
    }

    onMounted(init)
    return {
      dataList,
      init
    }
  }

})
</script>
