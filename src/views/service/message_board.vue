<template>
<div class="container w1100 ">
  <div class="module-wrap mb15">
    <div class="module-head p25">在线留言</div>
    <div class="module-content p25" style="min-height: 650px;">
      <Form :render="init" :data="{coding: coding.list}" :placeholder="'给博主留言'" />
      <div class="p10 align_center" style="color: #808080" v-if="dataList.checked_num" @click="handelClick">您有{{dataList.checked_num}}条留言博主待查看。</div>
      <List :data="{coding: coding.reply}" :dataList="dataList" :isTome="false" :render="init" />
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  useStore,
  ref,
  onMounted,
  getUid,
  codings
} from '@/utils'
import Form from '../application/message_board/components/form.vue'
import List from '../application/message_board/components/list.vue'

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
</script>
