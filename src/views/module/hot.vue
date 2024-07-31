<template>
<div class="module-wrap">
  <div class="module-head">
    博客热搜
    <span class="right">
      <v-refresh :data="hotTalkList" v-model:number="current" size="4" />
    </span>
  </div>
  <div class="module-content">
    <ul>
      <li v-for="(item, index) in hotTalkList[current]" :key="index">
        <div class="item-title relative plr15 ">
          <a class="ptb10 block" @click="huati(item.title)">{{item.title}}<span class="mark right">沸</span></a>
        </div>
      </li>
    </ul>
  </div>
  <div class="module-foot p15 font12" @click="handleClick">查看完整热搜榜单</div>
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
const hotTalkList = computed(() => store.getters['common/hot']);
let current: any = ref(0)

function handleClick() {
  router.push("/hot")
}

function init() {
  store.dispatch('common/hotSearch')
}

function huati(param: any) {
  router.push(`/activity?item=${param}`)
}
onMounted(init)
</script>
