<template>
<div v-if="dataList.length">
  <div class="col-sm-6 col-md-3 p10" v-for="(item, index) in dataList" :key="index" @click="showImg(item)">
    <Video :data="item" />
  </div>
</div>
<div :style="`padding: ${height/2}px`" v-else>
  <v-loding v-if="!loading" />
</div>
</template>

<script lang="ts">
import {
  defineComponent
} from '@/utils'
import VueEvent from '@/utils/event'
import Video from '../index/components/TalkItem/components/video2.vue'
export default defineComponent({
  name: 'HomeView',
  components: {
    Video
  },
  props: {
    dataList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  setup(props, context) {

    function showImg(param: any) {
      VueEvent.emit("screen", {
        data: param
      });
    }

    return {
      showImg
    }
  }
})
</script>
