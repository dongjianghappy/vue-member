<template>
  <div>
    <TalkSend />
    <TalkItem :sourceData="talkList" />
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, computed } from 'vue'
import {useStore} from 'vuex'
import {useRouter, useRoute} from 'vue-router'
import TalkSend from './module/talk_send.vue'
import TalkItem from './TalkItem/index.vue'

export default defineComponent({
  name: 'HomeView',
  components: {
   TalkSend,
   TalkItem
  },
  setup(props, context) {
    const {ctx}:any = getCurrentInstance();
    const store = useStore();
    const route = useRoute();
    // const talkList = computed(() => store.getters['common/talkList']);

    // function init(param: any){
    //   store.dispatch('common/Activity', {
    //     name: route.query.item
    //   })
    // }
    // init({})
    return { 
      // init,
      // talkList
    }
  },
})
</script>
