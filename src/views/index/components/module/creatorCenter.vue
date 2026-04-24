<template>
    <div class="module-wrap">
        <div class="module-head p0 bold">
            创作者中心
        </div>
        <div class="module-content plr15 font12 align_center flex" style="flex-wrap: wrap;">
            <div class="ptb10" style="width: 33.3333%;" v-for="(item, index) in module" :key="index">
                <div class="icon-wrap pt5 mb10" @click="handleClick(item.value)">
                    <i class="iconfont font20" :class="`icon-${item.icon}`" :style="`color: ${item.color}`"></i>
                </div>
                <div>{{item.name}}</div>
            </div>
        </div>
        <div class="module-foot p15 font12" @click="handleClick">进入创作者中心</div>
    </div>
</template>

<script setup lang="ts">
import {
  getCurrentInstance,
  computed,
  onMounted,
  useStore,
  useRouter,
  getUid,
  ref
} from '@/utils'

const {
  proxy
}: any = getCurrentInstance();
const store = useStore();
const router = useRouter()
const module = computed(() => store.getters['user/config_talk'].creator_center);


function handleClick(param: any = "") {
  router.push(proxy.const.setUrl({
    uid: getUid(),
    query: param
  })) 
}
</script>
