<template>
<div style="display: flex" v-for="(item, index) in dataList" :key="index">
  <div style="width: 60px; height: 60px;">
    <v-avatar :data="item" />
  </div>
  <div style="flex: 1">
    <div>{{item.nickname}}</div>
    <div class="font12 cl-999">访问时间 {{item.times[item.times.length-1]}}</div>
  </div>
  <div class="align_right" style="width: 150px; height: 60px;">
    <v-concernbutton :data="item" :render="init" />
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
  props: {
    type: {
      type: String,
      default: 'visitor'
    }
  },
  setup(props, context) {
    const store = useStore();
    const dataList: any = ref([])

    function init() {
      store.dispatch('common/Fetch', {
        api: 'visitorList',
        data: {
          type: props.type,
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
