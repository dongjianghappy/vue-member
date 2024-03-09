<template>
<div class="mb25">
  日志分类
  <span class="right"><v-group action='add' :group="group" :coding="data.coding.cate" :render="render" /></span>
</div>
<ul>
  <li v-for="(item, index) in group" :key="index">
    {{item.name}}
    <span class="right">({{item.num || 0}})</span>
  </li>
</ul>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  useStore
} from '@/utils'

export default defineComponent({
  name: 'v-Button',
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    group: {
      type: Object,
      default: () => {
        return {}
      }
    },
    render: {
      type: Function,
      default: () => {
        return 'Default function'
      }
    }
  },
  emits: ['update:show', 'onClick'],
  setup(props, context) {
    
    const store = useStore()
    
    function handleClick() {
      context.emit('onClick')
    }
    return {
      handleClick
    }
  }
})
</script>
