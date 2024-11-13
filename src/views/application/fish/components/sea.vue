<template>
<v-button v-model:show="isShow">
  潜入海底世界
</v-button>
<v-dialog v-model:show="isShow" ref="dialog" title="" :style="{width: 1200, height: 600}" :hasfooter="false">
  <template v-slot:content>
    <div class="relative" style="background: url(&quot;/images/fish/fish.webp&quot;) 0% 0% / cover no-repeat; inset: 0px; height: 600px; overflow: hidden; z-index: 100000000;">
    <Fish position="absolute" />
    </div>
  </template>
</v-dialog>
</template>

<script setup lang="ts">
import { funny } from '@/assets/const';
import {
  defineProps,
  ref,
  useStore,
  watch,
  computed,
  getUid
} from '@/utils'

import Fish from '../index.vue'
const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
const store = useStore();
const dialog: any = ref(null)
const isShow = ref(false)

// 监听
watch([isShow], async (newValues, prevValues) => {
  if (isShow.value) {
    store.commit('common/setSeaLook', true)
  }else{
    store.commit('common/setSeaLook', false)
  }
})


</script>
