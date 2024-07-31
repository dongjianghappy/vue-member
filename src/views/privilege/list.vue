<template>
<div class="container w1100 relative" style="background: var(--module-background); min-height: 650px;">
  <div class="p25">
    <div class="mb25 font24 align_center">博客用户权益
      <span class="font16 left">
        <v-back />
      </span>
    </div>

    <div class="mb25" style="overflow: hidden" v-for="(item, index) in dataList" :key="index">
    <div class="p10 font16">{{item.name}}</div>
    <div>
      <div class="col-md-3 p10" v-for="(list, i) in item.list" :key="i">
        <div class="p25 align_center" @click="handleClick(list)" style="background: var(--card-background); border-radius: 8px;">
          <div>
            <div class="mb25 inline" style=" background: #eee; border-radius: 50px; width: 85px; height: 85px; line-height: 105px;">
              <i class="iconfont" :class="`icon-${list.icon}`" style="font-size: 36px !important;" />
            </div>
          </div>
          <div>{{list.name}}</div>
        </div>
      </div>
    </div>
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
  codings
} from '@/utils'

const store = useStore()
const router = useRouter()
const coding = codings.user.privilege

const dataList: any = ref([])

function handleClick(param: any) {
  router.push(`?mod=detail&id=${param.id}`)
}

function handleBack() {
  router.push(`/verified`)
}

//初始页面
function init() {
  store.dispatch('common/Fetch', {
    api: "privilege",
    data:{
      coding
    }
  }).then(res => {
    dataList.value = res.result

  })
}

onMounted(init)
</script>
