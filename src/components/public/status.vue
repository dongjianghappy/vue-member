<template>
<i class="iconfont icon-right font18" v-if="data.item[data.field] === '1'" @click.stop="handleclick(data.item)" />
<i class="iconfont icon-error font18" v-else @click.stop="handleclick(data.item)" />
</template>

<script lang="ts">
import {
  defineComponent,
  useStore
} from '@/utils'

export default defineComponent({
  name: 'v-Switch',
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
          context.emit('toggle', {field: props.data.item.name, value: res.result.value})
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
