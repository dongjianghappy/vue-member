<template>
<div class="module-wrap">
  <div class="module-head p20">
    数据统计
  </div>
  <div class="module-content p15" style="padding-bottom: 25px !important; min-height: 510px">
    <v-tabs :tabs="[{name: '访客列表',value: 'photos'},{name: '我访问的',value: 'background'}]" :isEmit="true">
      <template v-slot:content1>
        <List />
      </template>
      <template v-slot:content2>
        <List type="visit" />
      </template>
    </v-tabs>

  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  ref,
  getUid
} from '@/utils'
import {
  useStore
} from 'vuex'
import List from './components/list.vue'
export default defineComponent({
  name: 'AsideView',
  components: {
    List
  },
  setup(props, context) {
      
  }

})
</script>
