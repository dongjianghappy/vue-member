<template>
<span :class="{inputline: isEdit, 'quick-edit': isInput === 'input', 'no-event': auth}" :style="[style]" @click="getFocus" @blur="getBuler">{{value}}</span>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useStore
} from '@/utils'
export default defineComponent({
  name: 'Quickview',
  props: {
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
  },
  setup(props, context) {
    const dataList: any = ref(props.data)
    const namesss: any = ref(props.data)
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
      if (namesss.value !== e.currentTarget.innerHTML) {
        store.dispatch('common/Fetch', {
          api: "changeData",
          data: {
            coding: namesss.value.coding,
            id: namesss.value.id,
            field: namesss.value.field,
            value: e.currentTarget.innerHTML
          }
        }).then((res: any) => {
          props.render && props.render()
        })
      }
    }

    return {
      isEdit,
      dataList,
      getFocus,
      getBuler,
      isInput
    }
  }
})
</script>
