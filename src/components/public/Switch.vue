<template>
<button :disabled="!auth" type="button" role="switch" aria-checked="false" class="buttom-switch" :class="[{'switch-checked': data.item[data.field] === '1'}, className]" @click="handleclick(data.item)">
  <div class="switch-handle"></div><span class="switch-inner">OFF</span>
</button>
</template>

<script lang="ts">
//  ${className}
import {
  defineComponent,
  getCurrentInstance,
  useStore
} from '@/utils'

export default defineComponent({
  name: 'v-Search',
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    api: {
      type: String,
      default: ""
    },
    param: {
      default: () => {
        return {}
      }
    },
    className: {
      type: String,
      default: ""
    },
    auth: {
      type: Boolean,
      default: false
    },
    msg: {
      type: Function,
      default: () => {
        return
      }
    }
  },
  emits: ['onClick'],
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const {
      data: {
        field,
        coding
      }
    }: any = props

    function handleclick(item: any) {
      store.dispatch('common/Fetch', {
        api: props.api || "updateStatus",
        data: {
          coding,
          id: item.id,
          status: field,
          ...props.param
        }
      }).then(res => {
        
        if(res.result.type){
          item[res.result.type] = res.result.value
        }else{
          props.msg(res.returnMessage)
        }
      })
    }
    return {
      handleclick
    }
  }
})
</script>
