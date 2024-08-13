<template>
<div v-if="(!type && search.user.length === 1) || type === 'user'">
  <div class="con-list p15" v-for="(item, index) in search.user" :key="index">
    <div class="flex" style=" align-items: center;">
      <div class="photos" style="width: 100px">
        <v-photos :sourceData="item" :style="{radius: '50%', width: 80, height: 80}" />
      </div>
      <div style="flex: 1">
        <div class="mb15">{{item.nickname}}</div>
        <div>
          <v-concern :userInfo="item" />
        </div>
      </div>
      <div style="width: 100px">
        <v-concernbutton :data="item" />
      </div>
    </div>
  </div>
</div>
<div class="con-list flex" style="align-items: center;" v-else>
  <div class="relative p15 align_center" style="width: 114px;" v-for="(item, index) in search.user.slice(0, 7)" :key="index">
    <v-photos :sourceData="item" :style="{radius: '50%', width: 80, height: 80}" />
    <div class="nowrap pt10" style="width: 80px">{{item.nickname}}</div>
    <div class="absolute align_center pt45" style="background: rgba(0, 0, 0, 0.45); top: 0; right: -2px; bottom: 0; left: 0; z-index: 1" v-if="index=== 6 && search.user.length > 7" @click="handelMore">
      <span class="font18 cl-white"><i class="iconfont icon-arrow" style="font-size: 24px !important;" /></span>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  defineProps,
  useStore,
  computed,
  useRoute,
  useRouter
} from '@/utils'
import VueEvent from '@/utils/event'
const props: any = defineProps({
  type: {
    type: String,
    default: ""
  }
})
const store = useStore();
const router = useRouter();
const route = useRoute()
const search: any = computed(() => store.getters['talk/search']);

function handelMore() {
  router.push(`/search?type=user&q=${route.query.q}`)
}
</script>
