<template>
<input type="checkbox" :class="className" :checked="checkedList.indexOf(data.id) > -1 ? true : false" @click="handleclick(data)" :disabled="auth" />
</template>

<script lang="ts">
import {
  defineComponent
} from 'vue'

export default defineComponent({
  name: 'v-Checkbox',
  props: {
    className: {
      type: String,
      default: ""
    },
    checkedList: {
      type: Array,
      default: []
    },
    data: {
      type: String,
      default: ""
    },
    auth: {
      type: Boolean,
      default: false
    },
  },
  emits: ['onClick'],
  setup(props, context) {
    function handleclick(param: any) {
      context.emit(`onClick`, param)
      if (props.checkedList.indexOf(param.id) > -1) {
        let index = props.checkedList.indexOf(param.id)
        props.checkedList.splice(index, 1)
      } else {
        props.checkedList.push(param.id)
      }
    }
    return {
      handleclick
    }
  }
})
</script>
