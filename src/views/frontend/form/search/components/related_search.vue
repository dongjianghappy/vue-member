<template>
<div class="module-wrap">
  <div class="module-head ptb15 p0 ">
    <h3 class="font20 cl-333">相关搜索</h3>
    <span class="right">
      <!-- <v-refresh :data="rankingList" v-model:number="current" size="4" /> -->
    </span>
  </div>
  <div class="module-content p0">
    <ul v-if="dataList.length > 0">
      <li v-for="(item, index) in dataList" :key="index">
        <div class="item-title relative ptb10 cl-666" @click="handleSearch(item.word)">
          <i class="iconfont icon-search m0"></i> {{item.word}}
        </div>
      </li>
    </ul>
    <v-nodata v-else trip="暂无相关搜索" />
  </div>
</div>
</template>

<script setup lang="ts">
import {
  defineProps,
  defineEmits,
  useStore,
  ref,
  useRouter
} from '@/utils'
import VueEvent from '@/utils/event'

  const props: any = defineProps({
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    dataList: {
      type: Array,
      default: []
    }
  })

  const emit: any = defineEmits(['search'])
    const store = useStore();
    const router = useRouter();
    let current: any = ref(0)

    function handleSearch(param: any) {
      props.data.word = param
      emit("search");
    }
</script>
