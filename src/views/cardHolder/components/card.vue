<template>
  <div class="col-md-3 p10" v-for="(item, index) in dataList" :key="index">
    <div class="p15 align_center" style="background: var(--card-background); border-radius: 8px;">
      <div class="ptb10 font6">{{item.name}}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  defineProps,
  getCurrentInstance,
  computed,
  useStore,
  useRouter,
  getUid
} from '@/utils'

const props: any = defineProps({
  dataList: {
    type: Array,
    defualt: () => {
      return []
    }
  }
})
</script>
