<template>
<i class="iconfont icon-star-1 font16 cl-white" style="font-size: 12px !important"  @click="handleDownload"></i>
</template>

<script setup lang="ts">
import {
  getCurrentInstance,
  defineProps,
  useStore
} from '@/utils'
import { downloadBlob } from '@/utils/fn'

const props: any = defineProps({
  data: {
    type: String,
    default: ""
  },
})
const {
  proxy
}: any = getCurrentInstance();
const store = useStore()

function handleDownload(){
  let file = props.data.file.split("/")
  
  store.dispatch('common/Fetch', {
    api: 'content_collect',
    data: {
      artid: props.data.id,
      content: file[file.length-1]
    }
  }).then((res: any) => {
    proxy.$hlj.message({
      type: 'info',
      msg: res.returnMessage
    })
  })
}
</script>
