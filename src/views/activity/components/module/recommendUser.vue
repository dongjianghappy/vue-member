<template>
  <v-module title="推荐用户">
    <div class="media-wrap mb10 pb10"
         v-for="(item, index) in dataList"
         :key="index">
      <div class="media-left">
        <v-userinfo :sourceData="item"
                    placement="top-end" />
      </div>
      <div class="media-body font14">
        <div>
          <router-link to="#">{{item.nickname}}</router-link>
        </div>
        <div>{{item.signature}}</div>
      </div>
    </div>
  </v-module>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, computed, onMounted } from 'vue'
import {useStore} from 'vuex'

export default defineComponent({
  name: 'HomeViewr',
    setup(props, context) {
      const {ctx}:any = getCurrentInstance();
      const store = useStore();
      const dataList = computed(() => store.getters['common/recommendUser']);
      
    function init(){
      store.dispatch('common/RecommendUser')
    }
    onMounted(init)
      return { 
        dataList
      }
    },
})
</script>
