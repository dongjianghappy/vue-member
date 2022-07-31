<template>
<select class="w-full mr10" v-model="value" @change="handleclick" :disabled="disabled">
  <option v-for="(item, index) in enums" :key="index" :value="item.value">
    {{item.name}}
  </option>
</select>
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
    enums: {
      type: Object,
      default: () => {
        return {}
      }
    },
    value: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    attr: {
      type: String,
      default: ""
    }
  },
  emits: ['update:value', 'onChange', 'setAttr'],
  setup(props, context) {
    function handleclick(qqq: any) {
      debugger
      context.emit('update:value', qqq.target.value)
      context.emit('onChange', qqq.target.value)
      context.emit('setAttr', {
        attr: props.attr,
        value: qqq.target.value
      })

    }
    return {
      handleclick
    }
  }
})
</script>
