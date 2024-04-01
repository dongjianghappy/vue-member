<template>
<div class="container w1100 ">
  <div class="module-wrap mb15">
    <div class="module-head p25">在线留言</div>
    <div class="module-content p25" style="min-height: 650px;">
      <Form :render="init" :data="{coding: coding.list}" :placeholder="'给博主留言'" />
      <List :data="{coding: coding.reply}" :dataList="dataList" :isTome="false" :render="init" />
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  useStore,
  useRoute,
  ref,
  onMounted,
  getUid,
  watch,
  codings
} from '@/utils'
import Form from '../application/message_board/components/form.vue'
import List from '../application/message_board/components/list.vue'

export default defineComponent({
  name: 'MessageBoardView',
  components: {
    Form,
    List
  },
  setup(props, context) {
    const store = useStore();
    const coding = codings.service.message_board
    let dataList: any = ref({})
    const loading: any = ref(false)

    function init(param: any = {}) {
      loading.value = false

      const params: any = {
        coding: coding.list,
        uid: getUid(),
        page: 1,
        pagesize: 25
      }

      Object.assign(params, param)

      store.dispatch('common/Fetch', {
        api: "userMessageBoard",
        data: {
          ...params
        }
      }).then(res => {
        loading.value = true
        dataList.value = res.result || {}
      })
    }

    onMounted(init)

    return {
      coding,
      dataList,
      loading,
      init,
    }
  }
})
</script>
