<template>
<input type="checkbox" :class="className" :checked="checkedList.indexOf(data.id) > -1 ? true : false" @click="handleclick(data.id)" :disabled="auth" />
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance
} from 'vue'

export default defineComponent({
  name: 'v-Search',
  components: {

  },
  props: {
    checkedList: {
      type: Array,
      default: []
    },
    className: {
      type: String,
      default: ""
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
    const {
      ctx
    }: any = getCurrentInstance();

    function handleclick(id: any) {

      if (props.checkedList.indexOf(id) > -1) {
        let index = props.checkedList.indexOf(id)

        props.checkedList.splice(index, 1)
      } else {
        props.checkedList.push(id)
      }
    }
    return {
      handleclick
    }
  }
})
</script>
