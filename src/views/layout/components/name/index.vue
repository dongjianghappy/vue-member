<template>
<div class="container w1100 space-name">
 <div class="text">{{userInfo.space_name || '对勇于尝试的人来说，没有不可能。'}}</div> 
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  useStore
} from '@/utils'

export default defineComponent({
  name: 'v-Footer',
  setup(props, context) {
    const store = useStore()
    const userInfo = computed(() => store.getters['user/userInfo']);
    return {
      userInfo
    }
  }
})
</script>

<style lang="less" scoped>
.space-name {
  padding: 50px 0;
  font-family: cursive;
  font-size: 36px;
  color: var(--module-background);
  text-align: center;
  text-shadow: rgb(201, 207, 206) 0px 1px 0px, rgb(188, 194, 194) 0px 2px 0px, rgb(175, 182, 182) 0px 3px 0px, rgb(164, 173, 172) 0px 4px 0px, rgb(159, 168, 167) 0px 5px 0px, rgb(153, 163, 162) 0px 6px 0px, rgb(151, 161, 160) 0px 7px 0px, rgb(148, 158, 157) 0px 8px 0px, rgba(0, 0, 0, 0.05) 0px 0px 5px, rgba(0, 0, 0, 0.2) 0px 1px 3px, rgba(0, 0, 0, 0.2) 0px 3px 5px, rgba(0, 0, 0, 0.2) 0px 5px 10px, rgba(0, 0, 0, 0.2) 0px 10px 10px, rgba(0, 0, 0, 0.3) 0px 20px 20px;
 .text{
   padding: 5px 0 15px 0;
   background-image: linear-gradient(90deg, hsla(0, 0%, 100%, 0), var(--module-background), hsla(0, 0%, 100%, 0)) !important;
 }
}
</style>
