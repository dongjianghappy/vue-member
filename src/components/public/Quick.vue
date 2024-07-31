<template>
<span :class="{inputline: isEdit, 'quick-edit': isInput === 'input', 'no-event': auth}" :style="[style]" @click="getFocus" @blur="getBuler">{{value}}</span>
</template>

<script setup lang="ts">
import {
  defineProps,
  ref,
  useStore
} from '@/utils'

const props: any = defineProps({
  style: {
    type: Object,
    default: () => {
      return {}
    }
  },
  value: {
    type: String,
    default: ""
  },
  type: {
    type: String,
    default: "input"
  },
  data: {
    type: Array,
    default: () => {
      return
    }
  },
  render: {
    type: Function
  },
  auth: {
    type: Boolean,
    default: false
  },
})
const name: any = ref(props.data)
const store = useStore();
let isEdit = ref(false)
let isInput: any = ref(props.type)

function getFocus(e: any) {
  isInput.value = "input"
  e.currentTarget.setAttribute("contenteditable", true)
  isEdit.value = true
  e.currentTarget.focus()
}

function getBuler(e: any) {
  isEdit.value = false
  isInput.value = props.type
  if (name.value !== e.currentTarget.innerHTML) {
    store.dispatch('common/Fetch', {
      api: "changeData",
      data: {
        coding: name.value.coding,
        id: name.value.id,
        field: name.value.field,
        value: e.currentTarget.innerHTML
      }
    }).then((res: any) => {
      props.render && props.render()
    })
  }
}
</script>
