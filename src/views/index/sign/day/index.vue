<template>
  <div class="relative hidden" style="height: 500px;">
    <div :class="{'animation-left': isSelect, 'animation-right': !isSelect}">
      <List :dataList="dataList" @onSelect="onSelect" />
      <Submit :data="currentSign" @onBack="onBack" />
    </div>
  </div>
</template>

<script setup lang="ts">
import List from './list.vue'
import Submit from './submit.vue'
import {
  onMounted,
  ref
} from '@/utils'
import {
  useStore
} from 'vuex'
    const store = useStore();
    const date: any = new Date()
    const dataList: any = ref([])
    const currentSign: any = ref({})
    const isSelect: any = ref(false)

    function init(param: any = {}) {
      store.dispatch('common/Fetch', {
        api: 'signDay'
      }).then(res => {
        dataList.value = res.result
      })
    }

    function onSelect(param: any){
      currentSign.value = {...param}
      isSelect.value = true
    }

    function onBack(param: any){
      currentSign.value = {}
      isSelect.value = false
    }
    
    onMounted(() => {
        let date: any = new Date()
        init({
          year: date.getFullYear(),
          month: date.getMonth() + 1
        })
    })
</script>

<style lang="less" scoped>
.animation-left {
  transition: .5s, ;
  transform: translateX(-730px)
}

.animation-right {
  transition: .5s, ;
  transform: translateX(0px)
}
</style>
