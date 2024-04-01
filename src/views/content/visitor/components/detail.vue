<template>
<div class="mb25 cl-white">
  <span class="mr10" @click="handleBack">
    <i class="iconfont icon-back pointer" />
  </span>
  <span v-if="type === 'visitor'">
    {{data.nickname}}访问我详情记录
  </span>
  <span v-else>
    我访问{{data.nickname}}详情记录
  </span>
</div>

<div class="notes-list relative" v-for="(item, index) in dataList.list" :key="index">
  <div class="notes-content plr5 ptb10" style="background: none; margin-bottom: 0px; border: 0px solid #f3f3f3; padding-top: 16px !important;">
    <div>
      <span class="mr15" v-for="(time, i) in item.times" :key="i">
        {{time}}
      </span>
    </div>
  </div>
</div>
<div class="pt25 align_center" v-if="dataList.total > 25">
  <v-pagination :pagination="{total: dataList.total, pages: dataList.pages, page: dataList.page ||  1, pagesize: dataList.pagesize}" :render="init" :simple="true" />
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref
} from '@/utils'
import {
  useStore
} from 'vuex'

export default defineComponent({
  name: 'AsideView',
  props: {
    data: {
      type: Object,
      default: () => {
        return
      }
    },
    type: {
      type: String,
      default: 'visitor'
    }
  },
  emits: ['back'],
  setup(props, context) {
    const store = useStore();
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
          detail: true,
          uid: props.data.uid,
          ...params
        }
      }).then(res => {
        dataList.value = res.result
      })
    }

    function handleBack() {
      context.emit('back', true)
    }

    onMounted(init)
    return {
      dataList,
      init,
      handleBack
    }
  }

})
</script>
