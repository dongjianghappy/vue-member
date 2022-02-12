<template>
  <v-module title="热门话题">
    <ul>
      <li v-for="(item, index) in hotTalkList"
          :key="index">
        <a class="p10 block">{{item.name}}</a><span>{{item.num}}</span>
      </li>
    </ul>
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
      const hotTalkList = computed(() => store.getters['common/hotTalk']);
     
      function init(){
        store.dispatch('common/HotTalk')    
      }
      onMounted(init)
      
      return { 
        hotTalkList
      }
    },
})
</script>
