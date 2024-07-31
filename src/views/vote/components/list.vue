<template>
<div class="module-wrap">
  <div class="module-content p15" style="padding-bottom: 25px !important; min-height: 560px">
    <div class="mb15 font18 bold">项目概览</div>
    <template v-for="(item, index) in dataList" :key="index">
      <div class="col-md-3 p10" v-if="item.module !=='talk'">
        <div class="p15 align_center" @click="handleclick(item.id)" style=" background: var(--card-background); border-radius: 8px;">
          <div class="ptb10 font6">{{item.name}}</div>
        </div>
      </div>
    </template>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  ref,
  useStore,
  useRouter,
  codings
} from '@/utils'

const coding: any = codings.vote
const store = useStore();
const router = useRouter();
const dataList: any = ref([]);

store.dispatch('common/Fetch', {
  data: {
    coding: coding.cate
  }
}).then((res: any) => {
  dataList.value = res.result
})

function handleclick(param: any, grade: any) {
  router.push(`/vote?item=${param}`)
}
</script>
