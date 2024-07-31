<template>
<div class="container w1100 relative" style="background: var(--module-background); min-height: 650px;">
  <div class="p25">
    <div class="mb25 font24 align_center">{{detail.name}}
      <span class="font16 left">
        <v-back />
      </span>
    </div>
    <div class="p30">
      <div class="mb15 font16 bold">用户类型：</div>
      <div class="mb30 flex">
        <div class="p10" style="background: var(--card-background); flex: 1" v-for="(item, index) in detail.grade" :key="index">
          {{item.name}}
          <span><i class="iconfont icon-dagou" :class="{'cl-green': item.value === '1'}" /></span>
        </div>
      </div>
      <div class="mb15 font16 bold">功能权限：</div>
      <div class="mb30">
        <div style="background: var(--card-background); " v-for="(item, index) in detail.cate" :key="index">
          <div class="mb15 p10 font16">{{item.name}}</div>
          <div class="mb25">
            <div class="flex p10">
              <div style="width: 120px">功能名称</div>
              <div class="p10 align_center" style="flex: 1" v-for="(user, index) in detail.grade" :key="index">{{user.name}}</div>
            </div>
            <div class="flex p10" v-for="(list, i) in item.list" :key="i">
              <div style="width: 120px">{{list.name}}</div>
              <div class="p10 align_center" style="flex: 1" v-for="(data, j) in list.grade[0]" :key="j">
                <span v-if="j === 'visitors'"><i class="iconfont icon-dagou" :class="{'cl-green': data === '1'}" /></span>
                <span v-else-if="j === 'ordinary_member'"><i class="iconfont icon-dagou" :class="{'cl-green': data === '1'}" /></span>
                <span v-else-if="j === 'senior_member'"><i class="iconfont icon-dagou" :class="{'cl-green': data === '1'}" /></span>
                <span v-else-if="j === 'vip_member'"><i class="iconfont icon-dagou" :class="{'cl-green': data === '1'}" /></span>
                <span v-else><i class="iconfont icon-dagou" :class="{'cl-green': data === '1'}" /></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mb15 font16 bold">功能说明：</div>
      <div class="mb30" v-html="detail.content"></div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  ref,
  onMounted,
  useRouter,
  useStore,
  useRoute
} from '@/utils'

const store = useStore()
const router = useRouter()
const route = useRoute()

const detail: any = ref([])

function handleClick(param: any) {
  router.push(`?item=condition&type=${param}`)
}

function handleBack() {
  router.push(`/verified`)
}

//初始页面
function init() {
  store.dispatch('common/Fetch', {
    api: "privilegeDetail",
    data: {
      id: route.query.id
    }
  }).then(res => {
    detail.value = res.result

  })
}

onMounted(init)
</script>
