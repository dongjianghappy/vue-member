<template>
<div class="mb25">
  日志分类
  <span class="right">
    <v-group action='add' :group="group" :coding="data.coding.cate" :render="render" /></span>
</div>
<ul>
  <li v-for="(item, index) in group" :key="index">
    {{item.name}}
    <span class="right">({{item.num || 0}})</span>
  </li>
</ul>
</template>

<script setup lang="ts">
const props: any = defineProps({
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
})
</script>
