<template>
  <div class="pt20">
    <div class="talk-home w1100 mb15">
      <div class="relative"
           style="background: linear-gradient(45deg ,#020031,#6d3353);  padding-left: 180px; height:220px; color: #fff;">
        <div class="user-home-photos"
             style="position:absolute; bottom: 50px; left:25px;">
          <img :src="activity.image"
               width="120"
               height="120"
               style="border-radius:5px; cursor:pointer;">
        </div>
        <div class="absolute"
             style="bottom:20px;">
          <h2>#{{activity.name}}#</h2>
          <p class="ptb10">
            <span class="mr10">讨论 {{activity.num}}</span>
            <span>{{activity.summary}}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="container w1100 relative clearfix">
      <div class="main-center left ml0"
           style="width: 810px;">
        <Vote :data="vote"
              v-if="Object.keys(vote).length" />
        <!-- <TalkSend /> -->
        <TalkItem :sourceData="activityData" />
      </div>
      <div class="w280 right">
        <RightView />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, computed, onMounted, ref, reactive } from 'vue'
import {useStore} from 'vuex'
import TalkItem from '../index/components/TalkItem/index.vue'
import RightView from './components/right_aside.vue'
import Vote from './vote/index.vue'

import {useRouter, useRoute} from 'vue-router'

export default defineComponent({
  name: 'HomeViewdddf',
  components: {
   TalkItem,
   RightView,
   Vote
  },
  setup(props,context) {
  const {ctx}:any = getCurrentInstance();
  const store = useStore();
  const router = useRouter();
  const route = useRoute();
  let data: any = reactive([]);
  const activity = computed(() => store.getters['common/activity']);
  const vote = computed(() => store.getters['common/vote']);
  const activityData = computed(() => store.getters['common/activityData']);
  
  
  
    function int(){
       window.scrollTo(0, 0)
       store.dispatch('common/Activity', {
        name: route.query.item
      }) 
      // store.dispatch('common/Fetch', {
      //     api: "Activity",
      //     data: {
      //       name: route.query.item
      //     }
      // }).then(res => {
      //   debugger
      //   activity.value = res.result.basic
      //   data.value = res.result.list
      // })
    }
   onMounted(int)
  return {
    activity,
    vote,
    activityData
  }
}
})
</script>
