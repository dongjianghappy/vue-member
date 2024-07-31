<template>
  <div class="col-md-4 p10" v-for="(item, index) in dataList" :key="index">
    <div class="flex">
      <div class="p15 align_center" style="background: var(--card-background); border-radius: 8px; width: 25%">
        <div class="ptb10 font6">
          5个积分
        </div>
      </div>
      <div class="p15 align_center" style="background: var(--card-background); border-radius: 8px; flex: 1">
        <div class="ptb10 font6">{{item.name}}</div>
      </div>
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
