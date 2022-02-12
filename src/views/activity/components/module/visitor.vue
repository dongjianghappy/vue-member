<template>
  <v-module title="最近访客"
            class="visit-list">
    <ul class="clearfix">
      <li v-for="(item, index) in visitorList"
          :key="index">
        <div class="imgbox">
          <router-link to="#">
            <v-userinfo :sourceData="item"
                        placement="top-end" />
            <span class="visit-name font12"
                  style="background: linear-gradient(to top,rgba(0,0,0,.4) 0,rgba(0,0,0,0) 100%); bottom:5px;">{{item.nickname}}</span>
          </router-link>
        </div>
        <div class="visit-time">{{item.times}}</div>
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
      const visitorList = computed(() => store.getters['common/lastestVisitor']);
      
      function init(){
        store.dispatch('common/LastestVisitor')      
      }
      onMounted(init)
      return { 
        visitorList
      }
    },
})
</script>
