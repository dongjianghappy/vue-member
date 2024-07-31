<template>
<input type="checkbox" :class="className" :checked="checkedList.indexOf(data.id) > -1 ? true : false" @click="handleclick(data)" :disabled="auth" />
</template>

<script setup lang="ts">
import {
  defineProps,
  defineEmits
} from 'vue'

const props: any = defineProps({
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
})
const emit: any = defineEmits(['onClick'])

function handleclick(param: any) {
  emit(`onClick`, param)
  if (props.checkedList.indexOf(param.id) > -1) {
    let index = props.checkedList.indexOf(param.id)
    props.checkedList.splice(index, 1)
  } else {
    props.checkedList.push(param.id)
  }
}
</script>
