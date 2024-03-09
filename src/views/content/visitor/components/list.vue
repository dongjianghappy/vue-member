<template>
<div style="display: flex" v-for="(item, index) in dataList.list" :key="index">
  <div style="width: 60px; height: 60px;">
    <v-photos :sourceData="item" />
  </div>
  <div style="flex: 1">
    <div>{{item.nickname}}</div>
    <div class="font12 cl-999">访问时间 {{item.times[item.times.length-1]}}</div>
  </div>
</div>
<div class="pt25 align_right" v-if="dataList.total > 20">
  <v-pagination :pagination="{total: dataList.total, pages: dataList.pages, page: dataList.page ||  1, pagesize: dataList.pagesize}" :render="init" />
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
  props: {
    type: {
      type: String,
      default: 'visitor'
    }
  },
  setup(props, context) {
    const store = useStore();
    const dataList: any = ref([])

    function init(param: any = {}) {

      const params: any = {
        page: 1,
        pagesize: 50
      }
      Object.assign(params, param)

      store.dispatch('common/Fetch', {
        api: 'visitorList',
        data: {
          type: props.type,
          uid: getUid(),
          ...params
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
