<template>
<span class="p5 font12">
  <v-popover :content="`${visibles[visible] || visibles.public}<i class='iconfont icon-triangle font12' />`" arrow="tb" offset="right" :move="-20" :keys="`static111a}`">
    <ul>
      <li :class="{current: visible==i}" style="line-height: 30px;" @click="handleClick(i)" v-for="(item, i) in visibles" :key="i">{{item}}</li>
    </ul>
  </v-popover>
</span>
</template>

<script setup lang="ts">
import {
  defineProps,
  defineEmits
} from 'vue'

import {
  visibles
} from '@/assets/const'

const props: any = defineProps({
  visible: {
    type: String,
    default: "public"
  }
})
const emit: any = defineEmits(['onclick', 'update:visible'])

function handleClick(param: any) {
  emit('onclick', param)
  emit('update:visible', param)
}
</script>
