<template>
<div class="module-wrap">
  <div class="module-head">
    <span class="pointer" :class="{'opacity': tabIndex == 1}" @click="handleTabs(0)">最近访客</span>
    <span class="ml15 pointer" :class="{'opacity': tabIndex == 0}" @click="handleTabs(1)">我的足迹</span>
  </div>
  <div class="module-content plr15 font12" v-if="visitor.list.length > 0">
    <ul class="visit-list clearfix">
      <li v-for="(item, index) in visitor.list[current]" :key="index">
        <div class="imgbox" style=" position: static;">
          <!-- <img :src="item.photos"> -->
          <v-photos :sourceData="{...item, uid: item.visitor}" :style="{width: 80, height: 80, radius: '4px'}" />
        </div>
        <div class=" relative ptb10 align_center">
          <div class="absolute visit-name pt5 font12 radius-4" style="background: linear-gradient(to top,rgba(0,0,0,.4) 0,rgba(0,0,0,0) 100%); top: -25px; width: 100%;
    height: 25px;">{{item.nickname}}</div>
          {{item.times}}
        </div>
      </li>
    </ul>
    <div>
      <v-space>
        <i class="iconfont icon-arrow deg180" :class="{disabled: current === 0}" style="margin: 8px !important" @click="handleToggle(-1)"></i>
        <i class="iconfont icon-arrow" :class="{disabled: current === 4 || current === visitor.list.length-1}" style="margin: 8px !important" @click="handleToggle(1)"></i>
        <i class="iconfont icon-more1" title="更多" @click="handleMore"></i>
      </v-space>
    </div>
  </div>
  <div class="cl-999 p15" v-else>暂无访客</div>
  <div class="module-foot p15 font12 align_left">今日浏览 <span class="mr15">{{visitor.today}}</span>总浏览 <span>{{visitor.total}}</span></div>
</div>
</template>

<script setup lang="ts">
import {
  useStore,
  useRouter,
  computed,
  onMounted,
  ref
} from '@/utils'

const store = useStore();
const router = useRouter();
const userInfo = computed(() => store.getters['user/loginuser']);
const visitor: any = computed(() => store.getters['common/visitor']);
const tabIndex: any = ref(0)
let current: any = ref(0)

function handleMore() {
  router.push(`/u/${userInfo.value.account}/content?mod=visitor`)
}

function handleToggle(param: any) {
  if ((param === -1 && current.value === 0) || (param === 1 && current.value === 4) || (param === 1 && visitor.value.list.length - 1 == current.value)) {
    return
  }
  current.value += param
}

function handleTabs(index: any) {
  tabIndex.value = index
  innit()
}

function innit() {
  store.dispatch('common/LastestVisitor', {
    data: {
      type: (tabIndex.value === 0 ? 'visitor' : 'visit')
    }
  })
}

onMounted(() => {
  innit()
})
</script>

<style scoped>
.disabled {
  color: #ccc;
}

.opacity {
  opacity: 0.5
}
</style>
