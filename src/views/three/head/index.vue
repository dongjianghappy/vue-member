<template>
  <div class="three-head">
    <span @click="hadnleEdit">{{isEdit ? '保存' : '进入编辑模式'}}</span>
    <span class="ml10" @click="hadnleCancel" v-if="isEdit">取消</span>
    <span class="ml10" @click="handleExit">退出星球空间</span>
    <span class="right"><BasicInfo /></span>
    <span class="right mr10">场景复原</span>
  </div>
</template>

<script setup lang="ts">
import {
  getCurrentInstance,
  defineProps,
  computed,
  useStore,
  codings
} from '@/utils'

import BasicInfo from '../basic/index.vue'

const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

const {
  proxy
}: any = getCurrentInstance();

const store = useStore();
const coding = codings.three.scene_item
const isEdit = computed(() => store.getters['three/isEdit']);
const geometry = computed(() => store.getters['three/geometryInfo']);
const geometryList = computed(() => store.getters['three/geometryList']);
const lightList = computed(() => store.getters['three/lightList']);
const helperList = computed(() => store.getters['three/helperList']);

function handleExit(){
  store.commit("user/setIsThree", 'false')
}

function hadnleCancel(){
  store.commit('three/setIsEdit', false)
}

function hadnleEdit(){
  store.commit('three/setIsEdit', !isEdit.value)

  if(isEdit.value){
    return
  }
  debugger
  const bodyList = props.data.scene.children.filter((item: any) => item.userData.isEdit)
  const newLightList = lightList.value.filter((item: any) => props.data.scene.children.filter((data: any) => item.uuid === data.uuid))
  // const newHelperList = helperList.value.filter((item: any) => props.data.scene.children.filter((data: any) => item.uuid === data.uuid))
  
  let dataArray: any = []
  bodyList.forEach((item: any) => {
    delete item.userData.isEdit
    dataArray.push(item.userData)
  });
debugger
  const param = dataArray

  store.dispatch('common/Fetch', {
    api: 'saveThreeItem',
    data: {
      coding,
      body: JSON.stringify(param)
    }
  }).then(res => {
      proxy.$hlj.message({
        type: 'info',
        msg: "保存成功"
      })
  })
}
</script>
