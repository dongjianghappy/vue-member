<template>
<i class="iconfont icon-download font12 cl-white" style="font-size: 12px !important"  @click="handleDownload"></i>
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
    api: 'download',
    data: {
      id: props.data.id,
      img: file[file.length-1],
      responseType: 'blob'
    }
  }).then((res: any) => {
    if(res.size < 500){
      proxy.$hlj.message({
        type: 'info',
        msg: "用户设置了禁止下载"
      })
    }else{
      downloadBlob(res)
    }
  })
}
</script>
