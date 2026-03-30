<template>
<div class="module-wrap">
  <div class="module-head ptb15 p0">
    <h3 class="font20 cl-333">热门头条</h3>
    <span class="right">
      <v-refresh :data="hotTalkList" v-model:number="current" size="4" />
    </span>
  </div>
  <div class="module-content">
    <ul>
      <li v-for="(item, index) in hotTalkList[current]" :key="index">
        <div class="item-title relative p0 pr40 ">
          <a :href="item.url" target="_blank" class="nowrap ptb10 block">{{item.title}}</a>
        </div>
      </li>
    </ul>
  </div>
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
const hotTalkList = computed(() => store.getters['common/headlines']);
let current: any = ref(0)

function init() {
  store.dispatch('common/Headlines')
}

function huati(param: any) {
  router.push(`/activity?item=${param}`)
}
onMounted(init)
</script>
