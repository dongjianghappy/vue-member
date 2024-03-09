<template>
<v-popover :content="`<i class='iconfont icon-${icon}' />${name}:${currentSort.name}`" arrow="tb" offset="right" :move="0" :keys="`static_${index}`">
  <ul class="font14" style="display: block">
    <li v-for="(item, index) in [defaultValue, ...enums ]" :key="index" style="height: 32px" @click="handleclick(item)">{{item.name}}
    <i class="iconfont icon-right1" v-if="item.value === currentSort.value" />
    </li>
  </ul>
</v-popover>
</template>

<script lang="ts">
import {
  defineComponent,
  ref
} from 'vue'
export default defineComponent({
  name: 'v-Search',
  props: {
    defaultValue: {
      type: Object,
      default: () => {
        return {name: '默认', value: ''}
      }
    },
    name: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: ""
    },
    field: {
      type: String,
      default: ""
    },
    enums: {
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
    },
  },
  setup(props, context) {
    const currentSort: any = ref(props.defaultValue)

    function handleclick(index: any) {
      currentSort.value = index
      context.emit('update:value', currentSort.value.value)
      const params: any = {}
      params[props.field] = currentSort.value.value
      props.render(params)
    }
    return {
      handleclick,
      currentSort
    }
  }
})
</script>
