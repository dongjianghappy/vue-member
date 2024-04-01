<template>
<!-- <div class="mb25 cl-white">累计访问用户{{dataList.total}}人，共计访问人次{{dataList.num}}次，今天有{{dataList.today}}个访客</div> -->
<div class="flex p10" style=" border-top: 1px solid var(--default-border);" v-for="(item, i) in dataList.list" :key="i">
  <div class="w50 mr15">
    <v-photos :sourceData="item" />
  </div>
  <div style=" flex: 1;">
    <div>{{item.nickname}}</div>
    <div class="font12" style="color: #808080">{{item.times[item.times.length-1]}}</div>
  </div>
  <div class="pt15 w50 font12 align_right pointer" @click="handleClick(item)">查看历史</div>
</div>
<div class="pt25 align_center" v-if="dataList.total > 25">
  <v-pagination :pagination="{total: dataList.total, pages: dataList.pages, page: dataList.page ||  1, pagesize: dataList.pagesize}" :render="init" :simple="true" />
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  ref,
  getUid,
  useRouter
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
  emits: ['detail'],
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const router = useRouter()
    const dataList: any = ref([])

    function init(param: any = {}) {

      const params: any = {
        page: 1,
        pagesize: 25
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

    function handleClick(param: any) {
      context.emit('detail', param)
    }

    onMounted(init)
    return {
      dataList,
      init,
      handleClick
    }
  }

})
</script>
