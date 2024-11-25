<template>
  <div class="navlist">
    <span @click="hadnleEdit">{{isEdit ? '保存' : '进入编辑模式'}}</span>
    <span class="ml10" @click="hadnleCancel" v-if="isEdit">取消</span>
    <span class="ml10" @click="handleExit">退出星球空间</span>
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
  
  const mewGeometryList = geometryList.value.filter((item: any) => props.data.scene.children.filter((data: any) => item.uuid === data.uuid))


  store.dispatch('common/Fetch', {
    api: 'saveThreeItem',
    data: {
      coding,
      body: JSON.stringify(mewGeometryList)
    }
  }).then(res => {
      proxy.$hlj.message({
        type: 'info',
        msg: "保存成功"
      })
  })
}
</script>
