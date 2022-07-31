<template>
<button class="nobg font12" style="border-radius: 30px; width: 70px; 
        padding: 5px 10px; border: 1px solid #ff8200;height: 30px;
    line-height: 20px; color: #ff8200" @click="concern(data)" v-if="data.hasconcern === 0">
  <i class="iconfont icon-anonymous-iconfont m0" style="color: #ff8200" />
  关注
</button>
<button class="nobg font12" style="border-radius: 30px; width: 70px; 
        padding: 5px 10px; border: 1px solid #ccc;height: 30px;
    line-height: 20px; color: #666" @click="concern(data)" v-else>已关注
</button>
</template>

<script lang="ts">
import {
  defineComponent,
  useStore,
} from '@/utils'

export default defineComponent({
  name: 'v-ConcernButton',
  props: {
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
    const store = useStore();

    function concern(param: any) {
      store.dispatch('common/Fetch', {
        api: "Concern",
        data: {
          uid: param.uid
        }
      }).then(res => {
        props.render()
      })
    }

    return {
      concern
    }
  }
})
</script>
