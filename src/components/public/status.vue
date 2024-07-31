<template>
<i class="iconfont icon-right font18" v-if="data.item[data.field] === '1'" @click.stop="handleclick(data.item)" />
<i class="iconfont icon-error font18" v-else @click.stop="handleclick(data.item)" />
</template>

<script setup lang="ts">
import {
  defineProps,
  defineEmits,
  useStore
} from '@/utils'

const props: any = defineProps({
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
})
const emit: any = defineEmits(['toggle'])
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
      emit('toggle', {
        field: props.data.item.name,
        value: res.result.value
      })
    } else {
      props.msg(res.returnMessage)
    }
  })
}
</script>
