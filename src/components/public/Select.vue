<template>
<select class="w-full mr10" v-model="value" @change="handleclick" :disabled="disabled">
  <option v-for="(item, index) in enums" :key="index" :value="item.value">
    {{item.name}}
  </option>
</select>
</template>

<script lang="ts">
import {
  defineComponent
} from 'vue'

export default defineComponent({
  name: 'v-Select',
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
    }
  },
  emits: ['update:value', 'onChange'],
  setup(props, context) {
    function handleclick(e: any) {
      context.emit('update:value', e.target.value)
      context.emit('onChange', e.target.value)
    }
    return {
      handleclick
    }
  }
})
</script>
