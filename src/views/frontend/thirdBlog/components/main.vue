<template>

    <div>
    <div class="col-md-3 p10" v-for="(item, index) in dataList" :key="index">
      <div class="flex p10 radius-4" style=" background: var(--module-background); align-items: center;">
      <div class="photos" style="width: 100px">
        <v-photos :sourceData="item" :style="{radius: '50%', width: 80, height: 80}" />
      </div>
      <div style="flex: 1">
        <div class="mb15 bold">{{item.nickname || '未知用户'}} - {{item.title}}</div>
        <div class="flex">
          <span class="mr5 font12 cl-666" style="flex: 1">加入时间：{{item.times}}</span>
          <span class="w50 align_right" @click="handleClick(item)">
            查看
            <!-- <i class="iconfont icon-arrow"  /> -->
          </span>
        </div>
      </div>
      </div>
    
</div>

</div>
</template>

<script setup lang="ts">
import {
  defineComponent,
  onMounted,
  useStore,
  useRouter,
  ref,
  codings
} from '@/utils'

const store = useStore()
const router = useRouter();
const coding: any = codings.module.thirdBlog
const dataList: any = ref([])
const detail: any = ref({})
const loading: any = ref(false)

function init() {
  store.dispatch('common/Fetch', {
    api: 'thirdBlog',
    data: {
      page: 1,
      pagesize: 20
    }
  }).then(res => {
    dataList.value = res.result
  })
}

function handleClick(param: any){
  router.push(`/blog?id=${param.id}`)
}

onMounted(() => {
  init()
})
</script>
