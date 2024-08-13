<template>
<button v-if="isbutton" :disabled="!auth" type="button" role="switch" aria-checked="false" class="buttom-switch" :class="[{'switch-checked': data.item[data.field] === '1'}, className]" @click="handleclick(data.item)">
  <div class="switch-handle"></div><span class="switch-inner">OFF</span>
</button>
<span v-else @click="handleclick(data.item)">
  <span class="cl-green" v-if="data.item[data.field] === '1'">开启</span>
  <span class="cl-red" v-else>关闭</span>
</span>
</template>

<script setup lang="ts">
import {
  defineProps,
  defineEmits,
  useStore
} from '@/utils'

const props: any = defineProps({
  basic: {
    type: Boolean,
    default: false
  },
  storage: {
    type: Boolean,
    default: false
  },
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
  if (props.storage) {
    let name: any = localStorage.getItem(field) == undefined || localStorage.getItem(field) == '1' ? '0' : '1'
    localStorage.setItem(field, name)
    emit('toggle', localStorage.getItem(field))
  } else if(props.basic){
    emit('toggle', {
      field: field,
      value: item[field] == '1' ? '0' : '1',
    })
  } else {
    store.dispatch('common/Fetch', {
      api: props.api || "updateStatus",
      data: {
        coding,
        id: item.id,
        status: field,
        value: item[field] == '1' ? '0' : '1',
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
}
</script>
