<template>
<div>
  <span class="bold" style="color: var(--color-primary);">{{data.remark}}</span>
  <i class="iconfont icon-dot" />
  <span class="bold" style="color: var(--color-primary);"  @click="handleClick(data)">{{data.schedule_name}}</span>

  <div class="mt25 mb15" v-for="(item, index) in data.schedule" :key="index">
    <div class="mb10 bold">{{item.name}}</div>
    <div class="mb10">好友：
      <span v-for="(list, i) in item.userList" :key="i" class="mr15">
        {{list.name}}
      </span>
    </div>
    <div class="mb15">时段：{{item.period}}</div>
    <div class="mb15">地点：{{item.location}}</div>
    <div class="mb15">{{item.content}}</div>
    <Images :data="item" />
  </div>
</div>
</template>

<script setup lang="ts">
import {
  defineProps,
  getCurrentInstance,
  ref,
  computed,
  useStore,
  useRoute,
  useRouter,
  getUid
} from '@/utils'
import Images from './components/image.vue'

const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return
    }
  }
})
const {
  proxy
}: any = getCurrentInstance();
const router = useRouter()
const route = useRoute()

function handleClick(param: any){
  router.push(proxy.const.setUrl({
    uid: getUid(),
    query: `/schedule?mod=detail&id=${param.schedule_id}`
  }))
}
</script>
