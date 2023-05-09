<template>
<button v-if="isbutton" :disabled="!auth" type="button" role="switch" aria-checked="false" class="buttom-switch" :class="[{'switch-checked': data.item[data.field] === '1'}, className]" @click="handleclick(data.item)">
  <div class="switch-handle"></div><span class="switch-inner">OFF</span>
</button>
<span v-else @click="handleclick(data.item)">
  <span class="cl-green" v-if="data.item[data.field] === '1'">开启</span>
  <span class="cl-red" v-else>关闭</span>
</span>
</template>

<script lang="ts">
import {
  defineComponent,
  useStore
} from '@/utils'

export default defineComponent({
  name: 'v-Switch',
  props: {
    isbutton: {
      type: Boolean,
      default: true
    },
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
  emits: ['toggle'],
  setup(props, context) {
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
        if (res.result.type) {
          item[res.result.type] = res.result.value
          context.emit('toggle', {
            field: props.data.item.name,
            value: res.result.value
          })
        } else {
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
