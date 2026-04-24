<template>
    <div class="module-wrap">
        <div class="p0 bold">
            常用工具
        </div>
        <div class="flex" style="flex-wrap: wrap; line-height: 20px;">
            <div class="ptb10" style="flex: 1" v-for="(item, index) in module" :key="index" @click="handleClick(item)">
                <div class="pt5 mb10">
                    <i class="iconfont font32" :class="`icon-${item.icon}`" :style="`color: ${item.color}`"></i>
                </div>
                <div>{{item.name}}</div>
            </div>
        </div>
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
import VueEvent from '@/utils/event'
const {
  proxy
}: any = getCurrentInstance();
const store = useStore();
const router = useRouter()
const module = computed(() => store.getters['user/config_talk'].common_tool);


function handleClick(param: any = "") {
  if(param.type === '2'){
    VueEvent.emit(param.value, {});
  }else{
    router.push(proxy.const.setUrl({
      uid: getUid(),
      query: param
    })) 
  }
}
</script>
