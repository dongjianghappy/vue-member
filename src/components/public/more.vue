<template>
<div class="secondary-wrap absolute" style="background-color: var(--active-background) !important; box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05); border-radius: initial; margin-left: -23px; width: 350px; height: 220px; ">
  <div class="col-md-3" v-for="(item, index) in module" :key="index">
    <div class="mb10 align_center" style="flex: 1" @click="handleClick(item)">
      <div class="icon-wrap" :style="`background: ${item.color}`" >
        <i class="iconfont font28 cl-white" :class="`icon-${item.icon}`" style="color: #ff9800"></i>
      </div>
      <div class="font12">{{item.name}}</div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  onMounted,
  computed,
  useStore,
  useRouter,
  codings
} from '@/utils'
export default defineComponent({
  name: 'v-Audio',
  setup(props, context) {
    const store = useStore();
    const router = useRouter();
    const coding: any = codings.spread
    const module = computed(() => store.getters['user/config_talk'].more);
    const dataList: any = ref([])

    onMounted(() => {

    })

    function handleClick(param: any) {
      if (param.type === "1") {
        window.open(param.value)
      } else {
        router.push(`/${param.value}`)
      }
    }

    return {
      module,
      handleClick
    }
  }
})
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
