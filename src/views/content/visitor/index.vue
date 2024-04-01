<template>
<div class="module-wrap">
  <div class="module-content p15" style="padding-bottom: 25px !important; min-height: 650px">
    <v-tabs :tabs="[{name: '访客列表',value: 'photos'},{name: '我的足迹',value: 'background'}]" :isEmit="true" v-model:index="index">
      <template v-slot:content1>
        <Detail :data="currentData" @back="isDetail = false" v-if="isDetail" />
        <List @detail="getDetail" v-else />
      </template>
      <template v-slot:content2>
        <Detail type="visit" :data="currentData" @back="isDetail = false" v-if="isDetail" />
        <List type="visit" @detail="getDetail" v-else />
      </template>
    </v-tabs>

  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  watch,
  useRoute
} from '@/utils'
import {
  useStore
} from 'vuex'
import List from './components/list.vue'
import Detail from './components/detail.vue'
export default defineComponent({
  name: 'AsideView',
  components: {
    List,
    Detail
  },
  setup(props, context) {
    const route: any = useRoute()
    const isDetail = ref(false)
    const index: any = ref(0)
    const currentData = ref({})

    // 监听
    watch([index], async (newValues, prevValues) => {
      isDetail.value = false
    })

    function getDetail(param: any) {
      isDetail.value = true
      currentData.value = param
    }

    return {
      index,
      route,
      isDetail,
      getDetail,
      currentData
    }

  }

})
</script>
