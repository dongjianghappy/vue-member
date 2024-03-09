<template>
<div class="pt20">
  <div class="container w1100 bg-white mb15" style="height: 270px">
    <div class="activity-banner">
      
    </div>
    <div class="activity_wrap relative">
      <div class="absolute  bg-999" style="left: 25px; bottom: 20px; width: 150px; height: 150px;"></div>
      <div class="pt15" style="padding-left: 200px;">
        <div class="font24">#{{activity.name}}#</div>
        <div class="mt5 cl-666">
          <span>{{activity.summary}}</span>
          <span class="ml15">讨论 {{activity.num}}</span>
          </div>
      </div>
    </div>
  </div>
  <!-- <div class="talk-home w1100 mb15">
    <div class="relative" style="background: #fff;  padding-left: 180px; height:220px; color: #fff;">
      <div class="user-home-photos" style="position:absolute; bottom: 50px; left:25px;">
        <img :src="activity.image" width="120" height="120" style="border-radius:5px; cursor:pointer;">
      </div>
      <div class="absolute" style="bottom:20px;">
        <h2>#{{activity.name}}#</h2>
        <p class="ptb10">
          
        </p>
      </div>
    </div>
  </div> -->
  <div class="container w1100 relative clearfix">
    <div class="main-center left ml0" style="width: 810px;">
      <Vote :data="vote" v-if="Object.keys(vote).length" />
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
import {
  defineComponent,
  getCurrentInstance,
  computed,
  onMounted,
  ref,
  reactive
} from 'vue'
import {
  useStore
} from 'vuex'
import TalkItem from '../index/components/TalkItem/index.vue'
import RightView from './components/right_aside.vue'
import Vote from './vote/index.vue'

import {
  useRouter,
  useRoute
} from 'vue-router'

export default defineComponent({
  name: 'HomeViewdddf',
  components: {
    TalkItem,
    RightView,
    Vote
  },
  setup(props, context) {
    const {
      ctx
    }: any = getCurrentInstance();
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    let data: any = reactive([]);
    const activity = computed(() => store.getters['common/activity']);
    const vote = computed(() => store.getters['common/vote']);
    const activityData = computed(() => store.getters['common/activityData']);

    function int() {
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

<style scoped>
  .activity-banner{
    background: #666;
    height: 180px;
  }
  .activity_wrap{
    height: 90px
  }
</style>