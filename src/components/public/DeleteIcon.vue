<template>
<i class="iconfont icon-close absolute" style="background: #fff; border-radius: 50%; padding: 2px; font-size: 8px; top: 0; right: 0;" @click="handleDelete"></i>
</template>

<script setup lang="ts">
import {
  defineProps,
  computed,
  useStore
} from '@/utils'
import VueEvent from '@/utils/event'
import {
  musicPush,
  currentMusic
} from '../packages/music/fn'

const props: any = defineProps({
  dataList: {
    type: Object,
    default: () => {
      return {}
    }
  },
  data: {
    type: Object,
    default: () => {
      return {}
    }
  },
  field: {
    type: String,
    default: "id"
  }
})

function handleDelete() {
  console.log("ccc");
  
  let index = props.dataList.findIndex((item: any) => (item[props.field] === props.data[props.field]) || (item[props.field] === props.data[props.field]))
  props.dataList.splice(index, 1)
}
</script>
