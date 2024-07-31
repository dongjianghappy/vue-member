<template>
<div class="secondary-wrap absolute flex" style="background-color: var(--module-background) !important; box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05); border-radius: initial; margin-left: -23px; width: 700px; min-height: 320px; ">
  <div style="flex: 1">
    <div class="col-md-3" v-for="(item, index) in module" :key="index">
      <div class="mb10 align_center" style="flex: 1" @click="handleClick(item)">
        <div class="icon-wrap" :style="`background: ${item.color}`">
          <i class="iconfont font28 cl-white" :class="`icon-${item.icon}`" style="color: #ff9800"></i>
        </div>
        <div class="font12">{{item.name}}</div>
      </div>
    </div>
  </div>
  <div style="border-left: 1px solid var(--default-border); flex: 1">
    <div class="col-md-3" v-for="(item, index) in more_module" :key="index">
      <div class="mb10 align_center" style="flex: 1" @click="handleClick(item)">
        <div class="icon-wrap" :style="`background: ${item.color}`">
          <i class="iconfont font28 cl-white" :class="`icon-${item.icon}`" style="color: #ff9800"></i>
        </div>
        <div class="font12">{{item.name}}</div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  computed,
  useStore,
  useRouter,
} from '@/utils'
const store = useStore();
const router = useRouter();
const module = computed(() => store.getters['user/config_talk'].more);
const more_module = computed(() => store.getters['user/config_talk'].more_module);

function handleClick(param: any) {
  if (param.type === "1") {
    window.open(param.value)
  } else {
    router.push(`/${param.value}`)
  }
}
</script>

<style lang="less" scoped>
.icon-wrap {
  background: #eee;
  border-radius: 4px;
  width: 50px;
  height: 50px;
  line-height: 60px;
  display: inline-block;
}
</style>
