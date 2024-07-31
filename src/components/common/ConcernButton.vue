<template>
<div v-if="type === 'button'">
  <button class="nobg font12" style="border-radius: 30px; width: 70px; 
        padding: 5px 10px; border: 1px solid var(--color-primary);height: 30px;
    line-height: 20px; color: var(--color-primary)" @click="concern(data)" v-if="data.concern === '0'">
    <i class="iconfont icon-anonymous-iconfont m0" style="color: var(--color-primary)" />
    关注
  </button>
  <button class="nobg font12" style="border-radius: 30px; width: 70px; 
        padding: 5px 10px; border: 1px solid #ccc;height: 30px;
    line-height: 20px; color: #666" @click="concern(data)" v-else-if="data.concern === '1'">已关注
  </button>
  <button class="nobg font12" style="border-radius: 30px; width: 70px; 
        padding: 5px 10px; border: 1px solid #ccc;height: 30px;
    line-height: 20px; color: #666" @click="concern(data)" v-else>相互关注
  </button>
</div>
<div class="concern-button absolute" style="background: #f00; bottom: -12px; left: 50%; margin-left: -10px; border-radius: 50px; width: 20px; height: 20px;" @click="concern(data)" v-else-if="type === 'icon' && data.concern">
  <i class="iconfont icon-concern-3 font12" style="line-height: 20px;" v-if="data.concern == '2'" />
  <i class="iconfont icon-concern-2 font12" style="line-height: 20px;" v-else-if="data.concern == '1'" />
  <i class="iconfont icon-concern-1 font12" style="line-height: 20px;" v-else />
</div>
<span class="concern" @click="concern(data)" v-else-if="type === 'user'">
  <i class="iconfont icon-friends" style="line-height: 20px;" v-if="data.concern == '2'" />
  <i class="iconfont icon-concern" style="line-height: 20px;" v-else-if="data.concern == '1'" />
  <template v-else>关注</template>
</span>
</template>

<script lang="ts">
import {
  getCurrentInstance,
  defineComponent,
  useStore,
} from '@/utils'

export default defineComponent({
  name: 'v-ConcernButton',
  props: {
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
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();

    function concern(param: any) {
      store.dispatch('common/Fetch', {
        api: "Concern",
        data: {
          uid: param.uid || param.account,
          display: props.type
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
        param.concern = res.result.status
      })
    }

    return {
      concern
    }
  }
})
</script>
