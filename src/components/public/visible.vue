<template>
<span class="p5 font12">
  <v-popover :content="`${list[visible] || list.public}<i class='iconfont icon-triangle font12' />`" arrow="tb" offset="right" :move="-20" :keys="`static111a}`">
    <ul>
      <li :class="{current: visible==i}" style="line-height: 30px;" @click="handleClick(i)" v-for="(item, i) in list" :key="i">{{item}}</li>
    </ul>
  </v-popover>
</span>
</template>

<script lang="ts">
import {
  defineComponent,
  ref
} from 'vue'

import {
  visibles
} from '@/assets/const'

export default defineComponent({
  name: 'v-Refresh',
  props: {
    data: {
      type: Array,
      default: () => {
        return
      }
    },
    number: {
      type: Number,
      default: 0
    },
    size: {
      type: String,
      default: 0
    },
    visible: {
      type: String,
      default: "public"
    }
  },
  emits: ['onclick', 'update:visible'],
  setup(props, context) {
    const list: any = visibles

    function handleClick(param: any) {
      context.emit('onclick', param)
      context.emit('update:visible', param)
    }
    return {
      list,
      handleClick
    }
  }
})
</script>
