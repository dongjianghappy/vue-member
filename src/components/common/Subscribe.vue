<template>
<span class="concern" @click="subscribe(data)">
  {{data.subscribe === 1 ? '已订阅' : '订阅'}}
</span>
</template>

<script setup lang="ts">
import {
  getCurrentInstance,
  defineComponent,
  useStore,
} from '@/utils'

  const props: any = defineProps({
    type: {
      type: String,
      default: 'button'
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    render: {
      type: Function,
      default: () => {
        return 'Default function'
      }
    }
  })

    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();

    function subscribe(param: any) {
      store.dispatch('common/Fetch', {
        api: "subscribe",
        data: {
          uid: param.uid || param.account
        }
      }).then(res => {
        if(res.ifSuccess === 2){
          return
        }
        else if(res.ifSuccess === 0 || res.ifSuccess === -1){
          proxy.$hlj.message({
            type: 'info',
            msg: res.returnMessage
          })
          return
        }
        param.subscribe = res.result.subscribe
      })
    }
</script>
